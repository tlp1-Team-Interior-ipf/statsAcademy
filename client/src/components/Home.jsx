import React from 'react';
import Card from './Card';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a su inicio</h1>
      <h2 className="home-subtitle">¿Qué desea hacer?</h2>
      <ul className="cards">
        <li>
          <Card
            title="Perfil del alumno"
            description="Edita tu perfil con preferencias y datos relevantes."
            imageSrc="img/studentprofile.png"
            altText="Perfil del alumno"
            route="/home/profile"
          />
        </li>
        <li>
          <Card
            title="Organizador"
            description="Organizador de tareas para gestionar actividades y otros eventos importantes."
            imageSrc="img/tools.png"
            altText="Organizador"
            route="/home/tools"
          />
        </li>
        <li>
          <Card
            title="Gauss - Tutor Inteligente"
            description="Tutor Inteligente en Estadística para Ciencia de Datos."
            imageSrc="img/gausvector9.png"
            altText="Tutor Inteligente"
            route="/home/chat"
          />
          {/* <Card
            title="Evaluatorio"
            description="¡Toma una evaluacion para medir tus conocimientos!"
            imageSrc="img/studentprofile.png"
            altText="Perfil del alumno"
            route="/home/profile"
          /> */}
        </li>
      </ul>
    </div>
  );
};

export default Home;
