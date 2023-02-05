const Joi = require('joi');

const novaOrdemServicoSchema = Joi.object({
  cliente_id: Joi.string()
    .min(36)
    .max(36)
    .required(),

  usuario_id: Joi.string()
    .min(36)
    .max(36),

  status_ordem_servico_id: Joi.string()
    .min(36)
    .max(36),
  
  tipo_ordem_servico_id: Joi.string()
    .min(36)
    .max(36),

  numero: Joi.string().max(8),
  
  solicitante: Joi.string().max(100),

  descricao: Joi.string().max(500),

  solucao: Joi.string().max(500),

  observacao: Joi.string().max(500),

  consumo: Joi.string().max(500),

  assinatura: Joi.string(),

  data_inicio_atendimento: Joi.string(),

  data_fim_atendimento: Joi.string(),
});

const atualizaOrdemServicoSchema = Joi.object({  
  cliente_id: Joi.string()
    .min(36)
    .max(36),

  usuario_id: Joi.string()
    .min(36)
    .max(36),

  status_ordem_servico_id: Joi.string()
    .min(36)
    .max(36),
  
  tipo_ordem_servico_id: Joi.string()
    .min(36)
    .max(36),
  
  solicitante: Joi.string().max(100),

  descricao: Joi.string().max(500),

  solucao: Joi.string().max(500),

  observacao: Joi.string().max(500),

  consumo: Joi.string().max(500),

  assinatura: Joi.string(),

  data_inicio_atendimento: Joi.string(),

  data_fim_atendimento: Joi.string()
});

/*
{
	"id": "5834f5c7-82b2-42bd-862a-7ea325838aef",
	"cliente_id": "85954410-391e-4f74-9259-7b7b04487e4e",
  "usuario_id": "bf9db5a6-b1e4-477c-93b7-8bb13d2be815",
  "status_ordem_servico_id": "deddf150-e3a0-4a09-8b54-671df2ba6824",
  "tipo_ordem_servico_id": "f6d1944a-7569-4668-bae6-c6fe4f36eb29",
  "solicitante": "Bob",
  "descricao": "Bifinho nao funciona",
  "solucao": "Liberei o Bifinho",
  "observacao": "Bifado",
  "consumo": "Little Beefs"
}
*/

module.exports = {
  novaOrdemServicoSchema,
  atualizaOrdemServicoSchema
};
