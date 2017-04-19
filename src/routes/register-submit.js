const post = require('./../database/post_poems');

module.exports = {
  method: 'POST',
  path: '/register',
  handler: (req, reply) => {
    const newUser = {
      username: req.payload.username,
      password: req.payload.password,
      avatar_url: req.payload.avatar_url,
    };
    post.register(newUser, (err) => {
      if (err) {
        console.log(err);
        return reply.view('login_register');
      }

      const username = newUser.username;
      const avatar = newUser.avatar_url;

      req.cookieAuth.set({ username, avatar });
      reply.redirect('/');
    });
  },
};
