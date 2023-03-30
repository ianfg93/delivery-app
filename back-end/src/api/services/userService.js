const { Op } = require('sequelize');
const { User } = require('../../database/models');

const autenticateUser = async (email, password) => {
  const user = await User.findOne(
    { where: { email, password },
    attributes: { exclude: 'password' } },
  );
  return user;
};

const createUser = async (name, email, password) => {
  const user = await User.findOrCreate({
    where: {
      [Op.or]: [{ name }, { email }],
    },
    defaults: {
      name,
      email,
      password,
      role: 'costumer',
    },
  });
  return user;
};

module.exports = {
  autenticateUser,
  createUser,
};