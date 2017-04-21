/* eslint-disable */
const get = require('./../database/get_poems');

module.exports = {
  method: 'GET',
  path: '/',
  handler: (req, reply) => {
    get.poems((err, poems) => {
      if (err) {
        console.log(err);
        return;
      }
      // poems.home = true;
      if (req.auth.isAuthenticated){
        poems.forEach((poem) => {
          if (poem.username === req.auth.credentials.username) {
            poem.self = true;
          }
          console.log(poem.id);
        })
      }
      reply.view('index', { poems:poems /*isAuthenticated:false*/ });
    });
  },
};
