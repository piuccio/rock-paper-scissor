export function random (options, math = Math) {
    const pick = math.floor(math.random() * options.length);
    return Promise.resolve(options[pick]);
}

export {
    random as hard
};
