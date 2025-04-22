# React Native Audio Player Kit

A full-featured React Native audio player component library with modern UI and convenient APIs.

## Features

- 🎵 Complete audio playback system with mini player and full-screen player
- 📱 Responsive layout for all screen sizes
- 🔄 Playlist management support
- 🎨 Multiple player styles (full mode and compact mode)
- 🛠️ Easy integration with existing projects
- 📦 Compatible with both Expo and bare React Native projects

## Installation

```bash
# Using npm
npm install react-native-audio-player-kit expo-av

# Using yarn
yarn add react-native-audio-player-kit expo-av
```

## Quick Start

### Basic Usage

The simplest way is to wrap your app with `AudioPlayerSystem`:

```jsx
import React from 'react';
import { View, Text } from 'react-native';
import { AudioPlayerSystem } from 'react-native-audio-player-kit';

export default function App() {
  return (
    <AudioPlayerSystem>
      {/* Your app content */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Your App Content</Text>
      </View>
    </AudioPlayerSystem>
  );
}
```

### Playing Audio

```jsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { usePlayer } from 'react-native-audio-player-kit';

export default function MyComponent() {
  const { setCurrentEpisode } = usePlayer();
  
  const handlePlay = () => {
    setCurrentEpisode({
      id: '1',
      title: 'Sample Audio',
      author: 'Sample Author',
      coverImage: 'https://example.com/cover.jpg',
      audioUrl: 'https://example.com/audio.mp3',
    });
  };
  
  return (
    <TouchableOpacity onPress={handlePlay}>
      <Text>Play Audio</Text>
    </TouchableOpacity>
  );
}
```

### Using the Mini Player

The mini player is automatically shown when audio is playing. Here's how to customize it:

```jsx
import React from 'react';
import { View } from 'react-native';
import { AudioPlayerSystem } from 'react-native-audio-player-kit';

export default function App() {
  const handleOpenPlayer = () => {
    // Navigate to your full player screen
    navigation.navigate('Player');
  };

  return (
    <AudioPlayerSystem
      miniPlayerBottom={83} // Distance from bottom (default: 83)
      onNavigateToPlayer={handleOpenPlayer}
    >
      {/* Your app content */}
      <View style={{ flex: 1 }}>
        <Text>Your App Content</Text>
      </View>
    </AudioPlayerSystem>
  );
}
```

### Using the Full Player

```jsx
import React from 'react';
import { View } from 'react-native';
import { EpisodePlayer, PlayerProvider } from 'react-native-audio-player-kit';

export default function PlayerScreen() {
  const episode = {
    id: '1',
    title: 'Sample Audio',
    author: 'Sample Author',
    coverImage: 'https://example.com/cover.jpg',
    audioUrl: 'https://example.com/audio.mp3',
  };
  
  return (
    <PlayerProvider>
      <View style={{ flex: 1 }}>
        <EpisodePlayer 
          episode={episode}
          onClose={() => navigation.goBack()}
        />
      </View>
    </PlayerProvider>
  );
}
```

### Complete Example with Navigation

Here's a complete example using React Navigation:

```jsx
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AudioPlayerSystem } from 'react-native-audio-player-kit';
import HomeScreen from './screens/HomeScreen';
import PlayerScreen from './screens/PlayerScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AudioPlayerSystem>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="Player" 
            component={PlayerScreen}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AudioPlayerSystem>
  );
}

// screens/HomeScreen.js
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { usePlayer } from 'react-native-audio-player-kit';

export default function HomeScreen({ navigation }) {
  const { setCurrentEpisode } = usePlayer();

  const handlePlayAudio = () => {
    setCurrentEpisode({
      id: '1',
      title: 'Sample Audio',
      author: 'Sample Author',
      coverImage: 'https://example.com/cover.jpg',
      audioUrl: 'https://example.com/audio.mp3',
    });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity 
        onPress={handlePlayAudio}
        style={{
          padding: 15,
          backgroundColor: '#007AFF',
          borderRadius: 8,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white' }}>Play Audio</Text>
      </TouchableOpacity>
    </View>
  );
}

// screens/PlayerScreen.js
import React from 'react';
import { View } from 'react-native';
import { EpisodePlayer } from 'react-native-audio-player-kit';

export default function PlayerScreen({ navigation }) {
  const { currentEpisode } = usePlayer();

  return (
    <View style={{ flex: 1 }}>
      <EpisodePlayer
        episode={currentEpisode}
        onClose={() => navigation.goBack()}
      />
    </View>
  );
}
```

### MiniPlayer Component

The MiniPlayer component is a compact audio player that appears at the bottom of the screen. It provides basic playback controls and information about the currently playing audio.

#### Basic Usage

```jsx
import React from 'react';
import { View } from 'react-native';
import { MiniPlayer, usePlayer } from 'react-native-audio-player-kit';

export default function App() {
  const { currentEpisode } = usePlayer();
  
  const handleOpenPlayer = () => {
    // Navigate to full player screen
    navigation.navigate('Player');
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Your app content */}
      <MiniPlayer onOpenPlayer={handleOpenPlayer} />
    </View>
  );
}
```

#### Customization

The MiniPlayer component can be customized with additional styles:

```jsx
<MiniPlayer 
  onOpenPlayer={handleOpenPlayer}
  style={{
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
  }}
/>
```

#### Features

- 🎵 Displays current episode information (title, author, cover image)
- ⏯️ Basic playback controls (play/pause, previous, next)
- 📊 Progress bar showing playback progress
- 🎨 Customizable appearance through style prop
- 👆 Touch interaction to open full player

#### Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `onOpenPlayer` | `() => void` | Callback when mini player is pressed | Required |
| `style` | `ViewStyle` | Custom styles for the container | `{}` |

#### Styling

The MiniPlayer component uses the following default styles:

```jsx
const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 12,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#eee',
    marginTop: 4,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#2B95D6',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButton: {
    marginHorizontal: 8,
  },
});
```

## API Reference

### AudioPlayerSystem Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `onNavigateToPlayer` | `() => void` | Callback when opening full player | `() => {}` |
| `miniPlayerBottom` | `number` | Distance from bottom (pixels) | `83` |
| `initialEpisodes` | `Episode[]` | Initial playlist | `[]` |

### EpisodePlayer Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `episode` | `Episode` | Audio episode to play | Required |
| `onClose` | `() => void` | Close player callback | Required |
| `compact` | `boolean` | Use compact mode | `false` |
| `style` | `ViewStyle` | Custom styles | `{}` |

### MiniPlayer Props

| Prop | Type | Description | Default |
|------|------|-------------|---------|
| `onOpenPlayer` | `() => void` | Open full player callback | Required |
| `style` | `ViewStyle` | Custom styles | `{}` |

### usePlayer Hook

```jsx
const { 
  currentEpisode,   // Current playing episode
  isPlaying,        // Playing status
  playlist,         // Playlist array
  progress,         // Current playback progress (seconds)
  duration,         // Total duration (seconds)
  setCurrentEpisode, // Set current episode
  togglePlayPause,  // Toggle play/pause
  playNextEpisode,  // Play next episode
  playPreviousEpisode, // Play previous episode
  seekTo,           // Seek to position
} = usePlayer();
```

### Episode Type

```typescript
interface Episode {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  audioUrl: string;
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT 