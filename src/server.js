const hapi = require('hapi');
require('env2')('config.env');
const fs = require('fs');
const path = require('path');

const server = new hapi.Server();
const inert = require('inert');
const vision = require('vision');
const cookieAuthModule = require('hapi-auth-cookie');
const contextCredentials = require('hapi-context-credentials');

const routes = require('./routes');
const handlebars = require('./handlebars');

server.connection({
  // host: 'localhost',
  port: process.env.PORT || 4000,
  tls: {
    key: fs.readFileSync(path.join(__dirname, '../keys/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem')),
  },
});

server.register([inert, vision, cookieAuthModule, contextCredentials], (err) => {
  if (err) throw err;

  server.auth.strategy('base', 'cookie', 'optional', {
    password: process.env.COOKIE_PASSWORD,
    cookie: 'Underground-Cookie',
    isSecure: false, // change when on heroku
    ttl: 24 * 60 * 60 * 1000,
    isSameSite: false,
  });

  server.views(handlebars);
  server.route(routes);
});

module.exports = server;
