/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-27 00:05:23
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-01 17:18:07
 * @FilePath: \antd-cms\src\utils\index.ts
 */

import moment from 'dayjs';

// 时间转换
export const transformTime = (dataStr: string, pattern = 'YYYY-MM-DD HH:mm:ss'): any => moment(dataStr).format(pattern);

// 随即姓名生成器
export const getRandomName = (): string => {
  const firstname = ['李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴', '徐', '孙', '胡', '朱', '高', '林', '何', '郭'];
  const lastName = ['建华', '小明', '小红', '有为', '建刚', '小刚', '建国', '文革', '援朝', '国庆', '国富', '梅', '强', '琴琴', '红雷', '德华', '悟空'];
  var str1 = firstname[Math.floor(Math.random() * (firstname.length))];
  var str2 = lastName[Math.floor(Math.random() * (lastName.length))];
  return `${str1} ${str2}`;
}
