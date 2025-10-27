import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuizStore } from "../store/quizStore";

const QuizPage = () => {
  const { questions, addAnswer } = useQuizStore();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // 👇 Nuevo estado para el modal IA
  const [showExplanation, setShowExplanation] = useState(false);
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [explanationText, setExplanationText] = useState<string | null>(null);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

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

  const handleExplain = async () => {
    setShowExplanation(true);
    setLoadingExplanation(true);
    setExplanationText("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/prompt2quiz/explain-answer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: currentQuestion.question,
            options: currentQuestion.options,
            correct: currentQuestion.correct,
            answer: selected,
          }),
        }
      );

      if (!response.body) throw new Error("No se recibió un stream válido");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      // 🔁 Leer el stream chunk por chunk
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // Mostrar texto progresivamente
        setExplanationText((prev) => (prev ?? "") + chunk);
      }

      setLoadingExplanation(false);
    } catch (error) {
      console.error("Error al obtener la explicación:", error);
      setExplanationText(
        "❌ Ocurrió un error al generar la explicación. Intenta nuevamente."
      );
      setLoadingExplanation(false);
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
        <div className="flex flex-col p-8">
          <div>
            <div className="text-sm text-gray-300 mb-2">
              Pregunta {currentIndex + 1} de {questions.length}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div
                className="bg-linear-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <h2 className="text-2xl md:text-3xl font-semibold leading-snug text-white">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="text-sm text-gray-400 mt-8">
            Generado con IA · Prompt2Quiz
          </div>
        </div>

        {/* Columna derecha */}
        <div className="bg-[#111827] p-8 rounded-2xl shadow-lg border border-gray-800 flex flex-col justify-center">
          <div className="space-y-4">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selected === i;
              const isCorrect = i === currentQuestion.correct;

              let base =
                "w-full text-left p-4 rounded-xl border transition-all duration-300 text-gray-100 cursor-pointer";
              let styles = "border-gray-700 hover:bg-gray-800";

              if (showAnswer && isSelected && isCorrect)
                styles = "border-green-500 bg-green-900/30";
              else if (showAnswer && isSelected && !isCorrect)
                styles = "border-red-500 bg-red-900/30";
              else if (showAnswer && isCorrect)
                styles = "border-green-400 bg-green-800/20";

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`${base} ${styles}`}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="mt-12 flex flex-col gap-4">
              {/* Botón continuar */}
              <button
                onClick={handleContinue}
                className="w-full px-6 py-3 bg-linear-to-r from-indigo-500 to-cyan-400 text-white rounded-xl hover:opacity-90 transition-all cursor-pointer"
              >
                {currentIndex < questions.length - 1
                  ? "Continuar"
                  : "Ver resultados"}
              </button>

              {/* Botón explicar */}
              {selected !== null && selected !== currentQuestion.correct && (
                <button
                  onClick={handleExplain}
                  className="w-full px-6 py-3 border border-cyan-400 text-cyan-300 rounded-xl hover:bg-cyan-400/10 transition-all cursor-pointer"
                >
                  Explicar esto con IA 🤖
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 💬 Modal de explicación con IA */}
      {showExplanation && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
          onClick={() => setShowExplanation(false)} // 👉 permite cerrar haciendo click afuera
        >
          <div
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8 max-w-2xl w-full shadow-2xl text-gray-100 relative"
            onClick={(e) => e.stopPropagation()} // 👈 evita que el click dentro cierre el modal
          >
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">
              🧠 Explicación generada con IA
            </h3>

            {loadingExplanation ? (
              <div className="flex items-center gap-2 text-gray-400 italic">
                Analizando la pregunta
                <span className="flex gap-2 ml-2">
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce-strong"></span>
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce-strong"></span>
                  <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce-strong"></span>
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-200 leading-relaxed whitespace-pre-line">
                  {explanationText}
                </p>
                <p className="text-sm text-gray-500 italic text-right">
                  Generado con IA · Prompt2Quiz
                </p>
              </div>
            )}

            <button
              onClick={() => setShowExplanation(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
