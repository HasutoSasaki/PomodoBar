# PomodoBar 🍅

シンプルなメニューバー/システムトレイ型ポモドーロタイマーアプリケーション

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-macOS%20%7C%20Windows%20%7C%20Linux-lightgrey.svg)

## ✨ 特徴

- **メニューバー常駐**: 画面を占有せず、メニューバーから残り時間を確認
- **シンプルな操作**: 右クリックでStart/Pause/Reset
- **自動切り替え**: 作業時間(25分) ↔ 休憩時間(5分)
- **通知機能**: タイマー終了時にシステム通知
- **クロスプラットフォーム**: macOS, Windows, Linux対応

## 🚀 クイックスタート

### インストール

```bash
npm install
```

### 開発実行

```bash
npm run dev
```

### ビルド

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux
```

## 📖 使い方

1. アプリを起動すると、メニューバー/システムトレイに🍅アイコンと残り時間が表示されます
2. アイコンを右クリックして「Start」でタイマー開始
3. 作業時間終了後、自動で休憩時間に切り替わります
4. 必要に応じて「Pause」「Reset」で操作可能

## 📚 詳細情報

- [開発者向け情報](./DEVELOPMENT.md)
- [技術仕様](./TECHNICAL.md)

## 📄 ライセンス

MIT License
