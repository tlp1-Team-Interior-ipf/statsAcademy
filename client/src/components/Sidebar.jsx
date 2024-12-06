import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  // Navegar y cerrar el Sidebar
  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar(); // Cerrar el Sidebar al navegar
  };

  const handleLogOutClick = async () => {
    await logout();
    enqueueSnackbar('¡Cierre de sesión exitoso!', {
      variant: 'success',
      autoHideDuration: 2000,
    });
    setTimeout(() => navigate('/'), 2000);
    closeSidebar(); // Cerrar el Sidebar después del logout
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {/* Botón para cerrar el Sidebar */}
      <button className="sidebar-toggle" onClick={closeSidebar}>
        ⨯
      </button>

      {/* Enlaces del Sidebar */}
      <div className="sidebar-links">
        <a onClick={() => handleNavigation('/home')} title="Inicio">
          <img src="/icons/iniciosb.png" alt="Inicio" />
          <h4 className='h4-text'>Inicio</h4>
        </a>
        <a onClick={() => handleNavigation('/home/chat')} title="Tutor Gauss">
          <img src="/icons/tutorsb.png" alt="Tutor Gauss" />
          <h4 className='h4-text'>Gauss</h4>
        </a>
        <a onClick={() => handleNavigation('/home/evaluation')} title="Evaluatorio">
          <img src="/icons/evaluatoriosb.png" alt="Evaluatorio" />
          <h4 className='h4-text'>Evaluatorio</h4>
        </a>
        <a onClick={() => handleNavigation('/home/profile')} title="Perfil">
          <img src="/icons/perfilsb.png" alt="Perfil" />
          <h4 className='h4-text'>Perfil</h4>
        </a>
        <a onClick={() => handleLogOutClick()} title="Cerrar Sesión">
          <img src="/icons/logoutsb.png" alt="Cerrar Sesión" />
          <h4 className='h4-text'>Cerrar Sesión</h4>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;