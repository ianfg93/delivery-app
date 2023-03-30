const { User } = require('../../database/models');

const autenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email, password },
    attributes: { exclude: 'password' } });
  return user;
};

module.exports = {
  autenticateUser,
};