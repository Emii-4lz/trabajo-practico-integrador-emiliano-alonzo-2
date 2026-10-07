import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../hooks/useForm'

export const LoginPage = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { email, password, handleInputChange } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
                credentials: 'include',
                });

            if (response.ok) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.message || 'Credenciales incorrectas');
            }
        } catch (error) {
            setError('Error de red. Por favor, inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
        return (
            <div className="max-w-md mx-auto mt-20 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
      
                {error && (
                <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm text-center">
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                />
                
                <button 
                type="submit" 
                disabled={isLoading}
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
                >
                {isLoading ? 'Verificando...' : 'Entrar'}
                </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    ¿No tienes cuenta? <Link to="/register" className="text-blue-600 hover:underline">Regístrate aquí</Link>
                </p>
            </div>
        )
    }
};