import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
            </Routes>
        </BrowserRouter>
    );
};