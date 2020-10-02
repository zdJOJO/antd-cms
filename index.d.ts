import { ReactNode } from 'react';

/**
 * path需要保持唯一
 * permKey 表示权限Key值  permKey: true表示所有用户都有权限
 * enName 表示翻译文本对应的key
 */
export interface IMenu {
  path: string
  name: string
  en_name: string
  permKey: string | boolean
  icon?: string | ReactNode
  children?: Array<IMenu>
}