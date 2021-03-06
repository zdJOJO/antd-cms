/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 17:34:43
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-01 20:06:50
 * @FilePath: \antd-cms\config\webpack.common.js
 */
const webpack = require('webpack');
const path = require('path');
const os = require('os');
const HappyPack = require('happypack');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin'); // remove it in production environment.
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // remove it in production environment.
const otherPlugins = process.argv[1].indexOf('webpack-dev-server') >= 0 ? [] : [
  new Visualizer(), // remove it in production environment.
  new BundleAnalyzerPlugin({
    defaultSizes: 'parsed',
    // generateStatsFile: true,
    statsOptions: { source: false }
  }) // remove it in production environment.
];


// 是否是生产模式
const isProd = process.env.NODE_ENV === 'production';

const cssLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

const progressPlugin = new ProgressBarWebpackPlugin({
  format: 'building [:bar] :percent (:elapsed seconds)',
  clear: false,
  width: 30
});

const providePlugin = new webpack.ProvidePlugin({
  axios: 'axios',
  dayjs: 'dayjs'
});

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const happyPack = new HappyPack({
  id: 'babel',
  loaders: [{
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'],
      plugins: [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-export-default-from',
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-modules-commonjs'
      ]
    }
  }],
  //共享进程池
  threadPool: happyThreadPool,
  //允许 HappyPack 输出日志
  verbose: true
})


module.exports = {

  mode: isProd ? 'production' : 'development',

  devtool: isProd ? 'cheap-module-eval-source-map' : 'source-map',

  output: {
    path: path.join(__dirname, '../dist/'),
    publicPath: '/',  // publicPath：访问时文件的目录， 打包的js
    filename: 'js/[name].[hash:8].bundle.js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less'], // import ** from 时，导入可以省略文件的拓展名
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@route': path.resolve(__dirname, '../src/route'),
      'react-dom': '@hot-loader/react-dom'
    }
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ['happypack/loader?id=babel'],
        exclude: /^node_modules$/
      },
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=babel'],
        exclude: /^node_modules$/
      },
      {
        test: /\.css$/,
        use: [
          cssLoader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:8]'
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          cssLoader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modules: true,
              modifyVars: {
                'primary-color': '#F5222D',
                'border-radius-base': '2px'
              },
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1024 * 8, // 8k以下的base64内联，不产生图片文件
          fallback: 'file-loader', // 8k以上，用file-loader抽离（非必须，默认就是file-loader）
          name: '[name].[ext]?[hash]', // 文件名规则，默认是[hash].[ext]
          outputPath: path.join(__dirname, '../dist/images') // 输出路径
        }
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: isProd ? false : true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],

    runtimeChunk: true,
    splitChunks: {
      chunks: 'all', //默认作用于异步chunk，值为all/initial/async/function(chunk),值为function时第一个参数为遍历所有入口chunk时的chunk模块，chunk._modules为chunk所有依赖的模块，通过chunk的名字和所有依赖模块的resource可以自由配置,会抽取所有满足条件chunk的公有模块，以及模块的所有依赖模块，包括css
      minSize: 30000,  //表示在压缩前的最小模块大小,默认值是30kb
      minChunks: 1,  // 表示被引用次数，默认为1；
      maxAsyncRequests: 5,  //所有异步请求不得超过5个
      maxInitialRequests: 3,  //初始话并行请求不得超过3个
      automaticNameDelimiter: '~', //名称分隔符，默认是~
      name: true,  //打包后的名称，默认是chunk的名字通过分隔符（默认是～）分隔
      cacheGroups: {

        //node_modules内的依赖库
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1, //被不同entry引用次数(import),1次的话没必要提取
          maxInitialRequests: 5,
          minSize: 0,
          priority: -10
        },

        // ‘src’ 下的共用文件
        common: {
          name: 'common', //生成文件名，依据output规则
          chunks: 'all',
          test: /[\\/]src[\\/]/,
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 1
        },

        // 将css提取到一个CSS中
        styles: {
          name: 'styles',
          chunks: 'all',    // merge all the css chunk to one file
          test: /\.(sass|scss|css|less)$/,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    },
    noEmitOnErrors: true  // 在编译出错时，使用 optimization.noEmitOnErrors 来跳过生成阶段(emitting phase)。这可以确保没有生成出错误资源
  },

  plugins: [
    progressPlugin,
    happyPack,
    providePlugin,
    ...otherPlugins
  ],

  performance: {
    hints: false
  }
}