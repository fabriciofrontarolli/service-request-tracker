
export const TRIAGEM = {
	"id": "deddf150-e3a0-4a09-8b54-671df2ba6824",
	"description": "Triagem"
};

export const ABERTO = {
	"id": "cbe8b932-90ca-4a5b-84e4-3aa91571a0cb",
	"description": "Aberto"
};

export const EM_ANDAMENTO = {
	"id": "5c1795fd-8856-4c44-85fd-f1488cb5489b",
	"description": "Em Atendimento"
};

export const FECHADO = {
	"id": "1cdf403c-9da1-4a8e-b2fc-3e356d9815ff",
	"description": "Fechado"
};

export const COBRANCA = {
	"id": "4a48df79-a466-4bd0-83b9-3c94b2b76d7f",
	"description": "Cobrança"
};

export const ARQUIVADO = {
	"id": "1050ced4-0599-456d-a614-932ab25aed99",
	"description": "Arquivado"
};

export const PERFIL_ADMINISTRADOR = {
	"id": "administrador",
	"description": "Administrador"
};
export const PERFIL_TECNICO = {
	"id": "tecnico",
	"description": "Tecnico"
};
export const PERFIL_CLIENTE = {
	"id": "cliente",
	"description": "Cliente"
};

export const listaPerfil = [
	PERFIL_ADMINISTRADOR,
	PERFIL_TECNICO,
	PERFIL_CLIENTE
];

export const listaStatusOrdemServico = [
	TRIAGEM,
	ABERTO,
	EM_ANDAMENTO,
	FECHADO,
	COBRANCA,
	ARQUIVADO	
];

export const listaTipoOrdemServico = [
	{
		"id": "f6d1944a-7569-4668-bae6-c6fe4f36eb29",
		"description": "Laboratório"
	},
	{
		"id": "9957342c-815e-47b4-8d16-62fe4432ee59",
		"description": "Campo"
	}
];
