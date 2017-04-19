const bcrypt = require('bcrypt');

module.exports = (plainTextPwd, callback) => {
  bcrypt.hash(plainTextPwd, 10, callback);
};
