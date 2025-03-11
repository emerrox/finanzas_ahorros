import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const Login = () => {
  // Inicializamos el formulario con email y password
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  });

  // Función para enviar la solicitud de login
  const handleSubmit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={e => setData('email', e.target.value)}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={e => setData('password', e.target.value)}
            required
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <button type="submit" disabled={processing}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
