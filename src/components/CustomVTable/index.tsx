import React, { FC } from 'react'

import { Form, Spin } from 'antd';

import { Column, Table as VirtualTable } from 'react-virtualized';
import EditTableCell from './EditTableCell';

import './index.less';

interface CustomVTableProps {
  width: number
  height: number
  columns: any[]
  dataSource: any[]
  loading?: boolean,
  handleSave?: (newRowData: any) => void
}

const CustomVTable: FC<CustomVTableProps> = ({
  width,
  height,
  columns,
  dataSource,
  loading,
  handleSave
}) => {
  const [form] = Form.useForm();
  return (
    <div className="virtual-table-container" >
      <Spin wrapperClassName="virtual-loading" spinning={loading || false}>
        <Form form={form} component={false}>
          <VirtualTable
            gridClassName="virtual-tablebody"
            headerClassName="virtual-headCell"
            rowClassName="virtual-row"
            width={width}
            height={height}
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
                      if (column.dataIndex === 'action') {
                        return column.render(rowData[dataKey], rowData)
                      } else {
                        return (
                          <EditTableCell
                            {...props}
                            form={form}
                            columnData={column}
                            rowData={rowData}
                            dataKey={dataKey}
                            handleSave={(newRowData: any) => { !!handleSave && handleSave(newRowData) }}
                          />
                        )
                      }
                    }}
                  />
                )
              })
            }
          </VirtualTable>
        </Form>
      </Spin>
    </div>
  )
}


export default CustomVTable;