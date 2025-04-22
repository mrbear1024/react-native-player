import React from 'react';
interface MiniPlayerProps {
    onOpenPlayer: () => void;
    style?: any;
}
/**
 * 底部迷你播放器组件
 * 显示当前播放音频信息和基本控制
 */
declare const MiniPlayer: React.FC<MiniPlayerProps>;
export default MiniPlayer;
