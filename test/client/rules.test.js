import { standardRules } from '../../client/js/model/rules';

describe('Rules', function() {
    describe('picks a winner among two choices', function() {
        it('understands a tie', function() {
            expect(standardRules.winner('rock', 'rock')).toEqual(jasmine.objectContaining({
                winner: -1,
                tieBreakers: [0, 1]
            }));
        });

        it('finds the winner', function() {
            expect(standardRules.winner('rock', 'paper')).toEqual(jasmine.objectContaining({
                winner: 1,
                tieBreakers: [],
                results: [
                    jasmine.objectContaining({
                        loose: ['paper covers rock']
                    }),
                    jasmine.objectContaining({
                        loose: false
                    })
                ]
            }));
        });
    });

    describe('picks a winner among multiple choices', function() {
        it('understands when players eliminate each other', function() {
            expect(standardRules.winner('rock', 'paper', 'rock', 'scissors')).toEqual(jasmine.objectContaining({
                winner: -1,
                tieBreakers: [0, 1, 2, 3]
            }));
        });
        it('suggests a tie when there are multiple winners', function() {
            expect(standardRules.winner('rock', 'paper', 'paper')).toEqual(jasmine.objectContaining({
                winner: -1,
                tieBreakers: [1, 2],
                results: jasmine.arrayContaining([jasmine.objectContaining({
                    loose: ['paper covers rock'],
                    position: 0
                })])
            }));
        });
        it('finds the winner', function() {
            expect(standardRules.winner('scissors', 'paper', 'paper')).toEqual(jasmine.objectContaining({
                winner: 0,
                tieBreakers: [],
                results: jasmine.arrayContaining([
                    jasmine.objectContaining({
                        loose: ['scissors cut paper'],
                        position: 1
                    }),
                    jasmine.objectContaining({
                        loose: ['scissors cut paper'],
                        position: 2
                    })
                ])
            }));
        });
    });
});
