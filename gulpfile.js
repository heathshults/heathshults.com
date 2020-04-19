let {src, dest, watch, series, parrallel} = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let header = require('gulp-header');
let cleanCSS = require('gulp-clean-css');
let rename = require("gulp-rename");
let uglify = require('gulp-uglify');
let pkg = require('./package.json');
let connect = require('gulp-connect-php');
let open = require('open')
let autoprefixer = require('gulp-autoprefixer')
const postcss = require('gulp-postcss');
const postcssCustomProperties = require('postcss-custom-properties');
let debug = require('gulp-debug')

// Set the banner content
let banner = ['/*!\n',
    ' * HeathShults.com - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2020-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

// Compiles sassy files from /sassy into /css
// NOTE: This theme uses sassy by default. To swtich to sassy you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
function sassy(cb) {
    return src(['src/scss/heathshults.scss', 'src/scss/theme-dark-mode.scss'], {sourcemaps: true})
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(dest('www/css'), {sourcemap: '.', overwrite: true})
            .pipe(cleanCSS({ compatibility: 'ie11' }, (details) => {
              console.log(`${details.name}: ${details.stats.originalSize}`);
              console.log(`${details.name}: ${details.stats.minifiedSize}`);
            }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('www/css'), {sourcemap: '.', overwrite: true})
        .pipe(browserSync.reload({
            stream: true
        }));
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
};
exports.sassy = sassy

// Minify compiled CSS
function minify_css(cb) {
  sassy()
    return src('src/css/heathshults.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('www/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
};
exports.minify_css = minify_css

// create css variable fallback properties 
function css_variable_fallbacks() {
  src('./www/css/*.css').pipe(
  postcss([
    postcssCustomProperties(/* pluginOptions */)
  ])
).pipe(
  dest('.')
);
}
exports.css_variable_fallbacks = css_variable_fallbacks

// Minify JS
function minify_js(cb) {
    return src('src/js/heathshults.js')
        // .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(dest('www/js'), {overwrite: true})
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('www/js'), {overwrite: true})
        .pipe(browserSync.reload({
            stream: true
        }))
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
};

exports.minify_js = minify_js

// Copy vendor libraries from /node_modules into /vendor
function copy(cb) {
    src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
        .pipe(dest('src/vendor/bootstrap'))

    src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
        .pipe(dest('src/vendor/jquery'))

    src([
            'node_modules/font-awesome/**',
            '!node_modules/font-awesome/**/*.map',
            '!node_modules/font-awesome/.npmignore',
            '!node_modules/font-awesome/*.txt',
            '!node_modules/font-awesome/*.md',
            '!node_modules/font-awesome/*.json'
        ])
        .pipe(dest('src/vendor/font-awesome'))
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
}
exports.copy = copy

function copy_html(cb) {
    src('src/**/*.html')
    .pipe(dest('www'), {overwrite: true})
    .pipe(debug({title: 'copied'})), cb()
    // if (typeof cb === 'function') {
    //     cb(null, file);
    //     called = true;
    //   }
}
exports.copy_html = copy_html

function copy_js(cb) {
    src('src/js/**/*.{js,json}')
    .pipe(dest('www/js'))
    if (typeof cb === 'function') {
      cb(null, file);
      called = true;
    }
}
exports.copy_js = copy_js

function copy_assets(cb) {
    src('src/**/*.{jpg,png,gif,svg,mp4}')
    .pipe(dest('www'))
    
    if (typeof cb === 'function') {
      cb(null, file);
      called = true;
    }
    
}
exports.copy_assets = copy_assets

// Run everything
exports.build = series(sassy, minify_css, minify_js, copy);

// Configure the browserSync task
// function serve(cb) {
//     browserSync.init({
//         server: {
//             baseDir: './www'
//         },
//     })
    // if (typeof cb === 'function') {
    //     cb(null, file);
    //     called = true;
    //   }
// }
// exports.browserSync = browserSync

function connect_sync(cb) {
    // connect.server({
    //   hostname: 'localhodt',
    //   port: 8000,
    //   base: 'www'
    // }, function (){
    //   browserSync({
    //     proxy: 'http://localhost:8000'
    //   });
    // });
   
    // watch('**/*.php').on('change', function () {
      
    //   browserSync.reload();
    // })
    (async () => { await open("http://dev.heathshults.com") })
    let file = ''
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
  };
  exports.connect_sync = connect_sync
  
  // close the server
  function close_server(cb) {
    connect.closeServer()
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
};
exports.close_server = close_server

// Dev task with browserSync
function watchers(cb) {
  
  watch('src/scss/*.scss', {readDelay: 500, verbose: true },sassy);
  // watch('src/css/*.css', {readDelay: 500, verbose: true }, minify_css);
  watch('src/js/*.js', {readDelay: 500, verbose: true }, minify_js);
  // Reloads the browser whenever HTML or JS files change
  watch('src/*.html', copy_html);
  watch('src/**/*.{jpg,png,gif,svg,mp4}', {readDelay: 500, verbose: true }, copy_assets, browserSync.reload)
  // let file = ''  
  // if (typeof cb === 'function') {
  //       cb(null, file);
  //       called = true;
  //     };
};
exports.watchers = watchers


exports.dev = series(sassy, minify_css, minify_js, watchers, connect_sync);

