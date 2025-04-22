import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '../contexts/PlayerContext';
import { EpisodePlayerProps } from '../types';

/**
 * 格式化时间，将秒数转换为 MM:SS 格式
 */
const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

/**
 * EpisodePlayer - 独立的音频播放器组件
 * 可以以紧凑模式或完整模式显示
 */
const EpisodePlayer: React.FC<EpisodePlayerProps> = ({
  episode,
  onClose,
  compact = false,
  style = {}
}) => {
  const { 
    setCurrentEpisode, 
    currentEpisode,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    seekTo
  } = usePlayer();

  // 当组件挂载时开始播放
  useEffect(() => {
    // 如果传入的音频与当前播放的不同，则设置新的音频
    if (!currentEpisode || currentEpisode.id !== episode.id) {
      setCurrentEpisode(episode);
    }
  }, [episode.id]);

  // 计算进度百分比
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  if (compact) {
    // 紧凑模式 - 类似迷你播放器
    return (
      <View style={[styles.compactContainer, style]}>
        <Image source={{ uri: episode.coverImage }} style={styles.compactCover} />
        
        <View style={styles.compactInfo}>
          <Text style={styles.compactTitle} numberOfLines={1}>{episode.title}</Text>
          <Text style={styles.compactAuthor} numberOfLines={1}>{episode.author}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progress, { width: `${progressPercent}%` }]} />
          </View>
        </View>
        
        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={42} 
            color="#2B95D6"
          />
        </TouchableOpacity>
        
        {onClose && (
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // 完整模式 - 类似播放器页面
  return (
    <View style={[styles.container, style]}>
      {onClose && (
        <TouchableOpacity onPress={onClose} style={styles.fullCloseButton}>
          <Ionicons name="chevron-down" size={28} color="#666" />
        </TouchableOpacity>
      )}
      
      <Image source={{ uri: episode.coverImage }} style={styles.coverArt} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{episode.title}</Text>
        <Text style={styles.author}>{episode.author}</Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.sliderContainer}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{formatTime(progress)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
      
      <View style={styles.controls}>
        <TouchableOpacity>
          <Ionicons name="play-skip-back" size={32} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={64} 
            color="#2B95D6"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="play-skip-forward" size={32} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 完整模式样式
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullCloseButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  coverArt: {
    width: '80%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 40,
  },
  info: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#666',
    marginTop: 8,
  },
  progressContainer: {
    width: '100%',
    marginBottom: 30,
  },
  sliderContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2B95D6',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  
  // 紧凑模式样式
  compactContainer: {
    height: 72,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  compactCover: {
    width: 56,
    height: 56,
    borderRadius: 4,
    marginRight: 16,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  compactAuthor: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#eee',
    marginTop: 6,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2B95D6',
  },
  playButton: {
    marginHorizontal: 8,
  },
  closeButton: {
    padding: 8,
  },
});

export default EpisodePlayer; 