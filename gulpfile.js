var gulp = require('gulp');
// var open = require('open');

// Load plugins
var $ = require('gulp-load-plugins')();

// Compress files
gulp.task('compress', function() {
    gulp.src('./dist/**/*')
        .pipe($.gzip())
    // .pipe(rename(function(path) {
    //     path.extname = '';
    // }))
    .pipe(gulp.dest('./compressed'));
});

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
        '!app/styles/**/*.*'
    ])
        .pipe(gulp.dest('dist'));
});

// Clean
gulp.task('clean', function() {
    return gulp.src('dist', {
        read: false
    })
        .pipe($.clean());
});

// Build
gulp.task('build', ['styles', 'scripts', 'copy']);

// Default
gulp.task('default', ['clean'], function() {
    gulp.start('build');
});
