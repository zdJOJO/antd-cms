import React, { FC, memo, useState, useEffect, useRef } from 'react'

import { Key } from 'antd/lib/table/interface';

import { VirtualTable } from '@components';
import columns from './columns';
import http from '@http';
import '@mock/interstellar';

interface IBigData {
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

const BigData: FC<IBigData> = ({ ...props }) => {
  const dom = document.getElementById('pageContainer') as HTMLElement;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const unmount = useRef(false);  // 组件卸载时候，防止修改state

  // 获取表格数据
  const getData = async () => {
    !unmount.current && setLoading(true)
    try {
      const result = await http.get('/tabledata');
      !unmount.current && setData([...result.list])
    } catch (error) {
      console.log(error);
    } finally {
      !unmount.current && setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  // 卸载组件
  useEffect(() => {
    return () => {
      unmount.current = true;
    }
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

export default memo(BigData);