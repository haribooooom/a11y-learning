import type { Theme } from "../types"

export const themes: Theme[] = [
  {
    id: "form-labels",
    title: "フォームとラベル",
    uiPattern: "フォーム",
    summary: "入力欄には必ずラベルを明示的に関連付ける",
    whyItMatters:
      "スクリーンリーダーユーザーはラベルがないと何を入力すべきか分からない。音声入力ユーザーも操作できない。",
    designerScope:
      "全入力欄にラベルテキストを配置しているか確認。placeholderをラベルの代わりにしていないか。",
    engineerScope:
      "label要素のfor属性とinputのidが一致しているか。aria-labelまたはaria-labelledbyが適切に設定されているか。",
    relatedWcag: ["1.3.1", "3.3.2"],
  },
  {
    id: "contrast",
    title: "コントラスト",
    uiPattern: "テキスト",
    summary: "テキストと背景のコントラスト比はWCAG AA基準以上にする",
    whyItMatters:
      "低コントラストは弱視・老眼・明るい屋外環境のユーザー全員に読みにくい。",
    designerScope:
      "デザインツールのコントラストチェックで全テキストが4.5:1以上（大文字・太字は3:1以上）か確認。",
    engineerScope:
      "実装後にブラウザのアクセシビリティツールやaxeで自動検出。動的に変わるテキスト色も対象。",
    relatedWcag: ["1.4.3"],
  },
  {
    id: "focus",
    title: "フォーカス表示",
    uiPattern: "インタラクション",
    summary: "キーボード操作時のフォーカス位置を視覚的に明確に示す",
    whyItMatters:
      "フォーカスリングがないとキーボードユーザーが現在位置を把握できず、画面の全操作ができなくなる。",
    designerScope:
      "フォーカス状態のデザインを全インタラクティブ要素に定義する。outline: noneを安易に削除しない。",
    engineerScope:
      ":focus-visibleを使ってキーボードフォーカスのみにスタイルを当てる。カスタムスタイルがデフォルトより視認性を下げていないか確認。",
    relatedWcag: ["2.4.7", "2.4.11"],
  },
]
