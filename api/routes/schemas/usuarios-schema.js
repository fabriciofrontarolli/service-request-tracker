const Joi = require('joi');

const novoUsuarioSchema = Joi.object({  
  nome: Joi.string().max(130),
  
  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }),
  
  perfil: Joi.string().max(50),
    
  password: Joi.string().max(200),

  is_admin: Joi.boolean(),

  is_tecnico: Joi.boolean(),

  is_cliente: Joi.boolean(),

  is_ativo: Joi.boolean(),

  id_cliente: Joi.string()
      .min(36)
      .max(36)
});

const atualizaUsuarioSchema = Joi.object({
  nome: Joi.string().max(130),
  
  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } }),

  perfil: Joi.string().max(50),
    
  password: Joi.string().max(200),

  is_admin: Joi.boolean(),

  is_tecnico: Joi.boolean(),

  is_cliente: Joi.boolean(),

  is_ativo: Joi.boolean(),

  id_cliente: Joi.string()
      .min(36)
      .max(36)
});

/*
{
	"id": "bf9db5a6-b1e4-477c-93b7-8bb13d2be815",
	"nome": "Fabricio Frontarolli",
  "email": "bob@gmail.com",
  "password": "11122233344",
  "is_admin": true,
  "is_tecnico": true
}
*/

module.exports = {
  novoUsuarioSchema,
  atualizaUsuarioSchema
};
