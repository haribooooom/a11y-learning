export type Theme = {
  id: string
  title: string
  uiPattern: string
  summary: string
  whyItMatters: string
  designerScope: string
  engineerScope: string
  relatedWcag: string[]
}

export type QuestionType =
  | "multiple_choice"
  | "ui_review_mock"
  | "ui_review_komaru"
  | "fix_selection"

export type Question = {
  id: string
  themeId: string
  type: QuestionType
  question: string
  choices: string[]
  answer: number
  explanation: string
  mockComponent?: string
  komaruUrl?: string
  komaruFallbackNote?: string
}

export type WcagCriterion = {
  id: string
  title: string
  principle: "perceivable" | "operable" | "understandable" | "robust"
  guideline: string
  level: "A" | "AA" | "AAA"
  description: string
  question: string
  choices: string[]
  answer: number
  explanation: string
  isNewIn22?: boolean
}

export type Progress = {
  themeId: string
  questionId: string
  isCorrect: boolean
  answeredAt: string
}
