import React from 'react';
import { Carousel } from 'react-bootstrap';

import '../styles/MainView.css';

const MainView = () => {
    return (
        <div className="main-view-container">
            <div className="text-section text-section-move-down">
                <h1>Stats Academy</h1>
                <br />
                <h2>Aprendizaje en Estadística</h2>
                <p>
                    Descubre la manera más efectiva de aprender Estadística con nuestras tutorías personalizadas.
                </p>
                <button className="start-button">Comienza ahora</button>
            </div>

            <div className="carousel-section carousel-section-move-down">
                <Carousel controls={true} indicators={true}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/tema1.png"
                            alt="Tema 1"
                        />
                        <Carousel.Caption>
                            <h5>Tema 1</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/tema2.png"
                            alt="Tema 2"
                        />
                        <Carousel.Caption>
                            <h5>Tema 2</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/img/tema3.png"
                            alt="Tema 3"
                        />
                        <Carousel.Caption>
                            <h5>Tema 3</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    );
};

export default MainView;