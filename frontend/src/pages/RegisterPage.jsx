import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useForm } from '../hooks/useForm';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false); backend
  const [validationErrors, setValidationErrors] = useState([]);
  const { username, email, password, biography, handleInputChange, handleReset } = useForm({
    username: '',
    email: '',
    password: '',
    biography: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationErrors([]);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, biography })
      });

      const data = await response.json();

      if (response.ok) {
        // Éxito: limpiar formulario y redirigir
        handleReset();
        navigate('/login');
      } else {
        // Error de validación: Guardar el array de errores devuelto por el backend
        // Se asume que el backend devuelve { errors: [{msg: 'Error 1'}, {msg: 'Error 2'}] }
        if (data.errors) {
          setValidationErrors(data.errors);
        } else {
          setValidationErrors([{ msg: data.message || 'Error al registrar' }]);
        }
      }
    } catch (error) {
      setValidationErrors([{ msg: 'Error de conexión con el servidor' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Cuenta</h2>

      {validationErrors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded text-sm">
          <ul className="list-disc pl-5">
            {validationErrors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Nombre de usuario"
          value={username}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
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
        <input
          type="text"
          name="biography"
          placeholder="Biografía (Opcional)"
          value={biography}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition disabled:bg-green-400 mt-2"
        >
          {isLoading ? 'Registrando...' : 'Registrarme'}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 hover:underline">Inicia sesión</Link>
      </p>
    </div>
  )
};