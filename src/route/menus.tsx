/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-09-26 23:36:08
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 17:22:56
 * @FilePath: \antd-cms\src\route\menus.tsx
 */
import React from 'react';
import {
  HomeOutlined,
  ApartmentOutlined,
  SettingOutlined,
  TableOutlined
} from '@utils/antdIcons';

import {
  ROOT,
  VTABLE,
  SETTING
} from './';
import { IMenu } from 'types/index';
import { OrderedListOutlined } from '@ant-design/icons';



export const menus: Array<IMenu> = [
  {
    name: '订单拆分',
    en_name: '订单拆分',
    path: ROOT,
    icon: <OrderedListOutlined />,
    permKey: true,
    children: []
  }
  // {
  //   name: '虚拟表格',
  //   en_name: 'Virtual Table',
  //   path: VTABLE,
  //   icon: <TableOutlined />,
  //   permKey: true
  // },
  // {
  //   name: '系统设置',
  //   en_name: 'Setting',
  //   path: SETTING,
  //   icon: <SettingOutlined />,
  //   permKey: true
  // }
];