import { createPlayer } from '../../client/js/model/player';
import { hard } from '../../client/js/model/computer-levels';

describe('Computer Player', function() {
    it('picks a random options', function(done) {
        const computer = createPlayer('computer', false, {}, hard);
        const math = {
            floor: Math.floor,
            random: () => 0.5
        };

        computer.choose(['a', 'b', 'c'], math)
        .then(choice => {
            expect(choice).toBe('b');
        })
        .then(done)
        .catch(done.fail);
    });
});
