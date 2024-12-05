// import { useEffect, useRef, useState } from "react";

// const formatTime = (seconds) => {
//   const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
//   const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
//   const secs = (seconds % 60).toString().padStart(2, "0");
//   return `${hours}:${minutes}:${secs}`;
// };

// const useIdleTimer = (onIdle, delay = 60000) => {
//   const [elapsedTime, setElapsedTime] = useState(0);
//   const idleTimerRef = useRef(null);

//   const startIdleTimer = () => {
//     clearTimeout(idleTimerRef.current);
//     idleTimerRef.current = setTimeout(() => {
//       setElapsedTime(0); // Resetea el tiempo cuando se dispara onIdle
//       onIdle();
//     }, delay);
//   };

//   const resetIdleTimer = () => {
//     setElapsedTime(0); // Resetea el tiempo acumulado al detectar actividad
//     clearTimeout(idleTimerRef.current);
//     startIdleTimer();
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setElapsedTime((prevTime) => prevTime + 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     startIdleTimer();
//     return () => clearTimeout(idleTimerRef.current);
//   }, []);

//   return { resetIdleTimer, elapsedTime, formatTime };
// };

// export default useIdleTimer;

import { useEffect, useRef, useState } from "react";
import { AppState, TouchableWithoutFeedback } from "react-native";

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

const useIdleTimer = ( delay = 6000) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const idleTimerRef = useRef(null);

  const startIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setElapsedTime(0); // Resetea el tiempo cuando se dispara onIdle
      // onIdle();
    }, delay);
  };

  const resetIdleTimer = () => {
    setElapsedTime(0); // Resetea el tiempo acumulado al detectar actividad
    clearTimeout(idleTimerRef.current);
    startIdleTimer();
  };

  useEffect(() => {
    // Intervalo para actualizar el tiempo transcurrido
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(idleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    startIdleTimer();
    return () => clearTimeout(idleTimerRef.current);
  }, []);

  // Manejar cambios en el estado de la aplicación
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === "active") {
        resetIdleTimer();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return { resetIdleTimer, elapsedTime, formatTime };
};

export default useIdleTimer;
