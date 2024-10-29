import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import '../styles/Tools.css'

function Tools() {
    const navigate = useNavigate();

    const handleCardClick1 = () => {
        navigate('/home/todoapp');
      };

      const handleCardClick2 = () => {
        navigate('/home/calendar');
      };
      
    
    return(
        <>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} /> Volver
        </button>
            <div className='home-container'>
                <ul className="cards">
                    <li>
                    <button className="card" onClick={handleCardClick1}>
                        <img src="/img/todoapp.png" className="card__image" alt="Perfil del alumno" />
                        <div className="card__overlay">
                        <div className="card__header">
                            <div className="card__header-text">
                            <h3 className="card__title"><strong>ToDo-App</strong></h3>
                            </div>
                        </div>
                        <p className="card__description">Gestionador de tareas.</p>
                        </div>
                    </button>
                    </li>
                    <li>
                    <button className="card" onClick={handleCardClick2}>
                        <img src="/img/calendar.png" className="card__image" alt="Organizador" />
                        <div className="card__overlay">
                        <div className="card__header">
                            <div className="card__header-text">
                            <h3 className="card__title"><strong>Calendario</strong></h3>
                            </div>
                        </div>
                        <p className="card__description">Organiza tus fechas importantes.</p>
                        </div>
                    </button>
                    </li>
                    
                </ul>
            </div>
        </>
    )
};


export default Tools;