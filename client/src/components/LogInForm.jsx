import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/LogInForm.css'; // Asegúrate de que el archivo CSS esté bien configurado
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useSnackbar } from 'notistack';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar(); // Hook para mostrar notificaciones

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };

    try {
      await login(user);
      enqueueSnackbar('¡Inicio de sesión exitoso!', {
        variant: 'success',
        autoHideDuration: 2000,
      });
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error al ingresar', error);
      enqueueSnackbar('Credenciales incorrectas. Intenta de nuevo.', {
        variant: 'error',
      });
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="emailInput">Correo Electrónico</label>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="emailInput"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <label className="form-label" htmlFor="passwordInput">Contraseña</label>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control form-control-lg"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" id="rememberMeCheck" />
                  <label className="form-check-label" htmlFor="rememberMeCheck">
                    Recordarme
                  </label>
                </div>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                  Iniciar Sesión
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  ¿No tienes una cuenta? <a href="/signin" className="link-danger">Registrarse</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;