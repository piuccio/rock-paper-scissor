import { createGame } from './game';
import { createPlayer } from './player';

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

export function create (players, container, listeners = defaultListeners()) {
    const game = createGame();
    const page = {
        container,
        game,
        listeners: attachEventListeners(game, container, listeners)
    };

    players.map(createPlayer).forEach(player => {
        game.addPlayer(player);
    });

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
    console.log(event, game);
}
