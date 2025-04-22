# React Native Audio Player Kit 示例项目

这个示例项目展示了如何使用 React Native Audio Player Kit 库来实现音频播放功能。

## 环境要求

- Node.js (推荐 16.x 或更高版本)
- npm 或 yarn 包管理器
- Expo CLI
- iOS/Android 模拟器或实体设备

## 安装步骤

1. 首先安装依赖：

```bash
cd example
npm install
# 或使用 yarn
# yarn install
```

2. 链接主库（如果需要本地开发）：

```bash
# 在项目根目录
npm install
npm run build

# 在示例目录中链接本地库
cd example
npm link ../
# 或使用 yarn
# yarn link ../
```

## 运行示例项目

```bash
# 启动 Expo 开发服务器
npm start
# 或使用 yarn
# yarn start
```

然后，你可以选择：
- 按 `i` 启动 iOS 模拟器
- 按 `a` 启动 Android 模拟器
- 使用 Expo Go 应用扫描终端中显示的二维码在实体设备上运行

## 示例项目功能

此示例展示了以下功能：
- 基本音频播放控制（播放/暂停/停止）
- 播放进度条和时间显示
- 音量控制
- 播放列表管理

## 故障排除

如遇问题，请尝试以下步骤：
1. 删除 `node_modules` 文件夹并重新安装依赖
2. 确保已安装最新版本的 Expo CLI
3. 检查是否已经正确链接了主库

# React Native Audio Player Kit Example Project

This example project demonstrates how to use the React Native Audio Player Kit library to implement audio playback functionality.

## Requirements

- Node.js (16.x or higher recommended)
- npm or yarn package manager
- Expo CLI
- iOS/Android simulator or physical device

## Installation

1. First install dependencies:

```bash
cd example
npm install
# or use yarn
# yarn install
```

2. Link the main library (if needed for local development):

```bash
# In the project root directory
npm install
npm run build

# Link the local library in the example directory
cd example
npm link ../
# or use yarn
# yarn link ../
```

## Running the Example

```bash
# Start the Expo development server
npm start
# or use yarn
# yarn start
```

Then you can choose to:
- Press `i` to launch iOS simulator
- Press `a` to launch Android simulator
- Scan the QR code with Expo Go app to run on a physical device

## Example Features

This example showcases the following features:
- Basic audio playback controls (play/pause/stop)
- Playback progress bar and time display
- Volume control
- Playlist management

## Troubleshooting

If you encounter issues, try the following steps:
1. Delete the `node_modules` folder and reinstall dependencies
2. Ensure you have the latest version of Expo CLI installed
3. Check if you have properly linked the main library 