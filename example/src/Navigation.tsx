import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PlayerScreen from './screens/PlayerScreen';
import PlaylistScreen from './screens/PlaylistScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Player') {
              return (
                <Ionicons 
                  name={focused ? 'musical-note' : 'musical-note-outline'} 
                  size={size} 
                  color={color} 
                />
              );
            } else if (route.name === 'Playlist') {
              return (
                <Ionicons 
                  name={focused ? 'list' : 'list-outline'} 
                  size={size} 
                  color={color} 
                />
              );
            }
            
            // Default icon
            return <Ionicons name="help-circle-outline" size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4A89DC',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen name="Player" component={PlayerScreen} />
        <Tab.Screen name="Playlist" component={PlaylistScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
} 