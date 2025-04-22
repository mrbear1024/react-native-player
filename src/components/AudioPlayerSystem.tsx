import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PlayerProvider, usePlayer } from '../contexts/PlayerContext';
import MiniPlayer from './MiniPlayer';
import { AudioPlayerSystemProps } from '../types';
import { Episode } from '../types';

/**
 * AudioPlayerSystem - 完整的音频播放器系统
 * 
 * 这个组件整合了音频播放的所有功能，包括：
 * 1. PlayerProvider - 提供播放状态管理
 * 2. MiniPlayer - 底部迷你播放器
 * 3. 处理播放器页面的导航
 * 
 * 使用方法：
 * ```
 * <AudioPlayerSystem>
 *   <YourApp />
 * </AudioPlayerSystem>
 * ```
 */
const AudioPlayerSystem: React.FC<AudioPlayerSystemProps & { initialEpisodes?: Episode[] }> = ({ 
  children,
  onNavigateToPlayer = () => {},
  miniPlayerBottom = 83,
  initialEpisodes = []
}) => {
  return (
    <PlayerProvider initialEpisodes={initialEpisodes}>
      <AudioPlayerContent
        onNavigateToPlayer={onNavigateToPlayer}
        miniPlayerBottom={miniPlayerBottom}
      >
        {children}
      </AudioPlayerContent>
    </PlayerProvider>
  );
};

/**
 * 内部组件，实现播放器的具体功能
 */
const AudioPlayerContent: React.FC<AudioPlayerSystemProps> = ({ 
  children, 
  onNavigateToPlayer = () => {},
  miniPlayerBottom = 83
}) => {
  const { currentEpisode } = usePlayer();
  
  return (
    <View style={styles.container}>
      {/* 主内容 */}
      <View style={[
        styles.content,
        currentEpisode && { paddingBottom: 64 } // 当有播放器时，为其留出空间
      ]}>
        {children}
      </View>
      
      {/* 迷你播放器 */}
      {currentEpisode && (
        <View style={[
          styles.miniPlayerContainer, 
          { bottom: miniPlayerBottom }
        ]}>
          <MiniPlayer 
            onOpenPlayer={onNavigateToPlayer}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  miniPlayerContainer: {
    width: '100%',
    position: 'absolute',
    zIndex: 10,
  }
});

export default AudioPlayerSystem; 