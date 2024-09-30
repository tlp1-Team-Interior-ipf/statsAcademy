import React from 'react';
import '../styles/NavBar.css'; // Aquí incluiremos los estilos CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Logo */}
        <img
          src="" // Coloca aquí la URL del logo o usa una imagen local
          alt="Stats Academy Logo"
          className="navbar-logo"
        />
        {/* Nombre del sistema */}
        <span className="navbar-brand">Stats Academy</span>
      </div>
      
      <div className="navbar-right">
        {/* Botones */}
        <button className="btn register">Regístrate</button>
        <button className="btn login">Iniciar sesión</button>
      </div>
    </nav>
  );
};

export default Navbar;
