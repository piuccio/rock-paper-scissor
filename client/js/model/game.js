import { createMatch } from './match';
import EventEmitter from '../lib/event-emitter';

export function createGame (rules, overrideCreateMatch) {
    const players = [];
    // In ES6 world I'd use a new Map to link players to scores
    const leaderboard = [];
    const emitter = Object.create(EventEmitter);

    function findPlayerInLeaderboard (board, player) {
        return board.filter((data) => data.player === player)[0];
    }

    function onMatchEnd ({
        winner
    }) {
        if (winner) {
            const winnerData = findPlayerInLeaderboard(leaderboard, winner);
            if (winnerData) {
                winnerData.score += 1;
            }
        }
        emitter.emit('matchEnd');
    }

    return {
        events: emitter,

        // Players can join any time
        addPlayer (player) {
            if (players.indexOf(player) === -1) {
                players.push(player);
                leaderboard.push({
                    player,
                    score: 0
                });
            }
        },

        // once a match starts, the players are fixed
        startMatch () {
            const match = (overrideCreateMatch || createMatch)(players, rules);
            match.events.once('end', onMatchEnd);
            return match;
        },

        scores () {
            return leaderboard;
        }
    };
}
