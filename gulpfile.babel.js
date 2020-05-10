/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
let path = require('path');

// let fs = require('fs-extra')
let {src, dest, gulp, task, watch, series, parallel} = require('gulp');

// var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var header = require('gulp-header')
// var cleanCSS = require('gulp-clean-css')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var pkg = require('./package.json')
var connect = require('gulp-connect-php')
var plumber = require('gulp-plumber')
var open = require('open')
var { exec } = require('child_process')
// var autoprefixer = require('gulp-autoprefixer')
// var postcss = require('gulp-postcss')
// var postcssCustomProperties = require('postcss-custom-properties')
var debug = require('gulp-debug')
var changed = require('gulp-changed')
var ejs = require('gulp-ejs')
var log = require('fancy-log')

var srcPath = path.resolve('./', 'src')
var wwwPath =  path.resolve('./', 'www')

let p = {
  
  src_js: `${srcPath}/js`,
  src_scss: `${srcPath}/scss`,
  src_html: src,
  src_img: `${srcPath}/img`,
 
  www_js: `${wwwPath}/js`,
  www_css: `${wwwPath}/css`,
  www_html: wwwPath,
  www_img: `${wwwPath}/img`
}

let assets = '{jpg,png,gif,svg,mp4}'

// Compiles sassy files from /sassy into /css
// NOTE: This theme uses sassy by default. To swtich to sassy you will need to update this gulpfile by changing the 'less' tasks to run 'sass'!
// function sassy(cb) {
//   return src(['src/scss/heathshults.scss', 'src/scss/theme-dark-mode.scss'], {
//     sourcemaps: true
//   })
//     // .pipe(changed('www/css'))
//     .pipe(sass())
//     .pipe(autoprefixer())
//     .pipe(header(banner, {
//       pkg
//     }))
//     .pipe(dest(p.www_css), {
//       sourcemap: '.',
//       overwrite: true
//     })
//     .pipe(cleanCSS({
//       compatibility: 'ie11'
//     }, ({
//       name,
//       stats
//     }) => {
//       console.log(`${name}: ${stats.originalSize}`);
//       console.log(`${name}: ${stats.minifiedSize}`);
//     }))
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(dest('www/css'), {
//       sourcemap: '.',
//       overwrite: true
//     })
//     .pipe(browserSync.reload({
//       stream: true
//     })),
//     () => {
//       if (typeof cb === 'function') {
//         cb(null, file);
//         called = true;
//       }
//     };
// }
// exports.sassy = sassy

// // Minify compiled CSS
// function minify_css(cb) {
//   sassy()
//   return src('www/css/heathshults.css')
//     .pipe(cleanCSS({
//       compatibility: 'ie8'
//     }))
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(dest('www/css/'))
//     .pipe(browserSync.reload({
//       stream: true
//     }))
//   if (typeof cb === 'function') {
//     cb(null, file);
//     called = true;
//   }
// }
// exports.minify_css = minify_css

// // create css variable fallback properties 
// function css_variable_fallbacks() {
//   src('www/*.css').pipe(
//     postcss([
//       postcssCustomProperties( /* pluginOptions */ )
//     ])
//   ).pipe(
//     dest('.')
//   );
// }
// exports.css_variable_fallbacks = 

// // Minify JS
// function minify_js(cb) {
//   return src('src/js/heathshults.js')
//     .pipe(changed('www/js'))
//     // .pipe(uglify())
//     .pipe(header(banner, {
//       pkg
//     }))
//     .pipe(dest('www/js'), {
//       overwrite: true
//     })
//     .pipe(rename({
//       suffix: '.min'
//     }))
//     .pipe(dest('www/js'), {
//       overwrite: true
//     })
//     .pipe(browserSync.reload({
//       stream: true
//     })),
//     () => {
//       if (typeof cb === 'function') {
//         cb(null, file);
//         called = true;
//       }
//     };
// }
// exports.minify_js = minify_js

function ejsit(done) {
  return src(`${srcPath}/index.ejs`, null, null)
    .pipe(plumber())
    .pipe(ejs().on('error', log))
    .pipe(rename({
      extname: ".html"
    }))
    .pipe(dest(wwwPath, { overwrite: true, cwd: process.cwd() })), done()
}
exports.ejsit = ejsit

function sassy(done) {
  try {
    exec(`sass --sourcemap ${srcPath}/scss/heathscript.scss ${wwwPath}/css/heathscript.css`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
    })
  }
  catch(e) {
    console.log('HeathenError: ' + e)
  }

  try{
    exec('sass --sourcemap src/scss/theme-dark-mode.scss www/css/theme-dark-mode.css', (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
    })
  }
  catch(e) {
    console.log('HeathenError: ' + e)
  }
  done()
}
exports.sassy = sassy

function copy_img(cb) {
  src('src/img/**/*.{jpg,png,svg}')
    .pipe(plumber())
    .pipe(changed('www/'))
    .pipe(dest('www/'), {
      overwrite: true
    })
    .pipe(debug({
      title: 'copied'
    })), cb();
  // if (typeof cb === 'function') {
  //     cb(null, file);
  //     called = true;
  //   }
}
exports.copy_img = copy_img

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
    .pipe(plumber())
    .pipe(dest(`${src}/vendor/font-awesome`))
  if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
exports.copy = copy

function copy_html(cb) {
  src('src/html/**/*.html')
  .pipe(plumber())
    .pipe(changed('www/'))
    .pipe(dest('www/'), {
      overwrite: true
    })
    .pipe(debug({
      title: 'copied'
    })), cb();
  // if (typeof cb === 'function') {
  //     cb(null, file);
  //     called = true;
  //   }
}
exports.copy_html = copy_html

function copy_js(cb) {
  src(`${srcPath}/js/**/*.{js,json}`)
    .pipe(plumber())
    .pipe(changed(`${wwwPath}/js`))
    .pipe(dest(`${wwwPath}/js`)), cb()
  // () => { 
  //   let file = ''
  //   if (typeof cb === 'function') {
  //     cb(null, file);
  //     called = true;
  //   }
  // }
}
exports.copy_js = copy_js

function copy_assets(cb) {
  src('src/**/*.${assets}')
    .pipe(plumber())
    .pipe(dest('www/')),
    () => {
      let file = ''
      if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
    }
}
exports.copy_assets = copy_assets

function watchers(cb) {
  // eslint-disable-next-line no-sequences
  watch('src/*.ejs', ejsit), cb()
  watch('src/**/*.{jpg,png,svg}', copy_img), cb()
  watch('src/scss/*.scss', sassy), cb()
  watch('src/js/*.{js,json}', copy_js), cb()
}
exports.watchers = watchers

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

// function connect_sync(cb) {
//   connect.server({
//     hostname: 'localhost',
//     port: 8000,
//     base: 'www/'
//   }, function() {
//     browserSync({
//       proxy: 'http://localhost:8000'
//     });
//   });

//   watch('**/*.php').on('change', function() {

//       browserSync.reload();
//     })
//     (async () => {
//       await open("http://dev.heathshults.com")
//     })
//   let file = ''
//   if (typeof cb === 'function') {
//     cb(null, file);
//     called = true;
//   }
// }
// exports.connect_sync = connect_sync

// // close the server
// function close_server(cb) {
//   connect.closeServer()
//   if (typeof cb === 'function') {
//     cb(null, file);
//     called = true;
//   }
// }
// exports.close_server = close_server

// Dev task with browserSync
// function watchers(cb) {

//   watch('src/scss/*.scss', {
//     readDelay: 500,
//     verbose: true
//   }, sassy);
//   // watch('src/css/*.css', {readDelay: 500, verbose: true }, minify_css);
//   watch('src/js/*.js', {
//     readDelay: 500,
//     verbose: true
//   }, minify_js);
//   // Reloads the browser whenever HTML or JS files change
//   watch('src/*.html', copy_html);
//   watch('src/**/*.{jpg,png,gif,svg,mp4}', {
//     readDelay: 500,
//     verbose: true
//   }, copy_assets, browserSync.reload)
//   // let file = ''  
//   // if (typeof cb === 'function') {
//   //       cb(null, file);
//   //       called = true;
//   //     };
// }
// exports.watchers = watchers

// // Run everything
// exports.build = series(sassy, minify_css, minify_js, copy_vendors)
// exports.dev = series(sassy, minify_css, minify_js, watchers, connect_sync)
