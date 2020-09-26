/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 20:14:07
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 20:18:38
 * @FilePath: \antd-cms\babel.config.js
 */

// .babelrc是从每一个文件向上查找配置的，babel.config.js则不会
module.exports = {

  presets: [
    [
      "@babel/preset-env",
      // https://github.com/babel/babel/blob/master/packages/babel-preset-env/data/plugins.json#L32
      {
        "targets": {
          "browsers": [
            "chrome >= 47"
          ]
        },
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-proposal-object-rest-spread",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]

}

