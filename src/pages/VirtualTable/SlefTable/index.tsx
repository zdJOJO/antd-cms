import React, { ReactElement, ReactNode } from 'react'

import { Popconfirm, notification, Row, Col } from 'antd';
import { DragDropContext, DraggableLocation, DropResult } from 'react-beautiful-dnd';

import { CustomTable } from '@components';
import { DeleteOutlined } from '@components/icons/antdIcons';
import columns from './columns';
import { useTableData } from '@hooks';
import '@mock/home';
import '@mock/home2';

function SlefTable(): ReactElement {
  const dom = document.getElementById('pageContainer') as HTMLElement;
  const [dataSource, loading, setDataSource] = useTableData('/home')
  const [dataSource2, loading2, setDataSource2] = useTableData('/home2')

  // 删除行
  const handleDelete = (record: any, _index: number) => {
    console.log(_index);
    setDataSource(dataSource => dataSource.filter(item => item.id !== record.id));
    notification.info({
      message: `No.${_index} ${record.name} 删除成功 😊`,
      duration: 3,
      placement: 'bottomRight'
    })
  }

  // 编辑保存
  const handleSave = (values: any, type: string) => {
    const temp = type === '1' ? [...dataSource] : [...dataSource2];
    temp.some((rowData: any, _index: number) => {
      if (rowData.id === values.id) {
        temp[_index] = values;
        return true
      }
    })
    type === '1' ? setDataSource(temp) : setDataSource2(temp)
  }

  // 拖拽结束 回调
  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }
    const source: DraggableLocation = result.source;
    const destination: DraggableLocation = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

  }

  const tableColumns = [
    ...columns,
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: true,
      width: 100,
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
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          <Col span={13}>
            <CustomTable
              size="small"
              rowKey="id"
              columns={tableColumns}
              loading={loading}
              dataSource={dataSource}
              virtualListStyle={{
                height: dom.offsetHeight,
                width: dom.clientWidth,
                itemCount: dataSource.length,
                itemSize: 48
              }}
              handleSave={(values) => { handleSave(values, '1') }}
            />
          </Col>
          <Col span={10} offset={1}>
            <CustomTable
              size="small"
              rowKey="id"
              columns={tableColumns}
              loading={loading2}
              dataSource={dataSource2}
              virtualListStyle={{
                height: dom.offsetHeight,
                width: dom.clientWidth,
                itemCount: dataSource2.length,
                itemSize: 48
              }}
              handleSave={(values) => { handleSave(values, '2') }}
            />
          </Col>
        </Row>
      </DragDropContext>
    </div>
  )
}

export default SlefTable;