import { useState } from "react"
import { Link, useParams, Navigate } from "react-router-dom"
import { questions } from "../data/questions"
import { themes } from "../data/themes"
import { useProgress } from "../hooks/useProgress"
import { QuizCard } from "../components/QuizCard"
import { ExplanationBox } from "../components/ExplanationBox"
import { ProgressBar } from "../components/ProgressBar"
import { shuffle } from "../utils/shuffle"

export function Quiz() {
  const { id } = useParams<{ id: string }>()
  const theme = themes.find((t) => t.id === id)
  const themeQuestions = questions.filter((q) => q.themeId === id)

  const { saveProgress } = useProgress()

  const [shuffledQuestions] = useState(() => shuffle(themeQuestions))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  if (!theme || shuffledQuestions.length === 0) return <Navigate to="/" replace />

  const current = shuffledQuestions[currentIndex]
  const isAnswered = selected !== null
  const isCorrect = selected === current.answer

  function handleAnswer(choiceIndex: number) {
    if (isAnswered) return
    setSelected(choiceIndex)
    const correct = choiceIndex === current.answer
    if (correct) setScore((s) => s + 1)
    saveProgress({
      themeId: id!,
      questionId: current.id,
      isCorrect: correct,
      answeredAt: new Date().toISOString(),
    })
  }

  function handleNext() {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setDone(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
    }
  }

  if (done) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-2">テスト完了</h1>
        <p className="text-3xl font-bold text-blue-600 mb-1">
          {score} / {shuffledQuestions.length}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          正答率 {Math.round((score / shuffledQuestions.length) * 100)}%
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            ホームに戻る
          </Link>
          <Link
            to="/review"
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            復習する
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="パンくず" className="mb-4">
        <Link
          to={`/theme/${id}`}
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← {theme.title}
        </Link>
      </nav>

      <div className="mb-6">
        <ProgressBar
          value={currentIndex / shuffledQuestions.length}
          label={`進捗 ${currentIndex + 1}/${shuffledQuestions.length}`}
        />
      </div>

      {/* 回答済みの選択肢にフィードバックを付けた再描画 */}
      {isAnswered ? (
        <div className="space-y-4">
          <p className="text-xs text-gray-400">
            {currentIndex + 1} / {shuffledQuestions.length}
          </p>
          <p className="text-base font-medium text-gray-900 leading-relaxed">
            {current.question}
          </p>

          {/* モック・iframeは回答後も表示 */}
          {current.type === "ui_review_mock" && current.mockComponent && (
            <div className="my-4">
              {current.mockComponent === "MockBadForm" && (
                <div className="border border-gray-200 rounded-lg p-4 bg-white max-w-sm">
                  <p className="text-xs text-orange-600 mb-3">※ アクセシビリティ問題を含むUIサンプル</p>
                  <div className="mb-3"><input type="text" placeholder="お名前" className="border border-gray-300 rounded px-3 py-2 w-full text-sm" /></div>
                  <div className="mb-4"><input type="email" placeholder="メールアドレス" className="border border-gray-300 rounded px-3 py-2 w-full text-sm" /></div>
                  <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-full">送信</button>
                </div>
              )}
            </div>
          )}

          <ol className="space-y-2" role="list">
            {current.choices.map((choice, i) => {
              const isSelected = i === selected
              const isAnswer = i === current.answer
              let cls =
                "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors "
              if (isAnswer) {
                cls += "bg-green-50 border-green-400 text-green-900 font-medium"
              } else if (isSelected && !isAnswer) {
                cls += "bg-red-50 border-red-300 text-red-800"
              } else {
                cls += "bg-white border-gray-200 text-gray-600"
              }
              return (
                <li key={i}>
                  <div className={cls}>
                    <span className="font-medium mr-2">
                      {["A", "B", "C", "D"][i]}.
                    </span>
                    {choice}
                    {isAnswer && (
                      <span className="ml-2 text-green-600 text-xs">✓ 正解</span>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>

          <ExplanationBox explanation={current.explanation} isCorrect={isCorrect} />

          <button
            type="button"
            onClick={handleNext}
            className="mt-2 px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            {currentIndex + 1 >= shuffledQuestions.length ? "結果を見る" : "次の問題"}
          </button>
        </div>
      ) : (
        <QuizCard
          question={current}
          index={currentIndex}
          total={shuffledQuestions.length}
          onAnswer={handleAnswer}
        />
      )}
    </main>
  )
}
