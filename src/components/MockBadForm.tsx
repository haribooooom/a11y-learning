export function MockBadForm() {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white max-w-sm">
      <p className="text-xs text-orange-600 mb-3">※ アクセシビリティ問題を含むUIサンプル</p>
      {/* label要素なし・placeholderのみでラベル代わりにしている */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="お名前"
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          placeholder="メールアドレス"
          className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
        />
      </div>
      <button
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-full hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        送信
      </button>
    </div>
  )
}
