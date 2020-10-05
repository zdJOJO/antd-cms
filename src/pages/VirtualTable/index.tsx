import React, { FC, memo, useEffect } from 'react'

import { Key } from 'antd/lib/table/interface';

import { VirtualTable } from '@components';
import columns from './columns';
import { usetableData } from '@hooks';
import '@mock/interstellar';


interface IVTable {
}

const rowSelection = {
  onChange: (selectedRowKeys: Key[], selectedRows: any[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name
  })
};

const VTable: FC<IVTable> = ({ ...props }) => {
  const dom = document.getElementById('pageContainer') as HTMLElement;
  const [data, loading, error, getData] = usetableData('/tabledata');
  useEffect(() => {
    getData()
  }, [])
  return (
    <VirtualTable
      rowKey="id"
      rowHeight={40}
      scroll={{
        y: dom.offsetHeight - 75
      }}
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  )
}

export default memo(VTable);