import fetch from 'auth/FetchInterceptor'
import { normalizePayload } from './utils';

const OrdensDeServicoService = {}

OrdensDeServicoService.fetch = function (page, limit) {
	return fetch.get(`/ordens-de-servico?page=${page}&limit=${limit}`);
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
	normalizePayload(data);
	return fetch({
		url: `/ordens-de-servico/${id}`,
		method: 'put',
		data: data
	})
}

export default OrdensDeServicoService;
