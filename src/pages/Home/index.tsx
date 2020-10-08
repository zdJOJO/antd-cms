import React, { ReactNode } from 'react'

import { Popconfirm } from 'antd';

import { CustomTable } from '@components';
import { DeleteOutlined } from '@components/icons/antdIcons';
import columns from './columns';
import { useTableData } from '@hooks';
import '@mock/home';

import classes from './index.less';


function Home(): ReactNode {

  const [dataSource, loading, setDataSource] = useTableData('/home')

  // 删除行
  const handleDelete = (record: any, _index: number) => {
    const temp = [...dataSource]
    temp.splice(_index, 1)
    setDataSource(temp)
  }

  // 编辑保存
  const handleSave = (values: any) => {
    const temp = [...dataSource];
    temp.some((rowData: any, _index: number) => {
      if (rowData.id === values.id) {
        temp[_index] = values;
        return true
      }
    })
    setDataSource(temp);
  }

  const tableColumns = [
    ...columns,
    {
      title: 'Action',
      dataIndex: 'action',
      fixed: true,
      render: (record: any, _index: number): ReactNode => (
        <Popconfirm
          title="Are you sure？"
          okText="Yes"
          cancelText="No"
          onConfirm={() => handleDelete(record, _index)}
        >
          <a href="#"><DeleteOutlined /></a>
        </Popconfirm>
      )
    }
  ];
  return (
    <div className={classes.welcome} >
      <CustomTable
        size="small"
        rowKey="id"
        columns={tableColumns}
        loading={loading}
        dataSource={dataSource}
        handleSave={handleSave}
      />
    </div>
  )
}

export default Home;