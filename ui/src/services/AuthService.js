import fetch from 'auth/FetchInterceptor'
import { API_BASE_URL } from 'configs/AppConfig';

const AuthService = {}

AuthService.login = function (data) {
	const url = `${API_BASE_URL}authentication/login`;
	return fetch.post(url, data);
}

export default AuthService;
