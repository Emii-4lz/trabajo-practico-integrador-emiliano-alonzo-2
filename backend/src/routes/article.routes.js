import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createArticle, getArticles, getArticleById, getUserArticles, getUserArticleById, updateArticle, deleteArticle } from '../controllers/article.controller.js';
import { articleValidation } from '../middlewares/models.validator.js';

export const router = Router();

router.post('/', authMiddleware, articleValidation, validate, createArticle);
router.get('/', authMiddleware, getArticles);
router.get('/', authMiddleware, getUserArticles);
router.get('/:id', authMiddleware, getUserArticleById);
router.get('/:id', authMiddleware, getArticleById);
router.put('/:id', authMiddleware, articleValidation, validate, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);