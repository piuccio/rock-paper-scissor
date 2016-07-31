import EventEmitter from '../../client/js/lib/event-emitter';

describe('Event Emitter', function() {
    it('registers to events', function() {
        const spyOne = jasmine.createSpy('one');
        const spyTwo = jasmine.createSpy('two');

        const emitter = Object.create(EventEmitter);
        emitter.on('one', spyOne);
        emitter.on('two', spyTwo);

        emitter.emit('one', 1);
        expect(spyOne).toHaveBeenCalledWith(1);
        expect(spyTwo).not.toHaveBeenCalled();

        spyOne.calls.reset();
        emitter.emit('nothing', 0);
        expect(spyOne).not.toHaveBeenCalled();
        expect(spyTwo).not.toHaveBeenCalled();

        // again the same event
        emitter.emit('one', 2);
        expect(spyOne).toHaveBeenCalledWith(2);
        expect(spyTwo).not.toHaveBeenCalled();
    });

    it('stops listening to events', function() {
        const spy = jasmine.createSpy('spy');

        const emitter = Object.create(EventEmitter);
        emitter.on('one', spy);

        emitter.emit('one');
        expect(spy).toHaveBeenCalled();

        spy.calls.reset();
        emitter.off('one', spy);
        emitter.emit('one');
        expect(spy).not.toHaveBeenCalled();
    });

    it('handles once listeners', function() {
        const spyOne = jasmine.createSpy('one');
        const spyTwo = jasmine.createSpy('two');

        const emitter = Object.create(EventEmitter);
        emitter.once('same', spyOne);
        emitter.on('same', spyTwo);

        emitter.emit('same');
        expect(spyOne).toHaveBeenCalled();
        expect(spyTwo).toHaveBeenCalled();

        spyOne.calls.reset();
        spyTwo.calls.reset();
        emitter.emit('same');

        expect(spyOne).not.toHaveBeenCalled();
        expect(spyTwo).toHaveBeenCalled();
    });
});
