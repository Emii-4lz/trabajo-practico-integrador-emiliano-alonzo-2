import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import { User } from './user.model.js';

export const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
            len: [3, 200],
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [50]
        },
    },
    excerpt: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('published', 'archived'),
        defaultValue: 'published',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
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
    }
})