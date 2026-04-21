import { useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { wcag22 } from "../data/wcag22"
import { ExplanationBox } from "../components/ExplanationBox"
import { ProgressBar } from "../components/ProgressBar"

const STORAGE_KEY = "a11y-wcag-progress"

type WcagProgress = {
  id: string
  isCorrect: boolean
  answeredAt: string
}

function loadWcagProgress(): WcagProgress[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWcagProgress(p: WcagProgress) {
  const prev = loadWcagProgress()
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...prev, p]))
}

const LEVEL_COLOR: Record<string, string> = {
  A:   "bg-blue-100 text-blue-700",
  AA:  "bg-violet-100 text-violet-700",
  AAA: "bg-gray-100 text-gray-600",
}

export function WcagQuiz() {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = wcag22[index]
  const total = wcag22.length
  const isAnswered = selected !== null
  const isCorrect = selected === current.answer

  const handleAnswer = useCallback(
    (i: number) => {
      if (isAnswered) return
      setSelected(i)
      const correct = i === current.answer
      if (correct) setScore((s) => s + 1)
      saveWcagProgress({ id: current.id, isCorrect: correct, answeredAt: new Date().toISOString() })
    },
    [isAnswered, current]
  )

  function handleNext() {
    if (index + 1 >= total) {
      setDone(true)
    } else {
      setIndex((i) => i + 1)
      setSelected(null)
    }
  }

  if (done) {
    const pct = Math.round((score / total) * 100)
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-2">テスト完了</h1>
        <p className="text-4xl font-bold text-blue-600 mb-1">
          {score} <span className="text-xl text-gray-400">/ {total}</span>
        </p>
        <p className="text-sm text-gray-500 mb-8">正答率 {pct}%</p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            ホームに戻る
          </Link>
          <Link
            to="/wcag"
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            達成基準一覧へ
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="パンくず" className="mb-4">
        <Link
          to="/wcag"
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← 達成基準一覧
        </Link>
      </nav>

      <div className="mb-5">
        <ProgressBar
          value={index / total}
          label={`${index + 1} / ${total} 問`}
        />
      </div>

      {/* 問題ヘッダー */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-sm font-bold text-gray-400">{current.id}</span>
        <span className="font-semibold text-gray-800 text-base">{current.title}</span>
        {current.isNewIn22 && (
          <span className="text-xs bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded">
            2.2新規
          </span>
        )}
        <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${LEVEL_COLOR[current.level]}`}>
          {current.level}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{current.description}</p>

      <p className="text-base font-medium text-gray-900 mb-4 leading-relaxed">
        {current.question}
      </p>

      <ol className="space-y-2 mb-4" role="list">
        {current.choices.map((choice, i) => {
          let cls =
            "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors "
          if (isAnswered) {
            if (i === current.answer) {
              cls += "bg-green-50 border-green-400 text-green-900 font-medium"
            } else if (i === selected) {
              cls += "bg-red-50 border-red-300 text-red-800"
            } else {
              cls += "bg-white border-gray-200 text-gray-500"
            }
          } else {
            cls +=
              "bg-white border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          }

          return (
            <li key={i}>
              {isAnswered ? (
                <div className={cls}>
                  <span className="font-medium mr-2">{["A", "B", "C", "D"][i]}.</span>
                  {choice}
                  {i === current.answer && (
                    <span className="ml-2 text-green-600 text-xs">✓ 正解</span>
                  )}
                </div>
              ) : (
                <button type="button" onClick={() => handleAnswer(i)} className={cls}>
                  <span className="font-medium mr-2">{["A", "B", "C", "D"][i]}.</span>
                  {choice}
                </button>
              )}
            </li>
          )
        })}
      </ol>

      {isAnswered && (
        <>
          <ExplanationBox explanation={current.explanation} isCorrect={isCorrect} />
          <button
            type="button"
            onClick={handleNext}
            className="mt-4 px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {index + 1 >= total ? "結果を見る" : "次の達成基準"}
          </button>
        </>
      )}
    </main>
  )
}
