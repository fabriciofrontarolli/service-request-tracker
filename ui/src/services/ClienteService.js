import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const ClienteService = {}

ClienteService.fetch = function (page, limit) {
	return fetch.get(`/clientes?page=${page}&limit=${limit}`);
}

ClienteService.get = function (id) {
	if (!id) { return undefined; }
	return fetch.get(`/clientes/${id}`);
}

ClienteService.criar = function (data) {
	normalizePayload(data);
	return fetch({
		url: '/clientes',
		method: 'post',
		data: data
	});
}

ClienteService.salvar = function (id, data) {
	normalizePayload(data);
	return fetch({
		url: `/clientes/${id}`,
		method: 'put',
		data: data
	})
}

export default ClienteService;
