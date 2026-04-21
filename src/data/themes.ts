import type { Theme } from "../types"

export const themes: Theme[] = [
  {
    id: "real-world",
    title: "実例から学ぶ",
    uiPattern: "サービスサイト",
    summary: "実際のサービスサイトでよく見つかる問題を題材に学ぶ",
    whyItMatters:
      "教科書的な知識だけでなく、実際のプロダクトで起きがちな問題を知ることで、レビュー・実装の精度が上がる。",
    designerScope:
      "ロゴリンクのalt、スキップナビ、リンクテキストの明確さなど、デザイン段階で決定できる項目が多い。",
    engineerScope:
      "SPAでのフォーカス管理、背景画像アイコンのaria-label、lang属性など、実装時に見落としやすいポイントを押さえる。",
    relatedWcag: ["1.1.1", "2.4.1", "2.4.3", "2.4.4", "3.1.1", "4.1.2"],
  },
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
  {
    id: "alt-text",
    title: "画像のalt属性",
    uiPattern: "画像・メディア",
    summary: "画像には目的に応じたテキスト代替を必ず提供する",
    whyItMatters:
      "スクリーンリーダーユーザーは画像の内容をaltから得る。altがないと情報が完全に失われる。",
    designerScope:
      "画像が「情報を伝えるか」「装飾か」「リンクか」を仕様書に明記する。altの内容もデザイナーが指定する。",
    engineerScope:
      "装飾画像はalt=\"\"を指定。リンク内の画像はリンク先をaltで説明。複雑な図にはaria-describedbyで詳細説明を追加。",
    relatedWcag: ["1.1.1"],
  },
  {
    id: "keyboard",
    title: "キーボード操作",
    uiPattern: "インタラクション",
    summary: "すべての機能をキーボードだけで操作できるようにする",
    whyItMatters:
      "運動障害・視覚障害のあるユーザーはマウスを使えない。キーボード操作できないと画面全体が利用不能になる。",
    designerScope:
      "インタラクティブ要素のフォーカス順序・キーボード操作仕様を設計する。ドラッグ操作には代替手段を設ける。",
    engineerScope:
      "divやspanでなくbutton・a・inputなどネイティブ要素を使う。カスタムコンポーネントにはrole・tabindex・キーイベントを実装する。",
    relatedWcag: ["2.1.1", "2.1.2"],
  },
  {
    id: "page-structure",
    title: "ページ構造・見出し",
    uiPattern: "ページレイアウト",
    summary: "見出し・ランドマーク・ページタイトルで構造を明示する",
    whyItMatters:
      "スクリーンリーダーユーザーは見出しジャンプやランドマーク移動でページをナビゲートする。構造がないと全文読み上げるしかない。",
    designerScope:
      "見出し階層をデザイン段階で設計する。h1〜h6のレベルをスキップしない。",
    engineerScope:
      "mainやnav・headerなどランドマーク要素を使う。SPAでのページ遷移時にtitle要素を更新する。",
    relatedWcag: ["2.4.1", "2.4.2", "2.4.6", "1.3.1"],
  },
  {
    id: "error-handling",
    title: "エラー処理",
    uiPattern: "フォーム・フィードバック",
    summary: "エラーは分かりやすく特定・説明・修正提案をセットで伝える",
    whyItMatters:
      "エラーが色だけで伝えられると色覚障害者・スクリーンリーダーユーザーには伝わらない。修正方法が不明だと認知障害のあるユーザーが詰まる。",
    designerScope:
      "エラー状態のデザインを色以外の手段（アイコン・テキスト）で表現する。エラーメッセージは具体的に書く。",
    engineerScope:
      "aria-invalidとaria-describedbyでエラーとフィールドを関連付ける。エラーメッセージはaria-liveで動的に通知する。",
    relatedWcag: ["3.3.1", "3.3.2", "3.3.3"],
  },
  {
    id: "links",
    title: "リンクの目的",
    uiPattern: "ナビゲーション",
    summary: "リンクテキストだけで遷移先・目的が分かるようにする",
    whyItMatters:
      "スクリーンリーダーはリンク一覧でナビゲートする。「こちら」「詳細」だらけだとどのリンクが何かまったく分からない。",
    designerScope:
      "「詳細はこちら」「もっと見る」ではなく遷移先が伝わるラベルを使う。同じ遷移先には同じテキストを使う。",
    engineerScope:
      "リンクが画像のみの場合はaltで説明。同じテキストのリンクが複数あるときはaria-labelで区別する。",
    relatedWcag: ["2.4.4", "2.4.9"],
  },
]
