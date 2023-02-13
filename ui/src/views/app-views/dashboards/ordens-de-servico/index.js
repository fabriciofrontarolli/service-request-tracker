import React, { useEffect, useState } from "react";
import { Button, Card, Table, Tag, Pagination, Input, Select, DatePicker } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import OrdensDeServicoService from 'services/OrdensDeServiceService';
import utils from 'utils';
import Flex from "components/shared-components/Flex";
import { listaStatusOrdemServico, listaTipoOrdemServico } from '../dados';

const { Option } = Select;

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

const tableColumns = [
	{
		title: 'OS',
		dataIndex: 'numero',
	},
  {
		title: 'Cliente',
		dataIndex: 'cliente'
	},
	{
		title: 'Descricao',
		dataIndex: 'descricao',
		render: (_, record) => (
			<span
				style={{
					width: '30rem',
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					display: 'block'
				}}
			>
				{ record.descricao }
			</span>
		),
	},
	{
		title: 'Data',
		dataIndex: 'data',
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
		title: 'Tecnico',
		dataIndex: 'nome'
	},
  {
		title: 'Status',
		dataIndex: 'status',
    render: (_, record) => (
			<><Tag color={getServiceStatus(record.status)}>{record.status}</Tag></>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'status')
	},
  {
		title: 'Tipo',
		dataIndex: 'tipo'
	},
	
];

// Aberto, Em atendimento, Fechado, Arquivado

export const OrdenDeServico = () => {
	const [ordensDeServico, setOrdensDeServico] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		totalPages: 1
	});
	const [filtro, setFiltro] = useState({
		os: '',
		tipo: '',
		status: '',
		cliente: '',
		data_inicio: '',
		data_fim: '',
		data_inicio_raw: '',
		data_fim_raw: '',
	});

	const navigate = useNavigate();

	const handleChangeFilterField = (field, event) => {
		const value = event && event.target.value;
		let updatedFilter = {
			...filtro,
			[field]: value
		};

		if (field === 'data_inicio_raw') {
			updatedFilter = {
				...updatedFilter,
			'data_inicio': value && value.startOf('day').format().toString()
			};
		}
		if (field === 'data_fim_raw') {
			updatedFilter = {
				...updatedFilter,
			'data_fim': value && value.endOf('day').format().toString()
			};
		}

		setFiltro(updatedFilter);
	}

	const handleBuscarOrdensDeServico = async function(page=pagination.page, limit=pagination.limit) {
		try {
			const noNullFilters = Object.fromEntries(
				Object.entries(filtro).filter(([key, value]) => !key.includes('raw') && !!value)
			);
			const resultado = await OrdensDeServicoService.fetch(page, limit, noNullFilters);

			const rows = resultado.data.map(ordem => ({
				id: ordem.id,
				numero: ordem.numero,
				cliente: ordem.nome_fantasia,
				descricao: ordem.descricao,
				data: ordem.created_at,
				nome: ordem.nome,
				status: ordem.status_ordem_servico,
				tipo: ordem.tipo_ordem_servico,
			}));

			setOrdensDeServico(rows);
			setPagination(resultado.pagination);
		}
		catch(err) {
			console.log('err >> ', err)
		}
	}

	useEffect(() => {
		handleBuscarOrdensDeServico();
	}, []);

	const onPageChange = (page, pageSize) => {
		handleBuscarOrdensDeServico(page, pageSize)
	}

	const handeFiltrarOrdensDeServico = () => handleBuscarOrdensDeServico();

  return (
    <>
      <Card title="Ordens de Servico">
				{ /* Filtro */ }
				<Card >
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Flex flexDirection="row" style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
							{ /* Numero da OS */ }
							<Flex flexDirection="column">
								<label>OS</label>
								<Input
									value={filtro.nome}
									allowClear={true}
									onChange={(ev) => handleChangeFilterField('os', ev)}
									style={{ width: '18rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>
							{ /* Tipo da OS */ }
							<Flex flexDirection="column">
								<label>Tipo</label>
								<Select
									value={filtro.tipo}
									onChange={(ev) => handleChangeFilterField('tipo', { target: { value: ev } })}
									showSearch={true}
									allowClear={true}
									optionFilterProp="children"
									style={{ width: '15rem', marginTop: '0.5rem', marginRight: '1rem' }}
								>
									{
										listaTipoOrdemServico.map(tipoOrdem => (
											<Option key={tipoOrdem.id} value={tipoOrdem.id}>{ tipoOrdem.description }</Option>
										))
									}
								</Select>
							</Flex>
							{ /* Status da OS */ }
							<Flex flexDirection="column">
								<label>Status</label>
								<Select
									value={filtro.status}
									onChange={(ev) => handleChangeFilterField('status', { target: { value: ev } })}
									showSearch={true}
									allowClear={true}
									optionFilterProp="children"
									style={{ width: '15rem', marginTop: '0.5rem', marginRight: '1rem' }}
								>
									{
										listaStatusOrdemServico.map(statusOrdem => (
											<Option key={statusOrdem.id} value={statusOrdem.id}>{ statusOrdem.description }</Option>
										))
									}
								</Select>
							</Flex>
							{ /* Cliente */ }
							<Flex flexDirection="column">
								<label>Cliente</label>
								<Input
									value={filtro.cliente}
									allowClear={true}
									onChange={(ev) => handleChangeFilterField('cliente', ev)}
									style={{ width: '18rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>
							{ /* Data Inicio */ }
							<Flex flexDirection="column">
								<label>Data Inicio</label>
								<DatePicker
									value={filtro.data_inicio_raw}
									onChange={(ev) => handleChangeFilterField('data_inicio_raw', { target: { value: ev } })}
									placeholder=""
									style={{ width: '15rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>
							{ /* Data Fim */ }
							<Flex flexDirection="column">
								<label>Data Fim</label>
								<DatePicker
									value={filtro.data_fim_raw}
									onChange={(ev) => handleChangeFilterField('data_fim_raw', { target: { value: ev } })}
									placeholder=""
									style={{ width: '15rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>
						</Flex>

						<Button
							type="primary"
							style={{ minWidth: '10rem', alignSelf: 'flex-end' }}
							onClick={handeFiltrarOrdensDeServico}
						>
							Buscar
						</Button>
					</div>
				</Card>

        <Link to={`/app/dashboards/abrir-chamado?previous=app/dashboards/ordens-de-servico`}>
          <Button type="primary">Abrir Chamado</Button>
        </Link>

        <Table
          pagination={false}
          columns={tableColumns} 
          dataSource={ordensDeServico} 
          rowKey='id'
					style={{ cursor: 'pointer', marginTop: '2rem' }}
					onRow={(record, rowIndex) => ({
						onClick: (event) => {
							navigate(`/app/dashboards/editar-ordem-de-servico/${record.id}`);
						}
					})}
        />

				<Pagination
					defaultCurrent={parseInt(pagination.page)}
					current={parseInt(pagination.page)}
					pageSize={pagination.limit}
					total={pagination.total}
					style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}
					onChange={onPageChange}
					size="default" showSizeChanger showQuickJumper
				/>
      </Card>
    </>
  )
}

export default OrdenDeServico;
