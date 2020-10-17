import React from 'react';
import { Form } from 'antd';
import { defaultTableRowRenderer } from 'react-virtualized';

export const EditableContext = React.createContext<any>(null);


const EditableRow: React.FC<any> = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        {defaultTableRowRenderer({ ...props })}
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;