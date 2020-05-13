import {src, dest} from 'gulp'

// Copy vendor libraries from /node_modules into /vendor
let copy_vendors = (cb) => {
  src(['../node_modules/bootstrap/dist/**/*', '!**/npm.js', '!**/bootstrap-theme.*', '!**/*.map'])
    .pipe(dest('src/vendor/bootstrap'))

  src(['../node_modules/jquery/dist/jquery.js', '../node_modules/jquery/dist/jquery.min.js'])
    .pipe(dest('../src/vendor/jquery'))

  src([
    '../node_modules/font-awesome/**',
    '!../node_modules/font-awesome/**/*.map',
    '!../node_modules/font-awesome/.npmignore',
    '!../node_modules/font-awesome/*.txt',
    '!../node_modules/font-awesome/*.md',
    '!../node_modules/font-awesome/*.json'
  ])
    .pipe(dest(`${src}/vendor/font-awesome`))
  if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
exports.default = copy_vendors;
