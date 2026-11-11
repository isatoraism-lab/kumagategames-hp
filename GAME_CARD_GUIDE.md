# ゲームカード更新マニュアル

## ゲームを変える時
`games-config.js` の該当カード1行を更新してください。固定のカード枠・左上ステータス・文字配置・配色は自動適用され、`styles.css` と `index.html` を触る必要はありません。

## ロゴ制作基準
- 推奨サイズ：**1200 × 675 px（16:9）**。PNG（透過可）またはWebP。
- ロゴ全体を中央の安全領域 **横80% × 縦70%** 以内に配置。過大な余白はなるべく作らない。
- 画像は `assets/` にアップロードし、設定の `image` をそのファイル名へ変更。
- `logoScale:1` が基準。旧ロゴの余白が大きい場合は `logoScale:1.2` 等で調整。許容範囲0.5〜3.0。
- `scene:'axisbay'` は明るい背景、`scene:'rust'` は暗い背景、`scene:'request'` は紫系。

## 状態ラベル（左上で統一）
| 設定値 | 表示 | 色 |
|---|---|---|
| maintenance | メンテナンス中 | 赤 |
| building | 作成中 | オレンジ |
| active | 開催中 | 緑 |
| planning | 企画中 | 紫 |
| preparing | 準備中 | 青 |
| recruiting | 募集中 | 金色 |
| ended | 終了 | 灰 |

## 設定例
`{title:'新ゲーム',subtitle:'Season 1',status:'preparing',image:'assets/new-logo.webp',alt:'新ゲームのロゴ',scene:'axisbay',logoScale:1}`

注意：長いゲーム名は小さい画面で改行されることがあります。名称は15文字程度以内が推奨です。
## 既存の正方形ロゴについて
`trimBackground:true` と `background:'#ffffff'` または `background:'#000000'` を指定すると、背景余白を自動検出して16:9の統一背景に収めます。ラベルは画像の左上に重なり、ゲーム名や背景色との不一致を避けます。新規ロゴは推奨1200×675pxで作り、通常は `trimBackground` を省略してください。

## 2026-11-12表示方式更新
ロゴは読み込み後にブラウザー上で加工しません。カード背景と一体化した16:9画像（推奨1200×675px、背景色はカードと同じ白または黒）を事前に用意し、`games-config.js` の `image` に指定してください。`logoScale` と `trimBackground` のランタイム画像加工は廃止しました。左上バッジはHTML/CSSで表示し、ステータス色は共通定義を維持します。
