const bcrypt = require('bcrypt');
const loginAuth = require('../database/login_auth');

module.exports = {
  method: 'POST',
  path: '/login',
  handler: (req, reply) => {
    const username = req.payload.username;
    const password = req.payload.password;

    loginAuth(username, (err, user) => {
      if (err) {
        console.log(err);
        reply.view('login_register'); // TODO: create new page for if error.
      }
      const avatar_url = user.avatar_url;

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) {
          console.log(err);
          return reply.view('login_register'); // TODO: create new page for if error.
        }
        if (isAuthenticated) {
          req.cookieAuth.set({ username, avatar_url });
          reply.redirect('/');
        } else {
          reply.view('login_register');
        }
      });
    });
  },
};
