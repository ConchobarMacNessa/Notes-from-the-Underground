const env = require('env2')('./config.env');
const qs = require('querystring');

const clientID = process.env.APP_ID;
const callbackURI = `${process.env.BASE_URL}/welcome`;

module.exports = {
  method: 'GET',
  path: '/login-oauth',
  config: {
    auth: false,
    handler: (req, reply) => {
      const url = `https://www.facebook.com/dialog/oauth?client_id=${clientID}&redirect_uri=${callbackURI}`;
      reply.redirect(url);
    },
  },
};
