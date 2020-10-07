import React from 'react'
import { SortableHandle } from 'react-sortable-hoc';
import { DragIcon } from '@components/icons/customIcons';
import { ColumnsType } from 'antd/lib/table';


const DragHandle = SortableHandle(() => (
  <span className="dragHand" style={{ color: '#999', cursor: 'grab' }} >
    < DragIcon />
  </span>
));

const columns: ColumnsType = [
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
  }
];

export default columns;