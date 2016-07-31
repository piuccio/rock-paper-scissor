export const messageDuration = {
    short: 1000,
    long: 2000
};

export function initGameLifeCycle (page) {
    const container = page.container.querySelector('.gameUpdates .action');
    if (!container) {
        return;
    }
    startNextMatch(page, container);
}

function startNextMatch (page, container, result) {
    container.innerText = 'Play!';
    if (result && result.tie) {
        page.activeMatch = page.game.startMatch(result.tie);
    } else {
        page.activeMatch = page.game.startMatch();
    }

    page.activeMatch.events.once('end', (result) => {
        page.activeMatch = null;
        showResults(page, container, result)
        .then(() => startNextMatch(page, container, result));
    });
}

function showResults (page, container, result) {
    return animateDecisionMaking(container)
    .then(() => {
        const choices = result.summary.map(choice => {
            return choice.player.name + ' plays ' + choice.choice;
        }).join('\n');
        return showText(container, choices, messageDuration.long);
    })
    .then(() => {
        page.events.emit('updateScores');
        if (result.winner) {
            return showText(container, result.winner.name + ' wins', messageDuration.short);
        } else {
            return showText(container, 'Tie', messageDuration.short);
        }
    });
}

function animateDecisionMaking (container) {
    return ['3', '2', '1'].reduce((promise, text) => {
        return promise.then(() => showText(container, text, messageDuration.short));
    }, Promise.resolve());
}

function showText (container, message, duration) {
    return new Promise(resolve => {
        container.innerText = message;
        setTimeout(resolve, duration);
    });
}
