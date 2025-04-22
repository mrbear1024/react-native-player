import React from 'react';
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
declare const AudioPlayerSystem: React.FC<AudioPlayerSystemProps & {
    initialEpisodes?: Episode[];
}>;
export default AudioPlayerSystem;
