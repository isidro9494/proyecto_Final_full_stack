import express from 'express'; 
import AuthController from '../controllers/authController.js'; 
import { authenticate } from '../middlewares/authMiddlewares.js'; 

const router = express.Router();


router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/users', authenticate, AuthController.getUsers);


export default router; 