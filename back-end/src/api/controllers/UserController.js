const { encrypt } = require('../middlewares/encrypt');
const { generateToken } = require('../middlewares/JWTgenerate');
const { autenticateUser, createUser } = require('../services/userService');

const getUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(404).end();
  const user = await autenticateUser(email, encrypt(password));
  if (!user) return res.status(404).json({ message: 'Invalid email or password!' });
  const token = await generateToken(user);
  res.status(200).json({ ...user.dataValues, token });
};

const create = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) return res.status(404).end();
    const user = await createUser(name, email, encrypt(password));
    if (!user[1]) {
      return res.status(409).json(user);
    }
    return res.status(201).json(user);
};

module.exports = {
  getUser,
  create,
};
