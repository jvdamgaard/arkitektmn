/**
 * Analyse javascript and css to see which Modernizr tests is needed. Create the smallest possible custom build on this analysis
 */

module.exports = {
    dist: {
        devFile: '.tmp/bower_components/modernizr/modernizr.js',
        outputFile: '<%= app.dist %>/scripts/modernizr.js',
        extra: {
            'shiv': true,
            'printshiv': false,
            'load': false,
            'mq': true,
            'cssclasses': true
        },
        src: [
            '<%= app.dist %>/scripts/app.js',
            '<%= app.dist %>/styles/main.css'
        ],
        uglify: false
    }

};
