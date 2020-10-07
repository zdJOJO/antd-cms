/*
 * @Description: react-beautiful-dnd
 * @Autor: zdJOJO
 * @Date: 2020-09-27 00:51:07
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-07 17:29:22
 * @FilePath: \antd-cms\src\pages\VirtualTable\DropDrag\index.tsx
 */

import React, { FC, memo, useState, useEffect, useRef } from 'react'

import { Row, Col, Table } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import columns from './columns';
import http from '@http';
import '@mock/interstellar';
import '@mock/interstellar2';

import './index.less'

interface IDropDrag {
}

const rowKey = 'id';
const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey'
});
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',

  // change background colour if dragging
  background: isDragging ? '#c1d6d0' : '#ffffff',

  // styles we need to apply on draggables
  ...draggableStyle
});

/**
 * Moves an item from one list to another list.
 */
const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;
  return result;
};

const DropDrag: FC<IDropDrag> = ({ ...props }) => {
  const dom = document.getElementById('pageContainer') as HTMLElement;
  const [dataLeft, setDataLeft] = useState<any[]>([]);
  const [dataRight, setDataRight] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const unmount = useRef(false);

  // 获取表格数据
  const getDatas = async () => {
    !unmount.current && setLoading(true)
    try {
      const results = await Promise.all([http.get('/tabledata'), http.get('/tabledata2')]);
      !unmount.current && setDataLeft(results[0].list);
      !unmount.current && setDataRight(results[1].list)
    } catch (error) {
      console.log(error);
    } finally {
      !unmount.current && setLoading(false)
    }
  }
  useEffect(() => {
    getDatas();
  }, [])

  useEffect(() => {
    return () => {
      unmount.current = true
    }
  }, [])


  function getList(droppableId: string) {
    if (droppableId === 'leftTable') {
      return dataLeft
    } else {
      return dataRight
    }
  }

  // 拖拽结束
  function onDragEnd(result: any) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    // dropped to self
    if (source.droppableId === destination.droppableId) return;

    // dropped between two tables
    const newResult = move(
      getList(source.droppableId),
      getList(destination.droppableId),
      source,
      destination
    );
    console.log(newResult);
    setDataLeft(newResult.leftTable)
    setDataRight(newResult.rightTable)
  }

  const DraggableBodyRow = ({ draggableId, index, rowData, ...restProps }: any) => {
    return (
      <Draggable
        draggableId={draggableId}
        index={index}
      >
        {(provided, snapshot) => (
          <tr
            {...restProps}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={
              getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )
            }
          >
            {
              columns.map((column: any, i: number) => (
                <td
                  style={{ width: column.width }}
                  key={i}
                >
                  {rowData[column.dataIndex]}
                </td>
              ))
            }
          </tr>
        )}
      </Draggable>
    )
  };

  const DraggableContainer = (props: any, droppableId: string) => {
    const data = droppableId === 'leftTable' ? [...dataLeft] : [...dataRight];
    return (
      <Droppable
        droppableId={droppableId}
      // mode="virtual"
      // renderClone={(provided, snapshot, rubric) => {
      //   const item = data[rubric.source.index];
      //   return (
      //     <div
      //       {...provided.draggableProps}
      //       {...provided.dragHandleProps}
      //       ref={provided.innerRef}
      //     >
      //       <DraggableBodyRow
      //         rowData={item}
      //         key={item.id}
      //         draggableId={item.id}
      //         index={rubric.source.index}
      //       />
      //     </div>
      //   )
      // }}
      >
        {(provided, snapshot) => (
          <tbody
            {...props}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {data.map((item, index) => (
              <DraggableBodyRow
                rowData={item}
                key={item.id}
                draggableId={item.id}
                index={index}
              />
            ))}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    )
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row>
        <Col span={12}>
          <Table
            className="dragTable"
            size="small"
            pagination={false}
            rowKey={rowKey}
            scroll={{
              y: dom.offsetHeight - 75
            }}
            columns={columns}
            dataSource={dataLeft}
            loading={loading}
            components={{
              body: {
                wrapper: (props: any) => DraggableContainer(props, 'leftTable'),
                row: DraggableBodyRow
              }
            }}
          />
        </Col>
        <Col span={11} offset={1}>
          <Table
            className="dragTable"
            size="small"
            pagination={false}
            rowKey={rowKey}
            scroll={{
              y: dom.offsetHeight - 75
            }}
            columns={columns}
            dataSource={dataRight}
            loading={loading}
          // components={{
          //   body: {
          //     wrapper: (props: any) => DraggableContainer(props, 'rightTable'),
          //     row: DraggableBodyRow
          //   }
          // }}
          />
        </Col>
      </Row>
    </DragDropContext>

  )
}

export default memo(DropDrag);