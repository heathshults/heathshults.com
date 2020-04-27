const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const OfflinePlugin = require('offline-plugin/runtime').install();
const autoprefixer = require('autoprefixer')

const isDev = (process.env.NODE_ENV === 'development');
const basePath = process.cwd();

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

function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  mode: 'development',
  entry: {
    app: [
      path.join(__dirname, 'src', 'index'),
      path.join(__dirname, 'src/scss', 'heathscript.scss'),
      path.join(__dirname, 'src/scss', 'theme-dark-mode.scss')
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        HeathScriptStyles: {
          name: 'heathscript',
          test: (m, c, entry = path.join(__dirname, 'src/scss', 'heathscript.scss')) =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
        DarkModeStyles: {
          name: 'ThemeDarkMode',
          test: (m, c, entry = path.join(__dirname, 'src/scss', 'theme-dark-mode.scss')) =>
            m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  watch: true,
  output: {
    path: path.join(__dirname, 'www'),
    publicPath: './',
    filename: "hScript.bundle.js",
    chunkFilename: '[name].js'
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
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            },
          },
          'css-loader',
          {loader: 'postcss-loader', options: { plugins: () => [autoprefixer()] } },
          {loader: 'resolve-url-loader', options: { keepQuery: true }},
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
      // {
      //   test: /\.(png|jpe?g|gif|svg|json)$/i,
      //   use: [{
      //     loader: 'file-loader',
      //   }, ],
      // },
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(
      {
        filename: '[chunkhash].[name].css'
      }
    ),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, './www/index.html'),
      template: 'src/index.ejs',
      favicon: 'src/favicon.ico', // or use favicons-webpack-plugin
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true
      // }
    }),
    // copy assets and manifest.json
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/content'),
      to: path.resolve(__dirname, 'www/content') 
    },
    {
      from: path.resolve(__dirname, 'src/css'),
      to: path.resolve(__dirname, 'www/css'),
    ignore: ['heathshults.css', 'heathshults.min.css'] 
    },
    {
      from: path.resolve(__dirname, 'DevBox/Blue-Star-Sports-Test/*'),
      to: 'www',
      ignore: ['**/*.zip'] 
    },
    {
      from: path.resolve(__dirname, 'src/img/*'),
      to: path.resolve(__dirname, 'img/*'),
      ignore: ['**/*.zip'] 
    },
    {
      from: path.resolve(__dirname, 'src/js/*'),
      to: path.resolve(__dirname, 'js/*'),
      ignore: ['**/*.zip'] 
    },
    {
      from: path.resolve(__dirname, 'src/lib/*'),
      to: path.resolve(__dirname, 'lib/*'),
      ignore: ['**/*.zip']
    },
    {
      from: path.resolve(__dirname, 'src/vendor/*'),
      to: path.resolve(__dirname, 'vendor/*'),
      ignore: ['**/*.zip']
    }
    ]),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true)
    }),
    // new OfflinePlugin({
    //   ServiceWorker: {
    //     minify: false
    //   }
    // })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/www/'),
    inline: true,
    host: 'localhost',
    port: 9900,
    compress: true,
    hot: true
  }
}

// if (!isDev) {
//   module.exports.plugins.push(
//     new CleanWebpackPlugin(['dist']),
//     new webpack.optimize.UglifyJsPlugin(),
//   );
// }
