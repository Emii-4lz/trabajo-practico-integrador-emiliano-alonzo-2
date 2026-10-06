import { Tag, Article } from '../models/index.js';

export const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const existingTag = await Tag.findOne({ where: { name } });

        if (existingTag) return res.status(400).json({ message: 'La etiqueta ya existe.' });

        const tag = await Tag.create({ name });
        return res.status(201).json(tag);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        return res.status(200).json(tags);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getTagById = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id, {
            include: [{ model: Article, as: 'articles', through: { attributes: [] } }]
        });

        if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada.' });

        return res.status(200).json(tag);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const tag = await Tag.findByPk(id);

        if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada.' });

        await tag.update({ name });
        return res.status(200).json({ message: 'Etiqueta actualizada exitosamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;
        const tag = await Tag.findByPk(id);

        if (!tag) return res.status(404).json({ message: 'Etiqueta no encontrada.' });

        await tag.destroy();
        return res.status(200).json({ message: 'Etiqueta eliminada exitosamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};