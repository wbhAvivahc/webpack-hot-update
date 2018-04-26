
const path = require('path');
const webpack = require('webpack');
// const webpackDevServer = require('webpack-dev-server')

module.exports = {
  entry: './main.js',
  output:{
    filename: 'wbhUtil.js',
    path: path.resolve(__dirname,'./dist')
  },
  module:{
    rules: [
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },
  devServer:{
    host : '127.0.0.1',
    port: 8080,
    open: true,
    inline: true,
    hot: true,
    inline: true
    // devServer: {
    //   contentBase: './dist'
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  // devtool: true,
  profile: true
}