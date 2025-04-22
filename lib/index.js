"use strict";
/**
 * React Native Audio Player Kit
 * A complete audio player solution for React Native applications
 */
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePlayer = exports.PlayerProvider = exports.EpisodePlayer = exports.MiniPlayer = exports.AudioPlayerSystem = void 0;
// 导出组件
var AudioPlayerSystem_1 = require("./components/AudioPlayerSystem");
Object.defineProperty(exports, "AudioPlayerSystem", { enumerable: true, get: function () { return __importDefault(AudioPlayerSystem_1).default; } });
var MiniPlayer_1 = require("./components/MiniPlayer");
Object.defineProperty(exports, "MiniPlayer", { enumerable: true, get: function () { return __importDefault(MiniPlayer_1).default; } });
var EpisodePlayer_1 = require("./components/EpisodePlayer");
Object.defineProperty(exports, "EpisodePlayer", { enumerable: true, get: function () { return __importDefault(EpisodePlayer_1).default; } });
// 导出上下文和钩子
var PlayerContext_1 = require("./contexts/PlayerContext");
Object.defineProperty(exports, "PlayerProvider", { enumerable: true, get: function () { return PlayerContext_1.PlayerProvider; } });
Object.defineProperty(exports, "usePlayer", { enumerable: true, get: function () { return PlayerContext_1.usePlayer; } });
// 导出类型定义
__exportStar(require("./types"), exports);
