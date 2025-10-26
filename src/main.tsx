import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import "./index.css";
import PromptPage from "./pages/PromptPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import ResultPage from "./pages/ResultPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PromptPage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/result" element={<ResultPage />} />

      {/* Redirección por defecto */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
