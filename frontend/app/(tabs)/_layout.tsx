  import { Tabs } from 'expo-router';
  import React from 'react';
  import { TabBarIcon } from '@/components/navigation/TabBarIcon';
  import { MaterialIcons } from '@expo/vector-icons';
import { Temas } from '@/utils/selectTheme';

  export default function TabLayout() {

    const { BackgroundTheme } = Temas();

    return (
        
          <Tabs
          screenOptions={{
            tabBarStyle:{ backgroundColor:BackgroundTheme, borderTopColor: 'transparent'},
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#666',
          }}
          >

              <Tabs.Screen
            name="Reports"
            options={{
              title: 'Reportes',
              tabBarLabelStyle: {color: '#ddd'},
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons name='bar-chart' size={25} color={'#fff'} />
              ),
            }}
          /> 

            <Tabs.Screen
              name="QuizGame"
              options={{
                title: 'Quiz',
                tabBarLabelStyle: { color: '#fff'} ,
                tabBarIcon: ({ color, focused }) => (
                  <MaterialIcons name='gamepad' size={30} color={'#fff'} />
                ),
              }}
            /> 

            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                ),
              }}
            />

            <Tabs.Screen
              name="Calendar"
              options={{
                title: 'Calendar',
                tabBarLabelStyle: {color: '#ddd'},
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={'#fff'} />
                ),
              }}
            />
            
            <Tabs.Screen
              name="Kanban"
              options={{
                title: 'Kanban',
                tabBarLabelStyle: {color: '#ddd'},
                tabBarIcon: ({ color, focused }) => (
                  // <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                  <MaterialIcons name='view-kanban' size={25} color={'#fff'} />
                ),
              }}
            /> 

          </Tabs>
    );
  }
