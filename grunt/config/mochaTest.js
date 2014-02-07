/**
 * Runn test with Mocha in Node.js environment (not for integration and browser tests - only spec)
 */

module.exports = {

    // Run all spec tests
    build: {
        src: '<%= app.test %>/spec/**/*.js'
    },

    // Test on local environment + generate coverage repport
    coverage: {
        options: {
            reporter: 'html-cov',
            quiet: true,
            captureFile: '.tmp/coverage/index.html',
            require: ['<%= app.test %>/lib/coverage/blanket']
        },
        src: [
            '<%= app.test %>/spec/**/*.js',
            '!<%= app.test %>/spec/**/_*.js'
        ]
    },

    // Test on local environment + generate coverage repport
    buildCoverage: {
        options: {
            reporter: 'travis-cov',
            require: ['<%= app.test %>/lib/coverage/blanket']
        },
        src: [
            '<%= app.test %>/spec/**/*.js',
            '!<%= app.test %>/spec/**/_*.js'
        ]
    }
};
