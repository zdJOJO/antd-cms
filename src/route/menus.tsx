/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 23:36:08
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 23:59:47
 * @FilePath: \antd-cms\src\route\menus.tsx
 */

import React from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  SettingOutlined,
  TableOutlined
} from '@ant-design/icons';

export const menus: Array<IMenu> = [
  {
    name: '首页',
    en_name: 'Home',
    path: '/',
    icon: <HomeOutlined />,
    permKey: true,
    children: []
  },
  {
    name: '资源管理',
    en_name: 'Resource Management',
    path: '/app/resource',
    icon: <ApartmentOutlined />,
    permKey: 'menu.resource',
    children: [
      {
        name: '角色管理',
        en_name: 'Role Management',
        path: '/app/resource/roleManage',
        permKey: 'menu.roleManage',
      },
      {
        name: '资金管理',
        en_name: 'Fund Management',
        path: '/app/resource/fundManage',
        permKey: 'menu.fundManage',
      }
    ]
  },
  {
    name: '虚拟表格',
    en_name: 'Virtual Table',
    path: '/app/vtable',
    icon: <TableOutlined />,
    permKey: true
  },
  {
    name: '系统设置',
    en_name: 'Setting',
    path: '/app/setting',
    icon: <SettingOutlined />,
    permKey: true,
  },
]