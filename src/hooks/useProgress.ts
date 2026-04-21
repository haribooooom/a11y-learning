import { useState, useCallback } from "react"
import type { Progress } from "../types"

const STORAGE_KEY = "a11y-learning-progress"

function load(): Progress[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Progress[]) : []
  } catch {
    return []
  }
}

function save(data: Progress[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress[]>(load)

  const saveProgress = useCallback((p: Progress) => {
    setProgress((prev) => {
      const next = [...prev, p]
      save(next)
      return next
    })
  }, [])

  const getProgressByTheme = useCallback(
    (themeId: string) => progress.filter((p) => p.themeId === themeId),
    [progress]
  )

  const getIncorrectQuestions = useCallback(
    () =>
      progress.filter((p) => !p.isCorrect),
    [progress]
  )

  const getCorrectRate = useCallback(
    (themeId: string): number => {
      const themed = progress.filter((p) => p.themeId === themeId)
      if (themed.length === 0) return -1
      const correct = themed.filter((p) => p.isCorrect).length
      return correct / themed.length
    },
    [progress]
  )

  return { progress, saveProgress, getProgressByTheme, getIncorrectQuestions, getCorrectRate }
}
