import AuthServices from '../services/authService.js';
import userModels from '../models/userModels.js';
import jwt from 'jsonwebtoken';
import { generateRefreshToken } from '../middlewares/authMiddlewares.js';
import bcrypt from 'bcrypt';

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
      console.log('SECRET_KEY (login):', process.env.SECRET_KEY ? 'present' : 'missing');
      console.log('Datos recibidos:', { username: req.body.username });
  
      const { username, password } = req.body;
      const user = await userModels.findOne({ username });
      
      if (!user) {
        console.log('Usuario no encontrado:', username);
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }
  
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        console.log('Contraseña incorrecta para usuario:', username);
        return res.status(400).json({ error: 'Credenciales inválidas' });
      }
  
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });
      
      console.log('Tokens generados:', { token, refreshToken });
      
      res.status(200).json({ token, refreshToken });
    } catch (error) {
      console.error('Error en login:', error);
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
      console.log('Token recibido (updatePassword):', req.headers.authorization?.split(' ')[1]);
      console.log('User ID desde token:', req.user?.id);
      console.log('Datos recibidos:', { currentPassword: '***', newPassword: '***' });
  
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
  
      const user = await userModels.findById(userId);
      if (!user) {
        console.log('Usuario no encontrado con ID:', userId);
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        console.log('Contraseña actual no coincide para usuario ID:', userId);
        return res.status(400).json({ error: 'Contraseña actual incorrecta' });
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      
      console.log('Contraseña actualizada para usuario ID:', userId);
      res.status(200).json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      res.status(500).json({ error: error.message });
    }
  };
  const refreshToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      console.log("Refresh Token recibido:", refreshToken);
      console.log('SECRET_KEY (refresh):', process.env.SECRET_KEY ? 'present' : 'missing');
  
      if (!refreshToken) {
        console.log('Refresh token no proporcionado');
        return res.status(400).json({ error: 'El refresh token es requerido' });
      }
  
      const decoded = jwt.verify(refreshToken, process.env.SECRET_KEY);
      console.log('Refresh token decodificado:', decoded);
      
      const newAccessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      console.log('Nuevo access token generado:', newAccessToken);
      
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error("Error detallado en refresh token:", error.message);
      res.status(401).json({ error: 'Token de refresco inválido o expirado' });
    }
  };
  
  export default { registerUser, getUsers, loginUser, updateProfilePicture, updatePassword , refreshToken};
