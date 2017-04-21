const connect = require('./db_connect');

const deletePoem = (id, cb) => {
  connect.query(`DELETE FROM articles WHERE articles.id = ${id}`, (err) => {
    if (err) return cb(err);
    return cb(null);
  });
};

module.exports = deletePoem;
