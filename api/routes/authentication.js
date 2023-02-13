const { Router } = require('express');
const passport = require('passport');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { Usuario, Usuarios_Clientes } = require('../entities');
const dotenv = require('dotenv/config.js');
const { PERFIL_CLIENTE } = require('../authentication/constants');
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.get('/secret', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Success! You can not see this without a token.' });
});

router.post('/login', async (req, res) => {
  const usuario = await Usuario.findOne({ where: { email: req.body.email } });
  if (!usuario) {
    return res.status(401).json({ message: 'Nenhum usuario encontrado' });
  }

  const match = await argon2.verify(usuario.password, req.body.password);
  if (!match) {
    return res.status(401).json({ message: 'Senha invalida' });
  }

  const isCliente = usuario.perfil === PERFIL_CLIENTE.id;
  let usuarioCliente = undefined;
  if (isCliente) {
    usuarioCliente = await Usuarios_Clientes.findOne({ where: { id_usuario: usuario.id } });
  }

  let token;
  const userObject = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
    cliente: isCliente ? usuarioCliente && usuarioCliente.id_cliente : undefined
  };

  

  try {
    token = jwt.sign(userObject, JWT_SECRET.toString('utf-8'), { expiresIn: '1d' });
  }
  catch(er) {
    console.log('error >>> ', er)
  }

  return res.status(200).json({ auth: true, token, usuario: userObject });
});

module.exports = router;
