const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: 'development',
  entry: {
    app: [
      path.join(__dirname, 'src', 'index'),
      path.join(__dirname, 'src/scss', 'heathshults.scss'),
      path.join(__dirname, 'src/scss', 'theme-dark-mode.scss')
    ]
  },
  watch: true,
  output: {
    path: path.join(__dirname, 'www'),
    publicPath: '/www/',
    filename: "heath_shults-js.bundle.js",
    chunkFilename: '[name].js'
  },
  
  module: {
    rules: [
      {
        test: /.(jsx|js)?$/,
        include: [
          path.resolve(__dirname, 'src/js'),
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
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {importLoaders: 1}},
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|json)$/i,
        use: [{
          loader: 'file-loader',
        }, ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'heathshuls.com',
      filename: 'src/html/index.html',
      publicPath: 'www/',
      js: ['src/js/**/*.js'],
      css: ['src/css/**/*.css']
      // template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? 'heath_shults-css.css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
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
