const { Router } = require('express');
const passport = require('passport');
const { TipoOrdemServico } = require('../entities');
const router = Router();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const resultado = await TipoOrdemServico.findAll({});

      return res.json(resultado);
    }
    catch(er) {
      console.log(er);
    }
});

module.exports = router;
