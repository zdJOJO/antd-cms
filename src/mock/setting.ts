/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-05 12:22:49
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-16 02:04:57
 * @FilePath: \antd-cms\src\mock\setting.ts
 */
// 使用 Mock
import Mock from 'mockjs'

export default Mock.mock('/setting', 'get', {
  status: 0,
  message: '@FIRST',
  'list|5000': [    // 属性 list 的值是一个数组，其中含有 1 到 10000 个元素
    {
      'id|10': /[a-z][A-Z][0-9]/,
      'name': '@first @last',
      'galaxy': 'Black Eye Galaxy',
      'age|1-1000000000': 0
    }
  ]
})