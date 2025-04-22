import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useAudioPlayer } from 'react-native-audio-player-kit';
import { Ionicons } from '@expo/vector-icons';

export default function PlaylistScreen() {
  const { tracks, currentTrack, playTrack } = useAudioPlayer();

  const renderItem = ({ item }: { item: any }) => {
    const isPlaying = currentTrack && currentTrack.id === item.id;
    
    return (
      <TouchableOpacity 
        style={[styles.trackItem, isPlaying ? styles.playingTrack : null]} 
        onPress={() => playTrack(item)}
      >
        <View style={styles.trackInfoContainer}>
          <Image 
            source={{ uri: item.artwork || 'https://via.placeholder.com/100' }} 
            style={styles.thumbnail} 
          />
          <View style={styles.textContainer}>
            <Text style={styles.trackTitle}>{item.title}</Text>
            <Text style={styles.artistName}>{item.artist}</Text>
          </View>
        </View>
        
        {isPlaying && (
          <View style={styles.playingIcon}>
            <Ionicons name="musical-notes" size={18} color="#4A89DC" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlist</Text>
      
      {tracks && tracks.length > 0 ? (
        <FlatList
          data={tracks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tracks in playlist</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  trackItem: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  playingTrack: {
    borderLeftWidth: 4,
    borderLeftColor: '#4A89DC',
  },
  trackInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333',
  },
  artistName: {
    fontSize: 14,
    color: '#666',
  },
  playingIcon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 