import express from 'express'; // Usa import en lugar de require
import AuthController from '../controllers/authController.js'; // Importa el controlador
import { authenticate } from '../middlewares/authMiddlewares.js'; // Importa el middleware

const router = express.Router();


router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/users', authenticate, AuthController.getUsers);


export default router; 