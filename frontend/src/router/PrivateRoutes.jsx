import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    // Leemos el valor del localStorage
    const isLogged = localStorage.getItem('isLogged') === 'true';

    // Si está logueado, renderiza HomePage. Si no, LoginPage.
    return isLogged ? <Outlet /> : <Navigate to="/login" replace />;
};