const connect = require('./db_connect');

const hashPwd = require('./../helper_functions/hash_pwd');

const post = {};

post.poems = (newPoem, callback) => {
  connect.query(`INSERT INTO articles (author_id, title, body_text)
  VALUES ($1, $2, $3) RETURNING id`, [2, newPoem.title, newPoem.body_text],
  (err, res) => {
    if (err) return callback(err);

    callback(null, res);
  });
};

post.register = (newUser, callback) => {
  if (!newUser.avatar_url) {
    newUser.avatar_url = 'https://classconnection.s3.amazonaws.com/473/flashcards/1378473/jpg/english-medieval1333077702290.jpg';
  }

  const checkUsername = 'SELECT username FROM users WHERE username = $1;';
  connect.query(checkUsername, [newUser.username], (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user.rows[0]) {
      const pushNewUser = 'INSERT INTO users (username, password, avatar_url) VALUES ($1, $2, $3)';

      hashPwd(newUser.password, (err, hash) => {
        if (err) {
          return callback(err);
        }
        connect.query(pushNewUser, [newUser.username, hash, newUser.avatar_url], (err) => {
          if (err) {
            return callback(err);
          }
          callback(null, `New user ${newUser.username} registered!`);
        });
      });
    } else {
      callback(new Error(`Sorry, the username ${newUser.username} is already taken.`));
    }
  });
};

module.exports = post;
