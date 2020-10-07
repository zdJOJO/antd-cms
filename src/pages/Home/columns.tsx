import React from 'react'
import { Tag } from 'antd';

const columns: any[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: true,
    render: (record: any, index: number) => <Tag color="volcano">{record.name}</Tag>
  },
  {
    title: 'Galaxy',
    dataIndex: 'galaxy',
    fixed: true

  },
  {
    title: 'Age',
    dataIndex: 'age'

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
    dataIndex: 'province',
    fixed: true
  },
  {
    title: 'City',
    dataIndex: 'city',
    fixed: true

  }
];

export default columns;