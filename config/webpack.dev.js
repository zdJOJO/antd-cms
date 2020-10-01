/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 19:40:15
 * @FilePath: \antd-cms\config\webpack.dev.js
 */

const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const port = 3001;

module.exports = merge(common, {

  entry: [
    `webpack-dev-server/client?http://localhost:${port}`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.tsx')  // 入口文件
  ],

  devServer: {
    host: '127.0.0.1',
    port: port,
    hot: true,
    inline: true,
    historyApiFallback: true
    // proxy: {
    //   "/api/*": "http://127.0.0.1:7000"
    // }
  },

  plugins: [

    new HtmlWebpackPlugin({
      title: '开发环境',
      template: path.join(__dirname, '../index.html'), // 指定模板文件路径
      filename: 'index.html' // 设置生成的内存页面的名称
    }),

    new webpack.HotModuleReplacementPlugin()

  ]

});