import type { Question } from "../types"

export const questions: Question[] = [
  // ── テーマ1: フォームとラベル ──────────────────────────────
  {
    id: "fl-1",
    themeId: "form-labels",
    type: "multiple_choice",
    question:
      "フォームのinput要素にplaceholderのみを使ってラベルを省略した場合、どのような問題が起きますか？",
    choices: [
      "見た目が崩れる",
      "入力中にラベルが消え、何を入力すべきかわからなくなる",
      "フォームが送信できなくなる",
      "スタイルが適用されなくなる",
    ],
    answer: 1,
    explanation:
      "placeholderは入力開始と同時に消えるため、入力中に何を入力すべきか確認できなくなります。特に認知障害のあるユーザーや、複数項目があるフォームで混乱が生じます。label要素で明示的に関連付けることが必要です（WCAG 3.3.2）。",
  },
  {
    id: "fl-2",
    themeId: "form-labels",
    type: "ui_review_mock",
    question:
      "この画面のフォームで、アクセシビリティ上の問題はどれですか？",
    choices: [
      "ボタンのテキストが短すぎる",
      "入力欄にラベルが関連付けられていない",
      "フォントサイズが小さすぎる",
      "送信ボタンの色が問題",
    ],
    answer: 1,
    explanation:
      "label要素によるinputとの関連付けがありません。placeholderはスクリーンリーダーによって読み上げられないことがあり、入力中に消えるため認知負荷も上がります。label要素とfor/id属性で関連付けることが必要です。",
    mockComponent: "MockBadForm",
  },
  {
    id: "fl-3",
    themeId: "form-labels",
    type: "fix_selection",
    question:
      "フォームのラベル問題を修正する方法として、最も適切なものはどれですか？",
    choices: [
      "placeholderのテキストを詳しくする",
      "input要素にaria-label属性を追加する",
      "label要素をinputと明示的に関連付ける",
      "inputの上にdivでテキストを置く",
    ],
    answer: 2,
    explanation:
      "label要素のfor属性とinputのidを対応させることが最も確実です。aria-labelは視覚的なラベルを表示できないケース（アイコンボタン等）向けの代替手段です。divはDOMの近接関係をスクリーンリーダーは認識しません。",
  },

  // ── テーマ2: コントラスト ────────────────────────────────
  {
    id: "ct-1",
    themeId: "contrast",
    type: "multiple_choice",
    question:
      "WCAG 2.2 のAAレベルで、通常サイズのテキストに求められる最低コントラスト比はいくつですか？",
    choices: ["3.0:1", "4.5:1", "5.0:1", "7.0:1"],
    answer: 1,
    explanation:
      "AAレベルでは通常テキスト（18pt未満・14pt未満の太字）に4.5:1以上が必要です。大きなテキスト（18pt以上または14pt以上の太字）は3.0:1で可。低コントラストは弱視・高齢者・明るい屋外での閲覧者に影響します。",
  },
  {
    id: "ct-2",
    themeId: "contrast",
    type: "ui_review_komaru",
    question:
      "このページで、コントラスト不足が発生している箇所はどれですか？",
    choices: [
      "ヘッダーのロゴ画像",
      "CO₂カウンターの数値テキスト",
      "グローバルナビゲーション",
      "フッターのリンク",
    ],
    answer: 1,
    explanation:
      "CO₂カウンター部分のテキストは背景とのコントラスト比が4.5:1を下回っています。弱視のユーザーや屋外での閲覧時に情報が読み取れなくなります（WCAG 1.4.3）。",
    komaruUrl:
      "https://a11yc.com/city-komaru/practice/?criteria=1.4.3a_ng",
    komaruFallbackNote:
      "CO₂カウンター部分のテキストと背景のコントラストが不十分で、視認性が低い状態のページです。",
  },
  {
    id: "ct-3",
    themeId: "contrast",
    type: "fix_selection",
    question:
      "コントラスト不足の修正方法として、最も適切なものはどれですか？",
    choices: [
      "フォントサイズを大きくする",
      "テキストに影をつける",
      "テキスト色または背景色を変更してコントラスト比4.5:1以上を確保する",
      "テキストを太字にする",
    ],
    answer: 2,
    explanation:
      "根本的な解決はコントラスト比を満たす色の組み合わせに変更することです。フォントサイズを18pt以上にすれば基準が3:1に緩和されますが、デザイン変更を伴うため色の調整が現実的です。",
  },

  // ── テーマ3: フォーカス表示 ──────────────────────────────
  {
    id: "fc-1",
    themeId: "focus",
    type: "multiple_choice",
    question:
      "CSS で outline: none を指定することで生じる問題は何ですか？",
    choices: [
      "クリックイベントが発火しなくなる",
      "キーボード操作時にフォーカス位置がわからなくなる",
      "スクリーンリーダーが要素を読み上げなくなる",
      "マウス操作ができなくなる",
    ],
    answer: 1,
    explanation:
      "outline: noneはブラウザデフォルトのフォーカスリングを消します。キーボードのみで操作するユーザー（運動障害・視覚障害）は現在どこにフォーカスがあるか把握できなくなります（WCAG 2.4.7）。代替となるカスタムフォーカススタイルを必ず設定してください。",
  },
  {
    id: "fc-2",
    themeId: "focus",
    type: "ui_review_mock",
    question:
      "この画面でキーボード操作をしたとき、何が問題になりますか？",
    choices: [
      "ボタンが3つしかない",
      "Tabキーで移動してもどのボタンにフォーカスがあるか見えない",
      "ボタンのテキストが短すぎる",
      "ボタンの色が区別できない",
    ],
    answer: 1,
    explanation:
      "outline: noneでデフォルトフォーカスリングが消去されており、キーボードユーザーが現在どの要素にいるか把握できません。全キーボード操作ユーザー（運動障害者・上級キーボードユーザー等）に影響します。",
    mockComponent: "MockBadFocus",
  },
  {
    id: "fc-3",
    themeId: "focus",
    type: "ui_review_komaru",
    question:
      "このページでフォーカスに関して問題のある実装はどれですか？",
    choices: [
      "リンクの色が薄い",
      "フォーカス時のアウトラインが表示されない",
      "ページタイトルがない",
      "画像にaltがない",
    ],
    answer: 1,
    explanation:
      "このページではリンクやボタンにフォーカスしてもアウトラインが表示されません（outline削除）。キーボードで操作するユーザーは現在地を視覚的に把握できず、ページの利用が困難になります（WCAG 2.4.7）。",
    komaruUrl:
      "https://a11yc.com/city-komaru/practice/?criteria=2.4.7a_ng3",
    komaruFallbackNote:
      "フォーカスアウトラインが削除されており、Tabキーで移動してもフォーカス位置が視覚的に確認できない状態のページです。",
  },
]
