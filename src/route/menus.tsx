/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 23:36:08
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-03 00:20:11
 * @FilePath: \antd-cms\src\route\menus.tsx
 */
import React, { ReactNode } from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  SettingOutlined,
  TableOutlined
} from '@utils/antdIcons';

import {
  ROOT,
  RESOURCE,
  RESOURCE_ROLE,
  RESOURCE_FUND,
  VTABLE,
  SETTING
} from './';
import { IMenu } from 'types/index';

export const menus: Array<IMenu> = [
  {
    name: '首页',
    en_name: 'Home',
    path: ROOT,
    icon: <HomeOutlined />,
    permKey: true,
    children: []
  },
  {
    name: '资源管理',
    en_name: 'Resource Management',
    path: RESOURCE,
    icon: <ApartmentOutlined />,
    permKey: 'menu.resource',
    children: [
      {
        name: '角色管理',
        en_name: 'Role Management',
        path: RESOURCE_ROLE,
        permKey: 'menu.roleManage'
      },
      {
        name: '资金管理',
        en_name: 'Fund Management',
        path: RESOURCE_FUND,
        permKey: 'menu.fundManage'
      }
    ]
  },
  {
    name: '虚拟表格',
    en_name: 'Virtual Table',
    path: VTABLE,
    icon: <TableOutlined />,
    permKey: true
  },
  {
    name: '系统设置',
    en_name: 'Setting',
    path: SETTING,
    icon: <SettingOutlined />,
    permKey: true
  }
]