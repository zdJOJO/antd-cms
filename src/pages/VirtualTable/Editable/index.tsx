import React, { ReactElement, useState } from 'react'

import { Row, Col, Button } from 'antd';
import { AutoSizer } from 'react-virtualized';

import {
  leftColumns,
  rightColumns
} from './columns';
import { useTableData } from '@hooks';
import { CustomVTable } from '@components';

import '@mock/setting';

const acitonWidth = 120;
const emptyData = {
  name1: '',
  name2: '',
  route: 0
}

function Editable(): ReactElement {
  const [leftData, leftLoading] = useTableData('/setting');
  const [rightData, setRightData] = useState<any[]>([]);

  const add = () => {
    const temp = [...rightData];
    temp.push({
      ...emptyData,
      id: `add-${new Date().getTime()}`
    });
    setRightData(temp);
  }

  const remove = (record: any) => {
    let temp = [...leftData];
    temp = temp.filter(k => k.id !== record.id)
    setRightData(temp);
  }

  const handleSave = (row: any) => {
    const newData = [...rightData];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    setRightData(newData)
  };

  const newleftColumns = [
    ...rightColumns,
    {
      title: 'Action',
      dataIndex: 'action',
      width: acitonWidth,
      render: (text: string, record: any) => (
        <Button
          style={{ paddingLeft: 0 }}
          type="link"
          onClick={() => remove(record)}
        >删除</Button>
      )
    }
  ]

  return (
    <Row justify="space-between" >
      <Col span={13} style={{ height: 745 }} >
        <AutoSizer style={{ width: '100%', height: '100%' }}>
          {({ height, width }) => (
            <CustomVTable
              width={width}
              height={height}
              columns={leftColumns}
              dataSource={leftData}
              loading={leftLoading}
            />
          )}
        </AutoSizer>
      </Col>
      <Col span={10} offset={1} style={{ height: 745 }}>
        <AutoSizer style={{ width: '100%', height: '100%' }}>
          {({ height, width }) => (
            <CustomVTable
              width={width}
              height={height}
              columns={newleftColumns}
              dataSource={rightData}
              handleSave={handleSave}
            />
          )}
        </AutoSizer>
        <Button
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            left: 0
          }}
          type="dashed"
          onClick={add}
        > + 增加</Button>
      </Col>
    </Row>
  )
}

export default Editable;