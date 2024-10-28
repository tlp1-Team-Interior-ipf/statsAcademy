import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import '../styles/TutorBanner.css';

const TutorBanner = () => {
  const [textRef, textInView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [imageRef, imageInView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [logoRef, logoInView] = useInView({ triggerOnce: true, threshold: 0.5 });

  const textAnimation = useSpring({
    transform: textInView ? 'translateY(0)' : 'translateY(20px)',
    opacity: textInView ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const tutorImageAnimation = useSpring({
    transform: imageInView
      ? 'translate(-50%, -8px) translateY(-50px)' // Añade la posición original
      : 'translate(-50%, -8px) translateY(20px)', // Añade la posición original y el desplazamiento
    opacity: imageInView ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  const tutorLogoAnimation = useSpring({
    transform: logoInView
      ? 'translate(70%, 60%) translateY(0)' // Añade la posición original
      : 'translate(70%, 60%) translateY(20px)', // Añade la posición original y el desplazamiento
    opacity: logoInView ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="banner-container">
      <div className="banner-content">
        <animated.div style={textAnimation} ref={textRef}>
          <h2>¡Prueba Gauss!</h2>
          <h2>Nuestro tutor inteligente</h2>
        </animated.div>
        <button className="cta-button">Probar ahora</button>
      </div>
      <animated.img
        src="/img/tutorbanner.png" // Cambia esta ruta por la ruta correcta de tu imagen
        alt="Imagen Tutor"
        className="tutor-image"
        style={tutorImageAnimation} // Mantén el estilo de animación
        ref={imageRef}
      />
      <animated.img
        src="/img/tutorialogo.png" // Cambia esta ruta por la ruta correcta de tu logo
        alt="Logo Tutor"
        className="tutor-logo"
        style={tutorLogoAnimation} // Mantén el estilo de animación
        ref={logoRef}
      />
    </div>
  );
};

export default TutorBanner;