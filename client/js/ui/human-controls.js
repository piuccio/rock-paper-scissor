export function initHumanControls (page, rules) {
    const DOMlist = page.container.querySelector('.humanControls .controlsList');
    if (!DOMlist) {
        return;
    }
    const template = DOMlist.querySelector('.controlsList_control');
    if (!template) {
        return;
    }

    DOMlist.innerHTML = '';
    rules.options().forEach(choice => {
        const node = template.cloneNode(true);
        const link = node.querySelector('.controlsList_control_name');
        link.setAttribute('data-choice', choice);
        link.innerText = choice;
        DOMlist.appendChild(node);
    });
}
