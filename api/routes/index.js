const ClientesRouter = require('./clientes');
const StatusOrdemServico = require('./status-ordem-servico');
const TipoOrdemServico = require('./tipo-ordem-servico');
const Usuarios = require('./usuarios');
const OrdemDeServico = require('./ordem-de-servico');
const FornecedoresRouter = require('./fornecedores');
const Authentication = require('./authentication');

module.exports = function(expressApp) {
  expressApp.use('/status-ordem-servico', StatusOrdemServico);
  expressApp.use('/tipo-ordem-servico', TipoOrdemServico);
  expressApp.use('/clientes', ClientesRouter);
  expressApp.use('/fornecedores', FornecedoresRouter);
  expressApp.use('/usuarios', Usuarios);
  expressApp.use('/ordens-de-servico', OrdemDeServico);
  expressApp.use('/authentication', Authentication);
};
