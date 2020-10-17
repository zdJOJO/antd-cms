import React, { FC, memo } from 'react';
import isEqual from 'lodash/isEqual';
import { Form } from 'antd';

import { IEditRow, IColumn } from './index.d';
import styles from './index.less';
import EditCell from './EditCell';
import Cell from './Cell';


export const EditableContext = React.createContext<any>(null);


const EditRow: FC<IEditRow> = ({
  type,
  columns,
  rowData,
  index,
  cellWidth,
  isLeft,
  handleSave,
  ...restprops
}) => {

  const renderContent = (column: IColumn) => {
    if (!!column.render) {
      return column.render(rowData, index)
    }
    return rowData[column.dataIndex]
  }
  const [form] = Form.useForm();

  return (
    <div {...restprops} className={styles.tableRow}>
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          {
            columns.map((column: IColumn, _index: number) => {
              if (column.editable) {
                return (
                  <EditCell
                    style={{ width: column.width || cellWidth }}
                    type={type}
                    cellClassName={!isLeft && column.fixed && _index === 0 ? styles.leftCellFixed : undefined}
                    renderContent={() => renderContent(column)}
                    key={`${column.title}-${_index}`}
                    rowData={rowData}
                    handleSave={handleSave}
                    column={column}
                  />
                )
              } else {
                return (
                  <Cell
                    style={{ width: column.width || cellWidth }}
                    type={type}
                    cellClassName={!isLeft && column.fixed && _index === 0 ? styles.leftCellFixed : undefined}
                    renderContent={() => renderContent(column)}
                    key={`${column.title}-${_index}`}
                  />
                )
              }
            })
          }
        </EditableContext.Provider>
      </Form>
    </div >
  )
}

function arePropsEqual(prevProps: any, nextProps: any) {
  return isEqual(prevProps, nextProps)
}

export default memo(EditRow, arePropsEqual)