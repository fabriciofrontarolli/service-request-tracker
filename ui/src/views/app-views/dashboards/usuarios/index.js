import React, { Component, useEffect, useState } from 'react'
import { Card, Table, Tag, Tooltip, message, Button, Pagination, notification, Input } from 'antd';
import { PoweroffOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import UsuarioService from "services/UsuarioService";
import { Link, useNavigate } from 'react-router-dom';
import Flex from 'components/shared-components/Flex';

export const UserList = () => {
	const [users, setUsers] = useState([]);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		totalPages: 1
	});
	const [filtro, setFiltro] = useState({
		nome: '',
	});


	const navigate = useNavigate();

	const handleBuscarUsuarios = async function(page=pagination.page, limit=pagination.limit) {
		try {
			const noNullFilters = Object.fromEntries(
				Object.entries(filtro).filter(([key, value]) => !!value)
			);
			const resultado = await UsuarioService.fetch(page, limit, noNullFilters);

			setUsers(resultado.data);
			setPagination(resultado.pagination);
		}
		catch(err) {
			notification.error({ message: 'Erro ao buscar lista de usuarios' })
		}
	}

	useEffect(() => {
		handleBuscarUsuarios();
	}, []);

	const handleToggleStatus = async (usuario) => {
		if (usuario.is_ativo) {
			await UsuarioService.desativar(usuario.id);
		} else {
			await UsuarioService.ativar(usuario.id);
		}
		handleBuscarUsuarios();
	}

	const onPageChange = (page, pageSize) => {
		handleBuscarUsuarios(page, pageSize)
	}

	const handleChangeFilterField = (field, event) => {
		const updatedFilter = {
			...filtro,
			[field]: event.target.value
		};
		setFiltro(updatedFilter);
	}

	const isToggleUserEnebled = (user) => {
		return user.email != "administrador@sathi.com.br";
	}

	const handeFiltrarUsuarios = () => handleBuscarUsuarios();

	const tableColumns = [
		{
			title: 'Nome',
			dataIndex: 'nome',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus name={record.nome} subTitle={record.email}/>
				</div>
			),
			sorter: {
				compare: (a, b) => {
					a = a.name.toLowerCase();
						b = b.name.toLowerCase();
					return a > b ? -1 : b > a ? 1 : 0;
				},
			},
		},
		{
			title: 'Perfil',
			dataIndex: 'perfil',
		},
		{
			title: 'Data Criacao',
			dataIndex: 'created_at',
			render: (_, record) => (
				<span>
					{ new Intl.DateTimeFormat("pt-BR", {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
						hour: "numeric",
						minute: "numeric",
					}).format(new Date(record.created_at)) }
				</span>
			),
			sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()
		},
		{
			title: 'Status',
			dataIndex: 'is_ativo',
			render: (_, record) => (
				<span>
					{ record.is_ativo ? 'Ativado' : 'Desativado'}
				</span>
			),
			sorter: (a, b) => moment(a.created_at).unix() - moment(b.created_at).unix()
		},
		{
			title: 'Ativar/Desativar',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div
					style={{ visibility: isToggleUserEnebled(elm) ? 'visible' : 'hidden' }}
					className="text-right d-flex justify-content"
				>
					<Tooltip title={elm.is_ativo ? 'Desativar' : 'Ativar'}>
						<Button
							icon={
								<PoweroffOutlined style={{ color: elm.is_ativo ? 'green' : 'red' }} />
							}
							onClick={(ev)=> {
								ev.stopPropagation();
								handleToggleStatus(elm)
							}}
							size="large"
						/>
					</Tooltip>
				</div>
			)
		}
	];

	return (
		<Card title="Usuarios">
			{ /* Filtros */ }
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
						{ /* Nome */ }
						<Flex flexDirection="column" style={{ marginBottom: '0.2rem' }}>
							<label>Nome</label>
							<Input
								value={filtro.nome}
								onChange={(ev) => handleChangeFilterField('nome', ev)}
								style={{ width: '18rem', marginTop: '0.5rem', marginRight: '1rem' }}
							/>
						</Flex>
						<Button
							type="primary"
							style={{ minWidth: '10rem', alignSelf: 'flex-end' }}
							onClick={handeFiltrarUsuarios}
						>
							Buscar
						</Button>
					</Flex>
				</div>
			</Card>

			<Link to={`/app/administrativo/novo-usuario`}>
				<Button type="primary">Novo Usuario</Button>
			</Link>
			<div className="table-responsive">
				<Table
					columns={tableColumns}
					dataSource={users}
					rowKey='id'
					pagination={false}
					style={{ cursor: 'pointer' }}
					onRow={(record, rowIndex) => ({
						onClick: (event) => {
							navigate(`/app/administrativo/editar-usuario/${record.id}`);
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
			</div>
		</Card>
	)
}

export default UserList;
