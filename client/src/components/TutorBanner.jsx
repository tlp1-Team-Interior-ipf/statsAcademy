import React from 'react';
import '../styles/TutorBanner.css'; // Importamos los estilos

const TutorBanner = () => {
    return (
        <div className="banner-container">
            <div className="banner-content">
                <h2>¡Prueba Gauss!</h2>
                <h2>Nuestro tutor inteligente</h2>
                <button className="cta-button">Probar ahora</button>
            </div>
            <img
                src="/img/tutorbanner.jpg" // Cambia esta ruta por la ruta correcta de tu imagen
                alt="Imagen Tutor"
                className="tutor-image"
            />
        </div>
    );
};

export default TutorBanner;
