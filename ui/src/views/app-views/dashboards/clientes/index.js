import React, { useEffect, useState } from "react";
import { Button, Card, Input, notification, Pagination, Table, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import utils from 'utils';
import ClienteService from "services/ClienteService";
import Flex from "components/shared-components/Flex";

const getCustomerType = isContract => {
	if(isContract) {
		return 'green';
	}
	return 'blue';
}

const tableColumns = [
	{
		title: 'ID',
		dataIndex: 'id',
		width: '25rem'
	},
	{
		title: 'Codigo',
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
	const [filtro, setFiltro] = useState({
		cpf_cnpj: '',
		razao_social: '',
		nome_fantasia: ''
	});

	const navigate = useNavigate();

	const handleBuscarClientes = async function(page=pagination.page, limit=pagination.limit) {
		try {
			const noNullFilters = Object.fromEntries(
				Object.entries(filtro).filter(([key, value]) => !!value)
			);
			const resultado = await ClienteService.fetch(page, limit, noNullFilters);

			setClientes(resultado.data);
			setPagination(resultado.pagination);
		}
		catch(err) {
			notification.error({ message: 'Erro ao buscar lista de clientes' })
		}
	}

	const handeFiltrarClientes = () => handleBuscarClientes();

	useEffect(() => {
		handleBuscarClientes();
	}, []);

	const onPageChange = (page, pageSize) => {
		handleBuscarClientes(page, pageSize)
	}

	const handleChangeFilterField = (field, event) => {
		const updatedFilter = {
			...filtro,
			[field]: event.target.value
		};
		setFiltro(updatedFilter);
	}

  return (
    <>
      <Card title="Clientes">
				<Card >
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<Flex
							flexDirection="row"
							style={{
								display: 'flex',
								flexWrap: 'wrap',
								marginBottom: '1rem',
								justifyContent: "space-between"
						}}
						>
							{ /* CPF/CNPJ */ }
							<Flex flexDirection="column" style={{ marginBottom: '0.2rem' }}>
								<label>CPF/CNPJ</label>
								<Input
									value={filtro.cpf_cnpj}
									onChange={(ev) => handleChangeFilterField('cpf_cnpj', ev)}
									style={{ width: '18rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>

							{ /* Razao Social */ }
							<Flex flexDirection="column" style={{ marginBottom: '0.2rem' }}>
								<label>Razao Social</label>
								<Input
									value={filtro.razao_social}
									onChange={(ev) => handleChangeFilterField('razao_social', ev)}
									style={{ width: '18rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>
							
							{ /* Nome Fantasia */ }
							<Flex flexDirection="column" style={{ marginBottom: '0.2rem' }}>
								<label>Nome Fantasia</label>
								<Input
									value={filtro.nome_fantasia}
									onChange={(ev) => handleChangeFilterField('nome_fantasia', ev)}
									style={{ width: '18rem', marginTop: '0.5rem', marginRight: '1rem' }}
								/>
							</Flex>

							<Button
								type="primary"
								style={{ minWidth: '10rem', alignSelf: 'flex-end' }}
								onClick={handeFiltrarClientes}
							>
								Buscar
							</Button>
						</Flex>
					</div>
				</Card>
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
