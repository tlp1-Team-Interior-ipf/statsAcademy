import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/MainView.css'; // Mantén los estilos aquí

const MainView = () => {
    return (
        <div className="main-view-container">
            {/* Contenedor del texto y botón */}
            <div className="text-section text-section-move-down">
                <h1>Stats Academy</h1>
                <br />
                <h2>Aprendizaje en Estadística</h2>
                <p>
                    Descubre la manera más efectiva de aprender Estadística con nuestras tutorías personalizadas.
                </p>
                <button className="start-button">Comienza ahora</button>
            </div>

            {/* Contenedor del carrusel */}
            <div className="carousel-section carousel-section-move-down">
                <Carousel autoPlay infiniteLoop showThumbs={false}>
                    <div>
                        <img src="/img/tema1.png" alt="Imagen 1" />
                        <p className="legend">Tema 1</p>
                    </div>
                    <div>
                        <img src="/img/tema2.png" alt="Imagen 2" />
                        <p className="legend">Tema 2</p>
                    </div>
                    <div>
                        <img src="/img/tema3.png" alt="Imagen 3" />
                        <p className="legend">Tema 3</p>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default MainView;
