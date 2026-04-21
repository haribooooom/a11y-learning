import { useState } from "react"
import { Link } from "react-router-dom"
import { wcag22 } from "../data/wcag22"

const PRINCIPLES = [
  { key: "perceivable",     label: "知覚可能",  number: "1" },
  { key: "operable",        label: "操作可能",  number: "2" },
  { key: "understandable",  label: "理解可能",  number: "3" },
  { key: "robust",          label: "堅牢",      number: "4" },
] as const

const LEVEL_COLOR: Record<string, string> = {
  A:   "bg-blue-100 text-blue-700",
  AA:  "bg-violet-100 text-violet-700",
  AAA: "bg-gray-100 text-gray-600",
}

export function WcagList() {
  const [openId, setOpenId] = useState<string | null>(null)
  const guidelines = [...new Set(wcag22.map((c) => c.guideline))]

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="パンくず" className="mb-6">
        <Link
          to="/"
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← ホームに戻る
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">WCAG 2.2 全達成基準</h1>
      <p className="text-sm text-gray-500 mb-6">78項目 · A / AA / AAA</p>

      <section className="mb-8 p-4 rounded-xl border border-gray-200 bg-white" aria-labelledby="quiz-heading">
        <h2 id="quiz-heading" className="text-sm font-semibold text-gray-700 mb-3">テストを始める</h2>
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
            レベルA のみ
          </Link>
          <Link
            to="/wcag/quiz?level=AA"
            className="px-4 py-2 rounded-lg bg-violet-100 text-violet-800 text-sm font-medium hover:bg-violet-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            レベルAA のみ
          </Link>
          <Link
            to="/wcag/quiz?level=AAA"
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            レベルAAA のみ
          </Link>
        </div>
      </section>

      {PRINCIPLES.map((p) => {
        const principleGuidelines = guidelines.filter((g) =>
          g.startsWith(p.number + ".")
        )
        return (
          <section key={p.key} className="mb-10" aria-labelledby={`principle-${p.key}`}>
            <h2
              id={`principle-${p.key}`}
              className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200"
            >
              原則 {p.number}: {p.label}
            </h2>
            {principleGuidelines.map((gl) => {
              const criteria = wcag22.filter((c) => c.guideline === gl)
              return (
                <div key={gl} className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{gl}</h3>
                  <ul className="space-y-1">
                    {criteria.map((c) => {
                      const isOpen = openId === c.id
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => setOpenId(isOpen ? null : c.id)}
                            aria-expanded={isOpen}
                            className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-100 bg-white text-sm hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                          >
                            <span className="font-mono text-xs text-gray-400 w-10 shrink-0">
                              {c.id}
                            </span>
                            <span className="text-gray-800 flex-1">{c.title}</span>
                            {c.isNewIn22 && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
                                2.2新規
                              </span>
                            )}
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLOR[c.level]}`}
                            >
                              {c.level}
                            </span>
                            <span className="text-gray-400 text-xs ml-1">{isOpen ? "▲" : "▼"}</span>
                          </button>
                          {isOpen && (
                            <div className="px-3 py-3 text-sm text-gray-600 bg-gray-50 border border-t-0 border-gray-100 rounded-b-lg leading-relaxed">
                              {c.description}
                            </div>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </section>
        )
      })}
    </main>
  )
}
