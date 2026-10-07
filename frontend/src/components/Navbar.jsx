import { Link, useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const navigate = useNavigate();
  
  const isLogged = localStorage.getItem('isLogged') === 'true';

  if (!isLogged) {
    return;
  }

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Error de red al intentar cerrar sesión en el servidor:', error);
    } finally {
      localStorage.removeItem('isLogged');
      navigate('/login');
    }
  };

  return (
    <nav className="bg-slate-800 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold hover:text-blue-300 transition">
          Mi Blog Personal
        </Link>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-semibold transition"
        >
          Cerrar Sesión
        </button>
        
      </div>
    </nav>
  );
};