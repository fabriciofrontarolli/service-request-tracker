import React, { useEffect, useState } from 'react';
import { Menu, Dropdown, Avatar, Divider } from 'antd';
import { useDispatch } from 'react-redux'
import { 
	EditOutlined,
	LogoutOutlined ,
	UserOutlined
} from '@ant-design/icons';
import Icon from 'components/util-components/Icon';
import { signOut } from 'store/slices/authSlice';
import { AUTH_USER } from 'constants/AuthConstant';
import { APP_PREFIX_PATH } from 'configs/AppConfig';

const MenuItem = (props) => (
	<a className="d-flex align-items-center" href={props.path}>
		<Icon className="font-size-md" type={props.icon} />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</a>
)

const MenuItemSignOut = (props) => (
	<span className="d-flex align-items-center">
		<LogoutOutlined className="font-size-md" />
		<span className="font-weight-normal mx-2">{props.label}</span>
	</span>
)

export const NavProfile = () => {
	const dispatch = useDispatch();
	const [userName, setUserName] = useState();

	const handleClick = ({ key }) => {
		if (key === 'Sign Out') {
			handleSignOut()
		}
	}

	const handleSignOut = () => {
		dispatch(signOut())
	}

	const menu = (
		<Menu
			onClick={handleClick}
			items={
				[
					{
						key: 'Edit Profile',
						label: <MenuItem path={`${APP_PREFIX_PATH}/perfil`} label="Meu Perfil" icon={EditOutlined} />,
					},
					{
						key: 'Sign Out',
						label: <MenuItemSignOut label="Sair" />,
					}
				]
			}
		/>
	)

	const getLoggedInUser = () => {
		const loggedInUserRaw = localStorage.getItem(AUTH_USER) || null;
		if (!!loggedInUserRaw) {
			const loggedInUser = JSON.parse(loggedInUserRaw);
			setUserName(loggedInUser && loggedInUser.nome);
		}
	}

	useEffect(() => {
		getLoggedInUser();
	}, []);

	return (
		<Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
			<div className="nav-item">
				<div className="d-flex align-items-center">
					<div className="pl-2 d-none d-sm-block profile-text">
						<div className="font-size-base font-weight-bold">
							{ userName }
							<UserOutlined className="nav-icon ml-2 mr-2" />
						</div>
					</div>
				</div>
			</div>
		</Dropdown>
	);
}

export default NavProfile
