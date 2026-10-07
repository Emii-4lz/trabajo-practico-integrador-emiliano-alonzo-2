import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { PrivateRoutes } from './PrivateRoutes';
import { PublicRoutes } from './PublicRoutes';
import { Navbar } from '../components/Navbar';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            {/* El Navbar va aca para que funcionen sus Links */}
            <Navbar />

            <Routes>
                {/* RUTAS PÚBLICAS */}
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                {/* RUTAS PRIVADAS */}
                <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<HomePage />} />
                </Route>

                {/* RUTA COMODÍN (Rutas inexistentes) */}
                {/* Si pone una URL falsa, se manda a "/". 
            Ahí PrivateRoutes decide si lo deja en HomePage o lo manda a LoginPage */}
                <Route path="/*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};