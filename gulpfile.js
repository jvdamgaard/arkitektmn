var gulp = require('gulp');
var templateData = require('./data/frontpage');

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

// Styles
gulp.task('styles-local', function() {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass())
        .pipe($.autoprefixer('last 2 versions', '> 1%', 'ie 8'))
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

// Scripts
gulp.task('scripts-local', function() {
    return gulp.src([
        './app/js/vendor/jquery.min.js',
        './app/js/vendor/jquery.fullPage.min.js',
        './app/js/main.js'
    ])
        .pipe($.concat('main.js'))
        .pipe(gulp.dest('dist/js'));
});

// Copy
gulp.task('copy', function() {
    return gulp.src([
        'app/**/*.*',
        '!**/*.js',
        '!**/*.scss',
        '!**/*.jpg',
        '!**/*.ejs'
    ])
        .pipe(gulp.dest('dist'));
});

// Create static html from templates
gulp.task('templates', function() {
    return gulp.src('./app/template.ejs')
        .pipe($.template(templateData))
        .pipe($.rename('index.html'))
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

// Local
gulp.task('local', ['styles-local', 'scripts-local', 'copy', 'grunt-build', 'templates']);

// Build
gulp.task('build', ['styles', 'scripts', 'copy', 'grunt-build', 'templates']);

// Clean and build
gulp.task('rebuild', ['clean'], function() {
    gulp.start('build');
});

// Clean, build and deploy
gulp.task('deploy', ['rebuild'], function() {
    gulp.start('grunt-s3');
});
