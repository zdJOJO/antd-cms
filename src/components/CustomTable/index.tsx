/*
 * @Description: 自定义表格，此表格具有 虚拟表格、 单元格编辑、 表格拖拽等功能
 * @Autor: zdJOJO
 * @Date: 2020-10-07 18:25:24
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-08 18:11:24
 * @FilePath: \antd-cms\src\components\CustomTable\index.tsx
 */

import React, { FC, useRef, useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import { FixedSizeList as List } from 'react-window';

import { IColumn, ICustomTable } from './index.d';
import EditRow from './EditRow';
import Cell from './Cell';

import styles from './index.less';

const defaultWidth = 200;
// 获取宽度
const getTotalWidth = (columns: IColumn[]): (number | undefined) => {
  return columns.map(i => i.width || defaultWidth).reduce((x, y) => x + y)
}

const CustomTable: FC<ICustomTable> = ({
  loading,
  columns,
  dataSource,
  rowKey,
  size,
  virtualListStyle,
  handleSave
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

  let width: number = virtualListStyle.width > (getTotalWidth(columns) as number) ? virtualListStyle.width : (getTotalWidth(columns) as number);
  width = width + 17; // 加上右侧滚动条的宽度
  let height = virtualListStyle.height;
  if (!!tableHeadRef.current) {
    height = virtualListStyle.height - (tableHeadRef.current as HTMLDivElement).clientHeight - 17 - 20;
  }
  const isEmpty = dataSource.length === 0;
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableSpin}>

        {/* loading */}
        {loading &&
          <div className={styles.tableLoading}>
            <Spin className={styles.tableLoadingIcon} />
          </div>
        }

        <div className={classStr}>

          {/* table head */}
          <div ref={tableHeadRef} className={styles.tableHeadContainer}>
            <div
              className={styles.tableHead}
              style={isEmpty ? { width: 'auto', display: 'flex' } : { width }}
            >
              {
                columns.map((column: IColumn, index: number) => {
                  let thCellstyle: any = { width: column.width || defaultWidth };
                  if (isEmpty) {
                    thCellstyle = { flex: 1 }
                  }
                  return (
                    <Cell
                      cellClassName={(column.fixed && index === 0 && !isLeft) ? styles.leftCellFixed : undefined}
                      style={thCellstyle}
                      key={`${column.title}-${index}`}
                      renderContent={() => column.editable ? <span><i style={{ color: 'red' }}>*</i>{column.title}</span> : column.title}
                      type="th"
                    />
                  )
                })
              }
            </div>
          </div>

          {/* table body */}
          <div
            ref={tableBodyRef}
            className={styles.tableBodyContainer}
          >
            <div className={styles.tableBody}>
              {/* 有数据 */}
              {!!virtualListStyle && !isEmpty &&
                < List
                  height={height}
                  width={width}
                  itemCount={virtualListStyle.itemCount}
                  itemSize={virtualListStyle.itemSize}
                >
                  {
                    ({ index, style }: any) => {
                      const record = dataSource[index];
                      return (
                        <EditRow
                          style={style}
                          key={record[rowKey]}
                          rowData={record}
                          index={index}
                          columns={columns}
                          cellWidth={defaultWidth}
                          isLeft={isLeft}
                          type="td"
                          handleSave={handleSave}
                        />
                      )
                    }
                  }
                </List>
              }

              {/* 无数据 */}
              {isEmpty &&
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default CustomTable