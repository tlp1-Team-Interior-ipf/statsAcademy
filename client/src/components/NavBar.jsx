import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../context/authContext';
import Sidebar from './Sidebar'; // Importar el Sidebar
import '../styles/NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar el sidebar

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
      variant: 'success',
      autoHideDuration: 2000,
    });
    setTimeout(() => navigate('/'), 2000);
  };

  // Manejar la apertura del sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };



  return (
    <>
      <nav className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="custom-navbar-left">

          {/* Logo */}
          <a href="#" className="custom-navbar-logo" onClick={handleLandingClick}>
            <img
              src="/img/tutorialogo.png"
              alt="Stats Academy Logo"
              className="custom-navbar-logo-img"
            />
          </a>
          <span className="custom-navbar-brand" onClick={handleHomeClick}>
            Stats Academy
          </span>
        </div>

        <div className="custom-navbar-right">
          {user.isLogged ? (
            <>
              <button className="custom-btn logout" onClick={handleLogOutClick}>
                Cerrar Sesión
              </button>
              <button className="custom-btn profile" onClick={handleProfileClick}>
                Reportes del Alumno
              </button>
              <button className="custom-btn profile" onClick={handleHomeClick}>
                Inicio
              </button>
              <div className="custom-navbar-left">
              <button className="sidebar-toggle-btn" onClick={openSidebar}>
               ☰ {/* Solo abre el sidebar */}
              </button>
              </div>
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
        <div className="custom-navbar-line"></div>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Navbar;
