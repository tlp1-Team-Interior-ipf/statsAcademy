import React, { useState, useEffect, useRef } from 'react';
import createActivityDetector from 'activity-detector';

const TimeTracker = () => {
  const [activeTime, setActiveTime] = useState(0); // Tiempo total en segundos
  const [isActive, setIsActive] = useState(true); // Estado de actividad del usuario
  const intervalRef = useRef(null); // Referencia al intervalo que suma el tiempo
  const detectorRef = useRef(null); // Referencia al detector de actividad

  useEffect(() => {
    // Configurar el detector de actividad
    detectorRef.current = createActivityDetector({
      timeToIdle: 10000, // Tiempo en ms para considerar al usuario inactivo
    });

    // Manejar eventos del detector
    detectorRef.current.on('active', () => {
      setIsActive(true);
    });

    detectorRef.current.on('idle', () => {
      setIsActive(false);
    });

    return () => {
      // Limpieza: detener detector e intervalo
      detectorRef.current.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // Iniciar o detener el intervalo según el estado de actividad
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setActiveTime((prevTime) => prevTime + 1); // Sumar un segundo al tiempo activo
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive]);

  // Formatear el tiempo en hh:mm:ss
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Time Tracker</h1>
      <p>Tiempo activo en la aplicación:</p>
      <h2>{formatTime(activeTime)}</h2>
      <p>Estado: {isActive ? 'Activo' : 'Inactivo'}</p>
    </div>
  );
};

export default TimeTracker;