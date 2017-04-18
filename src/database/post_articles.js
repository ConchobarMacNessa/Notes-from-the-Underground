const connect = require('./db_connect');

const post = {};

post.articles = (newArticle, callback) => {
  connect.query(`INSERT INTO articles (author_id, title, body_text)
  VALUSE ((SELECT users.id FROM users WHERE users.username = $1), $2, $3) RETURNING id`, [newArticle.username, newArticle.title, newArticle.body_text],
  (err, res) => {
    if (err) return callback(err);

    callback(null, res);
  });
};

module.exports = post;
