import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Input, Divider, Alert } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import CustomIcon from 'components/util-components/CustomIcon'
import { 
	signIn, 
	showLoading, 
	showAuthMessage, 
	hideAuthMessage,
} from 'store/slices/authSlice';
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

export const LoginForm = props => {
	
	const navigate = useNavigate();

	const { 
		otherSignIn, 
		showForgetPassword, 
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		extra, 
		signIn, 
		token, 
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect = true
	} = props

	const initialCredential = {
		email: 'administrador@sathi.com.br',
		password: 'P@$$w0rd'
	}

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

	useEffect(() => {
		if (token !== null && allowRedirect) {
			navigate(redirect)
		}
		if (showMessage) {
			const timer = setTimeout(() => hideAuthMessage(), 3000)
			return () => {
				clearTimeout(timer);
			};
		}
	});

	return (
		<>
			<motion.div 
				initial={{ opacity: 0, marginBottom: 0 }} 
				animate={{ 
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0 
				}}> 
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form 
				layout="vertical" 
				name="login-form" 
				initialValues={initialCredential}
				onFinish={onLogin}
			>
				<Form.Item 
					name="email" 
					label="Email" 
					rules={[
						{ 
							required: true,
							message: 'Por favor digite seu email',
						},
						{ 
							type: 'email',
							message: 'Por favor digite um email valido!'
						}
					]}>
					<Input prefix={<MailOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item 
					name="password" 
					label={
						<div className={`${showForgetPassword? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
							<span>Senha</span>
							{
								showForgetPassword && 
								<span 
									onClick={() => onForgetPasswordClick} 
									className="cursor-pointer font-size-sm font-weight-normal text-muted"
								>
									Forget Password?
								</span>
							} 
						</div>
					} 
					rules={[
						{ 
							required: true,
							message: 'Por favor digite sua senha',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />}/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Entrar
					</Button>
				</Form.Item>
				{ extra }
			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({auth}) => {
	const {loading, message, showMessage, token, redirect} = auth;
  return {loading, message, showMessage, token, redirect}
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
