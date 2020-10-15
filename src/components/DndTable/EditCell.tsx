import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Form, Input } from 'antd';

import { EditableContext } from './EditRow';
import { ICell, IColumn } from './index.d';

import styles from './index.less';


interface EditableCellProps extends ICell {
  column: IColumn
  rowData: any
  handleSave: (record: any) => void;
}

const EditCell: FC<EditableCellProps> = ({
  renderContent,
  cellClassName,
  column,
  rowData,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      (inputRef.current as any).focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [column.dataIndex]: rowData[column.dataIndex] });
  };

  const save = async (e: any) => {
    console.log(e);
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...rowData, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };


  const renderChildNode = () => {
    const childNode = editing
      ?
      (
        <Form.Item
          style={{ margin: 0 }}
          name={column.dataIndex}
          rules={[
            {
              required: true,
              message: `${column.title} is required.`
            }
          ]}
        >
          <Input size="small" ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      )
      :
      (
        <div onDoubleClick={toggleEdit} >
          {renderContent && renderContent()}
        </div>
      );
    return childNode
  }


  const classStr = styles.tableTdCell;
  return (
    <div
      {...restProps}
      className={cellClassName ? `${classStr} ${cellClassName}` : classStr}
    >
      {renderChildNode()}
    </div>
  )
}

export default EditCell