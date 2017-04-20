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
        reply.view('login_register');
      }
      const avatar_url = user.avatar_url;

      bcrypt.compare(password, user.password, (err, isAuthenticated) => {
        if (err) {
          console.log(err);
          return reply.view('login_register');
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
