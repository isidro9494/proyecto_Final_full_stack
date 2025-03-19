import AuthServices from '../services/authService.js';
import userModels from '../models/userModels.js';
import jwt from 'jsonwebtoken';

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
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  const getUsers = async (req, res) => {
    try {
      const users = await user.find({}, '-password'); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export default { registerUser, getUsers, loginUser};
