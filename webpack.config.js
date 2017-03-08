var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './app/index.jsx',
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux',
      'redux-thunk'
    ]
  },
  output: {
    path: `${__dirname}/dist`,
    library: 'bundle',
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style!css" },
      { test: /\.useable\.css$/, loader: "style/useable!css" },
      { test: /\.json/, loader: "json" },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.md$/, loader: "raw" },
      { test: /\.jpe?g$/, loader: "file" },
      { test: /\.gif$/, loader: "file" },
      { test: /\.csv$/, loader: "raw" },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html.ejs'
    }), // https://www.npmjs.com/package/html-webpack-plugin#configuration
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js"
    })
  ]
};
