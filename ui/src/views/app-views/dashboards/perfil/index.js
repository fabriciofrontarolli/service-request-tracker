import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Row, Col, notification } from 'antd';
import UsuarioService from 'services/UsuarioService';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import { useNavigate } from 'react-router-dom';
import { AUTH_USER } from 'constants/AuthConstant';

export const EditProfile = () => {
  const [usuarioToUpdate, setusuarioToUpdate] = useState(undefined);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const novoNome = form.getFieldValue('nome');
    const novoEmail = form.getFieldValue('email');
    const novaSenha = form.getFieldValue('password');

    let usuarioPayload = {
      nome: novoNome,
      email: novoEmail, 
    };

    if (novaSenha) {
      usuarioPayload.password = novaSenha;
    }

    try {
      await UsuarioService.salvar(usuarioToUpdate.id, usuarioPayload);

      const successMessage = `Usuario atualizado`;
      notification.success({ message: successMessage });
    }
    catch (err) {
      notification.error({
        message: 'Erro ao atualizar o perfil'
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const getUsuarioToUpdate = async (usuarioId) => {
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

  const getLoggedInUser = () => {
    const loggedInUserRaw = localStorage.getItem(AUTH_USER) || null;
    if (!!loggedInUserRaw) {
      const loggedInUser = JSON.parse(loggedInUserRaw);
      getUsuarioToUpdate(loggedInUser.id);
    }
  }

  useEffect(() => {
		getLoggedInUser();
	}, []);

  return (
    <>
      <div className="mt-4">
        <Form
          form={form}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col xs={24} sm={24} md={24} lg={16}>
              <Row gutter={ROW_GUTTER}>
                <Col xs={24} sm={24} md={12}>
                  <Form.Item
                    label="Name"
                    name="nome"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ 
                      required: true,
                      type: 'email',
                      message: 'Please enter a valid email!' 
                    }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label="Senha"
                    rules={[
                      {
                        required: true,
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
                        required: true,
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
                </Col>

              </Row>
              <Button type="primary" htmlType="submit">
                Salvar
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  )
}

export default EditProfile
