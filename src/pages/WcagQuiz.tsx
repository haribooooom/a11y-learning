import { useState, useCallback, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { wcag22 } from "../data/wcag22"
import { ExplanationBox } from "../components/ExplanationBox"
import { ProgressBar } from "../components/ProgressBar"

const STORAGE_KEY = "a11y-wcag-progress"
const SET_SIZE = 10

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

const LEVEL_LABEL: Record<string, string> = {
  A: "レベルA",
  AA: "レベルAA",
  AAA: "レベルAAA",
}

export function WcagQuiz() {
  const [searchParams] = useSearchParams()
  const levelFilter = searchParams.get("level") as "A" | "AA" | "AAA" | null

  const questions = useMemo(
    () => levelFilter ? wcag22.filter((c) => c.level === levelFilter) : wcag22,
    [levelFilter]
  )

  const total = questions.length
  const totalSets = Math.ceil(total / SET_SIZE)

  const [setIndex, setSetIndex] = useState(0)
  const [withinIndex, setWithinIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [setScore, setSetScore] = useState(0)
  const [setDone, setSetDone] = useState(false)

  const [allProgress, setAllProgress] = useState<WcagProgress[]>(() => loadWcagProgress())
  const answeredIds = useMemo(
    () => new Set(allProgress.map((p) => p.id)),
    [allProgress]
  )

  const setStart = setIndex * SET_SIZE
  const setEnd = Math.min(setStart + SET_SIZE, total)
  const setQuestions = questions.slice(setStart, setEnd)
  const setTotal = setQuestions.length

  const current = setQuestions[withinIndex]
  const isAnswered = selected !== null
  const isCorrect = selected === current?.answer

  const totalAnswered = useMemo(
    () => questions.filter((q) => answeredIds.has(q.id)).length,
    [questions, answeredIds]
  )

  const handleAnswer = useCallback(
    (i: number) => {
      if (isAnswered) return
      setSelected(i)
      const correct = i === current.answer
      if (correct) setSetScore((s) => s + 1)
      const p: WcagProgress = { id: current.id, isCorrect: correct, answeredAt: new Date().toISOString() }
      saveWcagProgress(p)
      setAllProgress((prev) => [...prev, p])
    },
    [isAnswered, current]
  )

  function handleNext() {
    if (withinIndex + 1 >= setTotal) {
      setSetDone(true)
    } else {
      setWithinIndex((i) => i + 1)
      setSelected(null)
    }
  }

  function jumpToSet(idx: number) {
    setSetIndex(idx)
    setWithinIndex(0)
    setSelected(null)
    setSetScore(0)
    setSetDone(false)
  }

  // セット完了画面
  if (setDone) {
    const isLastSet = setIndex + 1 >= totalSets
    const pct = Math.round((setScore / setTotal) * 100)
    const newAnswered = questions.filter((q) => answeredIds.has(q.id)).length
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          セット {setIndex + 1} 完了{levelFilter ? ` — ${LEVEL_LABEL[levelFilter]}` : ""}
        </h1>
        <p className="text-4xl font-bold text-blue-600 mb-1">
          {setScore} <span className="text-xl text-gray-400">/ {setTotal}</span>
        </p>
        <p className="text-sm text-gray-500 mb-2">正答率 {pct}%</p>
        <p className="text-sm text-gray-400 mb-8">
          全体: {newAnswered} / {total} 問回答済
        </p>
        <div className="flex flex-wrap gap-3">
          {!isLastSet && (
            <button
              type="button"
              onClick={() => jumpToSet(setIndex + 1)}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              次のセットへ（{setIndex + 2}/{totalSets}）
            </button>
          )}
          <Link
            to="/"
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
          to="/"
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← 達成基準一覧
        </Link>
      </nav>

      {/* ステッパー */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500">
            セット {setIndex + 1} / {totalSets}
          </span>
          <span className="text-xs text-gray-400">
            全体 <span className="font-semibold text-gray-700">{totalAnswered}</span> / {total} 問回答済
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="セット一覧">
          {Array.from({ length: totalSets }, (_, i) => {
            const start = i * SET_SIZE
            const end = Math.min(start + SET_SIZE, total)
            const setQs = questions.slice(start, end)
            const answeredInSet = setQs.filter((q) => answeredIds.has(q.id)).length
            const isComplete = answeredInSet === setQs.length
            const isCurrent = i === setIndex
            return (
              <button
                key={i}
                type="button"
                role="listitem"
                onClick={() => jumpToSet(i)}
                aria-current={isCurrent ? "step" : undefined}
                className={[
                  "flex flex-col items-center justify-center w-10 h-10 rounded-lg text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600",
                  isCurrent
                    ? "bg-blue-600 text-white"
                    : isComplete
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : answeredInSet > 0
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200",
                ].join(" ")}
              >
                <span>{i + 1}</span>
                <span className="text-[9px] opacity-70">{answeredInSet}/{setQs.length}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* セット内進捗 */}
      <div className="mb-5">
        <ProgressBar
          value={withinIndex / setTotal}
          label={`セット内 ${withinIndex + 1} / ${setTotal} 問`}
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
            {withinIndex + 1 >= setTotal ? "セット結果を見る" : "次の達成基準"}
          </button>
        </>
      )}
    </main>
  )
}
