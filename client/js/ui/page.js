import { createGame } from '../model/game';
import { createPlayer } from '../model/player';
import { initGameLifeCycle } from './lifecycle';
import { initLeaderboardUpdate } from './leaderboard';
import { initHumanControls } from './human-controls';
import EventEmitter from '../lib/event-emitter';
import { hard } from '../model/computer-levels';

/**
 * The page game wires the DOM to an ongoing game.
 * It renders the game on the screen and dispatches events from the user to the game.
 */
export function defaultPlayersFromString (text) {
    // won't work on IE8 unless I add ES5 polyfills
    return text.split('-').map(function(player) {
        return {
            name: player,
            isHuman: player === 'human'
        };
    });
}

export function create (players, container, rules, listeners = defaultListeners()) {
    const game = createGame(rules);
    const emitter = Object.create(EventEmitter);
    const page = {
        activeMatch: null,
        container,
        game,
        events: emitter,
        listeners: attachEventListeners(game, container, listeners)
    };

    players
    .map(info => createPlayer(info.name, info.isHuman, game, hard))
    .forEach(player => {
        game.addPlayer(player);
    });
    initLeaderboardUpdate(page);
    initHumanControls(page, rules);
    initGameLifeCycle(page);

    return page;
}

export function dispose (page) {
    detachEventListeners(page.container, page.listeners);
}

// Add event listeners bound to this specific game
function attachEventListeners (game, container, listeners) {
    return listeners.map(([type, handler]) => {
        const fn = (event) => handler(event, game);
        container.addEventListener(type, fn);
        return [type, fn];
    });
}

function detachEventListeners (container, listeners) {
    listeners.forEach(([type, handler]) => {
        container.removeEventListener(type, handler);
    });
}

function defaultListeners () {
    return [
        [ 'click', delegateClickHandler ]
    ];
}

function delegateClickHandler (event, game) {
    if (/js-choose/.test(event.target.className)) {
        event.preventDefault();
        const choice = event.target.getAttribute('data-choice');
        if (choice) {
            game.events.emit('human-choice', choice);
        }
    }
}
