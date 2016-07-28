export function click (element) {
    fire(element, 'click');
}

function fire (element, type) {
    var evt = document.createEvent('Events');
    evt.initEvent(type, true, false);
    element.dispatchEvent(evt);
}
