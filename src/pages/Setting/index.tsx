import React, { ReactNode, useState } from 'react'

import { Form, Button, Row, Col, Spin } from 'antd';

import columns from './columns';
import { Column, Table as VirtualTable } from 'react-virtualized';
import { useTableData } from '@hooks';
import EditTableCell from './EditTableCell';
import '@mock/setting';

// only needs to be imported once
import 'react-virtualized/styles.css';
import './index.less';

const acitonWidth = 120;
const columnsWidth = columns.map(i => i.width).reduce((a, b) => a + b);

function Setting(): ReactNode {
  const [form] = Form.useForm();
  const [dataSource, loading, setDataSource] = useTableData('/setting');
  const [editingId, setEditingId] = useState<string>('');

  const isEditing = (record: any): boolean => record.id === editingId;

  const edit = (record: any) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const cancel = () => {
    setEditingId('');
  };

  return (
    <Row justify="end">
      <Col
        span={12}
        style={{
          width: columnsWidth + acitonWidth
        }}
      >
        <div className="virtual-table-container" >
          <Spin wrapperClassName="virtual-loading" spinning={loading}>
            <Form form={form} component={false}>
              <VirtualTable
                gridClassName="virtual-tablebody"
                headerClassName="virtual-headCell"
                rowClassName="virtual-row"
                width={columnsWidth + acitonWidth}
                height={745}
                headerHeight={40}
                rowHeight={60}
                rowCount={dataSource.length}
                rowGetter={({ index }) => dataSource[index]}
              >
                {
                  columns.map((column: any) => {
                    return (
                      <Column
                        className="virtual-cell"
                        style={{ overflow: 'unset' }}
                        key={column.dataIndex}
                        label={column.title}
                        dataKey={column.dataIndex}
                        width={column.width}
                        cellRenderer={({
                          rowData,
                          dataKey,
                          ...props
                        }) => {
                          return (
                            <EditTableCell
                              {...props}
                              columnData={column}
                              rowData={rowData}
                              dataKey={dataKey}
                              isEditing={isEditing(rowData)}
                            />
                          )
                        }}
                      />
                    )
                  })
                }
                <Column
                  className="virtual-cell"
                  label="Action"
                  dataKey="aciton"
                  width={120}
                  cellRenderer={({ rowData }) => {
                    const editable = isEditing(rowData);
                    return editable
                      ? (
                        <>
                          <Button style={{ paddingLeft: 0 }} type="link" onClick={cancel}>确定</Button>
                          <Button style={{ paddingLeft: 0 }} type="link" onClick={cancel}>取消</Button>
                        </>
                      )
                      :
                      (
                        <>
                          <Button style={{ paddingLeft: 0 }} type="link" onClick={() => { edit(rowData) }}>编辑</Button>
                          <Button style={{ paddingLeft: 0 }} type="link" >删除</Button>
                        </>
                      )
                  }}
                />
              </VirtualTable>
            </Form>
          </Spin>
        </div>
      </Col>
    </Row>
  )
}

export default Setting;