/**
 * Replace long path to js files i coverage report
 */

var path = require('path');

var modulesDir = path
    .resolve(__dirname, '../../node_modules')
    .replace(/\\/g, '/') + '/';

module.exports = {

    // Test on local environment + generate coverage repport
    coverage: {
        files: {
            '.tmp/coverage/index.html': '.tmp/coverage/index.html'
        },
        options: {
            replacements: [{
                pattern: new RegExp(modulesDir, 'g'),
                replacement: ''
            }, {
                pattern: /\.js/g,
                replacement: ''
            }]
        }
    }
};
