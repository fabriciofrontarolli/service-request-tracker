import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const OrdensDeServicoService = {}

OrdensDeServicoService.fetch = function (page, limit, filtro) {
	let apiQuery = `?page=${page}&limit=${limit}`;

	if (filtro) {
		const updatedApiQuery = Object.entries(filtro)
																	.reduce((query, [key,value]) => {
																		const normalizedValue = encodeURIComponent(value.replace(/ /g, "%20"));
																		return `${query}&${key}=${normalizedValue}`;
																	}, apiQuery);
		apiQuery = updatedApiQuery;
	}

	return fetch.get(`/ordens-de-servico${apiQuery}`);
}

OrdensDeServicoService.get = function (id) {
	if (!id) { return undefined; }
	return fetch.get(`/ordens-de-servico/${id}`);
}

OrdensDeServicoService.quadroLaboratorio = function () {
	return fetch.get(`/ordens-de-servico/quadro-laboratorio`);
}

OrdensDeServicoService.quadroCampo = function () {
	return fetch.get(`/ordens-de-servico/quadro-campo`);
}

OrdensDeServicoService.criar = function (data) {
	normalizePayload(data);
	return fetch({
		url: '/ordens-de-servico',
		method: 'post',
		data: data
	})
}

OrdensDeServicoService.salvar = function (id, data) {
	return fetch({
		url: `/ordens-de-servico/${id}`,
		method: 'put',
		data: data
	})
}

export default OrdensDeServicoService;
