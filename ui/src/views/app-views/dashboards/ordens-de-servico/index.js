import React, { useEffect, useState } from "react";
import { Button, Card, Table, Tag, Pagination } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import OrdensDeServicoService from 'services/OrdensDeServiceService';
import utils from 'utils';

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
	const navigate = useNavigate();

	const handleBuscarOrdensDeServico = async function(page=pagination.page, limit=pagination.limit) {
		try {
			const resultado = await OrdensDeServicoService.fetch(page, limit);
			const rows = resultado.data.map(ordem => ({
				id: ordem.id,
				numero: ordem.numero,
				cliente: ordem.nome_fantasia,
				descricao: ordem.descricao,
				data: ordem.created_at,
				nome: ordem.nome,
				status: ordem.status_ordem_servico,
				tipo: ordem.tipo_ordem_servico,
			}))

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

  return (
    <>
      <Card title="Ordens de Servico">
        <Link to={`/app/dashboards/abrir-chamado`}>
          <Button type="primary">Abrir Chamado</Button>
        </Link>
        <Table
          pagination={false}
          columns={tableColumns} 
          dataSource={ordensDeServico} 
          rowKey='id'
					style={{ cursor: 'pointer' }}
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


