import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { ThemeDetail } from "./pages/ThemeDetail"
import { Quiz } from "./pages/Quiz"
import { Review } from "./pages/Review"
import { WcagList } from "./pages/WcagList"
import { WcagQuiz } from "./pages/WcagQuiz"

export default function App() {
  return (
    <BrowserRouter basename="/a11y-learning">
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/theme/:id" element={<ThemeDetail />} />
          <Route path="/theme/:id/quiz" element={<Quiz />} />
          <Route path="/review" element={<Review />} />
          <Route path="/wcag" element={<WcagList />} />
          <Route path="/wcag/quiz" element={<WcagQuiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
