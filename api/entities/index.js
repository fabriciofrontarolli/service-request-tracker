const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv/config.js');

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: '5432',
  dialect: 'postgres',
  logging: true
});

/* Models */
// StatusOrdemServico
const StatusOrdemServico = sequelize.define('StatusOrdemServico', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  description: { type: DataTypes.STRING }
}, {
  sequelize,
  tableName: 'status_ordem_servico',
  modelName: 'status_ordem_servico',
  freezeTableName: true,
  timestamps: false,
  underscored: true
});

// TipoOrdemServico
const TipoOrdemServico = sequelize.define('TipoOrdemServico', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  description: { type: DataTypes.STRING }
}, {
  sequelize,
  tableName: 'tipo_ordem_servico',
  modelName: 'tipo_ordem_servico',
  freezeTableName: true,
  timestamps: false,
  underscored: true
});

// Usuario
const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  perfil: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  is_admin: { type: DataTypes.BOOLEAN, allowNull: false },
  is_tecnico: { type: DataTypes.BOOLEAN, allowNull: false },
  is_cliente: { type: DataTypes.BOOLEAN, allowNull: false },
  is_ativo: { type: DataTypes.BOOLEAN, allowNull: false },
  created_at: { type: DataTypes.DATE },
}, { sequelize, tableName: 'usuarios', modelName: 'usuarios', freezeTableName: true, timestamps: false });

// Cliente
const Cliente = sequelize.define('Cliente', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  codigo: { type: DataTypes.STRING },
  cpf_cnpj: { type: DataTypes.STRING, allowNull: false },
  inscricao_estadual: { type: DataTypes.STRING },
  razao_social: { type: DataTypes.STRING },
  nome_fantasia: { type: DataTypes.STRING },
  cep: { type: DataTypes.STRING },
  endereco: { type: DataTypes.STRING },
  numero: { type: DataTypes.STRING },
  complemento: { type: DataTypes.STRING },
  bairro: { type: DataTypes.STRING },
  cidade_estado: { type: DataTypes.STRING },
  telefone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  contato: { type: DataTypes.STRING },
  observacao: { type: DataTypes.STRING },
  contrato: { type: DataTypes.BOOLEAN },
  created_at: { type: DataTypes.DATE },
}, { sequelize, tableName: 'clientes', modelName: 'clientes', freezeTableName: true, timestamps: false });

// UsuariosClientes
const Usuarios_Clientes = sequelize.define('Usuarios_Clientes', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  id_usuario: { type: DataTypes.UUID },
  id_cliente: { type: DataTypes.UUID },
  created_at: { type: DataTypes.DATE }
}, {
  sequelize,
  tableName: 'usuarios_clientes',
  modelName: 'usuarios_clientes',
  freezeTableName: true,
  timestamps: false
});

// OrdemServico
const OrdemServico = sequelize.define('OrdemServico', {
  id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  cliente_id: { type: DataTypes.UUID },
  usuario_id: { type: DataTypes.UUID },
  status_ordem_servico_id: { type: DataTypes.UUID },
  tipo_ordem_servico_id: { type: DataTypes.UUID },
  numero: { type: DataTypes.STRING },
  solicitante: { type: DataTypes.STRING },
  descricao: { type: DataTypes.TEXT },
  solucao: { type: DataTypes.TEXT },
  observacao: { type: DataTypes.TEXT },
  consumo: { type: DataTypes.TEXT }, 
  assinatura: { type: DataTypes.TEXT },
  data_inicio_atendimento: { type: DataTypes.DATE },
  data_fim_atendimento: { type: DataTypes.DATE },
  created_at: { type: DataTypes.DATE }
}, {
  sequelize,
  tableName: 'ordens_de_servico',
  modelName: 'ordens_de_servico',
  freezeTableName: true,
  timestamps: false,
  underscored: true
});

// Associations

StatusOrdemServico.belongsTo(OrdemServico, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
TipoOrdemServico.belongsTo(OrdemServico, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
Usuario.belongsTo(OrdemServico, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
Cliente.belongsTo(OrdemServico, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
Cliente.belongsToMany(Usuario, {
  through: Usuarios_Clientes, as: 'usuarios_clientes',
  foreignKey: 'id_usuario',
});
Usuario.belongsToMany(Cliente, {
  through: Usuarios_Clientes, as: 'usuarios_clientes',
  foreignKey: 'id_cliente'
});
OrdemServico.hasOne(StatusOrdemServico, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
OrdemServico.hasOne(TipoOrdemServico, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
OrdemServico.hasOne(Usuario, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});
OrdemServico.hasOne(Cliente, {
  foreignKey: { name: 'id', type: DataTypes.UUID }
});

module.exports = {
  sequelize,
  StatusOrdemServico,
  TipoOrdemServico,
  Usuario,
  Cliente,
  Usuarios_Clientes,
  OrdemServico
};
