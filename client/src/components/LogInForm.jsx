import React, { useState, useContext } from 'react';
import '../styles/LogInForm.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import swal from 'sweetalert';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { email, password };

    try {
      await login(user);
      swal({
        title: "¡Inicio de sesión exitoso!",
        text: "Serás redirigido a la página de inicio.",
        icon: "success",
        timer: 2000,
        buttons: false,
      });
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.log('Error al ingresar', error);
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
              alt="Sample image"
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
                />
              </div>
              <div className="form-outline mb-3">
                <label className="form-label" htmlFor="passwordInput">Contraseña</label>
                <input
                  type="password"
                  id="passwordInput"
                  className="form-control form-control-lg"
                  placeholder="Contraseña"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="rememberMeCheck" />
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