const path = require('path')
const fs = require('fs-extra')
const { exec } = require('child_process');
const validateOptions = require('schema-utils');
const glob = require('glob');

var files = []
var options = []
var rootDir = path.resolve(process.cwd())
let tasks = []

const pluginName = 'FileCopyPlugin';

class FileCopyPlugin {
  constructor(options = {}){
    files = options || [];
  }
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      
        const Copier = (options = []) => {
            tasks = options
            tasks.map(task => {
            console.log(`copying ${task}...`)
            exec(`${path.resolve(process.cwd(), 'node_modules/.bin')}/gulp ${task}`, (error) => { 
                if (error) {console.log(`error: ${error.message}`)}
            })
          })
      }
      Copier(tasks)
      
      
     

    });
  }
}

module.exports = FileCopyPlugin;

//==========================================
// const path = require('path')
// const fs = require('fs-extra')
// const { exec } = require('child_process');
// const validateOptions = require('schema-utils');
// const glob = require('glob');

// var files = []
// var options = []
// var rootDir = path.resolve(process.cwd())

// var filesToCopy = [
//   {
//       from: `${rootDir}/src/css/**/*.{css,map}`,
//       to: `${rootDir}/www/css`,
//       ignore: ['heathshults.css', 'heathshults.min.css'] 
//     },
//     {
//       from: `${rootDir}/content/**/*`,
//       to: `${rootDir}/www/content`,
//       ignore: ['**/*.zip'] 
//     },
//     {
//       from: `${rootDir}/img/**/*.{png,jpg,gif,svg}`,
//       to: `${rootDir}/img`,
//       ignore: ['**/*.ejs'] 
//     }
//   ]
// console.log(filesToCopy)
//   const filterFunc = (src, dest) => {
//     console.log(src)
//     console.log(dest)
//   }
//     const Copier = (options = []) => {
//       var opts = options
//       opts.forEach((item, i) => {
//         var src = item[i]
//         console.log(src)
//         // var src = item[i].from
//         //var dest = item[i].to
//         //var ignore = item[i].ignore

//         // fs.copy(src, dest, { filter: filterFunc }, err => {
//         fs.copy(`${rootDir}/src`, `${rootDir}/.backup`, { filter: filterFunc }, err => {
//           if (err) return console.error(err)
//           console.log('success!')
//         })
//       })
//     }
// Copier(filesToCopy)






















