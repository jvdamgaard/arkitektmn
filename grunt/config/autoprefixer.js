/**
 * Analyse css files and enhance css3 properties with prefixes based on caniuse.com database
 */

module.exports = {

	// browsers to support can be set in this option. We are using the default values for autoprefixer
	// options: {
	// 	browsers: ['last 2 version', 'ie 8', 'ie 7']
	// },
	all: {
		src: '<%= app.dist %>/styles/main.css',
		dest: '<%= app.dist %>/styles/main.css'
	}
};