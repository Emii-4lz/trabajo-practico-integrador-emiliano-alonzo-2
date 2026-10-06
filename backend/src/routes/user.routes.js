import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import { authMiddleware, adminCheckMiddleware } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { registerValidation } from '../middlewares/models.validator.js';
import { Router } from 'express';

export const router = Router();

router.get('/', authMiddleware, adminCheckMiddleware, getUsers);
router.get('/:id', authMiddleware, adminCheckMiddleware, getUserById);
router.post('/', authMiddleware, adminCheckMiddleware, registerValidation, validate, createUser);
router.put('/:id', authMiddleware, adminCheckMiddleware, updateUser);
router.delete('/:id', authMiddleware, adminCheckMiddleware, deleteUser);