import React from 'react';
import '../styles/ToolsBanner.css'; // Puedes añadir aquí los estilos CSS

const ToolsBanner = () => {
  return (
    <div className="herramientas-container">
      <h2 className="herramientas-title">Herramientas que necesitas</h2>
      <div className="tarjetas-container">
        <div className="tarjeta">
          <h3>Perfil de Alumno</h3>
        </div>
        <div className="tarjeta">
          <h3>Anotador</h3>
        </div>
        <div className="tarjeta">
          <h3>Calendario</h3>
        </div>
      </div>
    </div>
  );
}

export default ToolsBanner;