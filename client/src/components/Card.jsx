import React from 'react';
import { useNavigate } from 'react-router-dom';

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

export default Card;
