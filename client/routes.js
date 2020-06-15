const routes = (app, server) => {
  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });
};

module.exports = routes;
