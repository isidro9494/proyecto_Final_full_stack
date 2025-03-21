import bcrypt from 'bcrypt';
import User from '../models/userModels.js'; 
import { generateToken, verifyToken } from '../middlewares/authMiddlewares.js'; 

const register = async (username, password) => {
  const user = new User({ username, password });
  return await user.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }
  const token = generateToken({ id: user._id }); 
  return token;
};

export default { register, login };

