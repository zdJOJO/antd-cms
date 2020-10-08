import React, { FC, memo } from 'react';
import { isEqual } from 'lodash';
import { Form } from 'antd';

import { IRow, IColumn } from './index.d';
import styles from './index.less';
import EditCell from './EditCell';


export const EditableContext = React.createContext<any>(null);

interface IEditRow extends IRow {
  handleSave: (values: any) => void
}

const EditRow: FC<IEditRow> = ({
  type,
  columns,
  rowData,
  index,
  cellWidth,
  isLeft,
  handleSave
}) => {

  const renderContent = (column: IColumn) => {
    if (!!column.render) {
      return column.render(rowData, index)
    }
    return rowData[column.dataIndex]
  }
  const [form] = Form.useForm();

  return (
    <div className={styles.tableRow}>
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          {
            columns.map((column: IColumn, _index: number) => {
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