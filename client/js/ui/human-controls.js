export function initHumanControls (page, rules) {
    const controls = page.container.querySelector('.humanControls');
    if (!controls) {
        return;
    }
    const DOMlist = controls.querySelector('.humanControls .controlsList');
    const template = DOMlist.querySelector('.controlsList_control');

    DOMlist.innerHTML = '';
    rules.options().forEach(choice => {
        const node = template.cloneNode(true);
        const link = node.querySelector('.controlsList_control_name');
        link.setAttribute('data-choice', choice);
        link.innerText = choice;
        DOMlist.appendChild(node);
    });

    page.events.on('startMatch', match => {
        if (match.hasHumanPlayers) {
            controls.style.display = 'block';
        } else {
            controls.style.display = 'none';
        }
    });
}
