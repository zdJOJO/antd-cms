import React, { ReactNode } from 'react'
import { Space } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Galaxy',
    dataIndex: 'galaxy'
  },
  {
    title: 'Age',
    dataIndex: 'age'
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any): ReactNode => (
      <Space size="middle">
        <a>Show</a>
      </Space>
    )
  }
];

export default columns;