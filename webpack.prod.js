const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports = {
  "mode": "production",
  "entry": "src/index.js",
  "watch": true,
  "output": {
    "path": path.join(__dirname, '/www'),
    publicPath: '/www/',
    "filename": "[name].[chunkhash:8].js",
    chunkFilename: '[name].js'
  },
  "devtool": "source-map",
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": "jshint-loader"
      },
      {
        "test": /\.js$/,
        "exclude": /node_modules/,
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
              "env"
            ]
          }
        }
      },
      {
        "test": /\.scss$/,
        "use": [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  "plugins": [new MiniCssExtractPlugin({
    filename: "[name]-[contenthash:8].css"
  })]
}
webpack({
  // Configuration Object
  }, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    // Log result...
  }
);
