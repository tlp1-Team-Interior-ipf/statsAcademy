import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import UserProvider from '@/context/userContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack, Slot } from 'expo-router';
import ProtectedRoute from '@/routes/ProtectedRoute'; // Asegúrate de importar tu componente
import { Screen } from 'react-native-screens';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [appIsReady, setAppIsReady] = useState(false);

  // Controla la inicialización de la aplicación
  useEffect(() => {
    const prepareApp = async () => {
      try {
        if (fontsLoaded) {
          setAppIsReady(true); // Marca que la app está lista
          await SplashScreen.hideAsync();
        }
      } catch (error) {
        console.warn(error);
      }
    };

    prepareApp();
  }, [fontsLoaded]);

  if (!appIsReady) {
    return null; // No muestra nada hasta que todo esté listo
  }

  return (
      <UserProvider>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            {appIsReady && (
              <Stack screenOptions={{headerShown: false, animation: 'fade'}}>
                <ProtectedRoute>
                  <Slot />
                </ProtectedRoute>
              </Stack>
            )}
          </ThemeProvider>
      </UserProvider>
  );
}
