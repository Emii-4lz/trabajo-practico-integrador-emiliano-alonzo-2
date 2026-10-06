import { Router } from 'express';
import { authMiddleware, adminCheckMiddleware } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { registerValidation } from '../middlewares/models.validator.js';
import { getProfile, updateProfile, deleteProfile } from '../controllers/profile.controller.js';

export const router = Router();

router.get('/', authMiddleware, getProfile);
router.put('/', authMiddleware, registerValidation, validate, updateProfile);
router.delete('/', authMiddleware, adminCheckMiddleware, deleteProfile);
router.get('/admin', authMiddleware, adminCheckMiddleware, getProfile);