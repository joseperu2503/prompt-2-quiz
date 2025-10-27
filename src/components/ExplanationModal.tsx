import { useEffect, useState } from "react";
import type { Question } from "../store/quizStore";

type ExplanationModalProps = {
  show: boolean;
  question: Question;
  selected: number | null;
  onClose: () => void;
};

export const ExplanationModal = ({
  show,
  onClose,
  question,
  selected,
}: ExplanationModalProps) => {
  if (!show) return null;

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<string | null>(null);

  const handleExplain = async () => {
    setLoading(true);
    setText("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/prompt2quiz/explain-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question.question,
            options: question.options,
            correct: question.correct,
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
        setText((prev) => (prev ?? "") + chunk);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error al obtener la explicación:", error);
      setText(
        "❌ Ocurrió un error al generar la explicación. Intenta nuevamente."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      handleExplain();
    }
  }, [show]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-6"
      onClick={onClose}
    >
      <div
        className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8 max-w-2xl w-full shadow-2xl text-gray-100 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-4 text-cyan-400">
          🧠 Explicación generada con IA
        </h3>
        {loading ? (
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
              {text}
            </p>
            <p className="text-sm text-gray-500 italic text-right">
              Generado con IA · Prompt2Quiz
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-lg cursor-pointer"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default ExplanationModal;
