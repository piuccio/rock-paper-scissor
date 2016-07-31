import { createPlayer } from '../../client/js/model/player';
import { create } from '../../client/js/ui/page';
import EventEmitter from '../../client/js/lib/event-emitter';
import { click } from './lib/dom';

describe('Human Player', function() {
    it('picks a choice from the event emitter', function(done) {
        const mockGame = {
            events: Object.create(EventEmitter)
        };
        const human = createPlayer('human', true, mockGame);

        human.choose(['a', 'b', 'c'])
        .then(choice => {
            expect(choice).toBe('c');
        })
        .then(done)
        .catch(done.fail);

        mockGame.events.emit('human-choice', 'c');
    });

    describe('UI', function() {
        beforeEach(function() {
            const testDiv = document.createElement('div');
            testDiv.className = 'test-div--human-player';
            testDiv.innerHTML = `
                <div class="humanControls">
                    <ul class="controlsList">
                        <li class="controlsList_control">
                            <a href="#" class="controlsList_control_name js-choose"></a>
                        </li>
                    </ul>
                </div>
            `;
            document.body.appendChild(testDiv);
        });
        afterEach(function() {
            document.querySelector('.test-div--human-player').remove();
        });

        it('picks a choice from on click', function(done) {
            let choice;
            const mockRules = {
                options () {
                    return ['a', 'b', 'c'];
                },
                winner (computerChoice, humanChoice) {
                    choice = humanChoice;
                    return { winner: 1, results: [] };
                }
            };
            const page = create(
                [{ name: 'computer', isHuman: false}],
                document.querySelector('.test-div--human-player'),
                mockRules
            );
            const human = createPlayer('human', true, page.game);

            page.game.addPlayer(human);
            page.activeMatch = page.game.startMatch();
            page.events.emit('startMatch', page.activeMatch);

            page.game.events.on('matchEnd', () => {
                expect(choice).toBe('a');
                done();
            });

            click(document.querySelector('[data-choice=a]'));
        });
    });
});
