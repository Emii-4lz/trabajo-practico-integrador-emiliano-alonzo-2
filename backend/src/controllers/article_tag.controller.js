import { Article, Tag, ArticleTag } from '../models/index.js';

export const addTagToArticle = async (req, res) => {
    try {
        const { articleId, tagId } = req.body;

        const article = await Article.findByPk(articleId);
        if (!article) return res.status(404).json({ message: 'Artículo no encontrado.' });

        if (article.userId !== req.user.id) {
            return res.status(403).json({ message: 'Solo el autor puede agregar etiquetas a su artículo.' });
        }

        const tag = await Tag.findByPk(tagId);
        if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada.' });

        const articleTag = await ArticleTag.create({ articleId, tagId });
        return res.status(201).json({ message: 'Etiqueta asignada al artículo correctamente.', articleTag });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const removeTagFromArticle = async (req, res) => {
    try {
        const { articleTagId } = req.params;

        const articleTag = await ArticleTag.findByPk(articleTagId, {
            include: [{ model: Article }]
        });

        if (!articleTag) return res.status(404).json({ message: 'Asociación no encontrada.' });

        if (articleTag.Article.userId !== req.user.id) {
            return res.status(403).json({ message: 'Solo el autor puede remover etiquetas de su artículo.' });
        }

        await articleTag.destroy();
        return res.status(200).json({ message: 'Etiqueta removida del artículo correctamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};