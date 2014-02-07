/**
 * Remove all console.xxx statements from javascript files
 */

module.exports = {
	build: {
		src: '<%= app.dist %>/scripts/app.js',
		dest: '<%= app.dist %>/scripts/app.js'
	}
};