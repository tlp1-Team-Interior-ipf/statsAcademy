import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Card = ({ title, description, imageSrc, altText, route }) => {
  const navigate = useNavigate();

  return (
    <div className="card-container">
      <h3 className="card-title">{title}</h3>
      <button className="card" onClick={() => navigate(route)}>
        <img src={imageSrc} className="card__image" alt={altText} />
        <div className="card__overlay">
          <p className="card__description">{description}</p>
        </div>
      </button>
    </div>
  );
};

export default Card;
