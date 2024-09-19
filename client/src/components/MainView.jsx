import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import '../styles/MainView.css'; // Importamos los estilos personalizados

const MainView = () => {
    return (
        <div className="main-view-container">
            {/* Contenedor del texto y botón */}
            <div className="text-section">
                <h2>Paquete de productividad en línea</h2>
                <p>
                    Reúna todos sus documentos, presentaciones, PDF, gráficos y publicaciones digitales bajo un mismo techo con Visual Paradigm Online.
                    VP Online une equipos, objetivos y acciones en un solo lugar.
                </p>
                <button className="cta-button">Empiece gratis</button>
            </div>

            {/* Contenedor del carrusel */}
            <div className="carousel-section">
                <Carousel autoPlay infiniteLoop showThumbs={false}>
                    <div>
                        <img src="https://via.placeholder.com/600x400" alt="Imagen 1" />
                        <p className="legend">Concepto 1</p>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/600x400" alt="Imagen 2" />
                        <p className="legend">Concepto 2</p>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/600x400" alt="Imagen 3" />
                        <p className="legend">Concepto 3</p>
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default MainView;
