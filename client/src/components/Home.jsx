import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import '../styles/Home.css';

const cards = [
  {
    title: 'Gauss - Tutor Inteligente',
    description: 'Tutor Inteligente en Estadística para Ciencia de Datos.',
    imageSrc: 'img/gausvector9.png',
    altText: 'Tutor Inteligente',
    route: '/home/chat',
  },
  {
    title: 'Herramientas',
    description: 'Herramientas que pueden serte útiles',
    imageSrc: 'img/tools.png',
    altText: 'Organizador',
    route: '/home/tools',
  },
  {
    title: 'Evaluatorio',
    description: '¡Toma una evaluación para medir tus conocimientos!',
    imageSrc: 'img/studentprofile.png',
    altText: 'Perfil del alumno',
    route: '/home/evaluation',
  },
];

// Componente Card para mostrar la imagen y descripción con la superposición
const Card = ({ description, imageSrc, altText, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  return (
    <div className="card" onClick={handleClick}>
      <img src={imageSrc} alt={altText} className="card-image" />
      <div className="card-overlay">
        <p>{description}</p>
      </div>
    </div>
  );
};

// Componente principal CardGrid
const CardGrid = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a su inicio</h1>
      <h2 className="home-subtitle">¿Qué desea hacer?</h2>
      <div className="card-grid">
        {cards.map((card, index) => (
          <AnimatedCardContainer key={index} card={card} />
        ))}
      </div>
    </div>
  );
};

// Componente que envuelve cada tarjeta con animación
const AnimatedCardContainer = ({ card }) => {
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { tension: 400, friction: 10 },
    delay: 100,
  });

  return (
    <animated.div style={animationProps} className="card-container">
      <h3 className="card-title">{card.title}</h3>
      <Card
        description={card.description}
        imageSrc={card.imageSrc}
        altText={card.altText}
        route={card.route}
      />
    </animated.div>
  );
};

export default CardGrid;