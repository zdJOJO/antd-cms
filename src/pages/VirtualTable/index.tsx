import React, { FC, memo, useEffect } from 'react'

import { Table } from 'antd';

import { Key } from 'antd/lib/table/interface';
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

  const [data, loading, error, getData] = usetableData('/tabledata');
  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <Table
        pagination={false}
        size="small"
        rowKey="id"
        scroll={{
          y: '79vh'
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        columns={columns}
        dataSource={data}
        loading={loading}
      />
    </>
  )
}

export default memo(VTable);