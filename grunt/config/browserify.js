/**
 * Using browserify to make modular javascript using the CommonJS syntax also used i Node.js
 */

module.exports = {
    options: {

        // Register global modules
        alias: [
            './package.json:app'
        ],
    },

    // Compile spec tests
    specTests: {
        options: {
            debug: true,
        },
        files: {
            '.tmp/tests/specs.js': [
                '<%= app.test %>/spec/**/*.js'
            ]
        }
    },

    // Compile source file
    sources: {
        options: {
            debug: true
        },
        files: {
            '<%= app.dist %>/scripts/app.js': [
                '<%= app.source %>/scripts/app.js'
            ]
        }
    },

    // Compile all above in one task
    all: {
        options: {
            debug: true
        },
        files: {
            '<%= app.dist %>/scripts/app.js': [
                '<%= app.source %>/scripts/app.js'
            ],
            '.tmp/tests/specs.js': [
                '<%= app.test %>/spec/**/*.js'
            ]
        }
    }
};
