import { User, Profile, Article } from '../models/index.js';
import { hashPassword } from '../helpers/bcrpyt.helper.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [{ model: Profile, as: 'profile' }]
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: Profile, as: 'profile' },
                { model: Article, as: 'articles' }
            ]
        });

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, email, password, role, firstName, lastName } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) return res.status(400).json({ message: 'El email ya está registrado.' });

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) return res.status(400).json({ message: 'El username ya está registrado.' });

        const hashedPassword = await hashPassword(password);
        const user = await User.create({ username, email, password: hashedPassword, role });
        await Profile.create({ userId: user.id, firstName, lastName });

        return res.status(201).json({ message: 'Usuario creado exitosamente.', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        await user.update(req.body);
        return res.status(200).json({ message: 'Usuario actualizado exitosamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        await user.destroy();
        return res.status(200).json({ message: 'Usuario eliminado exitosamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor.', error: error.message });
    }
};