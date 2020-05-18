const path = require('path')
const { exec } = require('child_process');
const validateOptions = require('schema-utils');

let tasks = []

const pluginName = 'FileCopyPlugin';

class FileCopyPlugin {
  constructor(options = {}){
    tasks = options || [];
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
























