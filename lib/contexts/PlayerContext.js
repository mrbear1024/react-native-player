"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = exports.PlayerProvider = void 0;
const react_1 = __importStar(require("react"));
const expo_av_1 = require("expo-av");
// 创建 PlayerContext
const PlayerContext = (0, react_1.createContext)(undefined);
/**
 * 播放器状态提供者组件
 * 管理音频播放状态并提供控制方法
 */
const PlayerProvider = ({ children, initialEpisodes = [] }) => {
    // 状态管理
    const [playlist, setPlaylist] = (0, react_1.useState)(initialEpisodes);
    const [currentEpisode, setCurrentEpisode] = (0, react_1.useState)(null);
    const [isPlaying, setIsPlaying] = (0, react_1.useState)(false);
    const [sound, setSound] = (0, react_1.useState)(null);
    const [progress, setProgress] = (0, react_1.useState)(0);
    const [duration, setDuration] = (0, react_1.useState)(0);
    // 当切换播放内容时加载新的音频
    (0, react_1.useEffect)(() => {
        if (!currentEpisode)
            return;
        const loadAudio = async () => {
            try {
                // 如果有正在播放的音频，先卸载
                if (sound) {
                    await sound.unloadAsync();
                }
                // 创建新的音频实例
                const { sound: newSound } = await expo_av_1.Audio.Sound.createAsync({ uri: currentEpisode.audioUrl }, { shouldPlay: isPlaying }, onPlaybackStatusUpdate);
                setSound(newSound);
            }
            catch (error) {
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
    }, [currentEpisode === null || currentEpisode === void 0 ? void 0 : currentEpisode.id]);
    // 监听音频播放状态
    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setProgress(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
        }
    };
    // 初始化音频配置
    (0, react_1.useEffect)(() => {
        const setupAudio = async () => {
            try {
                await expo_av_1.Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    shouldDuckAndroid: true, // Android系统降低其他音频音量
                });
            }
            catch (error) {
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
        if (!sound)
            return;
        if (isPlaying) {
            await sound.pauseAsync();
        }
        else {
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    };
    const seekTo = async (position) => {
        if (!sound)
            return;
        await sound.setPositionAsync(position * 1000);
    };
    const playNextEpisode = () => {
        if (!currentEpisode || playlist.length === 0)
            return;
        const currentIndex = playlist.findIndex(ep => ep.id === currentEpisode.id);
        if (currentIndex < playlist.length - 1) {
            setCurrentEpisode(playlist[currentIndex + 1]);
        }
    };
    const playPreviousEpisode = () => {
        if (!currentEpisode || playlist.length === 0)
            return;
        const currentIndex = playlist.findIndex(ep => ep.id === currentEpisode.id);
        if (currentIndex > 0) {
            setCurrentEpisode(playlist[currentIndex - 1]);
        }
    };
    return (<PlayerContext.Provider value={{
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
        }}>
      {children}
    </PlayerContext.Provider>);
};
exports.PlayerProvider = PlayerProvider;
/**
 * 自定义Hook，用于在组件中访问播放器上下文
 */
const usePlayer = () => {
    const context = (0, react_1.useContext)(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
};
exports.usePlayer = usePlayer;
