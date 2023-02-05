const { Router } = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Usuario } = require('../entities');
const dotenv = require('dotenv/config.js');
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

  const match = await bcrypt.compare(req.body.password, usuario.password);
  if (!match) {
    return res.status(401).json({ message: 'Senha invalida' });
  }

  let token;
  const userObject = {
    id: usuario.id,
    nome: usuario.nome,
    emal: usuario.email,
    perfil: usuario.perfil
  };
  try {
    token = jwt.sign(userObject, JWT_SECRET.toString('utf-8'), { expiresIn: '1d' });
  }
  catch(er) {
    console.log('error >>> ', er)
  }

  return res.status(200).json({ auth: true, token, usuario: userObject });
});

/*
router.post('/register', (req, res) => {
  User.create({
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: 86400 });
      res.status(200).json({ auth: true, token });
    })
    .catch(err => res.status(500).json({ message: 'Error', error: err }));
});
*/

module.exports = router;
