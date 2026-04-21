type Props = {
  explanation: string
  isCorrect: boolean
}

export function ExplanationBox({ explanation, isCorrect }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`mt-4 p-4 rounded-lg border text-sm leading-relaxed ${
        isCorrect
          ? "bg-green-50 border-green-200 text-green-900"
          : "bg-red-50 border-red-200 text-red-900"
      }`}
    >
      <p className="font-semibold mb-1">{isCorrect ? "正解" : "不正解"}</p>
      <p>{explanation}</p>
    </div>
  )
}
