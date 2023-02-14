import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const FornecedorService = {}

FornecedorService.fetch = function (page, limit, filtro) {
	let apiQuery = `?page=${page}&limit=${limit}`;

	if (filtro) {
		const updatedApiQuery = Object.entries(filtro)
																	.reduce((query, [key,value]) => {
																		const normalizedValue = encodeURIComponent(value.replace(/ /g, "%20"));
																		return `${query}&${key}=${normalizedValue}`;
																	}, apiQuery);
		apiQuery = updatedApiQuery;
	}

	return fetch.get(`/fornecedores${apiQuery}`);
}

FornecedorService.get = function (id) {
	if (!id) { return undefined; }
	return fetch.get(`/fornecedores/${id}`);
}

FornecedorService.criar = function (data) {
	normalizePayload(data);
	return fetch({
		url: '/fornecedores',
		method: 'post',
		data: data
	});
}

FornecedorService.salvar = function (id, data) {
	return fetch({
		url: `/fornecedores/${id}`,
		method: 'put',
		data: data
	})
}

export default FornecedorService;
