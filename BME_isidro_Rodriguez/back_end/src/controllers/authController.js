import AuthServices from '../services/authService.js';

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
      if (!username || !password) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }
      const token = await AuthServices.login(username, password);
      res.status(201).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  const getUsers = async (req, res) => {
    try {
      const users = await User.find({}, '-password'); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  export default { registerUser, getUsers, loginUser};
