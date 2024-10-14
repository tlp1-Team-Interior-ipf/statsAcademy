import React from 'react';
import '../styles/ToolsBanner.css'; // Puedes añadir aquí los estilos CSS

const ToolsBanner = () => {
  return (
    <div className="herramientas-container">
      <h2 className="herramientas-title">Tenemos las herramientas que necesitas:</h2>
      <div className="tarjetas-container">
        <div className="tarjeta tarjeta-perfil">
          <div className="tarjeta-contenido">
            <h3>Perfil de Alumno</h3>
          </div>
        </div>
        <div className="tarjeta tarjeta-anotador">
          <div className="tarjeta-contenido">
            <h3>Anotador</h3>
          </div>
        </div>
        <div className="tarjeta tarjeta-calendario">
          <div className="tarjeta-contenido">
            <h3>Calendario</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolsBanner;
