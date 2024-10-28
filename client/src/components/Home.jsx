import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate para la navegación
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();  // Obtiene la función navigate

  const handleCardClick = () => {
    navigate('/home/chat');  // Navega a la ruta '/chat' al hacer clic en la tarjeta del Tutor Inteligente
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a su inicio</h1>
      <h2 className="home-subtitle">¿Qué desea hacer?</h2>
      <ul className="cards">
        <li>
          <button className="card" onClick={() => navigate('/home/profile')}>
            <img src="img/studentprofile.png" className="card__image" alt="Perfil del alumno" />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                <div className="card__header-text">
                  <h3 className="card__title"><strong>Perfil del alumno</strong></h3>
                </div>
              </div>
              <p className="card__description">Edita tu perfil con preferencias y datos relevantes.</p>
            </div>
          </button>
        </li>
        <li>
          <button className="card" onClick={() => navigate('/home/tools')}>
            <img src="img/tools.png" className="card__image" alt="Organizador" />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                <div className="card__header-text">
                  <h3 className="card__title"><strong>Organizador</strong></h3>
                </div>
              </div>
              <p className="card__description">Organizador de tareas para gestionar actividades y otros eventos importantes.</p>
            </div>
          </button>
        </li>
        <li>
          <button className="card" onClick={handleCardClick}>
            <img src="img/tutor.png" className="card__image" alt="Tutor Inteligente" />
            <div className="card__overlay">
              <div className="card__header">
                <svg className="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                <div className="card__header-text">
                  <h3 className="card__title"><strong>Tutor Inteligente</strong></h3>
                </div>
              </div>
              <p className="card__description">Tutor Inteligente en Estadística para Ciencia de Datos.</p>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Home;