# 開発者向け情報

## 🏗️ プロジェクト構造

```
PomodoBar/
├── src/
│   ├── main/           # Electronメインプロセス
│   │   └── index.ts    # システムトレイとタイマーロジック
│   ├── preload/        # プリロードスクリプト
│   └── renderer/       # レンダラープロセス (Vue.js)
├── build/              # ビルド用アセット
├── resources/          # アプリケーションリソース
└── dist/               # ビルド出力 (自動生成)
```

## 📝 コーディング規約

- **TypeScript**: 厳密な型定義を使用
- **ESLint**: 設定されたルールに従う
- **Prettier**: 自動整形を適用

## 🐛 トラブルシューティング

### よくある問題

1. **アプリが起動しない**
   - `npm install`で依存関係を再インストール
   - Node.jsのバージョンを確認

2. **ビルドエラー**
   - `npm run typecheck`で型エラーを確認
   - `npm run lint`でESLintエラーを修正
