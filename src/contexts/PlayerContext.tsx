import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Episode, PlayerContextType } from '../types';

// 创建 PlayerContext
const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

interface PlayerProviderProps {
  children: React.ReactNode;
  initialEpisodes?: Episode[];
}

/**
 * 播放器状态提供者组件
 * 管理音频播放状态并提供控制方法
 */
export const PlayerProvider: React.FC<PlayerProviderProps> = ({ 
  children,
  initialEpisodes = []
}) => {
  // 状态管理
  const [playlist, setPlaylist] = useState<Episode[]>(initialEpisodes);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // 当切换播放内容时加载新的音频
  useEffect(() => {
    if (!currentEpisode) return;

    const loadAudio = async () => {
      try {
        // 如果有正在播放的音频，先卸载
        if (sound) {
          await sound.unloadAsync();
        }
        
        // 创建新的音频实例
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: currentEpisode.audioUrl },
          { shouldPlay: isPlaying },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();
    
    // 清理函数：组件卸载时释放音频资源
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentEpisode?.id]);

  // 监听音频播放状态
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setProgress(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
    }
  };

  // 初始化音频配置
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,      // iOS静音模式下仍然播放
          staysActiveInBackground: true,    // 后台播放
          shouldDuckAndroid: true,          // Android系统降低其他音频音量
        });
      } catch (error) {
        console.error('Error setting audio mode:', error);
      }
    };

    setupAudio();

    return () => {
      // 清理音频资源
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // 播放控制函数
  const togglePlayPause = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const seekTo = async (position: number) => {
    if (!sound) return;
    await sound.setPositionAsync(position * 1000);
  };

  const playNextEpisode = () => {
    if (!currentEpisode || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(ep => ep.id === currentEpisode.id);
    if (currentIndex < playlist.length - 1) {
      setCurrentEpisode(playlist[currentIndex + 1]);
    }
  };

  const playPreviousEpisode = () => {
    if (!currentEpisode || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(ep => ep.id === currentEpisode.id);
    if (currentIndex > 0) {
      setCurrentEpisode(playlist[currentIndex - 1]);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentEpisode,
        isPlaying,
        playlist,
        progress,
        duration,
        setCurrentEpisode,
        togglePlayPause,
        playNextEpisode,
        playPreviousEpisode,
        seekTo,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

/**
 * 自定义Hook，用于在组件中访问播放器上下文
 */
export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}; 