import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import swal from 'sweetalert';
import { AuthContext } from '../context/authContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleLogInClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLogOutClick = async () => {
    await logout();
    swal({
      title: "¡Cierre de sesión exitoso!",
      text: "Serás redirigido a la página de inicio.",
      icon: "success",
      timer: 2000,
      buttons: false,
    });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#10132F', fontFamily: 'Krub', color: 'white' }}>
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#" style={{ color: 'white', fontFamily: 'Kufam', fontSize: '2em' }} onClick={handleHomeClick}>
          STI 
          <img src="img/tutorialogo.png" style={{ width: '50px', marginLeft: '10px' }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" style={{ color: 'white' }}></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: 'white', fontSize: '1.2em' }} onClick={handleHomeClick}>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: 'white', fontSize: '1.2em' }}>About</a>
            </li>
          </ul>
          <div className="d-flex">
            {user.isLogged === true ? (
              <button
                className="btn btn-success mx-2"
                style={{ backgroundColor: '#49BA81', color: 'black', borderRadius: '40px', padding: '10px 20px', border: 'none', fontFamily: 'Krub', fontSize: '1.2em' }}
                onClick={handleLogOutClick}
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success mx-2"
                  style={{ backgroundColor: '#49BA81', color: 'black', borderRadius: '40px', padding: '10px 20px', border: 'none', fontFamily: 'Krub', fontSize: '1.2em' }}
                  onClick={handleSignInClick}
                >
                  Sign In
                </button>
                <button
                  className="btn btn-success mx-2"
                  style={{ backgroundColor: '#49BA81', color: 'black', borderRadius: '40px', padding: '10px 20px', border: 'none', fontFamily: 'Krub', fontSize: '1.2em' }}
                  onClick={handleLogInClick}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
