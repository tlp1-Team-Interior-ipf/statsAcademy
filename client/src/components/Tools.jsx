import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card'; // Utilizamos el mismo componente Card
import '../styles/Tools.css'; // Reutilizamos el mismo archivo CSS

function Tools() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "ToDo-App",
      description: "Gestionador de tareas.",
      imageSrc: "/img/todoapp.png",
      altText: "Perfil del alumno",
      route: "/home/todoapp",
    },
    {
      title: "Calendario",
      description: "Organiza tus fechas importantes.",
      imageSrc: "/img/calendar.png",
      altText: "Organizador",
      route: "/home/calendar",
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
        <h1 className="home-title">Herramientas</h1>
        <div className="card-grid"> {/* Reutilizamos el grid de Home */}
          {cards.map((card, index) => (
            <div key={index} className="card-container">
              <h3 className="card-title">{card.title}</h3>
              <Card
                description={card.description}
                imageSrc={card.imageSrc}
                altText={card.altText}
                route={card.route}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Tools;
