import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;
const ACCESS_TOKEN_EXPIRATION = '5h'; // Token de acceso expira en 1 hora
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
export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('Token recibido (middleware):', token);
  
  // Asegúrate de usar process.env.SECRET_KEY directamente
  console.log('SECRET_KEY:', process.env.SECRET_KEY ? 'present' : 'missing');
  
  if (!token) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  try {
    // Verifica usando process.env.SECRET_KEY directamente
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log('Token decodificado:', decoded);
    
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      return res.status(401).json({ error: 'Token expirado' });
    }
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error detallado:', {
      message: error.message,
      stack: error.stack,
      envKey: process.env.SECRET_KEY
    });
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};