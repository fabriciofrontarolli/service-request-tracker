import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const ClienteService = {}

ClienteService.fetch = function (page, limit, filtro) {
	let apiQuery = `?page=${page}&limit=${limit}`;

	if (filtro) {
		const updatedApiQuery = Object.entries(filtro)
																	.reduce((query, [key,value]) => {
																		const normalizedValue = encodeURIComponent(value.replace(/ /g, "%20"));
																		return `${query}&${key}=${normalizedValue}`;
																	}, apiQuery);
		apiQuery = updatedApiQuery;
	}

	return fetch.get(`/clientes${apiQuery}`);
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
	return fetch({
		url: `/clientes/${id}`,
		method: 'put',
		data: data
	})
}

export default ClienteService;
