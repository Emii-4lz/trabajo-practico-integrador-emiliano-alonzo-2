import { User } from '../models/user.model.js';
import { Profile } from '../models/profile.model.js';

export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ where: { userId: req.user.id } });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado.' });
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil.' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ where: { userId: req.user.id } });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado.' });
        await profile.update(req.body);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil.' });
    }
};

export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ where: { userId: req.user.id } });
        if (!profile) return res.status(404).json({ message: 'Perfil no encontrado.' });
        await profile.destroy();
        res.json({ message: 'Perfil eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el perfil.' });
    }
};