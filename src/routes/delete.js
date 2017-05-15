const deletePoem = require('./../database/delete_poem');

module.exports = {
  path: '/delete/{username}/{id}',
  method: 'GET',
  handler: (req, reply) => {
    if (req.auth.credentials.username !== req.params.username) {
      return reply.redirect('/');
    }
    return deletePoem(req.params.id, (err) => {
      if (err) {
        console.log(err);
        return reply('Something went wrong, sorry!'); // TODO: create new page for if error.
      }
      return reply.redirect('/');
    });
  },
};
