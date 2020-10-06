import React, { FC, memo, useState, useEffect } from 'react'

import { Key } from 'antd/lib/table/interface';

import { Row, Col, Table } from 'antd';
import columns from '../BigData/columns';
import http from '@http';
import '@mock/interstellar';
import '@mock/interstellar2';

interface IDropDrag {
}


const DropDrag: FC<IDropDrag> = ({ ...props }) => {
  const dom = document.getElementById('pageContainer') as HTMLElement;
  const [dataLeft, setDataLeft] = useState<any[]>([]);
  const [dataRight, setDataRight] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 获取表格数据
  const getDatas = async () => {
    setLoading(true)
    try {
      const results = await Promise.all([http.get('/tabledata'), http.get('/tabledata2')]);
      setDataLeft(results[0].list);
      setDataRight(results[1].list)
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDatas();
  }, [])
  return (
    <>
      <Row>
        <Col span={17}>
          <Table
            size="small"
            pagination={false}
            rowKey="id"
            scroll={{
              y: dom.offsetHeight - 75
            }}
            columns={columns}
            dataSource={dataLeft}
            loading={loading}
          />
        </Col>
        <Col span={6} offset={1}>
          <Table
            size="small"
            pagination={false}
            rowKey="id"
            scroll={{
              y: dom.offsetHeight - 75
            }}
            columns={columns}
            dataSource={dataRight}
            loading={loading}
          />
        </Col>
      </Row>
    </>

  )
}

export default memo(DropDrag);