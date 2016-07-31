import EventEmitter from '../../../client/js/lib/event-emitter';

export default function(players) {
    return {
        players,
        events: Object.create(EventEmitter)
    };
}
