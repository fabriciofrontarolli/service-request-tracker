import React, { Component, useEffect, useRef, useState } from 'react';
import {
  Form,
  Input,
  Select,
  Row,
  Button,
  Card,
  notification,
  Statistic,
  DatePicker,
} from 'antd';
import { useLocation } from 'react-router-dom';
import { PrinterOutlined } from '@ant-design/icons';
import locale from 'antd/es/date-picker/locale/pt_BR';
import moment from 'moment';
import ClienteService from 'services/ClienteService';
import OrdensDeServiceService from 'services/OrdensDeServiceService';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { listaStatusOrdemServico, listaTipoOrdemServico, PERFIL_CLIENTE, TRIAGEM } from '../dados';
import ReactSignatureCanvas from 'react-signature-canvas';
import styles from './abrir-chamado.module.css'
import UsuarioService from 'services/UsuarioService';
import ImprimirOrdemServico from './print';
import { LeftOutlined } from "@ant-design/icons";
import { AUTH_USER } from 'constants/AuthConstant';

const { TextArea } = Input;

const { RangePicker } = DatePicker;
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

const CriarNovoChamado = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const signatureRef = useRef();
  const params = useParams();

  const [osToUpdate, setOsToUpdate] = useState(undefined);
  const [clientes, setClientes] = useState([]);
  const [clientesRaw, setClientesRaw] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [isPrintView, setIsPrintView] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(false);
  const [previousPage, setPreviousPage] = useState(false);
  const [isCliente, setIsCliente] = useState(false);

  const handleBuscarClientes = async function() {
		try {
			const resultado = await ClienteService.fetch(1, 10000);
      const clientes = resultado.data.map(cliente => ({
        value: cliente.id,
        label: `${cliente.nome_fantasia} (${cliente.contrato ? 'Contrato' : 'Eventual' })` 
      }));
			setClientes(clientes);
      setClientesRaw(resultado.data);
		}
		catch(err) {
			console.log('err >> ', err)
		}
	}

  const handleBuscarTecnicos = async function() {
		try {
			const resultado = await UsuarioService.buscarTecnicos();
      const tecnicos = resultado.data.map(tecnico => ({
        value: tecnico.id,
        label: tecnico.nome
      }));
			setTecnicos(tecnicos);
		}
		catch(err) {
			console.log('err >> ', err)
		}
	}

  const getOrdemDeServicoToUpdate = async () => {
    const osId = params && params.id;

    try {
      if (!!osId) {
        const response = await OrdensDeServiceService.get(osId);
        const ordemDeServico = response.data;
        if (!!ordemDeServico) {
          const allFields = Object.keys(ordemDeServico).map((field) => ({
            name: field,
            value: ordemDeServico[field]
          }));
          // remove id, created_at, data_inicio_atendimento, data_fim_atendimento
          const formFields = allFields.filter(field => (
            field.name.toLowerCase() !== 'id' &&
            field.name.toLowerCase() !== 'created_at' &&
            field.name.toLowerCase() !== 'data_inicio_atendimento' &&
            field.name.toLowerCase() !== 'data_fim_atendimento'
          ));

          // normalize datas atendimento
          if (ordemDeServico.data_inicio_atendimento && ordemDeServico.data_fim_atendimento) {
            formFields.push({
              name: 'data',
              value: [moment(ordemDeServico.data_inicio_atendimento), moment(ordemDeServico.data_fim_atendimento)]
            })
          }

          form.setFields(formFields);
          setOsToUpdate(ordemDeServico);
          if (ordemDeServico.assinatura) {
            signatureRef.current.fromDataURL(ordemDeServico.assinatura);
          }
        }

        const clienteId = form.getFieldValue('cliente_id');
        preencherEnderecoCliente(clienteId);
      }
    }
    catch(err) {
      navigate('/app/dashboards/ordens-de-servico');
      notification.error(`Erro ao buscar o Ordem De Servico! ${err}`);
    }
  }

  const handleEndSignature = () => {
    form.setFieldValue('assinatura', signatureRef.current.toDataURL())
  }

  const preencherEnderecoCliente = (clienteId) => {
    if (clienteId) {
      const cliente = clientesRaw.find(c => c.id == clienteId);
      setSelectedCliente(cliente);
    }
  }

  const setPreviousLink = () => {
    const urlParameters = new URLSearchParams(location.search);
    const previousPage = urlParameters.get('previous');
    setPreviousPage(previousPage);
  }

  const onFinish = async (values) => {
    const dataInicioAtendimento = values.data ? values.data[0].toISOString() : undefined;
    const dataFimAtendimento = values.data ? values.data[1].toISOString() : undefined;

    if (isCliente) {
      values.cliente_id = getLoggedInUser().cliente;
      values.status_ordem_servico_id = TRIAGEM.id;
    }

    values.data_inicio_atendimento = dataInicioAtendimento;
    values.data_fim_atendimento = dataFimAtendimento;
    values.data = undefined;

    try {
      if (osToUpdate) {
        await OrdensDeServiceService.salvar(osToUpdate.id, values);
      } else {
        await OrdensDeServiceService.criar(values);
      }

      const successMessage = `Ordem de Servico ${osToUpdate ? 'atualizado' : 'criado'}`;
      notification.success({ message: successMessage });

      navigate('/app/dashboards/ordens-de-servico');
    }
    catch (err) {
      notification.error({
        message: err
      });
    }
  };

  const getLoggedInUser = () => {
    const loggedInUserRaw = localStorage.getItem(AUTH_USER) || null;
    if (!!loggedInUserRaw) {
      const loggedInUser = JSON.parse(loggedInUserRaw);
      return loggedInUser;
    }
    return undefined;
  }

  const checkIsCliente = () => {
    const loggedInUser = getLoggedInUser();
    setIsCliente(loggedInUser && loggedInUser.perfil === PERFIL_CLIENTE.id);
  }

  useEffect(() => {
    handleBuscarClientes();
    handleBuscarTecnicos();
    setPreviousLink();
    checkIsCliente();
  }, []);

  useEffect(() => {
    if (clientes.length) {
      getOrdemDeServicoToUpdate();
    }
  }, [clientes]);

  if (isPrintView) {
    return (
      <ImprimirOrdemServico ordemDeServico={osToUpdate} togglePrintView={() => setIsPrintView(false)} />
    )
  }

  return (
    <>
      <Link to={previousPage || '/app/dashboards/ordens-de-servico'} style={{ cursor: 'pointer' }}>
        <LeftOutlined /> Retornar
      </Link>
      <Card title={!!osToUpdate ? "Ordem de Serviço" : "Abrir Chamado"}>
        {
          osToUpdate && osToUpdate.created_at && (
            <div style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              width: '83%',
              textAlign: 'center',
              marginBottom: '1.5rem',
              }}>
              <Statistic
                title="Data do chamado"
                style={{ fontSize: '0.2rem' }}
                value={ new Intl.DateTimeFormat("pt-BR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "numeric",
                  minute: "numeric",
                }).format(new Date(osToUpdate.created_at)) }
              />
            </div>
          )
        }

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="cliente_id"
            label="Cliente"
            style={{ display: isCliente ? 'none' : 'block' }}
            rules={[
              {
                required: isCliente ? false : true,
                message: 'Por favor informe o cliente',
              },
            ]}
          >
            <Select
              value={""}
              onChange={(ev) => preencherEnderecoCliente(ev)}
              showSearch={true}
              optionFilterProp="children"
            >
              {
                clientes.map(cliente => (
                  <Option key={cliente.value} value={cliente.value}>{ cliente.label }</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item>
            {
              selectedCliente && !isCliente && (
                <div className='ant-row ant-form-item-row'>
                  <div className='ant-col ant-form-item-label ant-col-xs-24 ant-col-sm-4'>
                  </div>
                  <div className='ant-col ant-form-item-control ant-col-xs-24 ant-col-sm-16'>
                    <address className='mt-2' style={{ marginLeft: '5rem' }}>
                      <p>
                        <span>{`${selectedCliente.endereco} ${selectedCliente.numero}`}</span><br />
                        <span>{`${selectedCliente.bairro} ${selectedCliente.cidade_estado}`}</span><br />
                        <span>{`${selectedCliente.telefone || ''}`}</span>
                      </p>
                    </address>
                  </div>
                </div>
              )
            }
          </Form.Item>

          <Form.Item
            name="solicitante"
            label="Solicitante"
            rules={[
              {
                required: true,
                message: 'Por favor insira um solicitante!',
                whitespace: true,
              },
              {
                max: 100,
                message: 'Solicitante deve conter no maximo 100 carateres',
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>

          <Form.Item
            name="descricao"
            label="Descricao"
            rules={[
              {
                required: true,
                message: 'Por favor insira uma descricao!',
                whitespace: true,
              },
            ]}
          >
            <TextArea rows={4} value={""} />
          </Form.Item>

          <Form.Item name="tipo_ordem_servico_id" label="Tipo" style={{ display: isCliente ? 'none' : 'block' }}>
            <Select value={""} onChange={() => {}} showSearch={true} optionFilterProp="children">
              {
                listaTipoOrdemServico.map(tipoOrdem => (
                  <Option key={tipoOrdem.id} value={tipoOrdem.id}>{ tipoOrdem.description }</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item name="status_ordem_servico_id" label="Status" style={{ display: isCliente ? 'none' : 'block' }}>
            <Select value={""} onChange={() => {}} showSearch={true} optionFilterProp="children">
              {
                listaStatusOrdemServico.map(itemStatus => (
                  <Option key={itemStatus.id} value={itemStatus.id}>{ itemStatus.description }</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item name="usuario_id" label="Tecnico" style={{ display: isCliente ? 'none' : 'block' }}>
            <Select value={""} onChange={() => {}} showSearch={true} optionFilterProp="children">
              {
                tecnicos.map(tecnico => (
                  <Option key={tecnico.value} value={tecnico.value}>{ tecnico.label }</Option>
                ))
              }
            </Select>
          </Form.Item>

          <Form.Item name="solucao" label="Solucao" style={{ display: isCliente ? 'none' : 'block' }}>
            <TextArea rows={4} value={""} />
          </Form.Item>

          <Form.Item
            name="observacao"
            label="Observacao"
            style={{ display: isCliente ? 'none' : 'block' }}
          >
            <TextArea rows={4} value={""} />
          </Form.Item>

          <Form.Item name="consumo" label="Consumo" style={{ display: isCliente ? 'none' : 'block' }}>
            <TextArea rows={4} value={""} />
          </Form.Item>

          <Form.Item name="data" label="Data Atendimento" style={{ display: isCliente ? 'none' : 'block' }}>
            <RangePicker
              showTime
              locale={locale}
              format="DD/MM/YYYY HH:mm:ss"
            />
          </Form.Item>

          <Form.Item name="assinatura" label="Assinatura" style={{ display: isCliente ? 'none' : 'block' }}>
            <div
              style={{
                border: '2px dotted #999',
                borderRadius: '5px',
                height: '200px'
              }}
            >
              <ReactSignatureCanvas
                penColor='#000'
                backgroundColor='#fff'
                ref={signatureRef}
                clearOnResize={false}
                onEnd={handleEndSignature}
                canvasProps={{
                  className: styles.signaturePad
                }}
              />
            </div>
            <Row
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: '0.5rem'
              }}
            >
              <Button type="default" onClick={() => signatureRef.current.clear()}>
                Limpar Assinatura
              </Button>
            </Row>
          </Form.Item>

          <Form.Item
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '1.8rem'
            }}
          >
            <Button type="primary" htmlType="submit" style={{ minWidth: '150px' }}>
              Salvar
            </Button>
          </Form.Item>
        </Form>

        <div>
          {
            osToUpdate  && osToUpdate.created_at && (
              <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                width: '83%',
                textAlign: 'center',
                marginBottom: '1.5rem',
                }}
              >
                <Button type="primary" onClick={() => setIsPrintView(true)}>
                  <PrinterOutlined type="printer" />Imprimir
                </Button>
              </div>
            )
          }
          </div>
      </Card>
    </>
  );
};

export class Register extends Component {
  render() {
    return (
      <CriarNovoChamado />
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