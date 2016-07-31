import { createGame } from '../../client/js/model/game';
import matchMockCreator from './lib/mock-match';

describe('Leaderboard', function() {
    const player1 = { name: 'p1' };
    const player2 = { name: 'p2' };

    it('tracks the score of winning match', function() {
        const game = createGame({}, matchMockCreator);
        game.addPlayer(player1);
        game.addPlayer(player2);

        const match = game.startMatch();
        expect(game.scores()).toEqual([
            { player: player1, score: 0 },
            { player: player2, score: 0 }
        ]);

        match.events.emit('end', { winner: player1 });
        expect(game.scores()).toEqual([
            { player: player1, score: 1 },
            { player: player2, score: 0 }
        ]);
    });

    it('the same match can only be played once', function() {
        const game = createGame({}, matchMockCreator);
        game.addPlayer(player1);
        game.addPlayer(player2);

        const match = game.startMatch();

        match.events.emit('end', { winner: player1 });
        expect(game.scores()).toEqual([
            { player: player1, score: 1 },
            { player: player2, score: 0 }
        ]);
        match.events.emit('end', { winner: player1 });
        match.events.emit('end', { winner: player2 });
        expect(game.scores()).toEqual([
            { player: player1, score: 1 },
            { player: player2, score: 0 }
        ]);
    });

    it('track the score of multiple matches', function() {
        const game = createGame({}, matchMockCreator);
        game.addPlayer(player1);
        game.addPlayer(player2);

        let match;
        game.events.on('matchEnd', () => {
            match = game.startMatch();
        });

        match = game.startMatch();
        match.events.emit('end', { winner: player1 });
        expect(game.scores()).toEqual([
            { player: player1, score: 1 },
            { player: player2, score: 0 }
        ]);

        // match should now be a new one
        match.events.emit('end', { winner: player1 });
        expect(game.scores()).toEqual([
            { player: player1, score: 2 },
            { player: player2, score: 0 }
        ]);

        match.events.emit('end', { winner: player2 });
        expect(game.scores()).toEqual([
            { player: player1, score: 2 },
            { player: player2, score: 1 }
        ]);
    });

    it('track the score of matches ending in a tie', function() {
        const game = createGame({}, matchMockCreator);
        game.addPlayer(player1);
        game.addPlayer(player2);

        let match;
        game.events.on('matchEnd', () => {
            match = game.startMatch();
        });

        match = game.startMatch();
        match.events.emit('end', { winner: player1 });
        expect(game.scores()).toEqual([
            { player: player1, score: 1 },
            { player: player2, score: 0 }
        ]);

        // this is a tie
        match.events.emit('end', { winner: null });
        expect(game.scores()).toEqual([
            { player: player1, score: 1 },
            { player: player2, score: 0 }
        ]);
    });
});
