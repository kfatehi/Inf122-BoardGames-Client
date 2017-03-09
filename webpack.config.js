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
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: "style-loader!css-loader" },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
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
