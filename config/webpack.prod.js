/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 18:13:51
 * @FilePath: \antd-cms\config\webpack.prod.js
 */

const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = merge(common, {

  entry: {
    main: [
      '@babel/polyfill',
      path.resolve(__dirname, '../src/index.js')
    ]
  },



  plugins: [

    // 设置环境变量
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),

    // 清空项目根目录下dist
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      inject: true,
      minify: {               // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true// 压缩内联css
      },
      title: 'CMS系统',
      filename: path.join(__dirname, "../dist/index.html"),
      favicon: path.join(__dirname, "../assets/favicon.ico"),
      template: path.join(__dirname, '../assets/templete.ejs'), // 指定模板文件路径, 使用ejs模板语法
      chunks: ["main"],  // 允许插入到模板中的一些chunk，不配置此项默认会将entry中所有的thunk注入到模板中。
      insertJs: [`./js/vendor.dll.reactV.js`]
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name][contenthash:8].css",
      chunkFilename: "css/[id][contenthash:8].css"
    }),

  ]
})