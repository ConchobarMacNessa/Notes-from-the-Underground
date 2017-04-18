module.exports = {
  method: 'GET',
  path: '/write-new-poem',
  handler: (req, reply) => {
    reply.view('write-new-poem');
  },
};
