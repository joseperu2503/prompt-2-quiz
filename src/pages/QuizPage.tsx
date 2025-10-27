import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ExplanationModal from "../components/ExplanationModal";
import { QuestionHeader } from "../components/QuestionHeader";
import QuestionOptions from "../components/QuestionOptions";
import QuizControls from "../components/QuizControls";
import { useQuizStore } from "../store/quizStore";

const QuizPage = () => {
  const { questions, addAnswer } = useQuizStore();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // 👇 Nuevo estado para el modal IA
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleExplain = () => {
    setShowExplanation(true);
  };

  const handleSelect = (index: number) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
    addAnswer(index);
  };

  const handleContinue = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      navigate("/result");
    }
  };

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/", { replace: true });
    }
  }, [questions, navigate]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-300">
        <p className="text-lg">No hay preguntas generadas. 🧐</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0B1120] text-gray-100 flex items-center justify-center px-6 py-10 relative">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <QuestionHeader
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          question={currentQuestion.question}
        />

        {/* Columna derecha */}
        <div className="bg-[#111827] p-8 rounded-2xl shadow-lg border border-gray-800 flex flex-col justify-center">
          <QuestionOptions
            options={currentQuestion.options}
            correct={currentQuestion.correct}
            selected={selected}
            showAnswer={showAnswer}
            onSelect={handleSelect}
          ></QuestionOptions>

          {showAnswer && (
            <QuizControls
              currentQuestion={currentQuestion}
              isLastQuestion={currentIndex === questions.length - 1}
              selected={selected}
              handleContinue={handleContinue}
              handleExplain={handleExplain}
            />
          )}
        </div>
      </div>

      {/* 💬 Modal de explicación con IA */}
      <ExplanationModal
        show={showExplanation}
        question={currentQuestion}
        selected={selected}
        onClose={() => setShowExplanation(false)}
      />
    </div>
  );
};

export default QuizPage;
