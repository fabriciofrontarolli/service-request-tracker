import React, { Component, useEffect, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Card,
  notification,
  Tag
} from 'antd';
import ClienteService from 'services/ClienteService';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { LeftOutlined } from "@ant-design/icons";
import { listaPerfil, PERFIL_ADMINISTRADOR, PERFIL_CLIENTE, PERFIL_TECNICO } from '../dados';
import UsuarioService from 'services/UsuarioService';

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

const CriarNovoUsuario = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();

  const [usuarioToUpdate, setusuarioToUpdate] = useState(undefined);
  const [rawClientes, setRawClientes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [isClienteDropdownVisible, setIClienteDropdownVisible] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  
  const handleBuscarClientes = async function() {
		try {
			const resultado = await ClienteService.fetch(1, 10000);
      const clientes = resultado.data.map(cliente => ({
        value: cliente.id,
        label: cliente.nome_fantasia
      }));
      setRawClientes(resultado.data);
			setClientes(clientes);
		}
		catch(err) {
      notification.error(`Erro ao buscar cliente ${err}`);
			console.log('erro >> ', err)
		}
	}

  const getUsuarioToUpdate = async () => {
    const usuarioId = params && params.id;

    try {
      if (!!usuarioId) {
        const response = await UsuarioService.get(usuarioId);
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
          setusuarioToUpdate(usuario);
        }
      }
    }
    catch(err) {
      navigate('/app/administrativo/usuarios');
      notification.error(`Erro ao buscar o Usuario! ${err}`);
    }
  }

  const onFinish = async (values) => {
    // remove password-repeat
    delete values['password-repeat'];

    values.is_admin = values.perfil === PERFIL_ADMINISTRADOR.id;
    values.is_tecnico = values.perfil === PERFIL_TECNICO.id;
    values.is_cliente = values.perfil === PERFIL_CLIENTE.id;

    try {
      if (usuarioToUpdate) {
        await UsuarioService.salvar(usuarioToUpdate.id, values);
      } else {
        await UsuarioService.criar(values);
      }

      const successMessage = `Usuario ${usuarioToUpdate ? 'atualizado' : 'criado'}`;
      notification.success({ message: successMessage });

      navigate('/app/administrativo/usuarios');
    }
    catch (err) {
      notification.error({
        message: err
      });
    }
  };

  const handleChangePerfil = () => {
    const selectedPerfil = form.getFieldValue('perfil');
    let showClienteDropdown = false;
    if (selectedPerfil === PERFIL_CLIENTE.id) {
      showClienteDropdown = true;
    }

    if (!showClienteDropdown) {
      form.setFieldValue('id_cliente', undefined);
    }
    setIClienteDropdownVisible(showClienteDropdown);
  }

  const handleChangePassword = () => {
    const password = form.getFieldValue('password');
    const isPasswordSet = !!password;
    setIsPasswordChanged(isPasswordSet);
  }

  useEffect(() => {
    handleBuscarClientes();
  }, []);

  useEffect(() => {
    if (clientes.length) {
      getUsuarioToUpdate();
    }
  }, [clientes]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        name="nome"
        label="Nome"
        rules={[
          {
            required: true,
            message: 'Por favor informe o nome',
          },
          {
            max: 130,
            message: 'Nome deve conter no maximo 130 carateres',
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            max: 130,
            message: 'Email deve conter no maximo 130 caracteres',
          }
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item name="perfil" label="Perfil">
        <Select onChange={handleChangePerfil}>
          {
            listaPerfil.map(itemPerfil => (
              <Option key={itemPerfil.id} value={itemPerfil.id}>{ itemPerfil.description }</Option>
            ))
          }
        </Select>
      </Form.Item>

      {
        isClienteDropdownVisible && (
          <Form.Item name="id_cliente" label="Cliente">
            <Select value={""} onChange={() => {}}>
              {
                clientes.map(cliente => (
                  <Option key={cliente.value} value={cliente.value}>{ cliente.label }</Option>
                ))
              }
            </Select>
          </Form.Item>
        )
      }

      <Form.Item
        name="password"
        label="Senha"
        onChange={handleChangePassword}
        rules={[
          {
            required: usuarioToUpdate ? false : true,
            message: 'Por favor insira a senha!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="password-repeat"
        label="Confirme a Senha"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: usuarioToUpdate ? false : true,
            message: 'Por favor confirme a senha!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('As senhas devem ser iguais'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          (usuarioToUpdate && isPasswordChanged) && (
            <Tag color="volcano" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Atencao: O usuario sera salvo com uma nova senha. <br/> o usuario devera ser notificado!
            </Tag>
          )
        }

        <Button type="primary" htmlType="submit">
          Salvar
        </Button>
      </div>

      <Form.Item {...tailFormItemLayout}>
        
      </Form.Item>
    </Form>
  );
};

export class Register extends Component {
  render() {
    return (
      <>
        <Link to={`/app/administrativo/usuarios`} style={{ cursor: 'pointer' }}>
          <LeftOutlined /> Retornar
        </Link>
        <Card title="Novo Usuario">
          <CriarNovoUsuario />
        </Card>
      </>
    )
  }
}

export default Register

/**
 * 
 * cliente
 * contrato?
 * descricao
 * campo ou laboratorio
 * data do chamado
 * 
 * 
 */