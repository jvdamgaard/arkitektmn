/**
 * Minify css
 */

module.exports = {
    options: {
        report: 'gzip'
    },
    build: {
        files: {
            '<%= app.dist %>/styles/main.css': ['<%= app.dist %>/styles/main.css']
        }
    }
};
