/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 18:45:37
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 23:59:17
 * @FilePath: \antd-cms\index.d.ts
 */

import { ReactNode } from "react";


/**
 * path需要保持唯一
 * permKey 表示权限Key值  permKey: true表示所有用户都有权限
 * enName 表示翻译文本对应的key
 */
interface IMenu {
  path: string
  name: string
  en_name: string
  permKey: string | boolean
  icon: string | ReactNode
  transKey: string
  children: Array<IMenu>
}