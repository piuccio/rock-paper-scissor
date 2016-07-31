import { create, defaultPlayersFromString } from './ui/page.js';
import { standardRules } from './rules';

attachEventListeners();

function attachEventListeners () {
    document.body.addEventListener('click', function(event) {
        // The regexp because <IE10 don't support event.target.classList.contains('js-game')
        if (event.target.className.match(/\bjs-game\b/i)) {
            event.preventDefault();
            const players = event.target.getAttribute('data-players');
            initilizeGame(players);
        }
    });
}

function initilizeGame (players) {
    // Another silly way of supporting <IE10
    const className = document.body.className;
    if (/\bnot-in-game\b/.test(className)) {
        document.body.className = className.replace('not-in-game', 'in-game');
    }

    create(
        defaultPlayersFromString(players),
        document.querySelector('.gameContainer'),
        standardRules
    );
}
