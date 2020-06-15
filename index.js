const express = require('express');
const next = require('next');
const cors = require('cors');
// const compression = require('compression');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './client', distDir: './client' });
const handle = app.getRequestHandler();

const backend = require('./server/routes');
const frontend = require('./client/routes');

app.prepare().then(() => {
  const server = express();
  server.use(
    cors({
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true
    })
  );

  // server.use(compression());

  backend(app, server, true);
  frontend(app, server, true);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
