import bcrypt from 'bcrypt';
import User from '../models/userModels.js'; 
import { generateAccessToken, verifyToken } from '../middlewares/authMiddlewares.js'; 
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const register = async (username, password) => {
  const user = new User({ username, password });
  return await user.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Credenciales inválidas');
  }
  const token = generateAccessToken({ id: user._id }); 
  return token;
};
const refreshAccessToken = (refreshToken) => {
  try {
    
    const decoded = jwt.verify(refreshToken, SECRET_KEY);

 
    const newAccessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      SECRET_KEY,
      { expiresIn: '1h' } 
    );

    return { accessToken: newAccessToken };
  } catch (error) {
    throw new Error('Token de refresco inválido o expirado');
  }
};

export default { register, login ,refreshAccessToken };

