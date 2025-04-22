import React from 'react';
import { Episode, PlayerContextType } from '../types';
interface PlayerProviderProps {
    children: React.ReactNode;
    initialEpisodes?: Episode[];
}
/**
 * 播放器状态提供者组件
 * 管理音频播放状态并提供控制方法
 */
export declare const PlayerProvider: React.FC<PlayerProviderProps>;
/**
 * 自定义Hook，用于在组件中访问播放器上下文
 */
export declare const usePlayer: () => PlayerContextType;
export {};
