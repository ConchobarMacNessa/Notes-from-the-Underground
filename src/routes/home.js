/* eslint-disable */
const get = require('./../database/get_poems');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
    get.poems((err, poems) => {
      if (err) {
        return err;
      }
      if (req.auth.isAuthenticated){
        poems.forEach((poem) => {
          if (poem.username === req.auth.credentials.username) {
            poem.self = true;
          }
        })
      }
      reply.view('index', { poems:poems /*isAuthenticated:false*/ }); //TODO: is this needed?
    });
  },
};
