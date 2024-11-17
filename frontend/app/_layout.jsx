import { useFonts } from 'expo-font';
import { useContext, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import UserProvider, { UserContext } from '@/context/userContext';
import { Stack, Slot } from 'expo-router';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { ThemeProvider } from '@rneui/themed';
import { StyleSheet } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
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
      <AppWithTheme />
    </UserProvider>
  )

}

  function AppWithTheme() {
    const { theme } = useContext(UserContext);
  
    const appTheme = {
      light: {
        background: '#fff',
        text: '#000',
      },
      dark: {
        background: '#000',
        text: '#fff',
      },
    }[theme];
  
    return (
      <ThemeProvider theme={{ colors: { background: appTheme.background, text: appTheme.text } }}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <ProtectedRoute>
            <Slot />
          </ProtectedRoute>
        </Stack>
      </ThemeProvider>
    );
  }
  

//   return (
//       <UserProvider>
//             {appIsReady && (
//               <Stack screenOptions={{headerShown: false, animation: 'fade'}}>
//                 <ProtectedRoute>
//                   <Slot />
//                 </ProtectedRoute>
//               </Stack>
//             )}
//       </UserProvider>
//   );
// }
