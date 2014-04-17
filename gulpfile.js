var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();
require('gulp-grunt')(gulp);

// Styles
gulp.task('styles', function() {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass())
        .pipe($.autoprefixer('last 2 versions', '> 1%', 'ie 8'))
        .pipe($.csso())
        .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src([
        './app/js/vendor/jquery.min.js',
        './app/js/vendor/jquery.fullPage.min.js',
        './app/js/main.js'
    ])
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'));
});

// Copy
gulp.task('copy', function() {
    return gulp.src([
        'app/**/*.*',
        '!app/js/**/*.*',
        '!app/styles/**/*.*',
        '!app/img/**/*.*'
    ])
        .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src([
        'dist',
        '.tmp'
    ], {
        read: false
    })
        .pipe($.clean());
});

// Build
gulp.task('build', ['styles', 'scripts', 'copy', 'grunt-build']);

// Clean and build
gulp.task('rebuild', ['clean'], function() {
    gulp.start('build');
});

// Clean, build and deploy
gulp.task('deploy', ['rebuild'], function() {
    gulp.start('grunt-s3');
});
