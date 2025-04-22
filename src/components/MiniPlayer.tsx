import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { usePlayer } from '../contexts/PlayerContext';
import { Ionicons } from '@expo/vector-icons';

interface MiniPlayerProps {
  onOpenPlayer: () => void;  // 打开全屏播放器的回调
  style?: any;
}

/**
 * 底部迷你播放器组件
 * 显示当前播放音频信息和基本控制
 */
const MiniPlayer: React.FC<MiniPlayerProps> = ({
  onOpenPlayer,
  style = {}
}) => {
  // 从播放器上下文获取需要的状态和函数
  const { 
    currentEpisode,
    isPlaying,
    progress,
    duration,
    togglePlayPause,
    playNextEpisode,
    playPreviousEpisode
  } = usePlayer();

  // 如果没有正在播放的内容，不显示迷你播放器
  if (!currentEpisode) return null;

  // 计算进度百分比，防止 NaN
  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <TouchableOpacity 
      onPress={onOpenPlayer} 
      style={[styles.container, style]}
      activeOpacity={0.8}
    >
      {/* 封面缩略图 */}
      <Image source={{ uri: currentEpisode.coverImage }} style={styles.cover} />
      
      {/* 标题和作者 */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{currentEpisode.title}</Text>
        <Text style={styles.author} numberOfLines={1}>{currentEpisode.author}</Text>
        {/* 进度条 */}
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progress, 
              { width: `${progressPercent}%` }
            ]} 
          />
        </View>
      </View>

      {/* 控制按钮 */}
      <View style={styles.controls}>
        <TouchableOpacity 
          onPress={playPreviousEpisode}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="play-skip-back" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={togglePlayPause} 
          style={styles.playButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons 
            name={isPlaying ? "pause-circle" : "play-circle"} 
            size={36} 
            color="#2B95D6"
          />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={playNextEpisode}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="play-skip-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#eee',
    marginTop: 4,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2B95D6',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    marginHorizontal: 8,
  },
});

export default MiniPlayer; 