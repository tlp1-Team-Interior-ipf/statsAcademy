import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card';
import '../styles/Tools.css'; // Reutilizamos el mismo archivo CSS

function AnimatedCardContainer({ children, index }) {
  // Asegúrate de importar y utilizar el hook para animaciones aquí
  const animatedStyle = {
    animation: `fadeIn 0.5s ease forwards`,
    animationDelay: `${index * 0.1}s`, // Delay basado en el índice
  };

  return (
    <div style={animatedStyle}>
      {children}
    </div>
  );
}

function Exams() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Evaluación Inicial",
      description: "Toma una prueba para saber tu nivel inicial.",
      imageSrc: "/img/todoapp.png",
      altText: "Evaluación Inicial",
      route: "/home/initial-evaluation",
    },
    {
      title: "Evaluacion Periódica",
      description: "Pon a prueba tus conocimientos hasta ahora.",
      imageSrc: "/img/calendar.png",
      altText: "Evaluación Periódica",
      route: "/home/periodic-evaluation",
    },
  ];

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} /> Volver
      </button>
      <div className="home-container"> {/* Reutilizamos la clase de Home para el contenedor principal */}
        <h1 className="home-title">Evaluatorio</h1>
        <div className="card-grid"> {/* Reutilizamos el grid de Home */}
          {cards.map((card, index) => (
            <AnimatedCardContainer key={index} index={index}>
              <div className="card-container">
                <h3 className="card-title">{card.title}</h3>
                <Card
                  description={card.description}
                  imageSrc={card.imageSrc}
                  altText={card.altText}
                  route={card.route}
                />
              </div>
            </AnimatedCardContainer>
          ))}
        </div>
      </div>
    </>
  );
}

export default Exams;
