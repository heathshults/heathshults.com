import {src, dest} from 'gulp'
import debug from 'gulp-debug'
import changed from 'gulp-changed'
import p from './gpaths'

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
  src('../src/js/**/*.{js,json}')
  .pipe(changed(DESTINATION))
  .pipe(dest(p.www_js))
  if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
export {copy_js};

function copy_assets(cb) {
src(`${p.src}/**/*.${asset_file_ext}`)
.pipe(dest(p.www)),
()=>{
let file = ''  
if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
}
exports.default = copy_assets;
