import React, { ReactNode, useEffect, useState, useRef } from 'react'

import { Popconfirm } from 'antd';

import { CustomTable } from '@components';
import { DeleteOutlined } from '@components/icons/antdIcons';
import columns from './columns';
import http from '@http';
import '@mock/home';

import classes from './index.less';


function Home(): ReactNode {
  const unmount = useRef(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取表格数据
  const getDatas = async () => {
    !unmount.current && setLoading(true);
    try {
      const results = await http.get('/home')
      !unmount.current && setDataSource(results.list);
    } catch (error) {
      console.log(error);
    } finally {
      !unmount.current && setLoading(false)
    }
  }
  useEffect(() => {
    getDatas();
  }, [])
  useEffect(() => {
    return () => {
      unmount.current = true
    }
  }, [])

  // 删除行
  const handleDelete = (record: any, _index: number) => {
    console.log(record.name);
    console.log(_index);
    console.log(dataSource);
  }

  const tableColumns = [
    ...columns,
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: true,
      render: (record: any, _index: number): ReactNode => (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record, _index)}
        >
          <a href="#"><DeleteOutlined /></a>
        </Popconfirm>
      )
    }
  ];
  return (
    <div className={classes.welcome} >
      <CustomTable
        size="small"
        rowKey="id"
        columns={tableColumns}
        loading={loading}
        dataSource={dataSource}
      />
    </div>
  )
}

export default Home;