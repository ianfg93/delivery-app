const md5 = require('md5');

const encrypt = (pass) => md5(pass);

module.exports = {
  encrypt,
};