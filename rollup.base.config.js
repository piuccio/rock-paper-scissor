const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
    entry: 'client/js/index.js',
    plugins: [
        babel({
            exclude: ['node_modules/**']
        }),
        nodeResolve({
            jsnext: true,
            main: true,
            preferBuiltins: true
        }),
        commonjs()
    ]
};
