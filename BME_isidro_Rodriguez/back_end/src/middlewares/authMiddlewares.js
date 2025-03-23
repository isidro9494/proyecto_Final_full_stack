import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION = '1h'; // Token de acceso expira en 1 hora
const REFRESH_TOKEN_EXPIRATION = '7d'; // Token de refresco expira en 7 días

// Generar token de acceso
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
};

// Generar token de refresco
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: REFRESH_TOKEN_EXPIRATION });
};

// Verificar token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error('Token inválido o expirado');
  }
};

// Middleware de autenticación
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