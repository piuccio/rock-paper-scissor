import EventEmitter from '../../../client/js/event-emitter';

export default function(players) {
    return {
        players,
        events: Object.create(EventEmitter)
    };
}
