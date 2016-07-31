export function createPlayer (name, isHuman, game, computerLevel) {
    function humanChoose () {
        return new Promise(resolve => {
            game.events.once('human-choice', resolve);
        });
    }

    return {
        name,
        isHuman,
        choose: isHuman ? humanChoose : computerLevel
    };
}
