let {src, dest, watch, serial, parrallel} = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let header = require('gulp-header');
let cleanCSS = require('gulp-clean-css');
let rename = require("gulp-rename");
let uglify = require('gulp-uglify');
let pkg = require('./package.json');

// Set the banner content
let banner = ['/*!\n',
    ' * HeathShults.com - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2020-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');


// Minify compiled CSS
function minifycss(done) {
  less()
    return src('css/heathshults.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('css'))
        .pipe(browserSync.reload({
            stream: true
        })), done()
};
exports.minifycss = minifycss

// Minify JS
function minifyjs(done) {
    return src('js/heathshults.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('js'))
        .pipe(browserSync.reload({
            stream: true
        })), done()
};

exports.minifyjs = minifyjs

// Copy vendor libraries from /node_modules into /vendor
function copy(done) {
    src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(dest('vendor/bootstrap'))

    src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(dest('vendor/jquery'))

    src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(dest('vendor/font-awesome')), done()
}
exports.copy = copy

// Run everything
exports.build = series('less', 'minify-css', 'minify-js', 'copy');

// Configure the browserSync task
function serve(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
    }), done()
}
exports.browserSync = browserSync

// Dev task with browserSync
function dev(done) {
  exports.runall = series('browserSync', 'less', 'minify-css', 'minify-js');
  runall();
  watch('less/*.less', ['less']);
  watch('css/*.css', ['minify-css']);
  watch('js/*.js', ['minify-js']);
  // Reloads the browser whenever HTML or JS files change
  watch('*.html', browserSync.reload);
  watch('js/**/*.js', browserSync.reload), done();
};

// Compiles SCSS files from /scss into /css
// NOTE: This theme uses LESS by default. To swtich to SCSS you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
function sassy(done) {
    return src('scss/heathshults.scss')
        .pipe(sass())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(dest('css'))
        .pipe(browserSync.reload({
            stream: true
        })), done()
};
exports.sass = sass
