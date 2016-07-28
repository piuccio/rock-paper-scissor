import { create } from './game.js';

attachEventListeners();

function attachEventListeners () {
    document.body.addEventListener('click', function(event) {
        if (event.target.className.match(/\bjs-game\b/i)) {
            event.preventDefault();
            // The regexp because <IE10 don't support event.target.classList.contains('js-game')
            const game = event.target.getAttribute('data-game');
            initilizeGame(game);
        }
    });
}

function initilizeGame (game) {
    // Another silly way of supporting <IE10
    const className = document.body.className;
    if (/\bnot-in-game\b/.test(className)) {
        document.body.className = className.replace('not-in-game', 'in-game');
    }

    create(game, document.querySelector('.gameContainer'));
}
