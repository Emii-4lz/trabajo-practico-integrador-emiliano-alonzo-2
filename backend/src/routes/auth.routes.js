import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { getProfile, updateProfile } from '../controllers/profile.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { registerValidation, updateProfileValidation } from '../middlewares/models.validator.js';

export const router = Router();

router.post('/register', registerValidation, validate, register);
router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfileValidation, validate, updateProfile);
router.post('/logout', authMiddleware, logout);