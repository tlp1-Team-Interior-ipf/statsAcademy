// Tools.jsx
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Card from './Card'; // Asegúrate de importar el componente Card
import '../styles/Tools.css';

function Tools() {
  const navigate = useNavigate();

  const handleCardClick1 = () => {
    navigate('/home/todoapp');
  };

  const handleCardClick2 = () => {
    navigate('/home/calendar');
  };

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} /> Volver
      </button>
      <div className='tools-container'>
        <ul className="tools-cards">
          <li>
            <Card
              className="tools-card" // Asegúrate de aplicar la clase
              title="ToDo-App"
              description="Gestionador de tareas."
              imageSrc="/img/todoapp.png"
              altText="Perfil del alumno"
              onClick={handleCardClick1}
            />
          </li>
          <li>
            <Card
              className="tools-card" // Asegúrate de aplicar la clase
              title="Calendario"
              description="Organiza tus fechas importantes."
              imageSrc="/img/calendar.png"
              altText="Organizador"
              onClick={handleCardClick2}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default Tools;
