/**
 * Copy files
 */

module.exports = {

    // Put files not handled in other tasks here
    all: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= app.source %>',
            dest: '<%= app.dist %>',
            src: [
                '*.{ico,png,txt}',
                'images/{,*/}*.{webp,gif}',
                'fonts/{,*/}*.*',
                'index.html'
            ]
        }]
    },
    images: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= app.source %>/images',
            dest: '<%= app.dist %>/images',
            src: [
                '**/*.{jpg,jpeg,png,gif}'
            ]
        }]
    },
    styledocco: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= app.docs %>/lib/styledocco-bootstrap-theme',
            dest: 'node_modules/grunt-styleguide/node_modules/styledocco/share',
            src: ['*']
        }]
    },
    jsToNode: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= app.source %>/scripts',
            dest: 'node_modules/app',
            src: ['**/*.js']
        }]
    },
    travisCov: {
        files: [{
            expand: true,
            dot: true,
            cwd: '<%= app.test %>/lib/travis-cov',
            dest: 'node_modules/travis-cov',
            src: ['*']
        }]
    },
};
