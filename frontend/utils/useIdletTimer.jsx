import { useEffect, useRef, useState } from "react";
import { Alert } from "react-native";

const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

const useIdleTimer = (onIdle, delay = 60000) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const idleTimerRef = useRef(null);

  const startIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(onIdle, delay);
  };

  const resetIdleTimer = () => {
    clearTimeout(idleTimerRef.current);
    startIdleTimer();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startIdleTimer();
    return () => clearTimeout(idleTimerRef.current);
  }, []);

  return { resetIdleTimer, elapsedTime, formatTime };
};

export default useIdleTimer;
