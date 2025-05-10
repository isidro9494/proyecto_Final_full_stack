import express from 'express'; 
import AuthController from '../controllers/authController.js'; 
import { authenticate } from '../middlewares/authMiddlewares.js'; 
import multer from "multer"

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); 
    },
  });
  
  const upload = multer({ storage });

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.get('/users', authenticate, AuthController.getUsers);
router.put('/profile/picture', authenticate, upload.single('profilePicture'), AuthController.updateProfilePicture);
router.put('/profile/password', authenticate, AuthController.updatePassword);
router.post('/refresh-token', AuthController.refreshToken);

export default router; 