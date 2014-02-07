/**
 * Compile scss files
 */

module.exports = {
    options: {
        includePaths: ['.tmp/bower_components']
    },
    local: {
        options: {
            sourceComments: 'map'
        },
        files: {
            '<%= app.dist %>/styles/main.css': '<%= app.source %>/styles/main.scss'
        }
    },
    build: {
        files: {
            '<%= app.dist %>/styles/main.css': '<%= app.source %>/styles/main.scss'
        }
    }
};
