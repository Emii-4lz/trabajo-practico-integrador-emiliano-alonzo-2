import { Article, User, Tag } from '../models/index.js';

export const createArticle = async (req, res) => {
    try {
        const { title, content, excerpt, status } = req.body;
        const article = await Article.create({
            title,
            content,
            excerpt,
            status,
            userId: req.user.id
        });

        return res.status(201).json(article);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { status: 'published' },
            include: [
                { model: User, as: 'author', attributes: ['id', 'username', 'email'] },
                { model: Tag, as: 'tags', through: { attributes: [] } }
            ]
        });
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id, {
            include: [
                { model: User, as: 'author', attributes: ['id', 'username', 'email'] },
                { model: Tag, as: 'tags', through: { attributes: [] } }
            ]
        });

        if (!article) return res.status(404).json({ message: 'Artículo no encontrado.' });

        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getUserArticles = async (req, res) => {
    try {
        const articles = await Article.findAll({
            where: { userId: req.user.id, status: 'published' },
            include: [{ model: Tag, as: 'tags', through: { attributes: [] } }]
        });
        return res.status(200).json(articles);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getUserArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findOne({
            where: { id, userId: req.user.id },
            include: [{ model: Tag, as: 'tags', through: { attributes: [] } }]
        });

        if (!article) return res.status(404).json({ message: 'Artículo no encontrado.' });

        return res.status(200).json(article);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);

        if (!article) return res.status(404).json({ message: 'Artículo no encontrado.' });

        if (article.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tenes privilegios de administrador para realizar esta accion.' });
        }

        await article.update(req.body);
        return res.status(200).json({ message: 'Artículo actualizado exitosamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);

        if (!article) return res.status(404).json({ message: 'Artículo no encontrado.' });

        if (article.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'No tenes privilegios de administrador para realizar esta accion' });
        }

        await article.destroy();
        return res.status(200).json({ message: 'Artículo eliminado exitosamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};