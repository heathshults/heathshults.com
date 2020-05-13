import {src, dest} from 'gulp'
import cleanCSS from 'gulp-clean-css'
import rename from "gulp-rename"
import p from './gpaths'
import browserSync from 'browser-sync'

// Minify compiled CSS
let minify_css = (cb)=> {
  // sassy()
    return src(`${p.www_css}/heathshults.css`)
        .pipe(cleanCSS({ compatibility: 'ie11' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(`${p.www_css}`))
        .pipe(browserSync.reload({
            stream: true
        }))
    if (typeof cb === 'function') {
        cb(null, file);
        called = true;
      }
}
exports.default = minify_css;
