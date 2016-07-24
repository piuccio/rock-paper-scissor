// Middleware to transpile any JS code to ES5 version
const path = require('path');
const rollupOpts = require('../rollup.base.config');
const rollup = require('rollup');

module.exports = function(basePath) {
    return function(req, res, next) {
        if (/\.js$/.test(req.path)) {
            const fullpath = path.join(__dirname, basePath, req.path);
            rollup.rollup({
                entry: fullpath,
                plugins: rollupOpts.plugins,
                treeshake: false
            })
            .then(bundle => bundle.generate({ format: 'iife' }))
            .then(result => {
                res.status(200)
                .type('application/javascript')
                .send(result.code);
            })
            .catch(next);
        } else {
            next();
        }
    };
};
