import EventEmitter from '../lib/event-emitter';

export function createMatch (players, rules) {
    const emitter = Object.create(EventEmitter);

    Promise.all(
        players.map(player => chooseSign(player, rules))
    )
    .then(results => pickWinner(rules, players, results))
    .then(matchResult => emitter.emit('end', matchResult));

    return {
        events: emitter
    };
}

function chooseSign (player, rules) {
    return player.choose(rules.options());
}

function pickWinner (rules, players, results) {
    const {winner, tieBreakers} = rules.winner(...results);
    if (winner === -1) {
        return {
            winner: null,
            tie: tieBreakers.map(position => players[position])
        };
    } else {
        return {
            winner: players[winner]
        };
    }
}
