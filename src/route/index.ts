/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 17:34:43
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-01 17:15:10
 * @FilePath: \antd-cms\src\route\index.ts
 */


export const ROOT = '/';
export const LOGIN = '/login';
export const RESOURCE = '/app/resource';
export const RESOURCE_ROLE = '/app/resource/role';
export const RESOURCE_FUND = '/app/resource/fund';
export const VTABLE = '/app/vtable';
export const SETTING = '/app/setting';


/**
 * 自定义key，生成菜单map类型
 * @param {menus唯一属性值，如'path'} key
 * @param {menus数据} menuList
 */
export function getMenusMap(key = 'path', menuList = []): any {
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