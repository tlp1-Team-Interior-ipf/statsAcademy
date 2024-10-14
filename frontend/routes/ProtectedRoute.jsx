import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/userContext';
import { router } from 'expo-router';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // Estado de carga para verificar autenticación

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isLoggedIn === false) {
        router.push('Login'); // Redirigir si no está autenticado
      }
      setIsCheckingAuth(false); // Autenticación verificada (ya sea true o false)
    };

    checkAuthStatus();
  }, [isLoggedIn]);

  if (isCheckingAuth) {
    return null; // Puedes agregar un spinner o componente de carga aquí
  }

  return children; // Renderiza el contenido si está autenticado
};

export default ProtectedRoute;
