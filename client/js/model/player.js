export function createPlayer (name, isHuman, game) {
    function humanChoose () {
        return new Promise(resolve => {
            game.events.once('human-choice', resolve);
        });
    }

    function computerChoose (options) {
        return Promise.resolve('paper');
    }

    return {
        name,
        isHuman,
        choose: isHuman ? humanChoose : computerChoose
    };
}
