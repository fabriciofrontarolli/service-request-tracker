import { Form, Input, InputNumber, Select } from 'antd';
import React, { useContext } from 'react';
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
    const { id } = ordemDeServico;
    const updatedOS = {
      usuario_id: novoTecnico
    };

    onFinish(id, updatedOS);
  }

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
            <Select value={""} allowClear={true} onChange={() => {handleFinish() }} showSearch={true} optionFilterProp="children">
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
          </Form.Item>
          </div>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
