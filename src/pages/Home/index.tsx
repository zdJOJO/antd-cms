import React, { FC, useState, useEffect, useRef } from 'react'

import { Table } from 'antd';

import classes from './index.less';
import { CustomTable } from '@components';
import columns from './columns';
import http from '@http';
import '@mock/home';

interface IHome {

}

const Home: FC<IHome> = (props) => {
  const dom = document.getElementById('pageContainer') as HTMLElement;
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const unmount = useRef(false);

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

  return (
    <>
      <div className={classes.welcome} >
        <CustomTable
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          size="small"
          rowKey="id"
        />
      </div>
    </>
  )
}

export default Home;