/**
 * Minify jpg and png images
 */

module.exports = {
    all: {
        options: {
            pngquant: true
        },
        files: [{
            expand: true,
            cwd: '<%= app.source %>/images',
            src: '**/*.{png,jpg,jpeg,gif}',
            dest: '<%= app.dist %>/images'
        }]
    }
};
