import {watch} from 'gulp'
let path = require('path')
import browserSync from 'browser-sync'
import connect from 'gulp-connect-php'
import open from 'open'
import p from './gpaths'

let connect_sync = (cb)=> {
  connect.server({
    hostname: 'localhodt',
    port: 8000,
    base: `${p.www}`
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
exports.default = connect_sync;

// close the server
function close_server(cb) {
connect.closeServer()
if (typeof cb === 'function') {
    cb(null, file);
    called = true;
  }
}
exports.default =close_server;











