/**
 * Watch for changes in files and run grunt tasks whenever a change happens
 */

module.exports = {

    // Spec test changes recompiles the test suite
    test: {
        files: [
            '<%= app.test %>/spec/**/*.js',
            '<%= app.source %>/scripts/**/*.js'
        ],
        tasks: [
            'test-build'
        ]
    },

    // Changes in the javascript source files recompiles the main app.js file
    js: {
        files: [
            '<%= app.source %>/scripts/**/*.js'
        ],
        tasks: [
            'js-build'
        ]
    },

    // Changes to scss files recompiles the main.css file
    sass: {
        files: [
            '<%= app.source %>/styles/**/*.scss'
        ],
        tasks: [
            'style-build'
        ]
    },
    server: {
        files: [
            '<%= app.dist %>/**/*.*',
            'views/**/*.hbs'
        ],
        options: {
            livereload: true,
            spawn: false
        }
    }
};
