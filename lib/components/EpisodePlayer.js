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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const vector_icons_1 = require("@expo/vector-icons");
const PlayerContext_1 = require("../contexts/PlayerContext");
/**
 * 格式化时间，将秒数转换为 MM:SS 格式
 */
const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};
/**
 * EpisodePlayer - 独立的音频播放器组件
 * 可以以紧凑模式或完整模式显示
 */
const EpisodePlayer = ({ episode, onClose, compact = false, style = {} }) => {
    const { setCurrentEpisode, currentEpisode, isPlaying, progress, duration, togglePlayPause, seekTo } = (0, PlayerContext_1.usePlayer)();
    // 当组件挂载时开始播放
    (0, react_1.useEffect)(() => {
        // 如果传入的音频与当前播放的不同，则设置新的音频
        if (!currentEpisode || currentEpisode.id !== episode.id) {
            setCurrentEpisode(episode);
        }
    }, [episode.id]);
    // 计算进度百分比
    const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
    if (compact) {
        // 紧凑模式 - 类似迷你播放器
        return (<react_native_1.View style={[styles.compactContainer, style]}>
        <react_native_1.Image source={{ uri: episode.coverImage }} style={styles.compactCover}/>
        
        <react_native_1.View style={styles.compactInfo}>
          <react_native_1.Text style={styles.compactTitle} numberOfLines={1}>{episode.title}</react_native_1.Text>
          <react_native_1.Text style={styles.compactAuthor} numberOfLines={1}>{episode.author}</react_native_1.Text>
          <react_native_1.View style={styles.progressBar}>
            <react_native_1.View style={[styles.progress, { width: `${progressPercent}%` }]}/>
          </react_native_1.View>
        </react_native_1.View>
        
        <react_native_1.TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <vector_icons_1.Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={42} color="#2B95D6"/>
        </react_native_1.TouchableOpacity>
        
        {onClose && (<react_native_1.TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <vector_icons_1.Ionicons name="close" size={24} color="#666"/>
          </react_native_1.TouchableOpacity>)}
      </react_native_1.View>);
    }
    // 完整模式 - 类似播放器页面
    return (<react_native_1.View style={[styles.container, style]}>
      {onClose && (<react_native_1.TouchableOpacity onPress={onClose} style={styles.fullCloseButton}>
          <vector_icons_1.Ionicons name="chevron-down" size={28} color="#666"/>
        </react_native_1.TouchableOpacity>)}
      
      <react_native_1.Image source={{ uri: episode.coverImage }} style={styles.coverArt}/>
      
      <react_native_1.View style={styles.info}>
        <react_native_1.Text style={styles.title}>{episode.title}</react_native_1.Text>
        <react_native_1.Text style={styles.author}>{episode.author}</react_native_1.Text>
      </react_native_1.View>
      
      <react_native_1.View style={styles.progressContainer}>
        <react_native_1.View style={styles.sliderContainer}>
          <react_native_1.View style={styles.progressTrack}>
            <react_native_1.View style={[styles.progressFill, { width: `${progressPercent}%` }]}/>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.timeInfo}>
          <react_native_1.Text style={styles.timeText}>{formatTime(progress)}</react_native_1.Text>
          <react_native_1.Text style={styles.timeText}>{formatTime(duration)}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.View style={styles.controls}>
        <react_native_1.TouchableOpacity>
          <vector_icons_1.Ionicons name="play-skip-back" size={32} color="#666"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={togglePlayPause} style={styles.playButton}>
          <vector_icons_1.Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={64} color="#2B95D6"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity>
          <vector_icons_1.Ionicons name="play-skip-forward" size={32} color="#666"/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
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
exports.default = EpisodePlayer;
