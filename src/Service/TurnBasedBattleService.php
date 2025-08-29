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
        $maxTurns = 250; // sécurité
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

            // Valeur de base (dégâts/soin)
            $amount = (float) $actor['att'];
            if ($special) {
                $amount *= 1.5;
            }
            $amount = max(1.0, round($amount, 2));

            // Si Monk => action de soin, sinon attaque
            if (strtolower((string)($actor['type'] ?? '')) === 'monk') {
                // cibler l'allié le plus blessé (vita la plus basse parmi les vivants)
                $healKey = $this->pickTargetKey($allyTeam);
                if ($healKey !== null) {
                    $ally = $allyTeam[$healKey];
                    $prevVita = $ally['vita'];
                    // On ne connaît pas la vita max -> applique un soin simple (add)
                    $newVita = min($ally['maxVita'] ?? $ally['vita'], $ally['vita'] + $amount);
                    $ally['vita'] = round($newVita, 2);

                    $actor['mana'] = min(100, $actor['mana'] + 20);

                    // Mise à jour structures
                    $this->updateUnit($actor, $timeline);
                    $this->updateUnit($ally, $timeline);
                    $this->updateUnit($actor, $allyTeam);
                    $this->updateUnit($ally, $allyTeam);

                    // Log du tour de soin
                    $log['action'] = 'heal';
                    $log['heal'] = $amount;
                    $log['healTarget'] = $this->publicView($ally);
                    $log['healVitaBefore'] = $prevVita;
                    $log['healVitaAfter'] = $ally['vita'];
                    $turns[] = $log;

                    $turnIndex++;
                    continue;
                } else {
                    // Aucun allié à soigner (très rare) -> régénère la mana, ne fait rien d'autre
                    $actor['mana'] = min(100, $actor['mana'] + 20);
                    $this->updateUnit($actor, $timeline);
                    $this->updateUnit($actor, $allyTeam);

                    $log['action'] = 'heal';
                    $log['heal'] = 0.0;
                    $log['healTarget'] = $this->publicView($actor);
                    $log['healVitaBefore'] = $actor['vita'];
                    $log['healVitaAfter'] = $actor['vita'];
                    $turns[] = $log;

                    $turnIndex++;
                    continue;
                }
            }

            // Attaque classique
            $targetKey = $this->pickTargetKey($enemyTeam);
            if ($targetKey === null) {
                break; // plus d’ennemis vivants
            }

            $enemy = $enemyTeam[$targetKey];
            $prevVita = $enemy['vita'];
            $enemy['vita'] = max(0.0, $enemy['vita'] - $amount);
            if ($enemy['vita'] <= 0.0) {
                $enemy['alive'] = false;
            }

            // Régénération de mana après action
            $actor['mana'] = min(100, $actor['mana'] + 20);

            // Mise à jour des structures
            $this->updateUnit($actor, $timeline);
            $this->updateUnit($enemy, $timeline);
            $this->updateUnit($actor, $allyTeam);
            $this->updateUnit($enemy, $enemyTeam);

            // Log du tour d'attaque
            $log['target'] = $this->publicView($enemy);
            $log['action'] = $special ? 'special' : 'attack';
            $log['damage'] = $amount;
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
            $vita = (float) $this->readStat($unit, ['getVita']);
            $built[$slot] = [
                'team' => $teamId,
                'slot' => $slot,
                'name' => $this->guessName($unit, $slot),
                'type' => (string) ($unit->getType() ?? ''), // AJOUT: type pour logique de soin
                'vita'    => $vita,
                'maxVita' => $vita,
                'att'  => (float) $this->readStat($unit, ['getAtt']),
                'init' => (int)   $this->readStat($unit, ['getInitiative']),
                'mana' => (int)   $this->readStat($unit, ['getMana'], default: 0),
                'alive'=> true,
                '_ref' => spl_object_id($unit), // debug helper
            ];
        }

        return $built;
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
            'type' => $u['type'] ?? null, // exposer le type pour le front si besoin
            'vita' => round($u['vita'], 2),
            'att'  => round($u['att'], 2),
            'init' => $u['init'],
            'mana' => $u['mana'],
            'alive'=> $u['alive'],
        ];
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

    private function pickTargetKey(array $team): ?string
    {
        // cible vivante avec le moins de VITA restante.
        $bestKey = null;
        $bestVita = PHP_FLOAT_MAX;
        foreach ($team as $key => $u) {
            if ($u['alive'] && $u['vita'] < $bestVita) {
                $bestVita = $u['vita'];
                $bestKey = $key;
            }
        }
        return $bestKey;
    }
}