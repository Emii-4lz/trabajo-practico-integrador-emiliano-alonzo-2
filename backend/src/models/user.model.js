import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
        // minlength: 3,
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true,
        isEmail: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        // minlength: 6,
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tablename: 'users',
    paranoid: true,
});