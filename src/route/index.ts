/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 17:34:43
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-05 14:20:38
 * @FilePath: \antd-cms\src\route\index.ts
 */
import { IMenu } from '@types';

export const ROOT = '/app';
export const LOGIN = '/login';
export const RESOURCE = '/app/resource';
export const RESOURCE_ROLE = '/app/resource/role';
export const RESOURCE_FUND = '/app/resource/fund';
export const VTABLE = '/app/vtable';
export const SETTING = '/app/setting';


/**
 * 自定义key，生成菜单map类型
 * @param {menus 唯一属性值，如'path'} key
 * @param {menus 显示的值的key，如 name | en_name } showName
 * @param {menus 数据} menuList
 */
export function getBreadcrumbNameMap(menus: Array<IMenu>, key: string, showName: string): any {
  const menusMap: any = {}
  const generateMap = (list: any[]) => {
    for (let i = 0, len = list.length; i < len; i++) {
      if (!!list[i]) {
        const { children } = list[i]
        if (children && children.length) {
          generateMap(children)
        }
        menusMap[list[i][key]] = list[i][showName]
      }
    }
  }
  generateMap(menus);
  return menusMap
}