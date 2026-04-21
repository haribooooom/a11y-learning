import type { Question } from "../types"
import { KomaruIframe } from "./KomaruIframe"
import { MockBadForm } from "./MockBadForm"
import { MockBadContrast } from "./MockBadContrast"
import { MockBadFocus } from "./MockBadFocus"

const MOCK_MAP: Record<string, React.ReactNode> = {
  MockBadForm: <MockBadForm />,
  MockBadContrast: <MockBadContrast />,
  MockBadFocus: <MockBadFocus />,
}

type Props = {
  question: Question
  index: number
  total: number
  onAnswer: (choiceIndex: number) => void
}

export function QuizCard({ question, index, total, onAnswer }: Props) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400">
        {index + 1} / {total}
      </p>
      <p className="text-base font-medium text-gray-900 leading-relaxed">
        {question.question}
      </p>

      {question.type === "ui_review_mock" && question.mockComponent && (
        <div className="my-4">{MOCK_MAP[question.mockComponent]}</div>
      )}

      {question.type === "ui_review_komaru" &&
        question.komaruUrl &&
        question.komaruFallbackNote && (
          <div className="my-4">
            <KomaruIframe
              url={question.komaruUrl}
              fallbackNote={question.komaruFallbackNote}
            />
          </div>
        )}

      <ol className="space-y-2" role="list">
        {question.choices.map((choice, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onAnswer(i)}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-800 bg-white hover:bg-gray-50 hover:border-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              <span className="font-medium mr-2">
                {["A", "B", "C", "D"][i]}.
              </span>
              {choice}
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}
