let path = require('path');

// let fs = require('fs-extra')
import {src, dest, watch, series, parallel} from 'gulp';

import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import header from 'gulp-header';
import cleanCSS from 'gulp-clean-css';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';
import * as pkg from './package.json';
import connect from 'gulp-connect-php';
import open from 'open';
import autoprefixer from 'gulp-autoprefixer';
import postcss from 'gulp-postcss';
import postcssCustomProperties from 'postcss-custom-properties';
import debug from 'gulp-debug';
import changed from 'gulp-changed';

let p = {
  src: path.resolve('./', 'src'),
  src_js: path.resolve(src, 'js'),
  src_scss: path.resolve(src, 'scss'),
  src_html: src,
  src_img: path.resolve(src, 'img'),
  www: path.resolve('./', 'www'),
  www_js: path.resolve(www, 'js'),
  www_css: path.resolve(www, 'css'),
  www_html: www,
  www_img: path.resolve(www, 'img')  
}

let assets = '{jpg,png,gif,svg,mp4}'



// Compiles sassy files from /sassy into /css
// NOTE: This theme uses sassy by default. To swtich to sassy you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
function sassy(cb) {
    return src(['src/scss/heathshults.scss', 'src/scss/theme-dark-mode.scss'], {sourcemaps: true})
    .pipe(changed(p.www_css))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(header(banner, { pkg }))
        .pipe(dest(p.www_css), {sourcemap: '.', overwrite: true})
            .pipe(cleanCSS({ compatibility: 'ie11' }, ({name, stats}) => {
              console.log(`${name}: ${stats.originalSize}`);
              console.log(`${name}: ${stats.minifiedSize}`);
            }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(p.www_css), {sourcemap: '.', overwrite: true})
        .pipe(browserSync.reload({
            stream: true
        })),
    ()=>{if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }};
}
export {sassy};

// Minify compiled CSS
function minify_css(cb) {
  sassy()
    return src(`${p.www_css}/heathshults.css`)
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(p.www_css))
        .pipe(browserSync.reload({
            stream: true
        }))
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
}
export {minify_css};

// create css variable fallback properties 
function css_variable_fallbacks() {
  src(`${p.www_css}/*.css`).pipe(
  postcss([
    postcssCustomProperties(/* pluginOptions */)
  ])
).pipe(
  dest('.')
);
}
export {css_variable_fallbacks};

// Minify JS
function minify_js(cb) {
    return src(`${src_js}/heathshults.js`)
    .pipe(changed(p.www_js))
        // .pipe(uglify())
        .pipe(header(banner, { pkg }))
        .pipe(dest(p.www_js), {overwrite: true})
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(p.www_js), {overwrite: true})
        .pipe(browserSync.reload({
            stream: true
        })),
    ()=>{if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }};
}
export {minify_js};

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
        .pipe(dest(`${src}/vendor/font-awesome`))
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
}
export {copy};

function copy_html(cb) {
    src(`${p.src_html}/**/*.html`)
    .pipe(changed(p.www_html))
    .pipe(dest(p.www_html), {overwrite: true})
    .pipe(debug({title: 'copied'})), cb();
    // if (typeof cb === 'function') {
    //     cb(null, file);
    //     called = true;
    //   }
}
export {copy_html};

function copy_js(cb) {
    src('src/js/**/*.{js,json}')
    .pipe(changed(DESTINATION))
    .pipe(dest(p.www_js))
    if (typeof cb === 'function') {
      cb(null, file);
      called = true;
    }
}
export {copy_js};

function copy_assets(cb) {
  src(`${p.src}/**/*.${assets}`)
  .pipe(dest(p.www)),
  ()=>{
  let file = ''  
  if (typeof cb === 'function') {
      cb(null, file);
      called = true;
    }
  }
}
export {copy_assets};

// Run everything
export const build = series(sassy, minify_css, minify_js, copy);

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
    connect.server({
      hostname: 'localhodt',
      port: 8000,
      base: 'www'
    }, function (){
      browserSync({
        proxy: 'http://localhost:8000'
      });
    });
   
    watch('**/*.php').on('change', function () {
      
      browserSync.reload();
    })
    (async () => { await open("http://dev.heathshults.com") })
    let file = ''
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
}
export {connect_sync};

// close the server
function close_server(cb) {
  connect.closeServer()
  if (typeof cb === 'function') {
      cb(null, file);
      called = true;
    }
}
export {close_server};

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
}
export {watchers};
export const dev = series(sassy, minify_css, minify_js, watchers, connect_sync);

