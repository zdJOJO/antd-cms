import React, { useEffect, useState, useRef } from 'react';
import { Form, Input } from 'antd';
import { FormInstance } from 'antd/lib/form';

interface EditTableCellPros {
  form: FormInstance
  rowData: any
  cellData?: any
  dataKey: string
  columnData: any
  handleSave: (newRowData: any) => void
}

const EditTableCell: React.FC<EditTableCellPros> = ({
  dataKey,
  cellData,
  rowData,
  columnData,
  form,
  handleSave
}) => {
  const inputRef: any = useRef();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const save = async (e: any) => {
    console.log(e);
    try {
      const values = await form.validateFields();
      toggleEdit();
      console.log({ ...rowData, ...values });
      handleSave({ ...rowData, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    form.setFieldsValue({
      [dataKey]: rowData[dataKey]
    });
  };

  let cellNode = cellData;
  if (columnData.editable) {
    // 判断单元格支不支持编辑
    cellNode = (
      <div onClick={toggleEdit}>
        {cellData || <span style={{ color: 'rgba(0, 0, 0, 0.45)' }} >点击编辑</span>}
      </div>
    )
  }
  if (isEditing) {
    // 判断单元格是否处于编辑状态
    cellNode = (
      <Form.Item
        name={dataKey}
        rules={[
          {
            required: true,
            message: `Please Input ${columnData.title}!`
          }
        ]}
      >
        <Input
          size="small"
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    )
  }

  return (<>  {cellNode} </>)
};

export default EditTableCell;