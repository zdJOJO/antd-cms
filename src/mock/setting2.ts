/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-05 12:22:49
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-21 22:26:03
 * @FilePath: \antd-cms\src\mock\setting2.ts
 */
// 使用 Mock
import Mock from 'mockjs'

export default Mock.mock('/setting2', 'get', {
  status: 0,
  message: '@FIRST',
  'list|5000': [    // 属性 list 的值是一个数组，其中含有 1 到 10000 个元素
    {
      'id|10': /[a-z][A-Z][0-9]/,
      'name1': '@first @last',
      'name2': '@first @last',
      'route|1-10000': 0
    }
  ]
})