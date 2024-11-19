import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/MainView.css';

const MainView = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Retrasa la aparición para asegurarse de que la animación se ejecute correctamente
        setTimeout(() => {
            setIsVisible(true);
        }, 100); // Puedes ajustar el tiempo de retraso si es necesario
    }, []);

    return (
        <div className="main-view-container">
            <div className={`text-section text-section-move-down fade-in ${isVisible ? 'visible' : ''}`}>
                <h1>Stats Academy</h1>
                <br />
                <h2>Aprendizaje en Estadística</h2>
                <p>
                    Descubre la manera más efectiva de aprender Estadística con nuestras tutorías personalizadas.
                </p>
                <button className="start-button">Comienza ahora</button>
            </div>

            <div className={`carousel-section carousel-section-move-down fade-in ${isVisible ? 'visible' : ''}`}>
                <Carousel controls={true} indicators={true} style={{textAlign: 'center', fontSize: '27px'}}>
                    <Carousel.Item style={{height: 500, position: 'relative', top: 200, left: 90}}>
                        <p style={{color: '#ddd', width: 500, textAlign: 'center'}}>¡Nos adaptamos a diferentes dispositivos para tu comodidad!</p>
                        <Carousel.Caption>
                            <h5>Tema 1</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{height: 500, position: 'relative', top: 200, left: 90}}>
                        <p style={{color: '#ddd', width: 500, textAlign: 'center'}}>¡Aprende Estadísitica de manera fácil y divertida!</p>
                        <Carousel.Caption>
                            <h5>Tema 2</h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{height: 500, position: 'relative', top: 200, left: 90}}>
                        <p style={{color: '#ddd', width: 500, textAlign: 'center'}}>¡Únete a la academia ya alcanza tus metas!</p>
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
