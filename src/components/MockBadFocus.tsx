export function MockBadFocus() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white max-w-sm">
      <p className="text-xs text-orange-600 mb-1">※ アクセシビリティ問題を含むUIサンプル</p>
      <p className="text-xs text-gray-500 mb-3">
        Tabキーで移動してみてください（フォーカス位置がわかりません）
      </p>
      <div className="flex gap-2">
        {/* outline: none でフォーカスリングを完全に削除している */}
        {["前へ", "次へ", "送信"].map((label) => (
          <button
            key={label}
            type="button"
            style={{ outline: "none" }} /* ← outline削除。フォーカス表示なし */
            className="px-4 py-2 border border-gray-300 rounded text-sm bg-white hover:bg-gray-50"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
