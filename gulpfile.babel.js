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

function js(done) {
  try {
    exec('./node_modules/.bin/webpack --config webpack-js.js --mode development --display-error-details --verbose --watch --colors', (error, stdout, stderr) => {
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
exports.js = js

function sassy(done) {
  try {
    exec(`sass ${srcPath}/scss/heathscript.scss ${wwwPath}/css/heathscript.css`, (error, stdout, stderr) => {
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
    exec('sass src/scss/theme-dark-mode.scss www/css/theme-dark-mode.css', (error, stdout, stderr) => {
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
  src('src/**/*.{jpg,png,gif,svg,mp4}')
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
function copy_vendor(cb) {
  src(['node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(dest(`${wwwPath}/vendor/bootstrap`))

  src(['node_modules/jquery/dist/jquery.js', 'node_modules/jquery/dist/jquery.min.js'])
    .pipe(dest(`${wwwPath}/vendor/jquery`))

  src([
      'node_modules/font-awesome/**',
      '!node_modules/font-awesome/**/*.map',
      '!node_modules/font-awesome/.npmignore',
      '!node_modules/font-awesome/*.txt',
      '!node_modules/font-awesome/*.md',
      '!node_modules/font-awesome/*.json'
    ])
    .pipe(plumber())
    .pipe(dest(`${wwwPath}/vendor/font-awesome`))

    src([`${srcPath}/lib`])
    .pipe(dest(`${wwwPath}/lib`), {overwrite: true})

    src([`${srcPath}/content/**/*`])
    .pipe(dest(`${wwwPath}/content`), {overwrite: true})
    
    src([`${srcPath}/vendor/**/*`])
    .pipe(dest(`${wwwPath}/vendor`), {overwrite: true})
    var file = ''
  if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
exports.copy_vendor = copy_vendor

function copy_html(cb) {
  src(`${srcPath}/layouts/**/*.html`)
  .pipe(plumber())
    .pipe(changed(wwwPath))
    .pipe(dest(wwwPath), {
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

function copy_all (cb) { series(sassy, copy_js, copy_vendor, ejsit, copy_img ), cb() }
exports.copy_all = copy_all

function watchers(cb) {
  // eslint-disable-next-line no-sequences
  watch('src/*.ejs', { readDelay: 500, verbose: true }, ejsit, browserSync.reload), cb()
  watch(['src/img/**/*.{jpg,png,gif,svg}', 'src/content/**/*.{jpg,png,gif,svg}'], copy_img), cb()
  watch('src/scss/**/*.scss', sassy), cb()
  watch('src/js/*.{js,json,mjs,cjs}', copy_js), cb()
}
exports.watchers = watchers

// Configure the browserSync task
function serve(cb) {
    browserSync.init({
        server: {
            baseDir: wwwPath
        },
    })
if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
exports.browserSync = browserSync

function connect_sync(cb) {
 
  connect.server({base: 'www/'}, function (){
    browserSync({
      proxy: '127.0.0.1:8000',
      open: 'localhost',
      watch: true,
      injectChanges: true,
      files: [
        {
            match: ['src/**/*.php'],
            fn: function (event, file) {
               browserSync.reload()
            },
            options: {
                ignored: ['*.scss', '*.ejs']
            }
        }
    ]
    });
  }), cb()

  // let file = ''
  // if (typeof cb === 'function') {
  //   cb(null, file);
  //   called = true;
  // }

}

exports.connect_sync = connect_sync

// close the server
function close_server(cb) {
  connect.closeServer()
  if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
exports.close_server = close_server

// Dev task with browserSync
function watchers2(cb) {

  watch('src/scss/*.scss', {
    readDelay: 500,
    verbose: true
  }, sassy);
  // watch('src/css/*.css', {readDelay: 500, verbose: true }, minify_css);
  watch('src/js/*.js', {
    readDelay: 500,
    verbose: true
  }, copy_js);
  // Reloads the browser whenever HTML or JS files change
  watch('src/*.ejs', ejsit);
  watch('src/**/*.{jpg,png,gif,svg,mp4}', {
    readDelay: 500,
    verbose: true
  }, copy_assets, browserSync.reload)
  // let file = ''  
  // if (typeof cb === 'function') {
  //       cb(null, file);
  //       called = true;
  //     };
}
exports.watchers2 = watchers2

// // Run everything
// exports.build = series(sassy, minify_css, minify_js, copy_vendors)

exports.setup_develop = series(copy_all, watchers, connect_sync)
