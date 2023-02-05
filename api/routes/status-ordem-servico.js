const { Router } = require('express');
const passport = require('passport');
const { StatusOrdemServico } = require('../entities');
const router = Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    console.log('req ', req)
    try {
      const resultado = await StatusOrdemServico.findAll({});
      return res.json(resultado);
    }
    catch(er) {
      console.log(er);
    }
});

module.exports = router;
