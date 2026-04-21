export function MockBadContrast() {
  return (
    // 背景 #f0f0f0 / テキスト #c0c0c0 → コントラスト比 約1.5:1
    <div
      className="border border-gray-200 rounded-lg p-4 max-w-sm"
      style={{ backgroundColor: "#f0f0f0" }}
    >
      <p className="text-xs text-orange-600 mb-3">※ アクセシビリティ問題を含むUIサンプル</p>
      <h3 style={{ color: "#c0c0c0", fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
        このテキストは読めますか？
      </h3>
      <p style={{ color: "#c0c0c0", fontSize: "14px", lineHeight: "1.6" }}>
        新しいアップデートが利用可能です。設定メニューから確認してください。重要なセキュリティ修正が含まれています。
      </p>
      <button
        type="button"
        style={{
          color: "#b8b8b8",
          backgroundColor: "#e4e4e4",
          border: "none",
          padding: "6px 12px",
          borderRadius: "4px",
          marginTop: "12px",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        詳細を見る
      </button>
    </div>
  )
}
