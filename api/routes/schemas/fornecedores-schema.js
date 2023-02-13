const Joi = require('joi');

const novoFornecedorSchema = Joi.object({
  codigo: Joi.string()
      .max(5),
  
  cpf_cnpj: Joi.string()
      .min(11)
      .max(18)
      .required(),
  
  inscricao_estadual: Joi.string()
      .min(9)
      .max(18),

  razao_social: Joi.string().max(120),
  
  nome_fantasia: Joi.string().max(120),
  
  cep: Joi.string().pattern(new RegExp('[0-9]{5}-[0-9]{3}')),

  endereco: Joi.string().max(150),

  numero: Joi.string().max(10),

  complemento: Joi.string().max(50),

  bairro: Joi.string().max(60),

  cidade_estado: Joi.string().max(70),

  telefone: Joi.string().max(60),
  
  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }),
  
  contato: Joi.string().max(50),

  observacao: Joi.string().max(100),
});

const atualizaFornecedorSchema = Joi.object({
    codigo: Joi.string()
        .max(5),
    
    cpf_cnpj: Joi.string()
        .min(11)
        .max(18)
        .required(),
    
    inscricao_estadual: Joi.string()
        .min(9)
        .max(18),
  
    razao_social: Joi.string().max(120),
    
    nome_fantasia: Joi.string().max(120),
    
    cep: Joi.string().pattern(new RegExp('[0-9]{5}-[0-9]{3}')),
  
    endereco: Joi.string().max(150),
  
    numero: Joi.string().max(10),
  
    complemento: Joi.string().max(50),
  
    bairro: Joi.string().max(60),
  
    cidade_estado: Joi.string().max(70),
  
    telefone: Joi.string().max(60),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }),
    
    contato: Joi.string().max(50),
  
    observacao: Joi.string().max(100),
  });

/*
{
	"id": "d6b3f4ea-3d97-4962-8450-35e124db055d",
	"codigo": "1",
	"cpf_cnpj": "11122233344",
	"nome_fantasia": "Bob Frontarolli",
	"cep": "15990-000",
	"endereco": "Rua Canastra",
	"numero": "190",
	"complemento": "Fundos",
	"bairro": "centro",
	"cidade_estado": "Sao Paulo",
	"telefone": "19917728837",
	"email": "bob@gmail.com",
	"contato": "Naiara"
}
*/

module.exports = {
  novoFornecedorSchema,
  atualizaFornecedorSchema
};
