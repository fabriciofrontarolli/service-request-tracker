import React, { Component, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Card,
  notification,
} from 'antd';
import ClienteService from 'services/ClienteService';
const { TextArea } = Input;

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const NovoCliente = () => {
  const [isContract, setIsContract] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(undefined);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getClienteToUpdate = async () => {
      const usuarioId = params && params.id;

      try {
        if (!!usuarioId) {
          const response = await ClienteService.get(usuarioId);
          const usuario = response.data;
          if (!!usuario) {
            const allFields = Object.keys(usuario).map((field) => ({
              name: field,
              value: usuario[field]
            }));
            // remove id, created_at
            const formFields = allFields.filter(field => (
              field.name.toLowerCase() !== 'id' &&
              field.name.toLowerCase() !== 'created_at'
            ))

            form.setFields(formFields);
            setIsContract(usuario.contrato);
            setUserToUpdate(usuario);
          }
        }
      }
      catch(err) {
        navigate('/app/dashboards/clientes');
        notification.error(`Erro ao buscar o usuario! ${err}`);
      }
    }

    getClienteToUpdate();
  }, []);

  const onFinish = async (values) => {
    try {
      if (userToUpdate) {
        await ClienteService.salvar(userToUpdate.id, values);
      } else {
        await ClienteService.criar(values);
      }

      const successMessage = `Cliente ${userToUpdate ? 'atualizado' : 'criado'}`;
      notification.success({ message: successMessage });

      navigate('/app/dashboards/clientes');
    }
    catch (err) {
      notification.error({
        message: err
      });
    }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        residence: ['zhejiang', 'hangzhou', 'xihu'],
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="contrato"
        label={isContract ? "Contrato" : "Eventual"}
      >
        <Checkbox
          checked={isContract}
          value={isContract}
          onChange={() => {
            const updateIsContract = !isContract;
            setIsContract(updateIsContract);
            form.setFieldValue('contrato', updateIsContract);
          }}
          >
        </Checkbox>
      </Form.Item>

      <Form.Item
        name="codigo"
        label="Codigo"
        rules={[
          {
            max: 5,
            message: 'Codigo deve conter no maximo 5 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="cpf_cnpj"
        label="CPF/CNPJ"
        rules={[
          {
            required: true,
            message: 'Insira o CNPJ/CPF',
          },
          {
            min: 11,
            message: 'CPF/CNPJ deve conter no minimo 11 caracteres',
          },
          {
            max: 18,
            message: 'CPF/CNPJ deve conter no maximo 14 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="inscricao_estadual"
        label="Inscricao Estadual"
        rules={[
          {
            min: 9,
            message: 'Inscricao Estadual deve conter no minimo 9 caracteres',
          },
          {
            max: 18,
            message: 'Inscricao Estadual deve conter no maximo 18 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="razao_social"
        label="Razao Social"
        rules={[
          {
            max: 120,
            message: 'Razao Social deve conter no minimo 120 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="nome_fantasia"
        label="Nome Fantasia"
        rules={[
          {
            max: 120,
            message: 'Nome Fantasia deve conter no minimo 120 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="cep"
        label="CEP"
        rules={[
          {
            pattern: '[0-9]{5}-[0-9]{3}',
            message: 'CEP deve conter o format 99999-999'
          },
          {
            max: 9,
            message: 'CEP deve conter no minimo 9 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="endereco"
        label="Endereco"
        rules={[
          {
            max: 150,
            message: 'Endereco deve conter no maximo 150 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="numero"
        label="Numero"
        rules={[
          {
            max: 10,
            message: 'Numero deve conter no maximo 10 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="complemento"
        label="Complemento"
        rules={[
          {
            max: 50,
            message: 'Complemento deve conter no maximo 50 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="bairro"
        label="Bairro"
        rules={[
          {
            max: 60,
            message: 'Complemento deve conter no minimo 60 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="cidade_estado"
        label="Cidade/Estado"
        rules={[
          {
            max: 70,
            message: 'Cidade/Estado deve conter no maximo 70 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="telefone"
        label="Telefone"
        rules={[
          {
            max: 60,
            message: 'Telefone deve conter no maximo 60 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="contato"
        label="Contato"
        rules={[
          {
            max: 50,
            message: 'Contato deve conter no maximo 50 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            max: 200,
            message: 'Email deve conter no maximo 200 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="observacao"
        label="Observacao"
        rules={[
          {
            max: 100,
            message: 'Observacao deve conter no maximo 100 caracteres',
          }
        ]}
      >
        <TextArea rows={4} value={""} />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </Form.Item>
    </Form>
  );
};

export class Register extends Component {
  render() {
    return (
      <Card title="Novo Cliente">
        <NovoCliente />
      </Card>
    )
  }
}

export default Register
