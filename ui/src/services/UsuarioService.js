import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const UsuarioService = {}

UsuarioService.fetch = function (page, limit) {
	return fetch.get(`/usuarios?page=${page}&limit=${limit}`);
}

UsuarioService.get = function (id) {
	if (!id) { return undefined; }
	return fetch.get(`/usuarios/${id}`);
}

UsuarioService.buscarTecnicos = function () {
	return fetch.get(`/usuarios/tecnicos`);
}

UsuarioService.criar = function (data) {
	normalizePayload(data);
	return fetch({
		url: '/usuarios',
		method: 'post',
		data: data
	})
}

UsuarioService.salvar = function (id, data) {
	normalizePayload(data);
	return fetch({
		url: `/usuarios/${id}`,
		method: 'put',
		data: data
	})
}

UsuarioService.ativar = function (id) {
	return fetch({
		url: `/usuarios/${id}/ativar`,
		method: 'put',
	})
}

UsuarioService.desativar = function (id) {
	return fetch({
		url: `/usuarios/${id}/desativar`,
		method: 'put',
	})
}

export default UsuarioService;
