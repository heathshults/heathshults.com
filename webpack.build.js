const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const { exec } = require('child_process')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const OfflinePlugin = require('offline-plugin/runtime').install();
const autoprefixer = require('autoprefixer')

const isDev = (process.env.NODE_ENV === 'development');
const basePath = process.cwd();

const options = { 
  hmr: true,
  liveReload: true,
  open: true
 };

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
    path: path.join(__dirname, 'www'),
    publicPath: path.join(__dirname, 'www'),
    filename: "hScript.bundle.js",
    chunkFilename: '[name].js'
  },
   optimization: {
     splitChunks: {
       cacheGroups: {
         heath_script: {
           name: 'heathscript',
           test: /heathscript\.s?css$/,
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
        include: [
          path.resolve(__dirname, 'src/lib')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ["@babel/preset-env", {
              "targets": {
                "browsers": "last 2 chrome versions"
              }
            }]
          ]
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
        }],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].build.css'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(__dirname, 'www/index.html'),
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico'
      // minify: { removeComments: true, collapseWhitespace: true, removeAttributeQuotes: true }
    }),
    // new HtmlWebpackPlugin({
    //   filename: path.resolve(__dirname, './www/index-allcode.html'),
    //   template: 'src/index-allcode.ejs',
    // }),
    // copy assets 
    new CopyWebpackPlugin([
    {
      from: 'src/css',
      to: 'css',
      ignore: ['heathshults.css', 'heathshults.min.css'] 
    },
    {
      from: 'src/DevBox/Blue-Star-Sports-Test/*',
      to: 'DevBox/Blue-Star-Sports-Test',
      ignore: ['**/*.zip'] 
    },
    {
      from: 'src/img/*',
      to: 'img',
      ignore: ['**/*.ejs'] 
    },
    {
      from: 'src/js/*',
      to: 'js/',
      ignore: ['heathshults.js', 'contact_me.js', 'jqBootstrapValidation.js']
    },
    {
      from: 'src/lib/*',
      to: 'lib/',
      ignore: ['**/*.ejs']
    },
    {
      from: 'src/vendor/*',
      to: 'vendor/',
      ignore: ['**/*.ejs']
    }
    ]),
    new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: 'localhost',
        port: 9900,
        proxy: 'http://127.0.0.1:9900/',
        injectCss: true,
        files: [
          {
            match: ['src/*.html', 'src/scss/*.scss', 'src/css/*.css', 'src/js/*.js', 'src/js/*.json'],
            fn: function (event, file) {
              if (event === 'change') {
                exec('./node_modules/.bin/webpack-dev-server --config webpack.build.js --mode development --display-error-details --colors', (error, stdout, stderr) => {
                  if (error) {
                      console.log(`error: ${error.message}`);
                      return;
                  }
                  if (stderr) {
                      console.log(`stderr: ${stderr}`);
                      return;
                  }
                  console.log(`stdout: ${stdout}`);
                });
                console.log('Processed '+file)
              }
            }
          }
        ],
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
  devtool: 'source-map'
}
