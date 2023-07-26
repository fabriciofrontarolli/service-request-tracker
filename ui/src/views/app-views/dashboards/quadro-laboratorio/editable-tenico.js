import { Button, Form, Input, InputNumber, Select } from 'antd';
import React, { useContext, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import TecnicosContext from './tecnicos-context';

const { Option } = Select;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const { tecnicos, form, onFinish } = useContext(TecnicosContext);

  const handleFinish = () => {
    const novoTecnico = form.getFieldValue('nome');
    const ordemDeServico = record.rawOrdem;
    // remove id and created_at from ordemDeServico - para fazer PUT
    const { id, numero, created_at } = ordemDeServico;
    const updatedOS = {
      usuario_id: novoTecnico
    };

    onFinish(id, updatedOS);
  }

  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
              marginRight: '0.3rem',
            }}
            rules={[
              {
                required: true,
                message: `Insira o tecnico!`,
              },
            ]}
          >
            <Select
              value={""}
              onChange={() => {}}
              showSearch={true}
              optionFilterProp="children"
              style={{ width: '120px' }}
            >
              {
                tecnicos.map(tecnico => (
                  <Option key={tecnico.value} value={tecnico.value}>{ tecnico.label }</Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              margin: 0,
              padding: 0
            }}
          >
            <Button type="primary" htmlType="submit" onClick={() => handleFinish()}>
              <CheckOutlined />
            </Button>
          </Form.Item>
          </div>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
