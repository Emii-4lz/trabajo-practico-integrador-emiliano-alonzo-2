import { User, Profile } from '../models/index.js';
import { matchedData } from 'express-validator';
import { generateToken } from '../helpers/jwt.helper.js';
import { comparePassword, hashPassword } from '../helpers/bcrypt.helper.js';

export const login = async (req, res) => {
    try {
        const { username, password } = matchedData(req);

        const userExist = await User.findOne({
            where: { username }
        });

        if (!userExist) {
            return res.status(400).json({
                message: "Las credenciales que ha ingresado son incorrectas"
            });
        }

        const passwordValid = await comparePassword(password, userExist.password);

        if (!passwordValid) {
            return res.status(400).json({
                message: "Las credenciales que ha ingresado son incorrectas"
            });
        }

        const token = generateToken({ id: userExist.id, role: userExist.role });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60
        });

        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            user: {
                id: userExist.id,
                username: userExist.username,
                role: userExist.role
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};

export const register = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ message: "El email ya se encuentra registrado" });
        }

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });

        await Profile.create({
            userId: newUser.id,
            firstName,
            lastName
        });

        return res.status(201).json({
            message: "Usuario registrado exitosamente"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al registrar usuario",
            error: error.message
        });
    }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({
        message: "Cierre de sesión exitoso"
    });
};