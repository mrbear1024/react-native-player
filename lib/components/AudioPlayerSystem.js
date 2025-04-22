"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const PlayerContext_1 = require("../contexts/PlayerContext");
const MiniPlayer_1 = __importDefault(require("./MiniPlayer"));
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
const AudioPlayerSystem = ({ children, onNavigateToPlayer = () => { }, miniPlayerBottom = 83, initialEpisodes = [] }) => {
    return (<PlayerContext_1.PlayerProvider initialEpisodes={initialEpisodes}>
      <AudioPlayerContent onNavigateToPlayer={onNavigateToPlayer} miniPlayerBottom={miniPlayerBottom}>
        {children}
      </AudioPlayerContent>
    </PlayerContext_1.PlayerProvider>);
};
/**
 * 内部组件，实现播放器的具体功能
 */
const AudioPlayerContent = ({ children, onNavigateToPlayer = () => { }, miniPlayerBottom = 83 }) => {
    const { currentEpisode } = (0, PlayerContext_1.usePlayer)();
    return (<react_native_1.View style={styles.container}>
      {/* 主内容 */}
      <react_native_1.View style={[
            styles.content,
            currentEpisode && { paddingBottom: 64 } // 当有播放器时，为其留出空间
        ]}>
        {children}
      </react_native_1.View>
      
      {/* 迷你播放器 */}
      {currentEpisode && (<react_native_1.View style={[
                styles.miniPlayerContainer,
                { bottom: miniPlayerBottom }
            ]}>
          <MiniPlayer_1.default onOpenPlayer={onNavigateToPlayer}/>
        </react_native_1.View>)}
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = AudioPlayerSystem;
