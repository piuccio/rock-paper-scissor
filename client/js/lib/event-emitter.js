export default {
    on (event, cb) {
        if (!this._listeners) {
            this._listeners = {};
        }
        if (!this._listeners[event]) {
            this._listeners[event] = [];
        }
        this._listeners[event].push(cb);
    },
    once (event, cb) {
        const onceListener = (...args) => {
            this.off(event, onceListener);
            cb(...args);
        };
        this.on(event, onceListener);
    },
    off (event, cb) {
        const listeners = (this._listeners || {})[event] || [];
        const index = listeners.indexOf(cb);
        if (index !== -1) {
            listeners.splice(index, 1);
        }
    },
    emit (event, result) {
        const listeners = (this._listeners || {})[event] || [];
        // Because listeners might change while firing events (.once), iterate on a copy
        listeners.slice().forEach(cb => cb(result));
    }
};
