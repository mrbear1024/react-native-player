# React Native Audio Player Kit

一个功能完整的 React Native 音频播放器组件库，提供了现代化的 UI 和便捷的 API。

## 特点

- 🎵 完整的音频播放系统，包括迷你播放器和全屏播放器
- 📱 自适应布局，适用于各种屏幕尺寸
- 🔄 支持播放列表管理
- 🎨 多种播放器样式（完整模式和紧凑模式）
- 🛠️ 易于集成到现有项目中
- 📦 与 Expo 和纯 React Native 项目兼容

## 安装

```bash
# 使用 npm
npm install react-native-audio-player-kit expo-av

# 使用 yarn
yarn add react-native-audio-player-kit expo-av
```

## 快速开始

### 基本用法

最简单的用法是使用 `AudioPlayerSystem` 包装您的应用：

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { AudioPlayerSystem } from 'react-native-audio-player-kit';

export default function App() {
  return (
    <AudioPlayerSystem>
      {/* 您的应用内容 */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>您的应用内容</Text>
      </View>
    </AudioPlayerSystem>
  );
}
```

### 播放音频

```jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { usePlayer } from 'react-native-audio-player-kit';

export default function MyComponent() {
  const { setCurrentEpisode } = usePlayer();
  
  const handlePlay = () => {
    // 播放一个音频
    setCurrentEpisode({
      id: '1',
      title: '示例音频',
      author: '示例作者',
      coverImage: 'https://example.com/cover.jpg',
      audioUrl: 'https://example.com/audio.mp3',
    });
  };
  
  return (
    <TouchableOpacity onPress={handlePlay}>
      <Text>播放音频</Text>
    </TouchableOpacity>
  );
}
```

### 使用独立播放器

```jsx
import React from 'react';
import { View } from 'react-native';
import { EpisodePlayer, PlayerProvider } from 'react-native-audio-player-kit';

export default function PlayerScreen() {
  const episode = {
    id: '1',
    title: '示例音频',
    author: '示例作者',
    coverImage: 'https://example.com/cover.jpg',
    audioUrl: 'https://example.com/audio.mp3',
  };
  
  return (
    <PlayerProvider>
      <View style={{ flex: 1 }}>
        <EpisodePlayer 
          episode={episode}
          onClose={() => console.log('播放器关闭')}
        />
      </View>
    </PlayerProvider>
  );
}
```

## 组件

### AudioPlayerSystem

全功能音频播放系统，包含状态管理和迷你播放器。

**属性**

| 属性名 | 类型 | 描述 | 默认值 |
|--------|------|---------|---------|
| `onNavigateToPlayer` | `() => void` | 打开播放器页面的回调函数 | `() => {}` |
| `miniPlayerBottom` | `number` | 迷你播放器距离底部的距离（像素） | `83` |
| `initialEpisodes` | `Episode[]` | 初始播放列表 | `[]` |

### EpisodePlayer

独立的音频播放器组件，可以完整模式或紧凑模式显示。

**属性**

| 属性名 | 类型 | 描述 | 默认值 |
|--------|------|---------|---------|
| `episode` | `Episode` | 要播放的音频项 | **必填** |
| `onClose` | `() => void` | 关闭播放器的回调函数 | - |
| `compact` | `boolean` | 是否使用紧凑模式 | `false` |
| `style` | `ViewStyle` | 自定义样式 | `{}` |

### MiniPlayer

底部迷你播放器组件。

**属性**

| 属性名 | 类型 | 描述 | 默认值 |
|--------|------|---------|---------|
| `onOpenPlayer` | `() => void` | 打开全屏播放器的回调函数 | **必填** |
| `style` | `ViewStyle` | 自定义样式 | `{}` |

### PlayerProvider

音频播放状态的提供者组件。

**属性**

| 属性名 | 类型 | 描述 | 默认值 |
|--------|------|---------|---------|
| `initialEpisodes` | `Episode[]` | 初始播放列表 | `[]` |

## Hooks

### usePlayer

访问和控制播放状态的钩子。

```jsx
const { 
  currentEpisode,   // 当前播放的音频
  isPlaying,        // 是否正在播放
  playlist,         // 播放列表
  progress,         // 当前播放进度（秒）
  duration,         // 总时长（秒）
  setCurrentEpisode, // 设置当前播放音频
  togglePlayPause,  // 切换播放/暂停
  playNextEpisode,  // 播放下一项
  playPreviousEpisode, // 播放上一项
  seekTo,           // 跳转到指定位置
} = usePlayer();
```

## 例子

查看 `example` 目录中的示例应用，了解更多用法。

## 许可证

MIT 