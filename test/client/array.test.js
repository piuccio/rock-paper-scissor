import { intersect } from '../../client/js/array';

describe('Array', function() {
    it('intersect', function() {
        expect(intersect(['a', 'b', 'c'], ['a'])).toEqual(['a'], 'a,b,c intersect a');
        expect(intersect(['a', 'b', 'c'], ['e', 'd'])).toEqual([], 'a,b,c intersect e,d');
        expect(intersect(['a', 'b', 'c', 'a', 'b'], ['d', 'b', 'a'])).toEqual(['b', 'a'], 'a,b,c,a,b intersect d,b,a');
    });
});
