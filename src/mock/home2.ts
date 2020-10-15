/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-05 12:22:49
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-08 21:57:01
 * @FilePath: \antd-cms\src\mock\home2.ts
 */
// 使用 Mock
import Mock, { Random } from 'mockjs'


export default Mock.mock('/home2', 'get', {
  status: 0,
  message: '@FIRST',
  'list|500': [    // 属性 list 的值是一个数组，其中含有 1 到 10000 个元素
    {
      'id|10': /[a-z][A-Z][0-9]/,
      'name': '@first @last',
      'galaxy': 'Sombrero Galaxy',
      'age|1-1000000000': 0,
      'year': Random.date('yy'),
      'month': Random.date('mm'),
      'day': Random.date('dd'),
      'province': Random.province(),
      'city': Random.city()
    }
  ]
})