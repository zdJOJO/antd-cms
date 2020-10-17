import React, { ReactNode } from 'react'
import { Tag } from 'antd';

const columns: any[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: true,
    render: (record: { name: React.ReactNode; }, _index: number): ReactNode => <Tag color="volcano">{_index} : {record.name}</Tag>
  },
  {
    title: 'Galaxy',
    dataIndex: 'galaxy',
    fixed: true,
    editable: true
  },
  {
    title: 'Age',
    dataIndex: 'age',
    editable: true
  },

  {
    title: 'Year',
    dataIndex: 'year'
  },
  {
    title: 'Month',
    dataIndex: 'month'
  },
  {
    title: 'Day',
    dataIndex: 'day'
  },
  {
    title: 'Province',
    dataIndex: 'province'
  },
  {
    title: 'City',
    dataIndex: 'city'
  }
];

export default columns;