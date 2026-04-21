import { Link } from "react-router-dom"
import { themes } from "../data/themes"
import { useProgress } from "../hooks/useProgress"
import { ProgressBar } from "../components/ProgressBar"

export function Home() {
  const { getCorrectRate } = useProgress()

  const weakThemes = themes.filter((t) => {
    const rate = getCorrectRate(t.id)
    return rate >= 0 && rate <= 0.5
  })

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        アクセシビリティ学習
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        UIパターン別にWCAG達成基準を体験的に学びます
      </p>

      <section className="mb-8 p-5 rounded-xl border border-gray-200 bg-white" aria-labelledby="wcag-heading">
        <h2 id="wcag-heading" className="font-semibold text-gray-900 mb-1">
          WCAG 2.2 全達成基準を学ぶ
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          78項目の達成基準を順番に学習・テストします。
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/wcag/quiz"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            全問（78問）
          </Link>
          <Link
            to="/wcag/quiz?level=A"
            className="px-4 py-2 rounded-lg bg-blue-100 text-blue-800 text-sm font-medium hover:bg-blue-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            レベルA
          </Link>
          <Link
            to="/wcag/quiz?level=AA"
            className="px-4 py-2 rounded-lg bg-violet-100 text-violet-800 text-sm font-medium hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            レベルAA
          </Link>
          <Link
            to="/wcag/quiz?level=AAA"
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            レベルAAA
          </Link>
          <Link
            to="/wcag"
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-500 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            一覧を見る
          </Link>
        </div>
      </section>

      {weakThemes.length > 0 && (
        <section className="mb-8" aria-labelledby="weak-heading">
          <h2
            id="weak-heading"
            className="text-xs font-semibold text-orange-600 uppercase tracking-wide mb-3"
          >
            苦手テーマ（正答率50%以下）
          </h2>
          <ul className="space-y-2">
            {weakThemes.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/theme/${t.id}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-orange-200 bg-orange-50 text-sm text-orange-900 hover:bg-orange-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  <span className="font-medium">{t.title}</span>
                  <span className="text-orange-600">
                    {Math.round(getCorrectRate(t.id) * 100)}%
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="themes-heading">
        <h2 id="themes-heading" className="sr-only">
          テーマ一覧
        </h2>
        <ul className="space-y-4">
          {themes.map((theme) => {
            const rate = getCorrectRate(theme.id)
            return (
              <li
                key={theme.id}
                className="border border-gray-200 rounded-xl p-5 bg-white"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{theme.title}</h3>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {theme.uiPattern}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-3">{theme.summary}</p>
                {rate >= 0 ? (
                  <div className="mb-4">
                    <ProgressBar value={rate} label="正答率" />
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mb-4">未回答</p>
                )}
                <Link
                  to={`/theme/${theme.id}`}
                  className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  学習する
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <div className="mt-8 text-center">
        <Link
          to="/review"
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          復習する（間違えた問題のみ）
        </Link>
      </div>
    </main>
  )
}
