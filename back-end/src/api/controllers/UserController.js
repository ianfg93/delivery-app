const { encrypt } = require('../middlewares/encrypt');
const { autenticateUser } = require('../services/userService');

const getUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(404).end();
  const user = await autenticateUser(email, encrypt(password));
  if (!user) return res.status(404).json({ message: 'Invalid email or password!' });
  res.status(202).json(user);
};

module.exports = {
  getUser,
};
