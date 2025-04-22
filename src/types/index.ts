/**
 * 音频项类型定义
 */
export interface Episode {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  audioUrl: string;
}

/**
 * 播放器上下文类型定义
 */
export interface PlayerContextType {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  playlist: Episode[];
  progress: number;
  duration: number;
  setCurrentEpisode: (episode: Episode | null) => void;
  togglePlayPause: () => void;
  playNextEpisode: () => void;
  playPreviousEpisode: () => void;
  seekTo: (position: number) => void;
}

/**
 * 音频播放系统属性
 */
export interface AudioPlayerSystemProps {
  children: React.ReactNode;
  onNavigateToPlayer?: () => void;
  miniPlayerBottom?: number;
}

/**
 * 独立播放器组件属性
 */
export interface EpisodePlayerProps {
  episode: Episode;
  onClose?: () => void;
  compact?: boolean;
  style?: any;
} 