import React, { useState, useEffect } from 'react';
import { useForm, usePage, router } from '@inertiajs/react';
import GuestLayout from '../Layouts/GuestLayout';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { csrf_token, user } = usePage<{ csrf_token: string, user: any }>().props;

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (user) {
      router.visit('/dashboard');
    }
  }, [user]);

  // Formulario de Login
  const {
    data: loginData,
    setData: setLoginData,
    post: loginPost,
    processing: loginProcessing,
    errors: loginErrors,
  } = useForm({
    _token: csrf_token, // Añadir CSRF token
    email: '',
    password: '',
  });

  // Formulario de Registro
  const {
    data: registerData,
    setData: setRegisterData,
    post: registerPost,
    processing: registerProcessing,
    errors: registerErrors,
  } = useForm({
    token: csrf_token, // Añadir CSRF token
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginPost('/login', {
      onSuccess: () => {
        // Forzar recarga de la sesión
        router.reload({ only: ['user'] });
      }
    });
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerPost('/register', {
      onSuccess: () => {
        // Forzar recarga de la sesión
        router.reload({ only: ['user'] });
      }
    });
  };

  return (
    <GuestLayout>
      <div className="auth-container">
        <div className="auth-toggle">
          <button 
            onClick={() => setIsLogin(true)} 
            className={isLogin ? 'active' : ''}
          >
            Iniciar Sesión
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            className={!isLogin ? 'active' : ''}
          >
            Registrarse
          </button>
        </div>

        {isLogin ? (
          <div className="login-form">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleLoginSubmit}>
              <input type="hidden" name="_token" />
              <div className="form-group">
                <label htmlFor="login-email">Email:</label>
                <input
                  type="email"
                  id="login-email"
                  onChange={(e) => setLoginData('email', e.target.value)}
                  className={loginErrors.email ? 'has-error' : ''}
                />
                {loginErrors.email && <div className="error-message">{loginErrors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Contraseña:</label>
                <input
                  type="password"
                  id="login-password"
                  onChange={(e) => setLoginData('password', e.target.value)}
                  className={loginErrors.password ? 'has-error' : ''}
                />
                {loginErrors.password && <div className="error-message">{loginErrors.password}</div>}
              </div>
              <button 
                type="submit" 
                disabled={loginProcessing}
                className="submit-button"
              >
                {loginProcessing ? 'Procesando...' : 'Entrar'}
              </button>
            </form>
          </div>
        ) : (
          <div className="register-form">
            <h1>Registrarse</h1>
            <form onSubmit={handleRegisterSubmit}>
              <input type="hidden" name="_token" value={csrf_token} />
              <div className="form-group">
                <label htmlFor="register-name">Nombre:</label>
                <input
                  type="text"
                  id="register-name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData('name', e.target.value)}
                  className={registerErrors.name ? 'has-error' : ''}
                />
                {registerErrors.name && <div className="error-message">{registerErrors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="register-email">Email:</label>
                <input
                  type="email"
                  id="register-email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData('email', e.target.value)}
                  className={registerErrors.email ? 'has-error' : ''}
                />
                {registerErrors.email && <div className="error-message">{registerErrors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="register-password">Contraseña:</label>
                <input
                  type="password"
                  id="register-password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData('password', e.target.value)}
                  className={registerErrors.password ? 'has-error' : ''}
                />
                {registerErrors.password && <div className="error-message">{registerErrors.password}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="register-password-confirmation">Confirmar Contraseña:</label>
                <input
                  type="password"
                  id="register-password-confirmation"
                  value={registerData.password_confirmation}
                  onChange={(e) => setRegisterData('password_confirmation', e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={registerProcessing}
                className="submit-button"
              >
                {registerProcessing ? 'Procesando...' : 'Registrarse'}
              </button>
            </form>
          </div>
        )}
      </div>
    </GuestLayout>
  );
};

export default Auth;