import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { AuthContext } from '../context/authContext'; // Contexto de autenticación
import '../styles/NavBar.css'; // Estilos CSS

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [isScrolled, setIsScrolled] = useState(false);

  // Manejar el scroll para mostrar la línea
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 50); // Cambia este valor para ajustar cuando aparece la línea
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Navegación para los botones
  const handleSignInClick = () => navigate('/signin');
  const handleLogInClick = () => navigate('/login');
  const handleHomeClick = () => navigate('/');

  const handleLogOutClick = async () => {
    await logout();
    swal({
      title: "¡Cierre de sesión exitoso!",
      text: "Serás redirigido a la página de inicio.",
      icon: "success",
      timer: 2000,
      buttons: false,
    });
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <nav className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="custom-navbar-left">
        {/* Logo */}
        <a href="#" className="custom-navbar-logo" onClick={handleHomeClick}>
          <img
            src="/img/tutorialogo.png" // URL o imagen local del logo
            alt="Stats Academy Logo"
            className="custom-navbar-logo-img"
          />
        </a>
        {/* Nombre del sistema */}
        <span className="custom-navbar-brand" onClick={handleHomeClick}>Stats Academy</span>
      </div>

      <div className="custom-navbar-right">
        {/* Botones dependiendo del estado de autenticación */}
        {user.isLogged ? (
          <button className="custom-btn logout" onClick={handleLogOutClick}>
            Cerrar Sesión
          </button>
        ) : (
          <>
            <button className="custom-btn register" onClick={handleSignInClick}>
              Regístrate
            </button>
            <button className="custom-btn login" onClick={handleLogInClick}>
              Iniciar sesión
            </button>
          </>
        )}
      </div>
      {/* Línea debajo del navbar */}
      <div className="custom-navbar-line"></div>
    </nav>
  );
};

export default Navbar;