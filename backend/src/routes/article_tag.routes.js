import { Router } from 'express';
import { addTagToArticle, removeTagFromArticle } from '../controllers/article_tag.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

export const router = Router();

router.post('/', authMiddleware, addTagToArticle);
router.delete('/:articleTagId', authMiddleware, removeTagFromArticle);