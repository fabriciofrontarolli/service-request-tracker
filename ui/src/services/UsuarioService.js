import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const UsuarioService = {}

UsuarioService.fetch = function (page, limit, filtro) {
	let apiQuery = `?page=${page}&limit=${limit}`;

	if (filtro) {
		const updatedApiQuery = Object.entries(filtro)
																	.reduce((query, [key,value]) => {
																		const normalizedValue = encodeURIComponent(value.replace(/ /g, "%20"));
																		return `${query}&${key}=${normalizedValue}`;
																	}, apiQuery);
		apiQuery = updatedApiQuery;
	}

	return fetch.get(`/usuarios${apiQuery}`);
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
