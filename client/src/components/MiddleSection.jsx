import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './MiddleSection.css';

function MiddleSection() {
  const [barHeights, setBarHeights] = useState([300, 300, 200]);
  const navigate = useNavigate(); // Usa useNavigate

  const handleMouseMove = (index, event) => {
    const maxHeight = 400; // Limite de altura en pixeles
    const newHeights = [...barHeights];
    newHeights[index] = Math.min(event.clientY, maxHeight);
    setBarHeights(newHeights);
  };

  const handleMouseLeave = () => {
    setBarHeights([300, 300, 200]);
  };

  const handleButtonClick = () => {
    navigate('/home'); // Redirige a la página de inicio
  };

  return (
    <div className="middle-section">
      <div className="text-content">
        <h1>Bienvenido a STI</h1>
        <h2>Sistema Tutor Inteligente</h2>
        <h4>Tutoría educativa personalizada</h4>
        <button onClick={handleButtonClick}>Comenzar</button> {/* Asigna la función al evento onClick */}
      </div>
      <div className="bars-container">
        <div className="bars">
          {barHeights.map((height, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: `${height}px` }}
              onMouseMove={(event) => handleMouseMove(index, event)}
              onMouseLeave={handleMouseLeave}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MiddleSection;
