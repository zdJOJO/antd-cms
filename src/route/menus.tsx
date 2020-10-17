/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 23:36:08
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-17 12:37:34
 * @FilePath: \antd-cms\src\route\menus.tsx
 */
import React from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  SettingOutlined,
  TableOutlined
} from '@components/icons/antdIcons';

import {
  ROOT,
  RESOURCE,
  RESOURCE_ROLE,
  RESOURCE_FUND,
  VTABLE,
  SETTING, VTABLE_BIGDATA, VTABLE_DRAGDROP, VTABLE_EDITABLE, VTABLE_SELF
} from './';
import { IMenu } from '@types';

export const menus: Array<IMenu> = [
  {
    name: 'Nebula',
    en_name: 'Nebula',
    path: ROOT,
    icon: <HomeOutlined />,
    permKey: true
  },
  {
    name: '管理',
    en_name: 'Resource Management',
    path: RESOURCE,
    icon: <ApartmentOutlined />,
    permKey: true,
    children: [
      {
        name: '角色管理',
        en_name: 'Role',
        path: RESOURCE_ROLE,
        permKey: 'menu.roleManage'
      },
      {
        name: '资金管理',
        en_name: 'Fund',
        path: RESOURCE_FUND,
        permKey: 'menu.fundManage'
      }
    ]
  },
  {
    name: '星际表格',
    en_name: 'Interstellar Table',
    path: VTABLE,
    icon: <TableOutlined />,
    permKey: true,
    children: [
      {
        name: '大数据表格',
        en_name: 'Big Data',
        path: VTABLE_BIGDATA,
        permKey: true
      },
      {
        name: '拖拽表格',
        en_name: 'Drag & Drop',
        path: VTABLE_DRAGDROP,
        permKey: true
      },
      {
        name: '可编辑表格',
        en_name: 'Editable',
        path: VTABLE_EDITABLE,
        permKey: true
      },
      {
        name: '自制表格',
        en_name: 'Make By Self',
        path: VTABLE_SELF,
        permKey: true
      }
    ]
  },
  {
    name: '系统设置',
    en_name: 'Setting',
    path: SETTING,
    icon: <SettingOutlined />,
    permKey: true
  }
];