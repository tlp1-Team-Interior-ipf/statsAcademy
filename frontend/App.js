import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserContext, UserProvider } from './context/userContext';
import CalendarScreen from './screens/Private/CalendarScreen/CalendarScreen';
import HomeScreen from './screens/Private/HomeScreen/HomeScreen';
import KanbanScreen from './screens/Private/KanbanScreen/KanbanScreen';
import QuizGameScreen from './screens/Private/QuizGameScreen/QuizGameScreen';
import ReportsScreen from './screens/Private/ReportsScreen/ReportsScreen';
import AccountScreen from './screens/Private/AccountScreen/AccountScreen';
import ConfigScreen from './screens/Private/SettingsScreen/SettingsScreen';
import NotifyScreen from './screens/Private/NotifyScreen/NotifyScreen';
import ChatScreen from './screens/Private/ChatScreen/ChatScreen';
import ChatClearScreen from './screens/Private/ChatScreen/ChatClearScreen';
import LibraryScreen from './screens/Private/LibraryScreen/LibraryScreen';
import TopNotesScreen from './screens/Private/TopNotesScreen/TopNotesScreen';
import BadNotesScreen from './screens/Private/BadNotesScreen/BadNotesScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/Public/LoginScreen';
import RegisterScreen from './screens/Public/RegisterScreen';
import RecoveryPasswordScreen from './screens/Private/RecoveryPasswordScreen/RecoveryPassword';
import UserJourneyScreen from './screens/Private/UserJourneyScreen/UserJourneyScreen';
import AchievementsScreen from './screens/Private/AchievementsScreen/AchievementsScreen';
import { MaterialIcons, Ionicons, FontAwesome } from 'react-native-vector-icons';
import { Temas } from './utils/selectTheme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MyTabs = () => {
  const { BackgroundTheme, TextBackgroundTheme, IconstTabTheme, TabTheme } = Temas();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

        //   if (route.name === 'Home') {
        //     iconName = focused ? 'home' : 'home-outline';
        //     return <Ionicons name={iconName} size={30} color={IconstTabTheme} />;
        //   } else if (route.name === 'Calendar') {
        //     iconName = focused ? 'calendar' : 'calendar';
        //     return <FontAwesome name={iconName} size={28} color={IconstTabTheme} />;
        //   } else if (route.name === 'Kanban') {
        //     iconName = focused ? 'view-kanban' : 'view-kanban';
        //     return <MaterialIcons name={iconName} size={30} color={IconstTabTheme} />;
        //   } else if (route.name === 'Reports') {
        //     iconName = focused ? 'stats-chart' : 'stats-chart';
        //     return <Ionicons name={iconName} size={30} color={IconstTabTheme} />;
        //   } else if (route.name === 'QuizGame') {
        //     iconName = focused ? 'games' : 'games';
        //     return <MaterialIcons name={iconName} size={30} color={IconstTabTheme} />;
        //   }

        // },

        const isReports = route.name === 'Reports';
        // Cambia el color de todos los íconos a azul si estás en "Reports"
        const iconColor = isReports ? '#0000FF' : IconstTabTheme;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={30} color={iconColor} />;
          } else if (route.name === 'Calendar') {
            iconName = focused ? 'calendar' : 'calendar';
            return <FontAwesome name={iconName} size={28} color={iconColor} />;
          } else if (route.name === 'Kanban') {
            iconName = focused ? 'view-kanban' : 'view-kanban';
            return <MaterialIcons name={iconName} size={30} color={iconColor} />;
          } else if (route.name === 'Reports') {
            iconName = focused ? 'stats-chart' : 'stats-chart';
            return <Ionicons name={iconName} size={30} color={iconColor} />;
          } else if (route.name === 'QuizGame') {
            iconName = focused ? 'games' : 'games';
            return <MaterialIcons name={iconName} size={30} color={iconColor} />;
          }
        },
        // tabBarActiveTintColor: '#fff',
        // tabBarInactiveTintColor: IconstTabTheme,
        tabBarActiveTintColor: '#0000FF', // Texto azul en la pestaña activa cuando estás en Reports
        tabBarInactiveTintColor: route.name === 'Reports' ? '#0000FF' : IconstTabTheme, 
        tabBarStyle: {
          backgroundColor: route.name === 'Reports' ? '#fff' : TabTheme, // Blanco para "Reports", tema predeterminado para otras
        },
      })}
      >
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown: false, headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme}} />
      <Tab.Screen name="Reports" component={ReportsScreen} options={{headerShown: false}} />
      <Tab.Screen name="Calendar" component={CalendarScreen} options={{headerShown: false}} />
      <Tab.Screen name="Kanban" component={KanbanScreen} options={{headerShown: false}} />
      <Tab.Screen name="QuizGame" component={QuizGameScreen} options={{headerShown: false}} />
    </Tab.Navigator>
  );
};

const ModalStack = () => {
  const { BackgroundTheme, TextBackgroundTheme } = Temas();
  
  return (
  <Stack.Navigator>
    <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
    
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{
        presentation: 'modal',
        headerShown: true,
        title: 'Account',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />
    <Stack.Screen
      name="Settings"
      component={ConfigScreen}
      options={{
        presentation: 'modal',
        headerShown: true,
        title: 'Settings',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />
    <Stack.Screen
      name="Notify"
      component={NotifyScreen}
      options={{
        presentation: 'modal',
        headerShown: true,
        title: 'Notifications',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        presentation: 'card',
        headerShown: true,
        title: 'Tutor Gauss',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="ChatClear"
      component={ChatClearScreen}
      options={{
        presentation: 'card',
        headerShown: true,
        title: 'Tutor Gauss',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="Library"
      component={LibraryScreen}
      options={{
        presentation: 'modal',
        headerShown: true,
        title: 'Library',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="TopNotes"
      component={TopNotesScreen}
      options={{
        presentation: 'card',
        headerShown: true,
        title: 'Top Notes',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="BadNotes"
      component={BadNotesScreen}
      options={{
        presentation: 'card',
        headerShown: true,
        title: 'Bad Notes',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="UserJourney"
      component={UserJourneyScreen}
      options={{
        presentation: 'card',
        headerShown: true,
        title: 'User Journey',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

    <Stack.Screen
      name="Achievements"
      component={AchievementsScreen}
      options={{
        presentation: 'card',
        headerShown: true,
        title: 'Achievements',
        headerStyle: { backgroundColor: BackgroundTheme },
        headerTintColor: TextBackgroundTheme
      }}
    />

  </Stack.Navigator>
)};

const RoutesPublic = () => {
  const { BackgroundTheme, TextBackgroundTheme } = Temas();

  console.log('Rendering RoutesPublic');
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, presentation: 'card'}} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false, presentation: 'card'}} />
      <Stack.Screen name="RecoveryPassword" component={RecoveryPasswordScreen} options={{ presentation: 'card', headerStyle: { backgroundColor: BackgroundTheme }, headerTintColor: TextBackgroundTheme}}/>
    </Stack.Navigator>
  );
};

const RoutesPrivate = () => {
  console.log('Rendering RoutesPrivate');
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const { BackgroundTheme, TextBackgroundTheme } = Temas();


  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingStatus = await AsyncStorage.getItem('isOnboardingCompleted');
      console.log('Onboarding Status:', onboardingStatus);
      setIsOnboardingCompleted(onboardingStatus === 'true');
    };
    checkOnboardingStatus();
  }, []);

  if (!isOnboardingCompleted) {
    
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Onboarding"
            component={OnboardingScreen}
          />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, presentation: 'card'}} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false, presentation: 'card'}} />
          <Stack.Screen name="RecoveryPassword" component={RecoveryPasswordScreen} options={{ presentation: 'card', headerStyle: { backgroundColor: BackgroundTheme }, headerTintColor: TextBackgroundTheme}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <ModalStack /> : <RoutesPublic />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}