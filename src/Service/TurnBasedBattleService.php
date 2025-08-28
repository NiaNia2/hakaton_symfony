<?php

namespace App\Service;

use App\Entity\Teams;
use App\Entity\Units;

final class TurnBasedBattleService
{
    /**
     * Simule un combat au tour par tour basé sur: VITA, ATT, INIT, MANA.
     * Retour JSON-like:
     * [
     *   'winner' => 'A'|'B'|'draw',
     *   'turns' => [ ...logs... ],
     *   'final' => [ 'A' => [...], 'B' => [...] ],
     * ]
     */
    public function simulate(Teams $teamA, Teams $teamB): array
    {
        $a = $this->buildTeam('A', $teamA);
        $b = $this->buildTeam('B', $teamB);

        $timeline = $this->buildTimeline($a, $b); // tri par initiative desc
        $turns = [];
        $maxTurns = 200; // sécurité
        $turnIndex = 0;

        while ($this->hasAlive($a) && $this->hasAlive($b) && $turnIndex < $maxTurns) {
            $actor = $timeline[$turnIndex % count($timeline)];

            if (!$actor['alive']) {
                $turnIndex++;
                continue;
            }

            // Utiliser des références vers les équipes pour que les modifications persistent
            if ($actor['team'] === 'A') {
                $enemyTeam =& $b;
                $allyTeam  =& $a;
            } else {
                $enemyTeam =& $a;
                $allyTeam  =& $b;
            }

            $targetKey = $this->pickTargetKey($enemyTeam);
            if ($targetKey === null) {
                // plus d’ennemis vivants
                break;
            }

            // Calcul mana et type d’attaque
            $log = [
                'order' => $turnIndex + 1,
                'actor' => $this->publicView($actor),
            ];

            $special = false;
            if ($actor['mana'] >= 100) {
                $special = true;
                $actor['mana'] -= 100;
            }

            // Dégâts de base
            $damage = (float) $actor['att'];
            if ($special) {
                $damage *= 1.5; // coup spécial
            }
            $damage = max(1.0, round($damage, 2));

            // Appliquer les dégâts (sur la vraie équipe ennemie)
            $enemy = $enemyTeam[$targetKey];
            $prevVita = $enemy['vita'];
            $enemy['vita'] = max(0.0, $enemy['vita'] - $damage);
            if ($enemy['vita'] <= 0.0) {
                $enemy['alive'] = false;
            }

            // Régénération de mana après action
            $actor['mana'] = min(100, $actor['mana'] + 20);

            // Mise à jour des structures
            // 1) timeline (pour garder l'affichage cohérent des prochains tours)
            $this->updateUnit($actor, $timeline);
            $this->updateUnit($enemy, $timeline);
            // 2) équipes (pour que l'état final et la logique de ciblage utilisent les bons PV)
            $this->updateUnit($actor, $allyTeam);
            $this->updateUnit($enemy, $enemyTeam);

            // Log du tour
            $log['target'] = $this->publicView($enemy);
            $log['action'] = $special ? 'special' : 'attack';
            $log['damage'] = $damage;
            $log['targetVitaBefore'] = $prevVita;
            $log['targetVitaAfter'] = $enemy['vita'];
            $turns[] = $log;

            $turnIndex++;
        }

        $winner = 'draw';
        if ($this->hasAlive($a) && !$this->hasAlive($b)) {
            $winner = 'A';
        } elseif ($this->hasAlive($b) && !$this->hasAlive($a)) {
            $winner = 'B';
        }

        return [
            'winner' => $winner,
            'turns'  => $turns,
            'final'  => [
                'A' => array_values(array_map([$this, 'publicView'], $a)),
                'B' => array_values(array_map([$this, 'publicView'], $b)),
            ],
        ];
    }

    /**
     * Timeline triée par initiative descendante, tiebreak: A avant B, puis slot one, two, three.
     */
    private function buildTimeline(array &$a, array &$b): array
    {
        $all = array_merge(array_values($a), array_values($b));
        usort($all, function ($x, $y) {
            if ($x['init'] === $y['init']) {
                if ($x['team'] === $y['team']) {
                    $order = ['one' => 1, 'two' => 2, 'three' => 3];
                    return ($order[$x['slot']] ?? 99) <=> ($order[$y['slot']] ?? 99);
                }
                // A joue avant B à init égale
                return $x['team'] <=> $y['team'];
            }
            // Initiative haute d'abord
            return $y['init'] <=> $x['init'];
        });
        return $all;
    }


    private function hasAlive(array $team): bool
    {
        foreach ($team as $u) {
            if ($u['alive']) {
                return true;
            }
        }
        return false;
    }


    private function updateUnit(array $unit, array &$container): void
    {
        foreach ($container as $key => $u) {
            if (($u['_ref'] ?? null) === ($unit['_ref'] ?? null) && ($u['slot'] ?? null) === ($unit['slot'] ?? null) && ($u['team'] ?? null) === ($unit['team'] ?? null)) {
                $container[$key] = $unit;
                return;
            }
        }
        // Si container est une équipe indexée par slot
        if (isset($unit['slot'], $container[$unit['slot']])) {
            $container[$unit['slot']] = $unit;
        }
    }


    private function publicView(array $u): array
    {
        return [
            'team' => $u['team'],
            'slot' => $u['slot'],
            'name' => $u['name'],
            'vita' => round($u['vita'], 2),
            'att'  => round($u['att'], 2),
            'init' => $u['init'],
            'mana' => $u['mana'],
            'alive'=> $u['alive'],
        ];
    }


    /**
     * Construit l’équipe sous forme de tableau modifiable pour la simu.
     * Clés: slot (one|two|three).
     */
    private function buildTeam(string $teamId, Teams $team): array
    {
        $units = [
            'one'   => $team->getUnitOne(),
            'two'   => $team->getUnitTwo(),
            'three' => $team->getUnitThree(),
        ];

        $built = [];
        foreach ($units as $slot => $unit) {
            if (!$unit instanceof Units) {
                continue;
            }
            $built[$slot] = [
                'team' => $teamId,
                'slot' => $slot,
                'name' => $this->guessName($unit, $slot),
                'vita' => (float) $this->readStat($unit, ['getVita']),
                'att'  => (float) $this->readStat($unit, ['getAtt']),
                'init' => (int)   $this->readStat($unit, ['getInitiative']),
                'mana' => (int)   $this->readStat($unit, ['getMana'], default: 0),
                'alive'=> true,
                '_ref' => spl_object_id($unit), // debug helper
            ];
        }

        return $built;
    }

    private function guessName(Units $u, string $fallback): string
    {
        foreach (['getName', 'getDisplayName', 'getType'] as $m) {
            if (method_exists($u, $m)) {
                $val = $u->$m();
                if (is_string($val) && $val !== '') {
                    return $val;
                }
            }
        }
        return ucfirst($fallback);
    }

    /**
     * Lit une stat via plusieurs méthodes possibles. Lance une exception si toutes échouent (sauf si default fourni).
     */
    private function readStat(Units $u, array $methods, mixed $default = null): mixed
    {
        foreach ($methods as $m) {
            if (method_exists($u, $m)) {
                $v = $u->$m();
                if ($v !== null) {
                    return $v;
                }
            }
        }
        if (func_num_args() >= 3) {
            return $default;
        }
        throw new \RuntimeException(sprintf(
            'Impossible de lire la statistique (%s) sur Units. Ajoutez un getter correspondant.',
            implode('|', $methods)
        ));
    }


    // ... existing code ...
    private function pickTargetKey(array $enemyTeam): ?string
    {
        // Stratégie simple: cible vivante avec le moins de VITA restante.
        $bestKey = null;
        $bestVita = PHP_FLOAT_MAX;
        foreach ($enemyTeam as $key => $u) {
            if ($u['alive'] && $u['vita'] < $bestVita) {
                $bestVita = $u['vita'];
                $bestKey = $key;
            }
        }
        return $bestKey;
    }
    // ... existing code ...
}