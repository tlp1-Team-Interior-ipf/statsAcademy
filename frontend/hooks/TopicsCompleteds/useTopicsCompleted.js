import { useState, useEffect } from "react";

const useCompletedTopics = (userId) => {
  const [completedTopics, setCompletedTopics] = useState(0);
  const [loading, setLoading] = useState(true); // Solo para la carga inicial
  const [error, setError] = useState(null);
  const fetchInterval = 20000; // Intervalo en milisegundos (20 segundos)

  useEffect(() => {
    if (!userId) return;

    let isInitialLoad = true; // Variable para controlar la carga inicial

    const fetchCompletedTopics = async () => {
      try {
        if (isInitialLoad) setLoading(true); // Solo mostramos el estado de carga en la primera llamada
        const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/topic/completed/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCompletedTopics(data.completedCount || 0);
        setError(null); // Limpiar errores si la solicitud es exitosa
      } catch (error) {
        setError(error.message);
      } finally {
        if (isInitialLoad) {
          setLoading(false); // Solo desactivamos loading tras la primera carga
          isInitialLoad = false; // Cambiar el estado de carga inicial
        }
      }
    };

    fetchCompletedTopics(); // Llama a la función inmediatamente

    const interval = setInterval(fetchCompletedTopics, fetchInterval); // Configura el intervalo para actualizaciones

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, [userId]);

  return { completedTopics, loading, error };
};

export default useCompletedTopics;
