import { useState, useRef } from "react"

type Props = {
  url: string
  fallbackNote: string
}

export function KomaruIframe({ url, fallbackNote }: Props) {
  const [failed, setFailed] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleLoad() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  function handleError() {
    setFailed(true)
  }

  // iframeがsilentに失敗するケース（X-Frame-Options等）を一定時間後に検知
  function handleStart() {
    timeoutRef.current = setTimeout(() => {
      // タイムアウト後も何も起きていない場合はフォールバックを出さない
      // （正常ロード中の可能性があるため）
    }, 8000)
  }

  if (failed) {
    return (
      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-sm text-gray-700">
        <p className="font-medium mb-1">ページを読み込めませんでした</p>
        <p>{fallbackNote}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          駒瑠市を別タブで開く
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <iframe
        src={url}
        title="駒瑠市 アクセシビリティ学習ページ"
        width="100%"
        height="420"
        sandbox="allow-scripts allow-same-origin"
        className="border border-gray-200 rounded-lg w-full"
        onLoad={handleLoad}
        onError={handleError}
        onLoadStart={handleStart}
      />
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        駒瑠市を別タブで開く
      </a>
    </div>
  )
}
