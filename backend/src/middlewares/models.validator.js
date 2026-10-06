import { body, param } from 'express-validator';
import { User, Tag, Article } from '../models/index.js';

export const idParamValidation = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo.')
];

export const registerValidation = [
    body('username')
        .notEmpty().withMessage('El nombre de usuario es obligatorio.')
        .isLength({ min: 3, max: 20 }).withMessage('El username debe tener entre 3 y 20 caracteres.')
        .isAlphanumeric().withMessage('El username solo puede contener caracteres alfanuméricos.')
        .custom(async (value) => {
            const user = await User.findOne({ where: { username: value } });
            if (user) throw new Error('El nombre de usuario ya está registrado.');
            return true;
        }),
    body('email')
        .notEmpty().withMessage('El correo electrónico es obligatorio.')
        .isEmail().withMessage('Debe ingresar un formato de email válido.')
        .custom(async (value) => {
            const user = await User.findOne({ where: { email: value } });
            if (user) throw new Error('El correo electrónico ya está registrado.');
            return true;
        }),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número.'),
    body('firstName')
        .notEmpty().withMessage('El nombre es obligatorio.')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras.'),
    body('lastName')
        .notEmpty().withMessage('El apellido es obligatorio.')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo puede contener letras.')
];

export const updateProfileValidation = [
    body('firstName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo puede contener letras.'),
    body('lastName')
        .optional()
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres.')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo puede contener letras.'),
    body('biography')
        .optional()
        .isLength({ max: 500 }).withMessage('La biografía no puede superar los 500 caracteres.'),
    body('avatarUrl')
        .optional({ checkFalsy: true })
        .isURL().withMessage('Debe ser una URL válida.')
];

export const articleValidation = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio.')
        .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres.'),
    body('content')
        .notEmpty().withMessage('El contenido es obligatorio.')
        .isLength({ min: 50 }).withMessage('El contenido debe tener al menos 50 caracteres.'),
    body('excerpt')
        .optional()
        .isLength({ max: 500 }).withMessage('El resumen no puede superar los 500 caracteres.'),
    body('status')
        .optional()
        .isIn(['published', 'archived']).withMessage('El estado solo puede ser published o archived.')
];

export const tagValidation = [
    body('name')
        .notEmpty().withMessage('El nombre de la etiqueta es obligatorio.')
        .isLength({ min: 2, max: 30 }).withMessage('La etiqueta debe tener entre 2 y 30 caracteres.')
        .custom((value) => {
            if (/\s/.test(value)) throw new Error('La etiqueta no debe contener espacios.');
            return true;
        })
        .custom(async (value) => {
            const tag = await Tag.findOne({ where: { name: value } });
            if (tag) throw new Error('La etiqueta ya existe.');
            return true;
        })
];