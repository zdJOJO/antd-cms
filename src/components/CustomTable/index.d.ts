
/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-10-07 18:36:12
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-08 17:31:43
 * @FilePath: \antd-cms\src\components\CustomTable\index.d.ts
 */

import React, { ReactNode, RefAttributes, HTMLAttributes } from 'react';

export interface IColumn {
  title: string
  dataIndex: string
  width?: number
  key?: string
  editable?: boolean
  fixed?: boolean
  render?: (record: any, index: number) => string | ReactNode
}

export interface ICell extends HTMLAttributes<HTMLDivElement> {
  cellClassName?: string | undefined
  type: 'th' | 'td'
  renderContent?: () => string | ReactNode
}

export interface IRow extends HTMLAttributes<HTMLDivElement> {
  type: 'th' | 'td'
  columns: Array<IColumn>
  rowData: any,
  index: number
  cellWidth: number
  isLeft?: boolean
}

export interface ICustomTable extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  columns: Array<IColumn>
  dataSource: any[]
  rowKey: string
  scroll?: {
    x?: number | string
    y?: number | string
  }
  size?: 'default' | 'small'
  virtualListStyle: {
    height: number
    width: number
    itemCount: number
    itemSize: number
  }
  handleSave: (values: any) => void
}

export const Cell: React.ForwardRefExoticComponent<ICell & RefAttributes<HTMLDivElement>>;
export const CustomTable: React.ForwardRefExoticComponent<ICustomTable & RefAttributes<HTMLDivElement>>;