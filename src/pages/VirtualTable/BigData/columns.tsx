import React from 'react'
import { SortableHandle } from 'react-sortable-hoc';
import { DragIcon } from '@components/icons/customIcons';


const DragHandle = SortableHandle(() => (
  <span className="dragHand" style={{ color: '#999', cursor: 'grab' }} >
    < DragIcon />
  </span>
));

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 50,
    className: 'drag-visible',
    // render: () => (
    // <span className="dragHand" style={{ color: '#999', cursor: 'grab' }} >
    //   < DragIcon />
    // </span>
    // )
    render: () => <DragHandle />
  },
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