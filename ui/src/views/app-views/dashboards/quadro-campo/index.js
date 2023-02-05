import React, { useEffect, useState } from "react";
import { Button, Card, Table, Tag, notification, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import Flex from 'components/shared-components/Flex'
import OrdensDeServicoService from 'services/OrdensDeServiceService';
import {
	PlayCircleOutlined,
	CheckCircleOutlined,
	FastBackwardOutlined,
	ToolOutlined,
	UserSwitchOutlined,
	EyeOutlined
} from '@ant-design/icons';
import utils from 'utils';
import { ABERTO, EM_ANDAMENTO, FECHADO } from '../dados';
import EditablTecnico from "./editable-tenico";
import UsuarioService from "services/UsuarioService";
import TecnicosContext from "./tecnicos-context";

const getServiceStatus = status => {
	if(status === 'Triagem') {
		return 'red';
	}
	if(status === 'Aberto') {
		return 'yellow';
	}
  if(status === 'Em Atendimento') {
		return 'blue';
	}
  if(status === 'Cobrança') {
		return 'purple';
	}
  if(status === 'Fechado') {
		return 'green';
	}
	return '';
}

const getTechnicianServiceStatus = status => {
	if(status === 'Triagem') {
		return 'Triagem';
	}
	if(status === 'Aberto') {
		return 'Aguardando Atendimento';
	}
  if(status === 'Em Atendimento') {
		return 'Em Atendimento';
	}
  if(status === 'Cobrança') {
		return 'Cobrança';
	}
  if(status === 'Fechado') {
		return 'Fechado';
	}
	return '';
}

export const QuadroCampo = () => {
	const [form] = Form.useForm();
  const [data, setData] = useState();
	const [tecnicos, setTecnicos] = useState([]);
  const [ordensDeServico, setOrdensDeServico] = useState([]);
	const navigate = useNavigate();
	const [editingKey, setEditingKey] = useState('');
	const isEditing = (record) => record.key === editingKey;

  const editarTecnico  = (record) => {
    form.setFieldsValue({
      nome: record.nome,
    });
    setEditingKey(record.key);
  };
  const cancelarTecnico = () => {
    setEditingKey('');
  };
  const salvarTecnico = async (id, updatedOS) => {
		await OrdensDeServicoService.salvar(id, updatedOS);
		setEditingKey('');
		handleBuscarOrdensDeServico();

		const successMessage = 'Tecnico atualizado';
		notification.success({ message: successMessage });
  };

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

	const handleBuscarOrdensDeServico = async function() {
		try {
			const resultado = await OrdensDeServicoService.quadroCampo();
			const rows = resultado.data.map(ordem => ({
				id: ordem.numero,
				numero: ordem.numero,
				data: ordem.created_at,
				cliente: ordem.nome_fantasia,
				descricao: ordem.descricao,
				nome: ordem.nome,
				status: ordem.status_ordem_servico,
				rawOrdem: ordem
			}))

			setOrdensDeServico(rows);
		}
		catch(err) {
			notification.error({ message: `Erro ao buscar as ordens de servico (Campo)` });
			console.log('err >> ', err)
		}
	}

	const handleSetEmAtendimento = async (ordemDeServico) => {
		handleAtualizarOrdem(ordemDeServico.rawOrdem, EM_ANDAMENTO);
	}

	const handleSetResolvida = async (ordemDeServico) => {
		handleAtualizarOrdem(ordemDeServico.rawOrdem, FECHADO);
	}

	const handleSetAberta = async (ordemDeServico) => {
		handleAtualizarOrdem(ordemDeServico.rawOrdem, ABERTO);
	}

	const handleAtualizarOrdem = async (ordem, status) => {
		try {
			const updateOrdemDeServico = {
				cliente_id: ordem.cliente_id,
				usuario_id: ordem.usuario_id,
				status_ordem_servico_id: status.id,
				tipo_ordem_servico_id: ordem.tipo_ordem_servico_id,
				solicitante: ordem.solicitante,
				descricao: ordem.descricao,
				solucao: ordem.solucao,
				observacao: ordem.observacao,
				consumo: ordem.consumo,
				assinatura: ordem.assinatura
			};
			await OrdensDeServicoService.salvar(ordem.id, updateOrdemDeServico);
			handleBuscarOrdensDeServico();
		}
		catch(err) {
			notification.error({ message: `Erro ao atualizar a ordem de servico ${ordem.numero}`});
		}
	}

	useEffect(() => {
		handleBuscarOrdensDeServico();
		handleBuscarTecnicos();
	}, []);

	const tableColumns = [
		{
			title: 'OS',
			dataIndex: 'numero',
			editable: false
		},
		{
			title: 'Data',
			dataIndex: 'data',
			editable: false,
			render: (_, record) => (
				<span
					style={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						display: 'block'
					}}
				>
					{ new Intl.DateTimeFormat("pt-BR", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "numeric",
						minute: "numeric",
					}).format(new Date(record.data)) }
				</span>
			),
		},
		{
			title: 'Cliente',
			dataIndex: 'cliente',
			editable: false
		},
		{
			title: 'Problema',
			dataIndex: 'descricao',
			editable: false,
			render: (_, record) => (
				<span
					style={{
						width: '18rem',
						display: 'block',
						overflowWrap: 'break-word'
					}}
				>
					{ record.descricao }
				</span>
			),
		},
		{
			title: 'Tecnico',
			dataIndex: 'nome',
			editable: true
		},
		{
			title: 'Status',
			dataIndex: 'status',
			editable: false,
			render: (_, record) => (
				<>
					<Tag color={getServiceStatus(record.status)}>
						{getTechnicianServiceStatus(record.status)}
					</Tag>
				</>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
		},
		{
			title: "Acao",
			key: "action",
			render: (text, record) => {
				const editable = isEditing(record);
				return (
					<Flex alignItems="center">
						<Flex flexDirection="row">
							<Button
								type="primary"
								shape="round"
								icon={<PlayCircleOutlined title="Atender" />}
								title="Atender"
								size="middle"
								style={{ marginRight: '0.7rem', border: 'none' }}
								onClick={(ev) => { ev.stopPropagation(); handleSetEmAtendimento(record) }}
							/>
							<Button
								type="primary"
								shape="round"
								icon={<CheckCircleOutlined title="Fechar" />}
								title="Fechar"
								size="middle"
								style={{ marginRight: '0.7rem', background: '#138f5b', border: 'none' }}
								onClick={(ev) => { ev.stopPropagation(); handleSetResolvida(record) }}
							/>
							<Button
								type="primary"
								shape="round"
								icon={<FastBackwardOutlined title="Desistir" />}
								size="middle"
								style={{ marginRight: '0.7rem', border: 'none', background: '#E45741' }}
								onClick={(ev) => { ev.stopPropagation(); handleSetAberta(record) }}
							/>
							<Button
								type="primary"
								shape="round"
								icon={<UserSwitchOutlined title="Trocar Tecnico" />}
								size="middle"
								style={{ marginRight: '0.7rem', border: 'none', background: '#27476E', color: '#fff' }}
								onClick={(ev) => {
									ev.stopPropagation();
									if (editable) {
										cancelarTecnico()
									} else {
										editarTecnico(record)
									}
								}}
							/>
							<Button
								type="primary"
								shape="round"
								icon={<EyeOutlined title="Desistir" />}
								size="middle"
								style={{ marginRight: '0.7rem', border: 'none', background: '#B2B09B', color: '#fff' }}
								onClick={(ev) => {
									ev.stopPropagation();
									navigate(`/app/dashboards/editar-ordem-de-servico/${record.rawOrdem.id}`);
								}}
							/>
						</Flex>
					</Flex>
				)
			}
		}
	];

	const mergedColumns = tableColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <Card style={{ overflowX: 'scroll' }}>
				<Flex justifyContent="center" alignItems="center">
					<h1>CAMPO</h1>
					<ToolOutlined size="large" style={{ fontSize: '24px', marginTop: '-10px', marginLeft: '1rem' }} />
				</Flex>
				<Form form={form} component={false} onFinish={salvarTecnico}>
					<TecnicosContext.Provider value={{ tecnicos, form, onFinish: salvarTecnico }}>
						<Table
							pagination={false}
							columns={mergedColumns} 
							dataSource={ordensDeServico} 
							rowKey='id'
							style={{ cursor: 'default' }}
							component={false}
							components={{
								body: {
									cell: EditablTecnico
								},
							}}
						/>
					</TecnicosContext.Provider>
				</Form>
      </Card>
    </>
  )
}

export default QuadroCampo;
