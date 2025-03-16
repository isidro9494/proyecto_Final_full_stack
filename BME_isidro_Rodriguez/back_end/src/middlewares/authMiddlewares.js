const jwt = require('jsonwebtoken');
const SECRET_KEY = 'de263a7f67b0624f4804deeeec694a46f89c3b4efeec3c72215905378aff08e0';
const EXPIRATION_TIME = '1h';

const generateToken = (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

const verifyToken = (token) => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      throw new Error('Token inválido o expirado');
    }
  };
  
  const refreshToken = (payload) => {
    return generateToken(payload);
  };
  
  module.exports = { generateToken, verifyToken, refreshToken };

