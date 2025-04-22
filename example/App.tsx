import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AudioPlayerProvider } from 'react-native-audio-player-kit';

import HomeScreen from './src/screens/HomeScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AudioPlayerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: '音乐播放器示例 | Music Player Example' }}
          />
          <Stack.Screen 
            name="Player" 
            component={PlayerScreen} 
            options={{ title: '播放器 | Player' }}
          />
          <Stack.Screen 
            name="Playlist" 
            component={PlaylistScreen} 
            options={{ title: '播放列表 | Playlist' }}
          />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </AudioPlayerProvider>
  );
} 