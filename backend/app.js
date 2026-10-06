import express from 'express';
import sequelize from './src/config/database.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Router } from 'express';
import { User } from './src/models/user.model.js';
import { Profile } from './src/models/profile.model.js';
import { Article } from './src/models/article.model.js';
import { Tag } from './src/models/tag.model.js';
import { ArticleTag } from './src/models/article_tag.model.js';
import { router as userRoutes } from './src/routes/user.routes.js';
import { router as profileRoutes } from './src/routes/profile.routes.js';
import { router as articleRoutes } from './src/routes/article.routes.js';
import { router as tagRoutes } from './src/routes/tag.routes.js';
import { router as articleTagRoutes } from './src/routes/article_tag.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

async function startServer() {
    try {
        await sequelize.sync({ alter: true });
        console.log('La conexion funciona.');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutandose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo.', error);
    }
}

startServer();

app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/articles-tags', articleTagRoutes); 