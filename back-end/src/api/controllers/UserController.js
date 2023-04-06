const { encrypt } = require('../middlewares/encrypt');
const { generateToken } = require('../middlewares/JWTgenerate');
const {
  autenticateUser, createUser, findSellers, createUserADM } = require('../services/userService');

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

const createADM = async (req, res) => {
  const { email, name, password, role } = req.body;
  if (!email || !password || !name) return res.status(404).end();
    const user = await createUserADM(name, email, encrypt(password), role);
    if (!user[1]) {
      return res.status(409).json(user);
    }
    return res.status(201).json(user);
};

const getSeller = async (_req, res) => {
  const users = await findSellers();
  return res.status(201).json(users);
};

module.exports = {
  getUser,
  createADM,
  create,
  getSeller,
};
