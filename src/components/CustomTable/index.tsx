/*
 * @Description: 基于antd样式的自定义表格，此表格具有 虚拟表格、 单元格编辑、 表格拖拽等功能
 * @Autor: zdJOJO
 * @Date: 2020-10-07 18:25:24
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-08 13:35:50
 * @FilePath: \antd-cms\src\components\CustomTable\index.tsx
 */

import React, { FC, useRef, useEffect, useState } from 'react';
import { Spin } from 'antd';

import { IColumn, ICustomTable } from './index.d';
import Row from './Row';
import Cell from './Cell';

import styles from './index.less';

const defaultWidth = 230;

// const getTotalWidth = (columns: IColumn[]): (number | undefined) => {
//   return columns.map(i => i.width || defaultWidth).reduce((x, y) => x + y)
// }

const CustomTable: FC<ICustomTable> = ({
  loading,
  columns,
  dataSource,
  rowKey,
  size
}) => {

  const [isLeft, setIsLeft] = useState<boolean>(true);

  const tableBodyRef = useRef<HTMLDivElement>(null);
  const tableHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    function clean() {
      (tableBodyRef.current as HTMLDivElement).removeEventListener('scroll', scrollHander)
    }

    const scrollHander = (event: any) => {
      const scrollLeft = event.target.scrollLeft;
      (tableHeadRef.current as HTMLDivElement).scrollLeft = scrollLeft;
      setIsLeft(scrollLeft === 0)
    }
    (tableBodyRef.current as HTMLDivElement).addEventListener('scroll', scrollHander)
    return () => {
      clean()
    }
  })

  let classStr = !loading ? styles.tableContainer : `${styles.tableContainer} ${styles.tableBlur}`;
  if (size === 'small') {
    classStr = `${classStr} ${styles.tableContainerSmall}`
  }

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableSpin}>

        {/* loading */}
        {loading &&
          <div className={styles.tableLoading}>
            <Spin className={styles.tableLoadingIcon} />
          </div>
        }

        <div
          className={classStr}
          style={{ height: 'calc(100% - 16px)' }}
        >

          {/* table head */}
          <div ref={tableHeadRef} className={styles.tableHeadContainer}>
            <div className={styles.tableHead}>
              {
                columns.map((column: IColumn, index: number) => (
                  <Cell
                    cellClassName={(column.fixed && index === 0 && !isLeft) ? styles.leftCellFixed : undefined}
                    style={{ width: column.width || defaultWidth }}
                    key={`${column.title}-${index}`}
                    renderContent={() => column.title}
                    type="th"
                  />
                ))
              }
            </div>
          </div>

          {/* table body */}
          <div
            ref={tableBodyRef}
            className={styles.tableBodyContainer}
            style={{ height: 'calc(100% - 22px)' }}
          >
            <div className={styles.tableBody}>
              {
                dataSource.map((row: any, index: number) => (
                  <Row
                    key={row[rowKey]}
                    rowData={row}
                    index={index}
                    columns={columns}
                    cellWidth={defaultWidth}
                    isLeft={isLeft}
                    type="td"
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomTable