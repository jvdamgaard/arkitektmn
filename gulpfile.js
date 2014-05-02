var gulp = require('gulp');
var templateDatas = [{
    data: require('./data/frontpage'),
    dist: 'index.html'
}, {
    data: require('./data/projekter'),
    dist: 'projekter/index.html'
}, {
    data: require('./data/projekter/ejendomme'),
    dist: 'projekter/ejendomme/index.html'
}, {
    data: require('./data/projekter/erhverv'),
    dist: 'projekter/erhverv/index.html'
}, {
    data: require('./data/projekter/inventar'),
    dist: 'projekter/inventar/index.html'
}, {
    data: require('./data/projekter/laeger'),
    dist: 'projekter/laeger/index.html'
}, {
    data: require('./data/projekter/privat'),
    dist: 'projekter/privat/index.html'
}, {
    data: require('./data/proces'),
    dist: 'proces/index.html'
}, {
    data: require('./data/profil'),
    dist: 'profil/index.html'
}, {
    data: require('./data/om'),
    dist: 'om/index.html'
}];

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
    templateDatas.forEach(function(templateData) {
        gulp.src('./app/template.ejs')
            .pipe($.template(templateData.data))
            .pipe($.rename(templateData.dist))
            .pipe(gulp.dest('dist'));
    });
});

// Clean
gulp.task('clean', function() {
    return gulp.src([
        'dist'
    ], {
        read: false
    })
        .pipe($.clean());
});

// Local
gulp.task('assets', ['styles-local', 'scripts-local', 'copy', 'templates']);
gulp.task('images', ['grunt-build']);

// Build
gulp.task('build', ['styles', 'scripts', 'copy', 'grunt-build', 'templates']);

// Clean and build
gulp.task('rebuild', ['clean'], function() {
    gulp.start('build');
});

// Clean, build and deploy
gulp.task('deploy', ['grunt-s3']);
