const post = require('../database/post_poems');

module.exports = {
  method: 'POST',
  path: '/write-new-poem',
  handler: (req, reply) => {
    const newPoem = req.payload;
    newPoem.username = 'Hardy';

    post.poems(newPoem, (err) => {
      if (err) {
        console.log(err);
        return err;
      }
      reply.redirect('/');
    });
  },
};
