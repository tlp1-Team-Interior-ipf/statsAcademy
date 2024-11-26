import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Importar notistack
import { AuthContext } from '../context/authContext'; // Contexto de autenticación
import '../styles/NavBar.css'; // Estilos CSS

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar(); // Hook de notistack
  const [isScrolled, setIsScrolled] = useState(false);

  // Manejar el scroll para mostrar la línea
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 50);
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
  const handleLandingClick = () => navigate('/');
  const handleProfileClick = () => navigate('/home/profile');
  const handleHomeClick = () => navigate('/home');

  const handleLogOutClick = async () => {
    await logout();
    enqueueSnackbar('¡Cierre de sesión exitoso!', {
      variant: 'success', // Tipo de notificación
      autoHideDuration: 2000, // Duración
    });
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <nav className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="custom-navbar-left">
        {/* Logo */}
        <a href="#" className="custom-navbar-logo" onClick={handleLandingClick}>
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
          <>
            <button className="custom-btn logout" onClick={handleLogOutClick}>
              Cerrar Sesión
            </button>
            <button className="custom-btn profile" onClick={handleProfileClick}>
              Mi perfil
            </button>
            <button className="custom-btn profile" onClick={handleHomeClick}>
              Inicio
            </button>
          </>
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
