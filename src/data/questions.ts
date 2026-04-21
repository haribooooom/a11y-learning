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

  // ── テーマ4: 画像のalt属性 ──────────────────────────────────
  {
    id: "alt-1",
    themeId: "alt-text",
    type: "multiple_choice",
    question: "装飾目的のみの画像に設定すべきalt属性の値はどれですか？",
    choices: [
      'alt="装飾"',
      'alt=""（空文字）',
      "alt属性を省略する",
      'alt="画像"',
    ],
    answer: 1,
    explanation:
      'alt=""を指定するとスクリーンリーダーが画像をスキップします。省略するとファイル名が読み上げられる場合があります。装飾画像には空のaltを明示的に指定することがベストプラクティスです（WCAG 1.1.1）。',
  },
  {
    id: "alt-2",
    themeId: "alt-text",
    type: "multiple_choice",
    question: "リンクになっているアイコン画像のaltに書くべき内容はどれですか？",
    choices: [
      "アイコンの見た目の説明（例：「虫眼鏡のアイコン」）",
      "リンク先・機能の説明（例：「サイト内検索」）",
      "画像のファイル名",
      'alt=""（空文字）',
    ],
    answer: 1,
    explanation:
      "リンク内の唯一の要素が画像の場合、altはリンク先や目的を説明します。外見の説明ではなく「何ができるか」を書くことで、スクリーンリーダーユーザーがリンクの目的を把握できます（WCAG 1.1.1）。",
  },
  {
    id: "alt-3",
    themeId: "alt-text",
    type: "ui_review_komaru",
    question: "このページで、非テキストコンテンツに関する問題はどれですか？",
    choices: [
      "画像のサイズが大きすぎる",
      "画像にalt属性がなく、内容がスクリーンリーダーに伝わらない",
      "画像の色数が多すぎる",
      "画像がJPEG形式ではない",
    ],
    answer: 1,
    explanation:
      "alt属性がない画像はスクリーンリーダーがファイル名やURLを読み上げることがあり、意味のある情報を伝えられません。情報を持つすべての画像に適切なaltが必要です（WCAG 1.1.1）。",
    komaruUrl: "https://a11yc.com/city-komaru/practice/?criteria=1.1.1a_ng",
    komaruFallbackNote:
      "意味のある画像にalt属性が設定されておらず、スクリーンリーダーで内容が伝わらない状態のページです。",
  },
  {
    id: "alt-4",
    themeId: "alt-text",
    type: "fix_selection",
    question: "グラフ画像に対して最もアクセシブルな実装はどれですか？",
    choices: [
      'alt="グラフ"だけ指定する',
      "グラフ画像を削除してテキストだけにする",
      'alt="月別売上グラフ"と、aria-describedbyで詳細な説明テキストを関連付ける',
      "グラフをSVGに差し替える",
    ],
    answer: 2,
    explanation:
      "短いaltで概要を伝えつつ、aria-describedbyで詳細データ（表など）を関連付けることで、スクリーンリーダーユーザーもグラフの内容を把握できます。複雑な図には詳細説明の提供が必要です（WCAG 1.1.1）。",
  },

  // ── テーマ5: キーボード操作 ──────────────────────────────────
  {
    id: "kb-1",
    themeId: "keyboard",
    type: "multiple_choice",
    question: "ドラッグ&ドロップ機能を実装するとき、WCAG 2.1.1を満たすには何が必要ですか？",
    choices: [
      "ドラッグ速度を遅くする",
      "ドラッグ操作をキーボードでも代替できる操作手段を提供する",
      "ドラッグ&ドロップを無効にする",
      "マウスホイールでも操作できるようにする",
    ],
    answer: 1,
    explanation:
      "ドラッグ&ドロップ自体を廃止する必要はありませんが、同等の機能（並び替えボタン等）をキーボードでも操作できるようにする必要があります。運動障害によりマウスを使えないユーザーに影響します（WCAG 2.1.1）。",
  },
  {
    id: "kb-2",
    themeId: "keyboard",
    type: "multiple_choice",
    question: "Tabキーでナビゲートしていたとき、モーダルの中からどうしても外に出られなくなった。これはどの問題ですか？",
    choices: [
      "フォーカス順序の問題（WCAG 2.4.3）",
      "キーボードトラップ（WCAG 2.1.2）",
      "コントラスト不足（WCAG 1.4.3）",
      "ページタイトル不足（WCAG 2.4.2）",
    ],
    answer: 1,
    explanation:
      "キーボードトラップとは、フォーカスがコンポーネント内に閉じ込められ外に移動できない状態です。モーダルではEscキーで閉じる・最後の要素からダイアログ外へ移動できる設計が必要です（WCAG 2.1.2）。",
  },
  {
    id: "kb-3",
    themeId: "keyboard",
    type: "ui_review_mock",
    question: "この画面でキーボード操作をしたとき、何が問題になりますか？",
    choices: [
      "ボタンが3つしかない",
      "Tabキーで移動してもどのボタンにフォーカスがあるか見えない",
      "ボタンのテキストが短すぎる",
      "ボタンの色が区別できない",
    ],
    answer: 1,
    explanation:
      "フォーカスリングが消されているため、キーボードユーザーは現在どのボタンを選択しているか視覚的に分かりません。:focus-visibleで明確なフォーカススタイルを定義する必要があります（WCAG 2.4.7）。",
    mockComponent: "MockBadFocus",
  },
  {
    id: "kb-4",
    themeId: "keyboard",
    type: "fix_selection",
    question: "クリック可能なdiv要素をキーボード対応にする最も適切な方法はどれですか？",
    choices: [
      "divにonClickだけ追加する",
      "divにtabindex=\"0\"とonKeyDown（Enter/Space）を追加し、role=\"button\"を設定する",
      "divをspanに変更する",
      "divにautofocus属性を追加する",
    ],
    answer: 1,
    explanation:
      "divはデフォルトでフォーカスを受け取れず、Enterキーも反応しません。tabindex・role・キーイベントをすべて揃える必要がありますが、最初からbutton要素を使う方がより確実で保守しやすいです（WCAG 4.1.2）。",
  },

  // ── テーマ6: ページ構造・見出し ────────────────────────────
  {
    id: "ps-1",
    themeId: "page-structure",
    type: "multiple_choice",
    question: "スクリーンリーダーユーザーがページ内を素早くナビゲートするために最もよく使う機能はどれですか？",
    choices: [
      "Tabキーでリンクを順番に移動する",
      "見出しジャンプキーで目的のセクションに直接移動する",
      "ページ全体を最初から最後まで読み上げる",
      "マウスで要素をクリックする",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーには見出しジャンプ（Hキー等）機能があり、h1〜h6を目次のように使ってナビゲートします。見出しが正しく設定されていないと、先頭から全文を聴くしかなくなります（WCAG 2.4.6）。",
  },
  {
    id: "ps-2",
    themeId: "page-structure",
    type: "multiple_choice",
    question: "SPAでページ遷移したときにtitle要素を更新しない場合の問題はどれですか？",
    choices: [
      "URLが変更されない",
      "スクリーンリーダーユーザーがページが変わったことを認識できない",
      "ブラウザの戻るボタンが動作しなくなる",
      "CSSが再読み込みされない",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーはページロード時にtitle要素を読み上げて現在地を伝えます。SPAで遷移後もtitleが変わらないと「同じページにいる」と誤認してしまいます（WCAG 2.4.2）。",
  },
  {
    id: "ps-3",
    themeId: "page-structure",
    type: "ui_review_komaru",
    question: "このページで、ページ構造に関する問題はどれですか？",
    choices: [
      "フォントサイズが統一されていない",
      "見出し要素が適切に使われておらず、スクリーンリーダーで構造を把握できない",
      "画像が多すぎる",
      "リンクの色が青でない",
    ],
    answer: 1,
    explanation:
      "見出し要素（h1〜h6）が使われていないか、装飾目的でdivにスタイルを当てているだけだと、スクリーンリーダーはページの構造を把握できず、ジャンプナビゲーションが機能しません（WCAG 2.4.6）。",
    komaruUrl: "https://a11yc.com/city-komaru/practice/?criteria=1.3.1a_ng",
    komaruFallbackNote:
      "見出し要素が正しく使われておらず、ページの情報構造がプログラムで解釈できない状態のページです。",
  },
  {
    id: "ps-4",
    themeId: "page-structure",
    type: "fix_selection",
    question: "繰り返しナビゲーションをスキップするために最も適切な実装はどれですか？",
    choices: [
      "ナビゲーションのリンク数を5以下にする",
      "ページ先頭に「メインコンテンツへスキップ」リンクを置き、最初のTabキー操作でフォーカスされるようにする",
      "ナビゲーションをdisplay: noneで非表示にする",
      "ナビゲーションのtabindexを-1にする",
    ],
    answer: 1,
    explanation:
      "スキップリンクをページ最初のフォーカス要素にすることで、キーボードユーザーは毎ページのナビゲーションを飛ばしてメインコンテンツに直接アクセスできます（WCAG 2.4.1）。",
  },

  // ── テーマ7: エラー処理 ────────────────────────────────────
  {
    id: "err-1",
    themeId: "error-handling",
    type: "multiple_choice",
    question: "フォームエラーを「赤い枠線」だけで示したとき、誰が最も影響を受けますか？",
    choices: [
      "マウスユーザー",
      "色覚障害者とスクリーンリーダーユーザー",
      "タッチスクリーンユーザー",
      "JavaScriptを無効にしているユーザー",
    ],
    answer: 1,
    explanation:
      "赤い枠線だけのエラー表示は、色覚障害者（赤緑色盲等）には判別できず、スクリーンリーダーユーザーにも読み上げられません。テキストでエラー内容を示すことが必要です（WCAG 3.3.1）。",
  },
  {
    id: "err-2",
    themeId: "error-handling",
    type: "multiple_choice",
    question: "フォーム送信後に表示される成功メッセージをスクリーンリーダーに通知するために使うARIA属性はどれですか？",
    choices: [
      "aria-hidden=\"true\"",
      "aria-live=\"polite\" または role=\"status\"",
      "aria-disabled=\"true\"",
      "aria-expanded=\"true\"",
    ],
    answer: 1,
    explanation:
      "aria-live=\"polite\"またはrole=\"status\"を使うと、フォーカスを移動しなくてもスクリーンリーダーが動的なコンテンツ変化を読み上げます。成功・エラー・ローディング完了など状態変化の通知に使います（WCAG 4.1.3）。",
  },
  {
    id: "err-3",
    themeId: "error-handling",
    type: "ui_review_komaru",
    question: "このページのフォームで、エラー処理に関する問題はどれですか？",
    choices: [
      "送信ボタンのサイズが小さい",
      "エラーが発生してもユーザーにどこが・何が間違っているか伝えられていない",
      "フォームのデザインが古い",
      "入力欄の数が多すぎる",
    ],
    answer: 1,
    explanation:
      "エラーが発生したとき、どのフィールドが・なぜ・どう直すかをテキストで明示しないと、認知障害や視覚障害のあるユーザーが問題を特定・修正できません（WCAG 3.3.1、3.3.3）。",
    komaruUrl: "https://a11yc.com/city-komaru/practice/?criteria=3.3.1a_ng",
    komaruFallbackNote:
      "フォームでエラーが発生しても、エラーの内容が適切にユーザーに伝えられていない状態のページです。",
  },
  {
    id: "err-4",
    themeId: "error-handling",
    type: "fix_selection",
    question: "メールアドレス欄のエラーメッセージとして最もアクセシブルな実装はどれですか？",
    choices: [
      "フィールドの枠を赤くして、エラーアイコンを表示する",
      '<span role="alert">メールアドレスの形式が正しくありません（例: name@example.com）</span>をフィールド直後に表示し、aria-describedbyで関連付ける',
      "エラーをページタイトルに表示する",
      "フィールドのplaceholderにエラー内容を書く",
    ],
    answer: 1,
    explanation:
      "role=\"alert\"で動的に挿入されたエラーはスクリーンリーダーが即座に読み上げます。aria-describedbyでフィールドと関連付けることで、フォーカス時にも説明が読み上げられます（WCAG 3.3.1、3.3.3）。",
  },

  // ── テーマ8: リンクの目的 ──────────────────────────────────
  {
    id: "lnk-1",
    themeId: "links",
    type: "multiple_choice",
    question: '複数の「詳細はこちら」リンクが並んでいる場合の主な問題はどれですか？',
    choices: [
      "リンクの色が統一されていない",
      "スクリーンリーダーのリンク一覧で全部同じ表示になり、どこへ飛ぶか区別できない",
      "リンクが多すぎてSEOに不利",
      "クリック領域が小さすぎる",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーはTabキーやリンク一覧でリンクをナビゲートします。「詳細はこちら」が複数あると区別できず、目的のリンクを探せません。リンク先が分かるテキストを使うか、aria-labelで補足します（WCAG 2.4.4）。",
  },
  {
    id: "lnk-2",
    themeId: "links",
    type: "multiple_choice",
    question: "新しいタブで開くリンクに必要なアクセシビリティ対応はどれですか？",
    choices: [
      "target=\"_blank\"を削除する",
      "リンクテキストか付近に「新しいタブで開く」と明示する",
      "リンクを赤色にする",
      "リンクにtabindex=\"0\"を追加する",
    ],
    answer: 1,
    explanation:
      "予告なく新しいタブが開くと、スクリーンリーダーユーザーや認知障害のあるユーザーが混乱します。リンクテキストかアイコン+aria-labelで「新しいタブで開く」ことを事前に伝えることが必要です（WCAG 3.2.2）。",
  },
  {
    id: "lnk-3",
    themeId: "links",
    type: "ui_review_komaru",
    question: "このページのリンクに関する問題はどれですか？",
    choices: [
      "リンクに下線がない",
      "リンクテキストが「こちら」「詳細」のみで、リンク先の目的が分からない",
      "リンクの数が多すぎる",
      "リンクが縦に並んでいる",
    ],
    answer: 1,
    explanation:
      "リンクテキストが「こちら」「詳細」だけだとコンテキストから切り離されたときに意味を失います。スクリーンリーダーのリンク一覧や音声認識での操作で特に問題になります（WCAG 2.4.4）。",
    komaruUrl: "https://a11yc.com/city-komaru/practice/?criteria=2.4.4a_ng",
    komaruFallbackNote:
      "リンクテキストが「こちら」などの非説明的なテキストのみで、リンクの目的が文脈なしでは分からない状態のページです。",
  },
  {
    id: "lnk-4",
    themeId: "links",
    type: "fix_selection",
    question: "「もっと読む」リンクが複数並ぶ場合の最も適切な対応はどれですか？",
    choices: [
      "すべてのリンクを「詳細」に統一する",
      "各リンクにaria-label=\"〇〇についてもっと読む\"を追加して、リンク先を区別できるようにする",
      "リンクを1つだけにする",
      "リンクテキストを長くする",
    ],
    answer: 1,
    explanation:
      "aria-labelでアクセシブルな名前を上書きすることで、見た目のテキストはシンプルに保ちながらスクリーンリーダーには区別できる名前を提供できます。ただし視覚ラベルとaria-labelは内容を一致させるよう注意します（WCAG 2.4.4）。",
  },

  // ── テーマ9: 実例から学ぶ ──────────────────────────────────
  {
    id: "rw-1",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "書籍要約サービスのトップページをキーボードで操作したところ、Tabキーを押すたびにヘッダーナビゲーションの全リンクを通過しないとメインコンテンツにたどり着けなかった。この問題を解決する最も適切な方法はどれですか？",
    choices: [
      "ナビゲーションのリンク数を減らす",
      "ページ先頭に「メインコンテンツへスキップ」リンクをfocus時に表示し、#main-contentへジャンプできるようにする",
      "ナビゲーションにaria-hidden=\"true\"を付けて読み上げをスキップする",
      "ナビゲーションをfooterに移動する",
    ],
    answer: 1,
    explanation:
      "スキップナビゲーションリンクをページ最初のフォーカス要素として配置することで、キーボードユーザーは毎ページのナビゲーションを飛ばしてメインコンテンツに直接アクセスできます。aria-hidden=\"true\"はスクリーンリーダーからも完全に隠してしまうため不適切です（WCAG 2.4.1）。",
  },
  {
    id: "rw-2",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "SNSのシェアボタンがCSSのbackground-imageでXのアイコンを表示しており、ボタンのテキストは空のまま実装されていた。スクリーンリーダーで確認すると「ボタン」とだけ読み上げられた。正しい修正方法はどれですか？",
    choices: [
      "background-imageにalt属性を追加する",
      "ボタン要素にaria-label=\"Xでシェア\"を追加する",
      "CSSクラスに説明を書く",
      "ボタンの隣にテキストリンクを別途追加する",
    ],
    answer: 1,
    explanation:
      "CSSのbackground-imageにはalt属性を設定できません。このケースではbutton要素にaria-labelでアクセシブルな名前を与えるのが正しい対応です。または<img alt=\"Xでシェア\">に変更する方法も有効です（WCAG 1.1.1、4.1.2）。",
  },
  {
    id: "rw-3",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "Reactで構築されたサービスサイトで、ページ内リンクをクリックするとURLは変わるがスクリーンリーダーが新しいページに来たことを認識できなかった。原因として最も可能性が高いのはどれですか？",
    choices: [
      "ReactのバージョンがSPAに対応していない",
      "ルート変更時にフォーカスが移動せず、document.titleも更新されていない",
      "サーバーサイドレンダリングが有効になっていない",
      "aria-live領域が多すぎる",
    ],
    answer: 1,
    explanation:
      "SPAでは画面遷移時にHTMLが再読み込みされないため、スクリーンリーダーへのページ変更通知が行われません。document.titleの更新と、<main>要素などへのfocus()呼び出しを組み合わせることで、遷移を伝えられます（WCAG 2.4.2、2.4.3）。",
  },
  {
    id: "rw-4",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "サービスサイトの書籍一覧ページには「もっと見る」ボタンが各書籍カードに設置されており、すべて同じテキストだった。スクリーンリーダーのリンク・ボタン一覧を表示したとき何が問題になりますか？",
    choices: [
      "ボタンの数が多すぎてページが重くなる",
      "すべて「もっと見る」と並ぶため、どのボタンがどの書籍に対応するか区別できない",
      "ボタンのデザインが統一されすぎている",
      "ボタンのフォントサイズが小さすぎる",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーユーザーはボタン・リンクの一覧を取り出してナビゲートします。同じテキストが並ぶと区別できません。各ボタンにaria-label=\"〇〇の要約をもっと見る\"と補足することで区別できるようになります（WCAG 2.4.4）。",
  },
  {
    id: "rw-5",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "日本語のサービスサイトで <html lang=\"en\"> のまま公開されていた。スクリーンリーダーユーザーにどんな問題が起きますか？",
    choices: [
      "ページの読み込みが遅くなる",
      "音声合成エンジンが英語の発音ルールで日本語テキストを読み上げ、内容が理解不能になる",
      "フォントが英語フォントに切り替わる",
      "CSSが適用されなくなる",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーはlang属性を見て音声合成エンジンの言語を切り替えます。lang=\"en\"のまま日本語を読み上げると、日本語テキストが英語音のまま読まれて聞き取れません。<html lang=\"ja\">を必ず設定してください（WCAG 3.1.1）。",
  },
  {
    id: "rw-6",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "サービスのトップページで <h1> がロゴと特集バナーの2箇所に設定されていた。何が問題ですか？",
    choices: [
      "デザインが崩れる",
      "スクリーンリーダーユーザーがページの主題を把握できず、見出しジャンプで混乱する",
      "SEOランキングが下がる",
      "ブラウザがエラーを返す",
    ],
    answer: 1,
    explanation:
      "1ページにh1は1つが原則です。h1はページ全体の主題を表し、スクリーンリーダーユーザーは「このページが何について書かれているか」をh1で把握します。複数あると文書構造が曖昧になります（WCAG 1.3.1、2.4.6）。",
  },
  {
    id: "rw-7",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "デザイン上の理由でCSSに `*:focus { outline: none; }` をグローバルに設定しているサイトがあった。誰にどんな影響がありますか？",
    choices: [
      "マウスユーザーにとって視認性が上がる",
      "キーボードユーザーが現在フォーカスされている要素を視覚的に追えなくなり、ページ全体の操作が困難になる",
      "スクリーンリーダーが動作しなくなる",
      "タッチ操作に影響が出る",
    ],
    answer: 1,
    explanation:
      "outline: noneをグローバルに設定するとキーボードフォーカスが完全に見えなくなります。キーボードのみで操作するユーザー（運動障害・視覚障害）にとって致命的です。:focus-visibleを使ってキーボード操作時だけ適切なフォーカスリングを表示してください（WCAG 2.4.7）。",
  },
  {
    id: "rw-8",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "ハンバーガーメニューボタンを実装するとき、開閉状態をスクリーンリーダーに伝えるために必要な属性はどれですか？",
    choices: [
      "aria-hidden=\"true\"",
      "aria-expanded=\"true\" / \"false\" をボタンに付与し、開閉に合わせて切り替える",
      "role=\"menu\"をボタンに付与する",
      "tabindex=\"-1\"を付与する",
    ],
    answer: 1,
    explanation:
      "aria-expanded属性でボタンが制御するメニューの開閉状態をスクリーンリーダーに伝えます。メニューが開いているときtrue、閉じているときfalseに動的に切り替えます。また aria-controls で対応するメニュー要素のIDを指定するとより明確です（WCAG 4.1.2）。",
  },
  {
    id: "rw-9",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "モーダルダイアログを開いたとき、フォーカスがモーダルの背後のページに残ったままだった。何が問題ですか？",
    choices: [
      "モーダルのアニメーションが遅い",
      "キーボードユーザーがモーダルの内容を操作できず、背後のページのTabキー移動が続いてしまう",
      "モーダルのz-indexが低すぎる",
      "モーダルを閉じるボタンが見つからない",
    ],
    answer: 1,
    explanation:
      "モーダルを開いたらフォーカスをモーダル内の最初の要素（または閉じるボタン）に移動し、Tabキーがモーダル外に出ないようにフォーカストラップを実装する必要があります。閉じるときはトリガーに戻します（WCAG 2.1.2、2.4.3）。",
  },
  {
    id: "rw-10",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "検索フォームに文字を入力すると候補リストが動的に表示されるが、スクリーンリーダーに候補が出たことが通知されなかった。適切な対応はどれですか？",
    choices: [
      "候補リストを常に表示しておく",
      "入力欄に aria-autocomplete=\"list\" と aria-controls を設定し、候補の件数を aria-live で通知する",
      "候補リストに display: block を使う",
      "候補リストを別ページで開く",
    ],
    answer: 1,
    explanation:
      "動的に変化するサジェストリストは、スクリーンリーダーに更新を通知する仕組みが必要です。aria-autocomplete・aria-expanded・aria-livewを組み合わせるか、WAI-ARIAのComboboxパターンに従って実装します（WCAG 4.1.3）。",
  },
  {
    id: "rw-11",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "タブUIをdivとCSSだけで実装したところ、スクリーンリーダーでタブの役割が伝わらなかった。正しいARIAの実装はどれですか？",
    choices: [
      "タブにrole=\"button\"を付ける",
      "タブリストに role=\"tablist\"、各タブに role=\"tab\" と aria-selected、パネルに role=\"tabpanel\" と aria-labelledby を設定する",
      "タブにaria-label=\"タブ\"を付ける",
      "タブにtabindex=\"0\"を付けるだけでよい",
    ],
    answer: 1,
    explanation:
      "タブUIのARIAパターンはrole=\"tablist\"（コンテナ）・role=\"tab\"（各タブ、aria-selected）・role=\"tabpanel\"（パネル）の組み合わせが必要です。さらにキーボードは矢印キーでタブ間を移動できるよう実装します（WAI-ARIA APG Tabs Pattern / WCAG 4.1.2）。",
  },
  {
    id: "rw-12",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "ヒーローエリアのカルーセルが自動で3秒ごとにスライドを切り替えていた。アクセシビリティ上の問題はどれですか？",
    choices: [
      "スライドの枚数が多すぎる",
      "ユーザーが読んでいる途中でコンテンツが切り替わり、一時停止・停止手段がないと WCAG 違反になる",
      "カルーセルのアニメーションが速すぎる",
      "スライドの画像サイズが大きすぎる",
    ],
    answer: 1,
    explanation:
      "5秒以上継続する自動再生コンテンツには、一時停止・停止・非表示のいずれかの手段をユーザーに提供する必要があります。読字障害や注意障害のあるユーザーに特に影響します。自動再生しない設定をデフォルトにすることも推奨です（WCAG 2.2.2）。",
  },
  {
    id: "rw-13",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "ログインフォームのメールアドレス・パスワード欄に autocomplete 属性が設定されていない。どんな問題がありますか？",
    choices: [
      "フォームのデザインが崩れる",
      "パスワードマネージャーや支援技術が入力欄の目的を判別できず、自動入力が機能しない",
      "フォームの送信ができなくなる",
      "ブラウザの履歴に保存されなくなる",
    ],
    answer: 1,
    explanation:
      "autocomplete=\"email\"・autocomplete=\"current-password\"などを設定することで、パスワードマネージャーや支援技術が入力フィールドの目的を識別できます。運動障害や認知障害のあるユーザーの入力負担を大幅に下げられます（WCAG 1.3.5）。",
  },
  {
    id: "rw-14",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "書籍一覧のページネーションで「1 2 3 ... 10 次へ」とリンクが並んでいる。スクリーンリーダーのリンク一覧に「2」「3」と数字だけ表示される問題の正しい修正はどれですか？",
    choices: [
      "数字を非表示にして「次へ」だけ残す",
      "各リンクに aria-label=\"2ページ目\" のように補足し、ナビゲーション全体を <nav aria-label=\"ページネーション\"> で囲む",
      "ページネーションをボタンに変更する",
      "数字のリンクにtitle属性を付ける",
    ],
    answer: 1,
    explanation:
      "数字のみのリンクはコンテキストから切り離すと意味が分かりません。aria-labelで「2ページ目へ」と補足し、<nav aria-label=\"ページネーション\">でランドマークとして識別できるようにします（WCAG 2.4.4、2.4.1）。",
  },
  {
    id: "rw-15",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "「カートに追加しました」というトースト通知が画面右下に表示されるが、スクリーンリーダーが全く読み上げなかった。どう修正すれば読み上げられますか？",
    choices: [
      "通知のz-indexを上げる",
      "通知要素に role=\"status\" または aria-live=\"polite\" を付与し、DOMに動的に挿入する",
      "通知のフォントサイズを大きくする",
      "通知を画面中央に移動する",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーはフォーカスが当たっていない要素の変化を通常読み上げません。role=\"status\"またはaria-live=\"polite\"を設定したコンテナを最初からDOMに存在させ、テキストだけを動的に挿入することで読み上げが発火します（WCAG 4.1.3）。",
  },
  {
    id: "rw-16",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "検索結果の読み込み中にスピナーアニメーションだけが表示されたが、スクリーンリーダーユーザーには何も伝わらなかった。適切な対応はどれですか？",
    choices: [
      "スピナーを大きくする",
      "スピナー要素に role=\"status\" と aria-label=\"読み込み中\" を付与する",
      "スピナーにalt=\"loading\"を付ける",
      "スピナーをテキストに変更する",
    ],
    answer: 1,
    explanation:
      "SVGやCSSで作られたスピナーには代替テキストがありません。role=\"status\"とaria-label=\"読み込み中\"を付与するか、aria-live=\"polite\"なリージョンに状態テキストを挿入することでスクリーンリーダーに伝わります（WCAG 4.1.2、4.1.3）。",
  },
  {
    id: "rw-17",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "パンくずナビが「ホーム > カテゴリ > 書籍名」と表示されているが、スクリーンリーダーでは他のナビゲーションと区別がつかなかった。どう改善しますか？",
    choices: [
      "パンくずを太字にする",
      "<nav aria-label=\"パンくずリスト\"> で囲み、現在ページのリンクに aria-current=\"page\" を付与する",
      "パンくずのリンクにtarget=\"_self\"を付ける",
      "パンくずを<ol>から<ul>に変更する",
    ],
    answer: 1,
    explanation:
      "複数の<nav>がある場合、aria-labelで区別しないとスクリーンリーダーのランドマーク一覧で全部「ナビゲーション」と表示されます。また現在ページにaria-current=\"page\"を付けることで位置情報も伝わります（WCAG 2.4.8）。",
  },
  {
    id: "rw-18",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "FAQページのアコーディオン（質問クリックで回答が開閉する）で、スクリーンリーダーが開閉状態を読み上げなかった。必要な対応はどれですか？",
    choices: [
      "アコーディオンをdivからpに変更する",
      "トリガーボタンに aria-expanded=\"true/false\" を付与し、aria-controls で対応するパネルIDを指定する",
      "パネルにdisplay: noneの代わりにvisibility: hiddenを使う",
      "トリガーにaria-label=\"開く\"を固定で付ける",
    ],
    answer: 1,
    explanation:
      "aria-expanded=\"true\"（開）/ \"false\"（閉）をトリガーに設定し、aria-controlsで対応パネルIDを指定します。パネル側にはid属性と必要に応じてrole=\"region\"を設定します。これによりスクリーンリーダーが「展開済み」「折りたたみ済み」を読み上げます（WCAG 4.1.2）。",
  },
  {
    id: "rw-19",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "サービス紹介ページに収録済みの解説動画が埋め込まれているが、字幕がなかった。誰に影響がありますか？",
    choices: [
      "モバイルユーザーのみ",
      "聴覚障害者、音を出せない環境のユーザー、音声言語に不慣れなユーザー",
      "JavaScriptを無効にしているユーザーのみ",
      "低速回線ユーザーのみ",
    ],
    answer: 1,
    explanation:
      "収録済み動画の音声には字幕（キャプション）の提供が必要です。聴覚障害者だけでなく、音を出せない環境（電車内・図書館）や第二言語として日本語を学ぶユーザーにも有用です（WCAG 1.2.2 レベルA）。",
  },
  {
    id: "rw-20",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "サイトのヒーローエリアに視差スクロールアニメーションが実装されている。前庭障害（三半規管の障害）のあるユーザーへの配慮として適切な対応はどれですか？",
    choices: [
      "アニメーション速度を遅くする",
      "@media (prefers-reduced-motion: reduce) でアニメーションを停止または最小化する",
      "アニメーションをページ最下部に移動する",
      "アニメーションをループしないようにする",
    ],
    answer: 1,
    explanation:
      "視差スクロールや大きな動きのアニメーションは前庭障害のあるユーザーに吐き気・めまいを引き起こすことがあります。OSの「視覚効果を減らす」設定がONのとき、prefers-reduced-motionメディアクエリに応じてアニメーションを停止します（WCAG 2.3.3 レベルAAA）。",
  },

  // ── 実例から学ぶ（実測データ編） ────────────────────────────
  {
    id: "rw-21",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "あるサービスサイトを自動チェックしたところ、ページ内269個のボタンのうち177個（約66%）にテキスト・aria-label・titleのいずれも設定されていないことが判明した。スクリーンリーダーユーザーにどんな体験が生じますか？",
    choices: [
      "ボタンの見た目が崩れる",
      "スクリーンリーダーが「ボタン」とだけ読み上げ、何のボタンか全く判断できない状態が177回繰り返される",
      "ボタンがクリックできなくなる",
      "ページの読み込みが遅くなる",
    ],
    answer: 1,
    explanation:
      "アクセシブルな名前（テキスト・aria-label・title等）がないボタンはスクリーンリーダーが「ボタン」とのみ読み上げます。ブックマーク・検索送信・スクロール矢印など機能の異なるボタンが全部「ボタン」になると、操作が不可能になります。特にアイコンのみのボタンはaria-labelが必須です（WCAG 4.1.2）。",
  },
  {
    id: "rw-22",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "あるサービスサイトに `<main>` ランドマーク要素が存在しなかった。スクリーンリーダーユーザーにどんな問題が起きますか？",
    choices: [
      "ページのレイアウトが崩れる",
      "スクリーンリーダーの「メインコンテンツへジャンプ」機能が使えず、ナビゲーションや広告をすべて聴き通すしかなくなる",
      "検索エンジンに認識されなくなる",
      "JavaScriptが動作しなくなる",
    ],
    answer: 1,
    explanation:
      "スクリーンリーダーにはランドマークジャンプ機能（VoiceOverならRotor、NVDAならDキー等）があり、<main>があることでメインコンテンツへ直接移動できます。<main>がないとこの機能が使えず、毎回ヘッダー・ナビゲーション全体を読み上げて通過しなければなりません（WCAG 1.3.1、ARIA Landmark規則）。",
  },
  {
    id: "rw-23",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "CSSに `button:focus { outline: none; }` が設定されているサービスサイトを発見した。このコードが引き起こす最も深刻な問題はどれですか？",
    choices: [
      "ボタンのホバーエフェクトが消える",
      "キーボードでTabキーを押してもどのボタンにフォーカスが当たっているか視覚的に分からなくなり、キーボードユーザーがページを操作できない",
      "ボタンがクリックできなくなる",
      "ボタンのフォントが変わる",
    ],
    answer: 1,
    explanation:
      "outline: noneでフォーカスリングを消すとキーボード操作時の現在位置が完全に不明になります。マウスでは問題ないためデザイナー・エンジニアが気づきにくい典型的な問題です。:focus-visibleを使えばキーボード操作時のみフォーカスリングを表示し、マウス時は非表示にできます（WCAG 2.4.7）。",
  },
  {
    id: "rw-24",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "サービスサイトでプレースホルダーやキャプションなどの補助テキストに `#aaaaaa`（灰色）が白背景に使われており、コントラスト比が2.32:1だった。WCAG AAのテキストコントラスト基準はいくつですか？",
    choices: [
      "2:1以上",
      "3:1以上",
      "4.5:1以上（大きなテキストは3:1以上）",
      "7:1以上",
    ],
    answer: 2,
    explanation:
      "WCAG AA（1.4.3）では通常テキストは4.5:1以上、18pt以上の大テキストまたは14pt以上の太字は3:1以上が必要です。#aaaaaaは2.32:1しかなく基準を大きく下回ります。プレースホルダーや補足テキストも対象です。AAA基準は通常テキスト7:1以上です（WCAG 1.4.3）。",
  },
  {
    id: "rw-25",
    themeId: "real-world",
    type: "multiple_choice",
    question:
      "あるサービスサイトに検索テキストボックスが2つあるが、どちらにも `<label>`・`aria-label`・`aria-labelledby` が設定されておらず、`placeholder` のみだった。何が問題ですか？",
    choices: [
      "検索ボックスのデザインが古くなる",
      "音声入力ソフトがフィールドを認識できず、「検索」などと声で操作できない。またフォーカス時にplaceholderが消えるため、入力中に目的が分からなくなる",
      "フォームの送信ができなくなる",
      "ブラウザの自動補完が動作しなくなる",
    ],
    answer: 1,
    explanation:
      "placeholderはラベルの代替になりません。入力開始と同時に消えるため短期記憶に課題のあるユーザーが混乱します。また音声入力ソフト（Dragon等）はラベルテキストを使って「検索と言って」のようにフィールドを特定するため、ラベルがないと操作できません（WCAG 1.3.1、4.1.2）。",
  },
]
