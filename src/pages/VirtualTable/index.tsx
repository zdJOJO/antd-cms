import React, { FC, memo, useState, useEffect } from 'react'

import { Key } from 'antd/lib/table/interface';

import { VirtualTable } from '@components';
import columns from './columns';
import http from '@http';
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
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取表格数据
  const getData = async () => {
    setLoading(true)
    try {
      const result = await http.get('/tabledata');
      setData([...result.list])
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <VirtualTable
      rowKey="id"
      rowHeight={40}
      scroll={{
        y: dom.offsetHeight - 75
      }}
      // rowSelection={rowSelection}
      columns={columns}
      dataSource={data}
      loading={loading}
    />
  )
}

export default memo(VTable);