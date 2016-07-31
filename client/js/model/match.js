import EventEmitter from '../lib/event-emitter';

export function createMatch (players, rules) {
    const emitter = Object.create(EventEmitter);

    Promise.all(
        players.map(player => chooseSign(player, rules))
    )
    .then(results => pickWinner(rules, players, results))
    .then(matchResult => emitter.emit('end', matchResult));

    return {
        events: emitter,
        hasHumanPlayers: players.filter(player => player.isHuman).length > 0
    };
}

function chooseSign (player, rules) {
    return player.choose(rules.options());
}

function pickWinner (rules, players, choices) {
    const {winner, tieBreakers, results} = rules.winner(...choices);
    if (winner === -1) {
        return {
            winner: null,
            tie: tieBreakers.map(position => players[position]),
            summary: results.map(result => {
                return {
                    player: players[result.position],
                    loose: result.loose,
                    choice: choices[result.position]
                };
            })
        };
    } else {
        return {
            winner: players[winner],
            summary: results.map(result => {
                return {
                    player: players[result.position],
                    loose: result.loose,
                    choice: choices[result.position]
                };
            })
        };
    }
}
