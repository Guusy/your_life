const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../config');

module.exports = (app, server) => {
  if (config.enviroment !== 'production') {
    server.use(morgan('dev'));
  }
  server.use(cookieParser());
  server.use(bodyParser.json({ limit: '50mb' }));
  server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // Passport Routes
  server.get('/api/quetto', (req, res, next) => {
    return res.json({ name: 'pepe' });
  });
};
