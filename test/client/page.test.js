import { create, dispose } from '../../client/js/ui/page';
import { standardRules } from '../../client/js/model/rules';
import { click } from './lib/dom';

describe('Page', function() {
    beforeEach(function() {
        const testDiv = document.createElement('div');
        testDiv.className = 'test-div--page';
        testDiv.innerHTML = '<div class="click-target"></div>';
        document.body.appendChild(testDiv);
    });
    afterEach(function() {
        document.querySelector('.test-div--page').remove();
    });

    it('loads a game routing events', function() {
        const spy = jasmine.createSpy('click-handler');
        const players = [{ name: 'human' }];
        const listeners = [
            [ 'click',  spy ]
        ];
        const clickTarget = document.querySelector('.click-target');

        const page = create(players, document.querySelector('.test-div--page'), standardRules, listeners);
        click(clickTarget);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith(
            jasmine.objectContaining({ target: clickTarget }),
            jasmine.objectContaining({ addPlayer: jasmine.any(Function) })
        );

        spy.calls.reset();
        dispose(page);
        click(clickTarget);
        expect(spy).not.toHaveBeenCalled();
    });
});
