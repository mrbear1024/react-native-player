import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAudioPlayer } from 'react-native-audio-player-kit';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { tracks, setupPlaylist } = useAudioPlayer();

  const sampleTracks = [
    {
      id: '1',
      title: '夜曲',
      artist: '周杰伦',
      url: 'https://example.com/music1.mp3',
      artwork: 'https://example.com/artwork1.jpg',
    },
    {
      id: '2',
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      url: 'https://example.com/music2.mp3',
      artwork: 'https://example.com/artwork2.jpg',
    },
    {
      id: '3',
      title: '告白气球',
      artist: '周杰伦',
      url: 'https://example.com/music3.mp3',
      artwork: 'https://example.com/artwork3.jpg',
    },
  ];

  const handlePlaylistSetup = () => {
    setupPlaylist(sampleTracks);
    navigation.navigate('Playlist');
  };

  const handleOpenPlayer = () => {
    if (!tracks || tracks.length === 0) {
      setupPlaylist(sampleTracks);
    }
    navigation.navigate('Player');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>音乐播放器套件 | Audio Player Kit</Text>
      <Text style={styles.subtitle}>示例应用 | Example App</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleOpenPlayer}
        >
          <Text style={styles.buttonText}>打开播放器 | Open Player</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handlePlaylistSetup}
        >
          <Text style={styles.buttonText}>查看播放列表 | View Playlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  button: {
    backgroundColor: '#4A89DC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 