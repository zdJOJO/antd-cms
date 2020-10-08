import React, { FC, memo } from 'react';
import { isEqual } from 'lodash';

import { IRow, IColumn } from './index.d';
import styles from './index.less';

import Cell from './Cell';


const Row: FC<IRow> = ({
  columns,
  rowData,
  index,
  type,
  cellWidth,
  isLeft
}) => {

  const renderContent = (column: IColumn) => {
    if (!!column.render) {
      return column.render(rowData, index)
    }
    return rowData[column.dataIndex]
  }

  return (
    <div className={styles.tableRow}>
      {
        columns.map((column: IColumn, _index: number) => {
          return (
            <Cell
              cellClassName={!isLeft && column.fixed && _index === 0 ? styles.leftCellFixed : undefined}
              style={{ width: column.width || cellWidth }}
              key={`${column.title}-${_index}`}
              renderContent={() => renderContent(column)}
              type={type}
            />
          )
        })
      }
    </div >
  )
}

function arePropsEqual(prevProps: any, nextProps: any) {
  return isEqual(prevProps, nextProps)
}

export default memo(Row, arePropsEqual)