import React, { FC, memo, ReactNode } from 'react';
import _ from 'lodash';

import { IRow, IColumn } from './index.d';
import styles from './index.less';

import Cell from './Cell';


const Row: FC<IRow> = ({
  columns,
  rowData,
  type,
  cellWidth,
  isLeft
}) => {
  return (
    <div className={styles.tableRow}>
      {
        columns.map((column: IColumn, index: number) => {
          return (
            <Cell
              cellClassName={!isLeft && column.fixed && index === 0 ? styles.leftCellFixed : undefined}
              style={{ width: column.width || cellWidth }}
              key={`${column.title}-${index}`}
              renderContent={() => !!column.render ? column.render(rowData, index) : rowData[column.dataIndex]}
              type={type}
            />
          )
        })
      }
    </div >
  )
}

function arePropsEqual(prevProps: any, nextProps: any) {
  return _.isEqual(prevProps, nextProps)
}

export default memo(Row, arePropsEqual)