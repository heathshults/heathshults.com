var browserSync = require('browser-sync')
var exec = require('child_process')

browserSync({
  server: 'www',
  files: [
    {
      match: ['src/*.html', 'src/css/*.css', 'src/js/*.js', 'src/js/*.json'],
      fn: function (event, file) {
        if (event === 'change') {
          exec('npx webpack --config webpack.config.js --mode development --display-error-details --colors')
          console.log('Processed : '+file)
        }
      }
    }
  ],
  reloadDelay: 2000
})
