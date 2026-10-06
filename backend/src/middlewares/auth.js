import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies["token"];

        if (!token) {
            return res.status(401).json({ message: "No se ha podido autenticar el token" });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "No se ha podido autenticar el token" });
    }
};

export const adminCheckMiddleware = (req, res, next) => {
    if (req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "No tenes privilegios de administrador para realizar esta accion" });
    }
    next();
};

export const ownerMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;
        const article = await Article.findByPk(id);

        if (!article) {
            return res.status(404).json({ message: 'Artículo no encontrado.' });
        }

        if (article.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Acceso denegado: No eres el propietario de este recurso.' });
        }

        req.article = article;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Error al verificar la propiedad del recurso.', error: error.message });
    }
};