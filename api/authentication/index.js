const passport = require('passport');
const dotenv = require('dotenv/config.js');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const { Usuario } = require('../entities');

const JWT_SECRET = process.env.JWT_SECRET;

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET
};

passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
  Usuario.findOne({ where: { id: jwt_payload.id } })
    .then(user => {
      if (user && user.is_ativo) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => console.error(err));
}));

module.exports = passport;
