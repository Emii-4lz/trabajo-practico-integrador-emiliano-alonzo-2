import { Router } from 'express';
import { authMiddleware, adminCheckMiddleware } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { tagValidation } from '../middlewares/models.validator.js';
import { createTag, getTags, getTagById, updateTag, deleteTag } from '../controllers/tag.controller.js';

export const router = Router();

router.post('/tags', authMiddleware, adminCheckMiddleware, tagValidation, validate, createTag);
router.get('/tags', authMiddleware, getTags);
router.get('/tags/:id', authMiddleware, adminCheckMiddleware, getTagById);
router.put('/tags/:id', authMiddleware, adminCheckMiddleware, tagValidation, validate, updateTag);
router.delete('/tags/:id', authMiddleware, adminCheckMiddleware, deleteTag);