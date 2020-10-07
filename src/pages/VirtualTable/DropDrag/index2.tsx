/*
 * @Description: react-sortable-hoc
 * @Autor: zdJOJO
 * @Date: 2020-10-07 13:41:50
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-07 13:42:38
 * @FilePath: \antd-cms\src\pages\VirtualTable\DropDrag\index2.tsx
 */

import React, { FC, memo, useState, useEffect, useRef } from 'react'

import { Row, Col, Table } from 'antd';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

import columns from '../BigData/columns';
import http from '@http';
import '@mock/interstellar';
import '@mock/interstellar2';

import './index.less'

interface IDropDrag {
}

const rowKey = 'id';
const SortableItem = SortableElement((props: any) => <tr {...props} />);
const SortableBox = SortableContainer((props: any) => <tbody {...props} />);

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

  // 拖拽开始
  function onSortStart({ node, index, collection, isKeySorting }: any) {
    console.log(node);
    console.log(index);
    console.log(collection);
    console.log(isKeySorting);
  }

  // 拖拽结束
  function onSortEnd({ oldIndex, newIndex }: any) {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([...dataRight], oldIndex, newIndex).filter((el: any) => !!el);
      console.log('Sorted items: ', newData);
      // setDataLeft(newData);
      setDataRight(newData)
    }
  }

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataRight.findIndex(x => x[rowKey] === restProps['data-row-key']);
    return (
      <SortableItem
        className={className}
        index={index}
        {...restProps}
      />
    )
  };

  const DraggableContainer = (props: any) => (
    <SortableBox
      useDragHandle
      helperClass="row-dragging"
      onSortStart={onSortStart}
      onSortEnd={onSortEnd}
      {...props}
    />
  );

  return (
    <>
      <Row>
        <Col span={15}>
          <Table
            size="small"
            pagination={false}
            rowKey={rowKey}
            scroll={{
              y: dom.offsetHeight - 75
            }}
            columns={columns}
            dataSource={dataLeft}
            loading={loading}
          // components={{
          //   body: {
          //     wrapper: DraggableContainer,
          //     row: DraggableBodyRow
          //   }
          // }}
          />
        </Col>
        <Col span={8} offset={1}>
          <Table
            size="small"
            pagination={false}
            rowKey={rowKey}
            scroll={{
              y: dom.offsetHeight - 75
            }}
            columns={columns}
            dataSource={dataRight}
            loading={loading}
            components={{
              body: {
                wrapper: DraggableContainer,
                row: DraggableBodyRow
              }
            }}
          />
        </Col>
      </Row>
    </>

  )
}

export default memo(DropDrag);