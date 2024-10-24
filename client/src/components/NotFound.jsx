import React from 'react';
import './NotFound.css'; // Importa el archivo CSS

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src="img/notfound.png" alt="Not Found" className="not-found-image" />
      <h1 className="not-found-title">404 Not Found</h1>
      <p className="not-found-text">La página que estás buscando no existe.</p>
    </div>
  );
};

export default NotFound;
