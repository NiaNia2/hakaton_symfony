// ... existing code ...
function parseTimeToMs(val) {
    if (!val) return 0;
    const s = String(val).trim();
    if (s.endsWith('ms')) return parseFloat(s);
    if (s.endsWith('s')) return parseFloat(s) * 1000;
    const num = parseFloat(s);
    return isNaN(num) ? 0 : num;
}

function getCurrentAnimationMs(el) {
    if (!el) return 0;
    const cs = getComputedStyle(el);
    // 1) variable CSS --dure si définie (ex: "1000ms")
    const dure = cs.getPropertyValue('--dure');
    const msFromVar = parseTimeToMs(dure);
    if (msFromVar > 0) return msFromVar;

    const animDur = cs.animationDuration || cs.getPropertyValue('animation-duration');
    const first = String(animDur || '').split(',')[0];
    const msFromAnim = parseTimeToMs(first);
    return msFromAnim > 0 ? msFromAnim : 800;
}

function playTurns(turns){
    if(!Array.isArray(turns) || turns.length === 0) return;

    const bufferMs = 150; // pause entre deux actions

    const runTurn = (idx) => {
        if (idx >= turns.length) return;
        const t = turns[idx];

        const actorId = `sprite-${t.actor.team}-${t.actor.slot}`;
        const actorEl = document.getElementById(actorId);

        if (actorEl && (actorEl.classList.contains('dead') || actorEl.classList.contains('dead-row1') || actorEl.classList.contains('dead-row2'))) {
            setTimeout(() => runTurn(idx + 1), bufferMs);
            return;
        }

        const isHeal = t.action === 'heal';

        if (actorEl) {
            actorEl.classList.remove('attack', 'heal', 'idle');
            actorEl.classList.add(isHeal ? 'heal' : 'attack');
            // reflow
            // eslint-disable-next-line no-unused-expressions
            actorEl.offsetWidth;
        }

        const actionMs = getCurrentAnimationMs(actorEl) || 800;

        setTimeout(() => {
            if (actorEl && !actorEl.classList.contains('dead') && !actorEl.classList.contains('dead-row1') && !actorEl.classList.contains('dead-row2')) {
                actorEl.classList.remove('attack', 'heal');
                actorEl.classList.add('idle');
            }

            if (isHeal && t.healTarget && typeof t.healVitaAfter !== 'undefined') {
                const vitaId = `vita-${t.healTarget.team}-${t.healTarget.slot}`;
                const el = document.getElementById(vitaId);
                if (el) el.textContent = t.healVitaAfter;
            } else if (!isHeal && t.target) {
                if (typeof t.targetVitaAfter !== 'undefined') {
                    const vitaId = `vita-${t.target.team}-${t.target.slot}`;
                    const el = document.getElementById(vitaId);
                    if (el) el.textContent = t.targetVitaAfter;
                }
                // Mort: jouer anim de death puis faire sortir le conteneur
                if ((typeof t.targetVitaAfter !== 'undefined' && Number(t.targetVitaAfter) <= 0) || (t.target.alive === false)) {
                    const targetSpriteId = `sprite-${t.target.team}-${t.target.slot}`;
                    const targetEl = document.getElementById(targetSpriteId);
                    if (targetEl) {
                        // Passe en "dead" (ou 2 rangées si tu utilises dead-row1/dead-row2)
                        targetEl.classList.remove('idle', 'attack', 'heal', 'dead-row1', 'dead-row2');
                        targetEl.classList.add('dead');
                        // reflow pour relancer l'animation de mort
                        // eslint-disable-next-line no-unused-expressions
                        targetEl.offsetWidth;

                        // Durée de l'anim de mort pour chronométrer la sortie
                        const deathMs = getCurrentAnimationMs(targetEl) || 1400;

                        // Après la mort -> sortie écran du conteneur
                        setTimeout(() => {
                            const containerId = `unit-${t.target.team}-${t.target.slot}`;
                            const containerEl = document.getElementById(containerId);
                            if (containerEl) {
                                if (t.target.team === 'A') {
                                    containerEl.classList.add('exit-left');
                                } else {
                                    containerEl.classList.add('exit-right');
                                }
                            }
                        }, deathMs);
                    }
                }
            }

            setTimeout(() => runTurn(idx + 1), bufferMs);
        }, actionMs);
    };

    runTurn(0);
}


// Exposer global pour htmx
window.playTurns = playTurns;
// ... existing code ...