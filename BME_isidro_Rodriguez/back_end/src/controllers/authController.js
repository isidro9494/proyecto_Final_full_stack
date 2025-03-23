import AuthServices from '../services/authService.js';
import userModels from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken } from '../middlewares/authMiddlewares.js';


const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const user = await AuthServices.register(username, password);
      res.status(201).json({ message: 'Usuario registrado', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userModels.findOne({ username });
      
      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }
  
      // Genera el access token
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      // Genera el refresh token (7 días de expiración)
      const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
  
      // Envía ambos tokens en la respuesta
      res.status(200).json({ token, refreshToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getUsers = async (req, res) => {
    try {
      const users = await user.find({}, '-password'); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateProfilePicture = async (req, res) => {
    try {
      const userId = req.user.id; 
      const profilePicture = req.file.path; 
  
      const user = await userModels.findByIdAndUpdate(
        userId,
        { profilePicture },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      res.status(200).json({ message: 'Foto de perfil actualizada', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updatePassword = async (req, res) => {
    try {
      const userId = req.user.id; 
      const { currentPassword, newPassword } = req.body;
  
      const user = await userModels.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña actual incorrecta' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
  
      // Verifica y decodifica el refresh token
      const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
  
      // Genera un nuevo access token
      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(401).json({ error: 'Token de refresco inválido o expirado' });
    }
  };
  export default { registerUser, getUsers, loginUser, updateProfilePicture, updatePassword , refreshToken};
