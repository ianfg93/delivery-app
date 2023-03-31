require('dotenv/config');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const secret = fs.readFileSync('jwt.evaluation.key');

const generateToken = async (user) => {
  const jwtConfig = {
    expiresIn: '24h',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};

module.exports = {
  generateToken,
};