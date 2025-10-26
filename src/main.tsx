import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import PromptPage from "./pages/PromptPage.tsx";
import QuestionPage from "./pages/QuestionPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PromptPage />} />
      <Route path="/question" element={<QuestionPage />} />
    </Routes>
  </BrowserRouter>
);
