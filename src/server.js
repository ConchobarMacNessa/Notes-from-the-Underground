const hapi = require('hapi');

const server = new hapi.Server();
const inert = require('inert');
const vision = require('vision');

const routes = require('./routes');
const handlebars = require('./handlebars');

server.connection({
  host: 'localhost',
  port: 4000,
});

server.register([inert, vision], (err) => {
  if (err) throw err;

  server.views(handlebars);
  server.route(routes);
});

module.exports = server;
