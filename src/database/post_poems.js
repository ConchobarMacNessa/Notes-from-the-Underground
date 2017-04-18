const connect = require('./db_connect');

const post = {};

post.poems = (newPoem, callback) => {
  connect.query(`INSERT INTO articles (author_id, title, body_text)
  VALUES ($1, $2, $3) RETURNING id`, [2, newPoem.title, newPoem.body_text],
  (err, res) => {
    if (err) return callback(err);

    callback(null, res);
  });
};

module.exports = post;
