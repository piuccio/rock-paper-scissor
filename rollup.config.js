const base = require('./rollup.base.config');

const config = Object.assign({
    format: 'iife',
    dest: 'tmp/game.js'
}, base);

export default config;
