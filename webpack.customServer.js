const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { exec } = require('child_process')
const gulpfile = require('./gulpfile.babel.js')
// const FileCopyPlugin = require('./config/FileCopyPlugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
// const OfflinePlugin = require('offline-plugin/runtime').install();
const autoprefixer = require('autoprefixer');
const { callbackify } = require('util');

const isDev = (process.env.NODE_ENV === 'development');
const basePath = process.cwd();

const srcPath = path.resolve(__dirname, 'src')
const destPath = path.resolve(__dirname, 'www')

//#region 
//  const del = require('del');
 
// (async cleanup() {
//     const deletedPaths = await del(['temp/*.js', '!temp/unicorn.js']);
 
//     console.log('Deleted files and directories:\n', deletedPaths.join('\n'));
// })();
// const nunjucksContext = require('./resources/data/index');
// const nunjucksDevConfig = require('./resources/html/config.dev.json');
// const nunjucksProdConfig = require('./resources/html/config.prod.json');

// nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

// const nunjucksOptions = JSON.stringify({
//   searchPaths: `${basePath}/resources/html/`,
//   context: nunjucksContext,
// });

// const pages = glob.sync('**/*.njk', {
//   cwd: path.join(basePath, 'resources/html/pages/'),
//   root: '/',
// }).map(page => new HtmlWebpackPlugin({
//   filename: page.replace('njk', 'html'),
//   template: `resources/html/pages/${page}`,
// }));
//#endregion


module.exports = {
  mode: 'development',
  entry: {
    app: [
      path.join(__dirname, 'src', 'index.js'),
      path.join(__dirname, 'src', 'css.js')
    ]
  },
  // watch: true,
  output: {
    path: path.resolve(process.cwd(), 'www'),// path.resolve(process.cwd(), 'dist')
    // publicPath: '/assets/',
    filename: "HeathScript.built.js",
    chunkFilename: '[name].js'
  },
   optimization: {
     splitChunks: {
       cacheGroups: {
         heath_script: {
           name: 'HeathStyle',
           test: /HeathStyle\.s?css$/,
           chunks: 'all',
           enforce: true,
         },
         theme_dark_mode: {
           name: 'theme-dark-mode',
           test: /theme-dark-mode\.s?css$/,
           chunks: 'all',
           enforce: true,
         },
       },
     },
   },
  module: {
    rules: [
      {
        test: /.(jsx|js)?$/,
        include: [ path.resolve(__dirname, 'src/lib') ],
        exclude: [ path.resolve(__dirname, 'node_modules') ],
        loader: 'babel-loader',
        options: {
          presets: [ "@babel/preset-env" ]
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      // {
      //   test: /\.(njk|nunjucks)$/,
      //   loader: ['html-loader', `nunjucks-html-loader?${nunjucksOptions}`],
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
            reloadAll: true,
          },
        },
          'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()]
          }
        },
        {
          loader: 'resolve-url-loader',
          options: {
            keepQuery: true
          }
        },
        'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|otf|json)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: false,
          },
        }, ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(
      // {
      //   cleanOnceBeforeBuildPatterns: ['**/*', '!content'],
      //   verbose: true,
      //   protectWebpackAssets: false
      // }
    ),
    new MiniCssExtractPlugin({
      filename: '[name].built.css'
    }),
    new HtmlWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   filename: path.resolve(__dirname, 'www/index.html'),
    //   template: 'src/index.ejs'
    //   // minify: { removeComments: true, collapseWhitespace: true, removeAttributeQuotes: true }
    // }),
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(__dirname, './www/index-allcode.html'),
    //   template: 'src/index-allcode.ejs',
    // }),
    // copy assets and manifest.json
    
    new CopyPlugin({
      patterns: [
        { from: `${srcPath}/css`, 
          to: `${destPath}/css`,
          globOptions: {
            gitignore: true,
            ignore: ['heathshults.css', 'heathshults.min.css'] 
          }
        },
      {
        from: `${srcPath}/content`,
        to: `${destPath}/content`,
        globOptions: {
          gitignore: true,
          ignore: ['**/*.zip'] 
        }
      },
      {
        from: `${srcPath}/img`,
        to: `${destPath}/img`,
        globOptions: {
          gitignore: true,
          ignore: ['**/*.ejs'] 
        }
      },
      {
        from: `${srcPath}/js`,
        to: `${destPath}/js`,
        globOptions: {
          gitignore: true,
          ignore: ['HeathScript.js', 'contact_me.js', 'jqBootstrapValidation.js']
        }
      },
      {
        from: `${srcPath}/DevBox`,
        to: `${destPath}/DevBox`,
        globOptions: {
          gitignore: true,
          ignore: ['**/*.ejs']
        }
      },
      {
        from: `${srcPath}/lib`,
        to: `${destPath}/lib`,
        globOptions: {
          gitignore: true,
          ignore: ['**/*.ejs']
        }
      },
      {
        from: `${srcPath}/vendor`,
        to: `${destPath}/vendor`,
        globOptions: {
          gitignore: true,
          ignore: ['**/*.ejs']
        }
      }
  ]}),
    
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: 'localhost',
        port: 9900,
        proxy: 'http://localhost:9901/',
        // injectCss: true,
        // files: [
        //   {
        //     match: ['src/*.html', 'src/scss/*.scss', 'src/css/*.css', 'src/js/*.js', 'src/js/*.json'],
        //     fn: function (event, file) {
        //       if (event === 'change') {
        //         exec('./node_modules/.bin/webpack --config webpack.customServer.js --mode development --display-error-details --colors', (error, stdout, stderr) => {
        //           if (error) {
        //               console.log(`error: ${error.message}`);
        //               return;
        //           }
        //           if (stderr) {
        //               console.log(`stderr: ${stderr}`);
        //               return;
        //           }
        //           console.log(`stdout: ${stdout}`);
        //         });
        //         console.log('Processed '+file)
        //       }
        //     }
        //   }
        // ],
        reloadDelay: 2000
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    }),
    // Ignore node_modules so CPU usage with poll
    // watching drops significantly.
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, "node_modules")
    ]),
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    stats: "errors-only",
    contentBase: path.join(__dirname, 'www/'),
    inline: false,
    host: 'localhost',
    port: 9901,
    compress: true,
    liveReload: true,
    writeToDisk: true
  }
}


// if (!isDev) {
//   module.exports.plugins.push(
//     new CleanWebpackPlugin(['dist']),
//     new webpack.optimize.UglifyJsPlugin(),
//   );
// }
/*
function copy_images() {
  console.log('copying images...')
  exec('./node_modules/.bin/gulp copy_img', 
  (error) => { if (error) {console.log(`error: ${error.message}`)}
  });
  callbackify()
}

function copy_js() {
  console.log('copying javascript files...')
  exec('./node_modules/.bin/gulp copy_js', 
    (error) => { if (error) {console.log(`error: ${error.message}`)}
  });
  callbackify()
}

function copy_vendor() {
  console.log('copying vendor files...')
  exec('./node_modules/.bin/gulp copy_vendor', 
    (error) => { if (error) {console.log(`error: ${error.message}`)}
  });
  callbackify()
}

function copy_css() {
  console.log('copying css...')
  exec('./node_modules/.bin/gulp copy_css', 
    (error) => { if (error) {console.log(`error: ${error.message}`)}
  });
  callbackify()
}
let copy_tasks = [
  'copy_img',
  'copy_js',
  'copy_vendor',
  'copy_css'
]



const Copier = (options = []) => {
      let tasks = options
      tasks.map(task => {
      console.log(`copying ${task}...`)
      exec(`./node_modules/.bin/gulp ${task}`, (error) => { 
          if (error) {console.log(`error: ${error.message}`)}
      })
    })
}
Copier(copy_tasks)
*/