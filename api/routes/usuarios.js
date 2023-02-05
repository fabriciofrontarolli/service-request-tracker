const { Router } = require('express');
const passport = require('passport');
const { v4 } = require('uuid');
const bcrypt = require('bcrypt');
const { Usuario, Usuarios_Clientes } = require('../entities');
const { novoUsuarioSchema, atualizaUsuarioSchema } = require('./schemas/usuarios-schema');
const { PERFIL_CLIENTE, PERFIL_TECNICO, PERFIL_ADMINISTRADOR } = require('../authentication/constants');

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

    try {
      const resultado = await Usuario.findAll({
        limit,
        offset,
        attributes: {
          exclude: ['password']
        }
      });

      const count = await Usuario.count();
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

router.get('/tecnicos',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    if (req.user.perfil === PERFIL_CLIENTE.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const resultado = await Usuario.findAll({
        where: {
          is_tecnico: true
        },
        attributes: {
          exclude: ['password']
        }
      });

      return res.json({ data: resultado });
    }
    catch(er) {
      console.log(er);
    }
});

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id || undefined;

    if (req.user.perfil === PERFIL_CLIENTE.id && req.user.id !== id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!id) {
      return res.json();
    }

    try {
      const usuario = await Usuario.findOne({
        where: { id },
        attributes: {
          exclude: ['password']
        }
      });

      return res.json({
        data: usuario
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

    const { error } = novoUsuarioSchema.validate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createUserPayload = {
      id: v4(),
      nome: body.nome,
      email: body.email,
      perfil: body.perfil,
      password: hashedPassword,
      is_admin: body.is_admin || false,
      is_tecnico: body.is_tecnico || false,
      is_cliente: body.is_cliente || false,
      is_ativo: true,
    };

    const createdUser = await Usuario.create(createUserPayload);

    // created relationship row
    if (body.id_cliente) {
      const usuarioClienteRelationship = {
        id: v4(),
        id_usuario: createdUser.id,
        id_cliente: body.id_cliente
      };
      await Usuarios_Clientes.create(usuarioClienteRelationship);
    }

    return res.json(createdUser);
});

router.put('/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id;

    if (req.user.perfil === PERFIL_CLIENTE.id && req.user.id !== id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const body = req.body;
    const usuarioPayload = {
      ...body
    };

    if (req.user.perfil === PERFIL_CLIENTE.id || req.user.perfil === PERFIL_TECNICO.id) {
      usuarioPayload.is_admin = false;
      usuarioPayload.is_tecnico = req.user.perfil === PERFIL_TECNICO.id;
      usuarioPayload.is_cliente = req.user.perfil === PERFIL_CLIENTE.id;
      usuarioPayload.perfil = req.user.perfil;
    }

    const { error } = atualizaUsuarioSchema.validate(usuarioPayload);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (usuarioPayload.password) {
      const hashedPassword = await bcrypt.hash(usuarioPayload.password, 10);
      usuarioPayload.password = hashedPassword;
    }

    await Usuario.update(usuarioPayload, {
      where: {
        id
      }
    });

    // created relationship row
    if (usuarioPayload.id_cliente) {
      const usuarioClienteRelationship = {
        id: v4(),
        id_usuario: id,
        id_cliente: usuarioPayload.id_cliente
      };
      await Usuarios_Clientes.create(usuarioClienteRelationship);
    }

    const updatedCliente = {
      id,
      ...usuarioPayload
    }

    return res.json(updatedCliente);
});

router.put('/:id/desativar',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id;

    if (req.user.perfil !== PERFIL_ADMINISTRADOR.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Usuario.update({ is_ativo: false }, {
      where: { id }
    });

    return res.json({ message: 'ok' });
});

router.put('/:id/ativar',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = req.params.id;

    if (req.user.perfil !== PERFIL_ADMINISTRADOR.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await Usuario.update({ is_ativo: true }, {
      where: { id }
    });

    return res.json({ message: 'ok' });
});

module.exports = router;
