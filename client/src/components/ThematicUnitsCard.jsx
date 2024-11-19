import '../styles/ThematicUnitsCard.css';
import { UnidadesTematicas } from '../data/data';

const ThematicUnitsCard = () => {
    return (
        <div className="thematic-units-card">
          <h2 className='thematic-inits-title'>Unidades Temáticas</h2>
          {UnidadesTematicas.map((unit, index) => (
            <div key={index} className="unit-card">
              <h3>{unit.unit}</h3>
              <div className="topics">
                {unit.topics.map((topic, idx) => (
                  <div key={idx} className="topic-card">
                    <h4>{topic.number}</h4>
                    <p>{topic.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
  };
  
export default ThematicUnitsCard;  