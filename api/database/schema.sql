-- Database: SATHI

-- DROP DATABASE IF EXISTS SATHI;
/*
CREATE DATABASE SATHI
WITH TEMPLATE = template0
ENCODING = 'UTF8'
LC_COLLATE = 'en_US.UTF-8'
LC_CTYPE = 'en_US.UTF-8'
CONNECTION LIMIT = -1;

ALTER DATABASE SATHI
SET timezone TO 'America/Sao_Paulo';

ALTER DATABASE SATHI
SET datestyle TO 'DMY';

*/

-- Usuarios
CREATE TABLE IF NOT EXISTS usuarios
(
  id        	UUID          NOT NULL,
  nome      	VARCHAR(130)  NOT NULL,
  email     	VARCHAR(130)  NOT NULL,
  password  	VARCHAR(200)  NOT NULL,
	is_admin		BOOLEAN				NULL,
	is_tecnico	BOOLEAN				NULL,
	is_cliente	BOOLEAN				NULL,
	is_ativo		BOOLEAN				NULL,
	perfil			VARCHAR(50)		NULL,
	created_at	TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,

  PRIMARY KEY(id)
);

-- Clientes
CREATE TABLE IF NOT EXISTS clientes
(
	id									UUID					NOT NULL,
	codigo							VARCHAR(5)		NULL,
	cpf_cnpj						VARCHAR(18)		NOT NULL,
	inscricao_estadual	VARCHAR(18)		NULL,
	razao_social				VARCHAR(120)	NULL,
	nome_fantasia				VARCHAR(120)	NULL,
	cep									VARCHAR(9)		NULL,
	endereco						VARCHAR(150)	NULL,
	numero							VARCHAR(10)		NULL,
	complemento					VARCHAR(50)		NULL,
	bairro							VARCHAR(60)		NULL,
	cidade_estado				VARCHAR(70)		NULL,
	telefone						VARCHAR(60)		NULL,
	email								VARCHAR(200)	NULL,
	contato							VARCHAR(50)		NULL,
	observacao					VARCHAR(100)	NULL,
	contrato						BOOLEAN				NULL,
	created_at					TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,

	PRIMARY KEY (id)
);

-- Usuarios x Clientes
CREATE TABLE IF NOT EXISTS usuarios_clientes
(
	id			    UUID 				NOT NULL,
	id_usuario	UUID 				NOT NULL,
	id_cliente	UUID 				NOT NULL,
	created_at	TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,
	
	PRIMARY KEY (id_usuario, id_cliente),
	FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
	FOREIGN KEY (id_cliente) REFERENCES clientes (id)
);

INSERT INTO clientes
(
  id,
	codigo,
  cpf_cnpj,
  inscricao_estadual,
  razao_social,
  nome_fantasia,
  cep,
  endereco,
  numero,
  complemento,
  bairro,
  cidade_estado,
  telefone,
  email,
  contato,
  observacao,
  contrato
)
VALUES
(
	'85954410-391e-4f74-9259-7b7b04487e4e',
	'10000',
	'99.999.999.9999-99',
	'',
	'Cliente de Teste',
	'Cliente de Teste',
	'15996-050',
	'Avenida das Bandeiras',
	'999',
	'Andar 50',
	'Faria Lima',
	'Sao Paulo / Sao Paulo',
	'(11) 99999-9999',
	'teste@teste.com',
	'John Doe',
	'-',
	true
);

INSERT INTO usuarios (id,nome,email,password,is_admin,is_tecnico,is_cliente,is_ativo,perfil)
VALUES ('bf9db5a6-b1e4-477c-93b7-8bb13d2be815', 'Administrador', 'administrador@sathi.com.br', '$argon2id$v=19$m=65536,t=3,p=4$HytbGVRDUxE9aLGaVzEpEg$aMH30XwenX84WzNcbyDG7pr1/p8P+328Qftv7ZUUlYM', true, false, false, true, 'administrador');

-- Status das Ordens de Servico
CREATE TABLE IF NOT EXISTS status_ordem_servico
(
	id 					UUID 				NOT NULL,
	description	VARCHAR(14) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO status_ordem_servico (id, description) VALUES ('deddf150-e3a0-4a09-8b54-671df2ba6824', 'Triagem');
INSERT INTO status_ordem_servico (id, description) VALUES ('cbe8b932-90ca-4a5b-84e4-3aa91571a0cb', 'Aberto');
INSERT INTO status_ordem_servico (id, description) VALUES ('5c1795fd-8856-4c44-85fd-f1488cb5489b', 'Em Atendimento');
INSERT INTO status_ordem_servico (id, description) VALUES ('1cdf403c-9da1-4a8e-b2fc-3e356d9815ff', 'Fechado');
INSERT INTO status_ordem_servico (id, description) VALUES ('4a48df79-a466-4bd0-83b9-3c94b2b76d7f', 'Cobrança');
INSERT INTO status_ordem_servico (id, description) VALUES ('1050ced4-0599-456d-a614-932ab25aed99', 'Arquivado');

-- Tipo Ordem de Servico
CREATE TABLE IF NOT EXISTS tipo_ordem_servico
(
	id 					UUID 				NOT NULL,
	description	VARCHAR(14) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO tipo_ordem_servico (id, description) VALUES ('f6d1944a-7569-4668-bae6-c6fe4f36eb29', 'Laboratório');
INSERT INTO tipo_ordem_servico (id, description) VALUES ('9957342c-815e-47b4-8d16-62fe4432ee59', 'Campo');

-- Ordem de Servico
CREATE TABLE IF NOT EXISTS ordens_de_servico
(
  id 					  						UUID            NOT NULL,
  cliente_id    						UUID            NOT NULL,
	usuario_id								UUID						NULL, -- tecnico
	status_ordem_servico_id		UUID						NULL,
	tipo_ordem_servico_id			UUID						NULL,
	numero			   						VARCHAR(8)    	NULL,
  solicitante   						VARCHAR(100)    NULL,
  descricao     						TEXT            NULL,
  solucao       						TEXT            NULL,
  observacao    						TEXT            NULL,
  consumo       						TEXT            NULL,
	assinatura     						TEXT            NULL,
	data_inicio_atendimento		TIMESTAMP				NULL,
	data_fim_atendimento			TIMESTAMP				NULL,
	created_at								TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,

  PRIMARY KEY (id),

	CONSTRAINT fk_cliente_id
    FOREIGN KEY (cliente_id) REFERENCES clientes (id),
		
	CONSTRAINT fk_usuario_id
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id),

  CONSTRAINT fk_tipo_ordem_servico_id
    FOREIGN KEY (tipo_ordem_servico_id) REFERENCES tipo_ordem_servico (id),

  CONSTRAINT fk_status_ordem_servico_id
    FOREIGN KEY (status_ordem_servico_id) REFERENCES status_ordem_servico (id)
);

-- Fornecedores
CREATE TABLE IF NOT EXISTS fornecedores
(
	id									UUID					NOT NULL,
	codigo							VARCHAR(5)		NULL,
	cpf_cnpj						VARCHAR(18)		NOT NULL,
	inscricao_estadual	VARCHAR(18)		NULL,
	razao_social				VARCHAR(120)	NULL,
	nome_fantasia				VARCHAR(120)	NULL,
	cep									VARCHAR(9)		NULL,
	endereco						VARCHAR(150)	NULL,
	numero							VARCHAR(10)		NULL,
	complemento					VARCHAR(50)		NULL,
	bairro							VARCHAR(60)		NULL,
	cidade_estado				VARCHAR(70)		NULL,
	telefone						VARCHAR(60)		NULL,
	email								VARCHAR(200)	NULL,
	contato							VARCHAR(50)		NULL,
	observacao					VARCHAR(100)	NULL,
	created_at					TIMESTAMP WITH TIME ZONE DEFAULT current_timestamp,

	PRIMARY KEY (id)
);

/*
drop table status_ordem_servico cascade;
drop table tipo_ordem_servico cascade;
drop table ordens_de_servico cascade;
drop table usuarios_clientes cascade;
drop table usuarios cascade;
drop table clientes cascade;
drop table fornecedores cascade;
*/