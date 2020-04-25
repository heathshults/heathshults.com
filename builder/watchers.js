import {watch} from 'gulp'
import browserSync from 'browser-sync'
// Dev task with browserSync
let watchers = (cb)=> {
  
  watch(`${p.src_scss}/*.scss`, {readDelay: 500, verbose: true },sassy);
  // watch('src/css/*.css', {readDelay: 500, verbose: true }, minify_css);
  watch(`${p.src_js}/*.js`, {readDelay: 500, verbose: true }, minify_js);
  // Reloads the browser whenever HTML or JS files change
  watch(`${p.src}/*.html`, copy_html);
  watch(`${p.src}/**/*.${asset_file_types}`, {readDelay: 500, verbose: true }, copy_assets, browserSync.reload)
  // let file = ''  
  // if (typeof cb === 'function') {
  //       cb(null, file);
  //       called = true;
  //     };
}
exports.default = watchers
