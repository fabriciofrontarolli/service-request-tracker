import React, { useEffect, useState } from "react";
import { Button, Card, notification, Pagination, Table, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import utils from 'utils';
import ClienteService from "services/ClienteService";

const getCustomerType = isContract => {
	if(isContract) {
		return 'green';
	}
	return 'blue';
}

const tableColumns = [
	{
		title: 'ID',
		dataIndex: 'codigo',
	},
  {
		title: 'Nome',
		dataIndex: 'nome_fantasia'
	},
	{
		title: 'CPF/CNPJ',
		dataIndex: 'cpf_cnpj'
	},
  {
		title: 'Telefone',
		dataIndex: 'telefone'
	},
  {
		title: 'Contrato',
		dataIndex: 'contrato',
    render: (_, record) => (
			<><Tag color={getCustomerType(record.contrato)}>{record.contrato ? "Sim" : "Nao"}</Tag></>
		),
		sorter: (a, b) => utils.antdTableSorter(a, b, 'contrato')
	},
];

// Aberto, Em atendimento, Fechado, Arquivado

export const DefaultDashboard = () => {
	const [clientes, setClientes] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		totalPages: 1
	});
	const navigate = useNavigate();

	const handleBuscarClientes = async function(page=pagination.page, limit=pagination.limit) {
		try {
			const resultado = await ClienteService.fetch(page, limit);

			setClientes(resultado.data);
			setPagination(resultado.pagination);
		}
		catch(err) {
			notification.error({ message: 'Erro ao buscar lista de clientes' })
		}
	}

	useEffect(() => {
		handleBuscarClientes();
	}, []);

	const onPageChange = (page, pageSize) => {
		handleBuscarClientes(page, pageSize)
	}

  return (
    <>
      <Card title="Clientes">
        <Link to={`/app/dashboards/novo-cliente`}>
          <Button type="primary">Novo Cliente</Button>
        </Link>
        <Table
					pagination={false}
          columns={tableColumns} 
          dataSource={clientes} 
          rowKey='ID'
					style={{ cursor: 'pointer' }}
					onRow={(record, rowIndex) => ({
						onClick: (event) => {
							navigate(`/app/dashboards/editar-cliente/${record.id}`);
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


export default DefaultDashboard;
