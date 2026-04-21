import { useState } from "react"
import { Link } from "react-router-dom"
import { questions } from "../data/questions"
import { useProgress } from "../hooks/useProgress"
import { QuizCard } from "../components/QuizCard"
import { ExplanationBox } from "../components/ExplanationBox"

export function Review() {
  const { getIncorrectQuestions, saveProgress } = useProgress()

  const incorrectIds = [
    ...new Set(getIncorrectQuestions().map((p) => p.questionId)),
  ]
  const reviewQuestions = questions.filter((q) => incorrectIds.includes(q.id))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [done, setDone] = useState(false)
  const [score, setScore] = useState(0)

  if (reviewQuestions.length === 0) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-4">復習</h1>
        <p className="text-sm text-gray-500 mb-6">
          まだ間違えた問題はありません。テストに挑戦してみましょう。
        </p>
        <Link
          to="/themes"
          className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ホームに戻る
        </Link>
      </main>
    )
  }

  const current = reviewQuestions[currentIndex]
  const isAnswered = selected !== null
  const isCorrect = selected === current.answer

  function handleAnswer(choiceIndex: number) {
    if (isAnswered) return
    setSelected(choiceIndex)
    const correct = choiceIndex === current.answer
    if (correct) setScore((s) => s + 1)
    saveProgress({
      themeId: current.themeId,
      questionId: current.id,
      isCorrect: correct,
      answeredAt: new Date().toISOString(),
    })
  }

  function handleNext() {
    if (currentIndex + 1 >= reviewQuestions.length) {
      setDone(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelected(null)
    }
  }

  if (done) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-xl font-bold text-gray-900 mb-2">復習完了</h1>
        <p className="text-3xl font-bold text-blue-600 mb-1">
          {score} / {reviewQuestions.length}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          正答率 {Math.round((score / reviewQuestions.length) * 100)}%
        </p>
        <Link
          to="/themes"
          className="inline-block px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ホームに戻る
        </Link>
      </main>
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="パンくず" className="mb-4">
        <Link
          to="/themes"
          className="text-sm text-blue-600 underline hover:text-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          ← ホームに戻る
        </Link>
      </nav>
      <h1 className="text-xl font-bold text-gray-900 mb-1">復習</h1>
      <p className="text-xs text-gray-400 mb-6">
        {currentIndex + 1} / {reviewQuestions.length} 問
      </p>

      {isAnswered ? (
        <div className="space-y-4">
          <p className="text-base font-medium text-gray-900 leading-relaxed">
            {current.question}
          </p>
          <ol className="space-y-2" role="list">
            {current.choices.map((choice, i) => {
              const isSelected = i === selected
              const isAnswer = i === current.answer
              let cls =
                "w-full text-left px-4 py-3 rounded-lg border text-sm "
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
            {currentIndex + 1 >= reviewQuestions.length ? "結果を見る" : "次の問題"}
          </button>
        </div>
      ) : (
        <QuizCard
          question={current}
          index={currentIndex}
          total={reviewQuestions.length}
          onAnswer={handleAnswer}
        />
      )}
    </main>
  )
}
