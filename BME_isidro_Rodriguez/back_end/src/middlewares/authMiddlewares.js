// authMiddlewares.js

import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRATION_TIME = '1h';

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
};

export const refreshToken = (payload) => {
  return generateToken(payload);
};

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY); 
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

