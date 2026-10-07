import express from 'express';
import sequelize from './src/config/database.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router as userRoutes } from './src/routes/user.routes.js';
import { router as profileRoutes } from './src/routes/profile.routes.js';
import { router as articleRoutes } from './src/routes/article.routes.js';
import { router as tagRoutes } from './src/routes/tag.routes.js';
import { router as articleTagRoutes } from './src/routes/article_tag.routes.js';
import { router as authRoutes } from './src/routes/auth.routes.js';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/articles-tags', articleTagRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await sequelize.sync();
        console.log('La conexion funciona.');

        app.listen(PORT, () => {
            console.log(`Servidor ejecutandose en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo iniciar la base de datos.', error);
        // Iniciar el servidor Express de todos modos para atender peticiones
        app.listen(PORT, () => {
            console.log(`Servidor ejecutandose en el puerto ${PORT} (sin conexion a base de datos)`);
        });
    }
}

startServer();