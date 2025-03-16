const bcrypt = require('bcrypt');
const User = require('./User');
const TokenService = require('../middlewares/authMiddlewares');

const register = async (username, password) => {
  const user = new User({ username, password });
  return await user.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }
  const token = TokenService.generateToken({ id: user._id });
  return token;
};

module.exports = { register, login };
