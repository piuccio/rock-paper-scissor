export function initLeaderboardUpdate (page) {
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

    page.events.on('updateScores', () => {
        page.game.scores().forEach(data => {
            const node = DOMlist.querySelector('[data-player="' + data.player.name + '"]');
            node.querySelector('.playersList_player_score').innerText = data.score;
        });
    });
}
