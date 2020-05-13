const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    app: [
      path.join(__dirname, 'src', 'index.js'),
    ]
  },
  stats: 'errors-only',
  output: {
    path: path.join(__dirname, 'www'),
    publicPath: './',
    filename: 'hScript.bundle.js',
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.(jsx|js|mjs|cjs)?$/,
        include: [
          path.resolve(__dirname, 'src/lib')
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: {
                browsers: 'last 2 chrome versions'
              }
            }]
          ]
        }
      }
    ]
  }
}
    


// if (!isDev) {
//   module.exports.plugins.push(
//     new CleanWebpackPlugin(['dist']),
//     new webpack.optimize.UglifyJsPlugin(),
//   );
// }
