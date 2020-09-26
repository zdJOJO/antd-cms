/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 17:34:43
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-27 00:33:09
 * @FilePath: \antd-cms\src\route\index.tsx
 */

import React from "react"
import { Redirect, Route } from 'react-router-dom'
import { cloneDeep } from 'lodash'

/**
 * 自定义key，生成菜单map类型
 * @param {menus唯一属性值，如'path'} key 
 * @param {menus数据} menuList 
 */
export function getMenusMap(key = 'path', menuList = []) {
  const menusMap: any = {}
  const generateMap = (list: any[]) => {
    list.map(item => {
      if (item) {
        const { children } = item
        if (children && children.length) {
          generateMap(children)
        }
        menusMap[item[key]] = item
      }
    })
  }
  generateMap(menuList)
  return menusMap
}