import { createMatch } from '../../client/js/match';
import { standardRules } from '../../client/js/rules';

describe('Match', function() {
    function createPlayer (option) {
        return {
            name: option,
            choose () {
                return Promise.resolve(option);
            }
        };
    }
    let match, players;

    it('is a tie when players play the same thing', function(done) {
        players = [createPlayer('paper'), createPlayer('paper')];
        match = createMatch(players, standardRules);
        match.events.once('end', result => {
            expect(result.winner).toBeNull();
            expect(result.tie).toEqual(players);
            done();
        });
    });

    it('rock crushes scissor', function(done) {
        players = [createPlayer('rock'), createPlayer('scissors')];
        match = createMatch(players, standardRules);
        match.events.once('end', result => {
            expect(result.winner).toBe(players[0]);
            done();
        });
    });

    it('paper covers rock', function(done) {
        players = [createPlayer('rock'), createPlayer('paper')];
        match = createMatch(players, standardRules);
        match.events.once('end', result => {
            expect(result.winner).toBe(players[1]);
            done();
        });
    });

    it('scissors cut paper', function(done) {
        players = [createPlayer('scissors'), createPlayer('paper')];
        match = createMatch(players, standardRules);
        match.events.once('end', result => {
            expect(result.winner).toBe(players[0]);
            done();
        });
    });
});
