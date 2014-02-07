/**
 * Convert markdown to html
 */

module.exports = {
    docs: {
        options: {
            template: '<%= app.docs %>/design-process/template.jst',
            markdownOptions: {
                gfm: true
            }
        },
        files: [{
            expand: true,
            src: '<%= app.docs %>/design-process/**/*.md',
            dest: '.tmp/',
            ext: '.html'
        }]
    }
};
