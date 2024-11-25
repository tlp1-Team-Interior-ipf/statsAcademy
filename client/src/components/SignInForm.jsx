import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/SignInForm.css'; // Asegúrate de que este archivo CSS esté bien configurado
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';


const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = { username, email, password };

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        swal({
          title: "¡Registro exitoso!",
          text: "Serás redirigido a la página de inicio de sesión.",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorText = await response.text();
        console.error('Error al registrar el usuario:', errorText);
        swal({
          title: "Error",
          text: "Hubo un problema al registrarse. Inténtalo de nuevo.",
          icon: "error",
        });
      }
    } catch (error) {
      console.log('Error al registrar el usuario:', error);
      swal({
        title: "Error",
        text: "Error de conexión. Por favor verifica tu conexión a Internet.",
        icon: "error",
      });
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="usernameInput">Nombre de usuario</label>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="usernameInput"
                  className="form-control form-control-lg"
                  placeholder="Usuario"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
              <label className="form-label" htmlFor="emailInput">Correo electrónico</label>
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
              <div className="d-flex justify-content-around align-items-center mb-4">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="rememberMeCheck" />
                  <label className="form-check-label" htmlFor="rememberMeCheck"> Recuérdame </label>
                </div>
                <div>
                  <span>¿Ya tienes una cuenta?</span>
                  <br />
                  <a href="/login">Inicia Sesión</a>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-block">Registrarme</button>
              <div className="divider d-flex align-items-center my-4"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInForm;
