import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Row, Col } from "antd";
import { useSelector } from 'react-redux';

const backgroundURL = '/img/others/img-17.jpg'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const Login = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
			<Row justify="center" className="align-items-stretch h-100">
				<Col xs={20} sm={20} md={24} lg={16}>
					<div className="container d-flex flex-column justify-content-center h-100">
						<Row justify="center">
							<Col xs={24} sm={24} md={20} lg={12} xl={8}>
								<h1>Entrar</h1>
								<p>Nao possui uma conta? <a href="mailto: sathi@sathi.com.br">Entre em contato</a></p>
								<div className="mt-4">
									<LoginForm {...props}/>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs={0} sm={0} md={0} lg={8}>
					<div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
						<div className="text-right">
							<h1 style={{ color: "#fff", marginTop: '1rem' }}>Sathi Informatica</h1>
						</div>
						<Row justify="center">
							<Col xs={0} sm={0} md={0} lg={20}>
								<img className="img-fluid mb-5" src="/img/others/support-illustration.png" alt=""/>
								<h1 className="text-white">Sathi Informatica</h1>
								<p className="text-white">Suporte e assistencia tecnica especializada</p>
							</Col>
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div>
								<span className="mx-2 text-white">  </span>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default Login
