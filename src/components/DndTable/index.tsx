/*
 * @Description: 自定义表格，此表格具有 虚拟表格、 单元格编辑、 表格拖拽等功能
 * @Autor: zdJOJO
 * @Date: 2020-10-07 18:25:24
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-08 22:56:19
 * @FilePath: \antd-cms\src\components\DndTable\index.tsx
 */

import React, { FC, useRef, useEffect, useState } from 'react';
import { Spin, Empty } from 'antd';
import { FixedSizeList as List } from 'react-window';
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot
} from 'react-beautiful-dnd';

import { IColumn, ICustomTable, IEditRow } from './index.d';
import EditRow from './EditRow';
import Cell from './Cell';

import styles from './index.less';

const defaultWidth = 200;
// 获取宽度
const getTotalWidth = (columns: IColumn[]): (number | undefined) => {
  return columns.map(i => i.width || defaultWidth).reduce((x, y) => x + y)
}

interface IDragTable extends ICustomTable {
  droppableId: string
}

interface IDragRow extends IEditRow {
  isDragging: boolean
  provided: DraggableProvided
}

const getBackgroundColor = (isDragging: boolean, draggableStyle: any): string => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  // change background colour if dragging
  background: isDragging ? '#c1d6d0' : '#ffffff',
  // styles we need to apply on draggables
  ...draggableStyle
});

const DragTable: FC<IDragTable> = ({
  droppableId,
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
                <Droppable
                  droppableId={droppableId}
                  mode="virtual"
                  renderClone={(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot,
                    rubric: DraggableRubric
                  ) => {
                    const rowData = dataSource[rubric.source.index]
                    return (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // isDragging={snapshot.isDragging}
                        ref={provided.innerRef}
                        data-is-dragging={snapshot.isDragging}
                        data-testid={rowData.id}
                        data-index={rubric.source.index}
                      >
                        <EditRow
                          rowData={rowData}
                          style={{ margin: 0 }}
                          key={rowData[rowKey]}
                          index={rubric.source.index}
                          columns={columns}
                          cellWidth={defaultWidth}
                          isLeft={isLeft}
                          type="td"
                          handleSave={handleSave}
                        />
                      </div>
                    )
                  }}
                >
                  {(droppableProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                    // Add an extra item to our list to make space for a dragging item
                    // Usually the DroppableProvided.placeholder does this, but that won't
                    // work in a virtual list
                    const itemCount: number = snapshot.isUsingPlaceholder
                      ? virtualListStyle.itemCount + 1
                      : virtualListStyle.itemCount;
                    return (
                      <List
                        style={{
                          backgroundColor: getBackgroundColor(
                            snapshot.isDraggingOver,
                            Boolean(snapshot.draggingFromThisWith)
                          ),
                          transition: 'background-color 0.2s ease',
                          // We add this spacing so that when we drop into an empty list we will animate to the correct visual position.
                          padding: 6
                        }}
                        height={height}
                        width={width}
                        itemCount={itemCount}
                        itemSize={virtualListStyle.itemSize}
                        outerRef={droppableProvided.innerRef}
                        itemData={dataSource}
                      >
                        {
                          ({ data, index, style }: any) => {
                            const item = data[index];
                            // Faking some nice spacing around the items
                            const patchedStyle = {
                              ...style
                              // left: style.left + grid,
                              // top: style.top + grid,
                              // width: `calc(${style.width} - ${grid * 2}px)`,
                              // height: style.height - grid,
                            };
                            if (!item) {
                              return null;
                            }
                            return (
                              <Draggable draggableId={item.id} index={index} key={item.id}>
                                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    // isDragging={snapshot.isDragging}
                                    ref={provided.innerRef}
                                    data-is-dragging={snapshot.isDragging}
                                    data-testid={item.id}
                                    data-index={index}
                                  >
                                    <EditRow
                                      style={patchedStyle}
                                      key={item[rowKey]}
                                      rowData={item}
                                      index={index}
                                      columns={columns}
                                      cellWidth={defaultWidth}
                                      isLeft={isLeft}
                                      type="td"
                                      handleSave={handleSave}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )
                          }
                        }
                      </List>
                    );
                  }}
                </Droppable>
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

export default DragTable