let path = require('path');
// let fs = require('fs-extra')
import {src, dest} from 'gulp';

import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import header from 'gulp-header';
import rename from "gulp-rename";
import uglify from 'gulp-uglify';
import changed from 'gulp-changed';

let minify_js = (cb)=> {
  return src(`${src_js}/heathshults.js`)
  .pipe(changed(`${p.www_js}`))
      .pipe(uglify())
      .pipe(header(banner, { pkg }))
      .pipe(dest(`${p.www_js}`), {overwrite: true})
      .pipe(rename({ suffix: '.min' }))
      .pipe(dest(`${p.www_js}`), {overwrite: true})
      .pipe(browserSync.reload({
          stream: true
      })),
  ()=>{if (typeof cb === 'function') {
      cb(null, file);
      called = true;
    }};
}
exports.default = minify_js;
