import React from 'react';
import { Form, Input } from 'antd';

interface EditTableCellPros {
  isEditing: boolean
  rowData: any
  cellData?: any
  dataKey: string
  columnData: any
}

const EditTableCell: React.FC<EditTableCellPros> = ({
  isEditing,
  dataKey,
  cellData,
  rowData,
  columnData,
  ...restProps
}) => {
  return (
    <>
      {isEditing ?
        <Form.Item
          name={dataKey}
          rules={[
            {
              required: true,
              message: `Please Input ${columnData.title}!`
            }
          ]}
        >
          <Input size="small" />
        </Form.Item>
        : cellData
      }
    </>



  )
};

export default EditTableCell;