import { Link, useParams, Navigate } from "react-router-dom"
import { themes } from "../data/themes"

export function ThemeDetail() {
  const { id } = useParams<{ id: string }>()
  const theme = themes.find((t) => t.id === id)

  if (!theme) return <Navigate to="/themes" replace />

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="パンくず" className="mb-6">
        <Link
          to="/themes"
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← アクセシビリティ学習
        </Link>
      </nav>

      <div className="mb-2">
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
          {theme.uiPattern}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{theme.title}</h1>
      <p className="text-sm text-gray-600 mb-6">{theme.summary}</p>

      <section className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200">
        <h2 className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
          なぜ重要か
        </h2>
        <p className="text-sm text-amber-900 leading-relaxed">
          {theme.whyItMatters}
        </p>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <section className="p-4 rounded-xl border border-gray-200 bg-white">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            デザイナーの確認範囲
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {theme.designerScope}
          </p>
        </section>
        <section className="p-4 rounded-xl border border-gray-200 bg-white">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            エンジニアの確認範囲
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {theme.engineerScope}
          </p>
        </section>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {theme.relatedWcag.map((wcag) => (
          <span
            key={wcag}
            className="text-xs font-mono px-2 py-1 rounded bg-gray-100 text-gray-600"
          >
            WCAG {wcag}
          </span>
        ))}
      </div>

      <Link
        to={`/theme/${theme.id}/quiz`}
        className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        テストを始める
      </Link>
    </main>
  )
}
