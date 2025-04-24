import express from 'express';
import { login, logout, signup, updateProfilePic,checkAuth } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signup);
router.put('/updateProfilePic',protectRoute, updateProfilePic);
router.get("/check", protectRoute, checkAuth);

export default router;