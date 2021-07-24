/* eslint-disable react/no-multi-comp */
/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2021-07-24 13:18:16
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 17:19:52
 * @FilePath: \antd-cms\src\pages\Home\index.tsx
 */
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tag, Upload } from 'antd';
import React, { FC, memo, useEffect, useState } from 'react';
import defaultData from './data';
import DragTag from './DragCell';
import DropCell from './DropCell';

import classes from './index.less';

interface IDataItem {
  id: number
  category: string
  combinations: string[]
  orderType: 'Z04' | 'Z09' | null
  backOrderNo: string | null
  resultOrderNo: string | null
  saleNumber: 10 | null
  moveNumber: 10 | null
}

interface IHome {
}

const { CheckableTag } = Tag;

const Home: FC<IHome> = (props) => {

  const [dataSource, setDataSource] = useState<IDataItem[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    setDataSource(defaultData as IDataItem[])
  }, [])

  const columns: any[] = [
    {
      title: '退货来源分类',
      dataIndex: 'category',
      key: 'category',
      render: (text: string, record: any) =>
        text
          ?
          (
            <DragTag
              dragKey="dragValue-to-right"
              dragValue={{
                value: record.category,
                dragRowId: record.id,
                from: 'category'
              }}
            >  {text}  </DragTag>
          )
          : (
            <DropCell
              dropKey="dragValue-to-left"
              finishDrop={dropValue => finishDrop(dropValue, record)}
            >
              <DragTag
                dragKey="dragValue-to-right"
                dragValue={{
                  value: record.category,
                  dragRowId: record.id,
                  from: 'category'
                }}
              >
                {text}
              </DragTag>
            </DropCell>
          )
    },
    {
      title: '来源组合',
      dataIndex: 'combinations',
      key: 'combinations',
      width: 300,
      render: (_: any, record: any) => {
        return (
          <DropCell
            dropKey="dragValue-to-right"
            finishDrop={dropValue => finishDrop(dropValue, record)}
          >
            {
              record.combinations.map((text: any, index: number) => (
                <DragTag
                  key={index}
                  dragKey="dragValue-to-left"
                  dragValue={{
                    value: text,
                    dragRowId: record.id,
                    from: 'combinations'
                  }}
                >
                  <Tag
                    className={classes.dragTag}
                    color="geekblue"
                  >{text}</Tag>
                </DragTag>
              ))
            }
          </DropCell >
        )
      }
    },
    {
      title: '订单类型',
      dataIndex: 'orderType',
      key: 'orderType',
      render: (text: string, record: IDataItem) =>
        record.combinations.length > 0
          ?
          <>
            <CheckableTag
              checked={record.orderType === 'Z04'}
              onChange={checked => handleChooseOrderType(record, checked, 'Z04')}
            >Z04</CheckableTag>
            <CheckableTag
              checked={record.orderType === 'Z09'}
              onChange={checked => handleChooseOrderType(record, checked, 'Z09')}
            >Z09</CheckableTag>
          </>
          :
          <>
            <Tag>Z04</Tag>
            <Tag>Z09</Tag>
          </>
    },
    {
      title: '退单编号',
      dataIndex: 'backOrderNo',
      key: 'backOrderNo'
    },
    {
      title: '出单编号',
      dataIndex: 'resultOrderNo',
      key: 'resultOrderNo'
    },
    {
      title: '操作',
      dataIndex: 'aciton',
      key: 'aciton',
      render: () =>
        <Upload>
          <Button type="link" icon={<UploadOutlined />}>导入</Button>
        </Upload>
    },
    {
      title: '销售数量',
      dataIndex: 'saleNumber',
      key: 'saleNumber'
    },
    {
      title: '可转数量',
      dataIndex: 'moveNumber',
      key: 'moveNumber'
    }
  ];

  // 完成拖动
  const finishDrop = (dropValue: any, targetRow: any) => {

    const newData = dataSource.slice();

    const { value, dragRowId, from } = dropValue;
    const { id, category, combinations } = targetRow;

    if (from === 'category') {
      newData.forEach(row => {
        if (row.id === dragRowId) {
          row.category = ''
        }
        if (row.id === id) {
          row.combinations.push(value);
        }
      });
    } else if (from === 'combinations') {
      newData.forEach(row => {
        if (row.id === id) {
          row.category = value
        }
        if (row.id === dragRowId) {
          row.combinations = row.combinations.filter((c: any) => c !== value);
          if (row.combinations.length === 0) {
            row.orderType = null;
          }
        }
      });
    }
    setDataSource(newData)
  }

  // 选择 订单类型
  const handleChooseOrderType = (row: IDataItem, checked: boolean, type: 'Z04' | 'Z09' | null) => {
    const data = dataSource.slice();
    const _d = data.find(d => d.id === row.id);
    if (_d) {
      _d.orderType = checked ? type : null;
      setDataSource(data)
    }
  }

  // 确定拆分
  const handleSplit = (e: any) => {
    const hasCombinations = dataSource.filter(d => d.combinations.length > 0);
    const noCombinations = dataSource.filter(d => d.combinations.length === 0);
    hasCombinations.forEach(d => {
      if (d.orderType === null) {
        d.backOrderNo = '3xxxxxxxx'
      } else {
        d.backOrderNo = '3xxxxxxxx';
        d.resultOrderNo = '1xxxxxxxx';
        d.saleNumber = 10;
        d.moveNumber = 10;
      }
    });
    const newData = hasCombinations.concat(noCombinations);
    setDataSource(newData);
  }

  // 全选
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRowKeys([]);
      setSelectAll(false)
    } else {
      const keys = dataSource.filter(d => d.combinations.length > 0).map(d => d.id)
      setSelectedRowKeys(keys);
      setSelectAll(true)
    }
  }

  const rowSelection = {
    hideSelectAll: true,
    selectedRowKeys,
    onChange: (selectedRowKeys: any[]) => setSelectedRowKeys(selectedRowKeys),
  };

  return (
    <>
      <Table
        size="small"
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
        pagination={false}
      />
      <Space
        style={{ marginTop: 16 }}
      >
        <Button type="primary" onClick={handleSplit}>确定拆分</Button>
        <Button type="primary" onClick={handleSelectAll}>{selectAll ? '取消全选' : '全选'}</Button>
        <Button >检查</Button>
        <Button >转出货单</Button>
        <Button>CSS上传</Button>
        <Button>出货单释放</Button>
        <Button>执行转文字档</Button>
      </Space>
    </>
  )
}

export default memo(Home);