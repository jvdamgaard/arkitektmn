/**
 * Minify javascript
 */

module.exports = {
    build: {
        files: {
            '<%= app.dist %>/scripts/app.js': ['<%= app.dist %>/scripts/app.js'],
            '<%= app.dist %>/scripts/head.js': [
                '<%= app.dist %>/scripts/modernizr.js'
            ]
        }
    },
    local: {
        options: {
            sourceMap: '<%= app.dist %>/scripts/head.js.map',
            sourceMapRoot: '/',
            sourceMapPrefix: 1,
            sourceMappingURL: '/scripts/head.js.map'
        },
        files: {
            '<%= app.dist %>/scripts/head.js': [
                '<%= app.dist %>/scripts/modernizr.js'
            ]
        }
    }
};
