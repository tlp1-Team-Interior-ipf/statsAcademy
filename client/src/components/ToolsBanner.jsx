import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import '../styles/ToolsBanner.css';

const ToolsBanner = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 }); // Se activa cuando el 20% de la tarjeta es visible

  const animationProps = useSpring({
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    opacity: inView ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="herramientas-container">
      <h2 className="herramientas-title">Tenemos las herramientas que necesitas:</h2>
      <div className="tarjetas-container" ref={ref}>
        <div className="tarjeta-wrapper">
          <animated.div style={animationProps} className="tarjeta tarjeta-perfil">
            <div className="tarjeta-contenido">
              <h3>Perfil de Alumno</h3>
            </div>
          </animated.div>
        </div>
        <div className="tarjeta-wrapper">
          <animated.div style={animationProps} className="tarjeta tarjeta-anotador">
            <div className="tarjeta-contenido">
              <h3>Anotador</h3>
            </div>
          </animated.div>
        </div>
        <div className="tarjeta-wrapper">
          <animated.div style={animationProps} className="tarjeta tarjeta-calendario">
            <div className="tarjeta-contenido">
              <h3>Calendario</h3>
            </div>
          </animated.div>
        </div>
      </div>
    </div>
  );
};

export default ToolsBanner;