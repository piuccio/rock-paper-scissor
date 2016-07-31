import { createGame } from '../model/game';
import { createPlayer } from '../model/player';

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
    const page = {
        container,
        game,
        listeners: attachEventListeners(game, container, listeners)
    };

    players
    .map(info => createPlayer(info.name, info.isHuman, game))
    .forEach(player => {
        game.addPlayer(player);
    });
    initLeaderboardUpdate(page);
    initHumanControls(page, rules);

    game.startMatch();

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

function initLeaderboardUpdate (page) {
    const DOMlist = page.container.querySelector('.leaderboard .playersList');
    if (!DOMlist) {
        return;
    }
    const template = DOMlist.querySelector('.playersList_player');
    if (!template) {
        return;
    }

    DOMlist.innerHTML = '';
    page.game.scores().forEach(data => {
        const node = template.cloneNode(true);
        node.setAttribute('data-player', data.player.name);
        node.querySelector('.playersList_player_name').innerText = data.player.name;
        node.querySelector('.playersList_player_score').innerText = data.score;
        DOMlist.appendChild(node);
    });

    page.game.events.on('matchEnd', () => {
        page.game.scores().forEach(data => {
            const node = DOMlist.querySelector('[data-player="' + data.player.name + '"]');
            node.querySelector('.playersList_player_score').innerText = data.score;
        });
    });
}

function initHumanControls (page, rules) {
    const DOMlist = page.container.querySelector('.humanControls .controlsList');
    if (!DOMlist) {
        return;
    }
    const template = DOMlist.querySelector('.controlsList_control');
    if (!template) {
        return;
    }

    DOMlist.innerHTML = '';
    rules.options().forEach(choice => {
        const node = template.cloneNode(true);
        const link = node.querySelector('.controlsList_control_name');
        link.setAttribute('data-choice', choice);
        link.innerText = choice;
        DOMlist.appendChild(node);
    });
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
