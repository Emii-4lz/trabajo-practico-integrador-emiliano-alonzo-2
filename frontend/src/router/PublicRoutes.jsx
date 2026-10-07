import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = () => {
    // Leemos el valor del localStorage
    const isLogged = localStorage.getItem('isLogged') === 'true';

    // Si NO está logueado, permite ver Login/Register. Si lo esta, lo envia a HomePage.
    return !isLogged ? <Outlet /> : <Navigate to="/" replace />;
};