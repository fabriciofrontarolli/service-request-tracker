const { Router } = require('express');
const passport = require('passport');
const { Sequelize } = require('sequelize');
const { v4 } = require('uuid');
const { PERFIL_CLIENTE } = require('../authentication/constants');
const { Cliente } = require('../entities');
const { novoClienteSchema, atualizaClienteSchema } = require('./schemas/clientes-schema');
const router = Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    /* filtros */
    const { cpf_cnpj, razao_social, nome_fantasia } = req.query;
    const where = {};
    if (cpf_cnpj) {
      where.cpf_cnpj = { [Sequelize.Op.iLike]: `%${decodeURIComponent(cpf_cnpj)}%` };
    }
    if (razao_social) {
      where.razao_social = { [Sequelize.Op.iLike]: `%${decodeURIComponent(razao_social)}%` };
    }
    if (nome_fantasia) {
      where.nome_fantasia = { [Sequelize.Op.iLike]: `%${decodeURIComponent(nome_fantasia)}%` };
    }

    try {
      const resultado = await Cliente.findAll({
        where,
        limit,
        offset
      });

      const count = await Cliente.count();
      const totalPages = Math.ceil(count / limit);

      return res.json({
        data: resultado,
        pagination: {
          page,
          limit,
          totalPages,
          total: count
        }
      });
    }
    catch(er) {
      console.log(er);
    }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const id = req.params.id || undefined;

    if (!id) {
      return res.json();
    }

    try {
      const cliente = await Cliente.findOne({
        where: { id }
      });

      return res.json({
        data: cliente
      });
    }
    catch(er) {
      console.log(er);
    }
});

router.post('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const body = req.body;

    const { error } = novoClienteSchema.validate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const createClientePayload = {
      id: v4(),
      ...body
    }

    const createdCliente = await Cliente.create(createClientePayload);
    return res.json(createdCliente);
});

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = req.params.id;
    const body = req.body;

    const { error } = atualizaClienteSchema.validate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    await Cliente.update(body, {
      where: {
        id
      }
    });

    const updatedCliente = {
      id,
      ...body
    }

    return res.json(updatedCliente);
});

module.exports = router;
