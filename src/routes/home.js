/* eslint-disable */
const get = require('./../database/get_poems');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
    get.articles((err, poems) => {
      if (err) {
        console.log(err);
        return;
      }
      reply.view('index', { poems:poems, isAuthenticated:false });
    });
  },
};
