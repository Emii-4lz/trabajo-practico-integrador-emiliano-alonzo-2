import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING(30),
        unique: true,
        allowNull: false,
        validate: {
            len: [2, 30]
        },
    },
})