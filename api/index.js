const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const configureRoutes = require('./routes');
const rateLimit = require('express-rate-limit');
const passport = require('./authentication');
const dotenv = require('dotenv/config.js');

const app = express();
app.use(passport.initialize());
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use(rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
	max: 2000, // Limit each IP to 2000 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));

configureRoutes(app);

const PORT = process.env.API_PORT;
app.listen(PORT, () => {
  console.log('server running on port: ', PORT)
});
