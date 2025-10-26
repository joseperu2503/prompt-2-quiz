import { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: { text: string; isCorrect: boolean }[];
}

const QuestionPage = () => {
  const questions: Question[] = [
    {
      id: 1,
      text: "¿Quién es el portador del Anillo Único en El Señor de los Anillos?",
      options: [
        { text: "Gandalf", isCorrect: false },
        { text: "Frodo", isCorrect: true },
        { text: "Aragorn", isCorrect: false },
        { text: "Legolas", isCorrect: false },
      ],
    },
    {
      id: 2,
      text: "¿En qué reino se encuentra la ciudad de Minas Tirith?",
      options: [
        { text: "Rohan", isCorrect: false },
        { text: "Mordor", isCorrect: false },
        { text: "Gondor", isCorrect: true },
        { text: "Isengard", isCorrect: false },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (index: number) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setShowAnswer(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0B1120] text-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Columna izquierda */}
        <div className="flex flex-col justify-between bg-[#111827] p-8 rounded-2xl shadow-lg border border-gray-800">
          {/* Progreso */}
          <div>
            <div className="text-sm text-gray-400 mb-2">
              Pregunta {currentIndex + 1} de {questions.length}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
              <div
                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* Pregunta */}
            <h2 className="text-2xl md:text-3xl font-semibold leading-snug text-white">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Footer (opcional: puedes poner temporizador, ícono, etc.) */}
          <div className="text-sm text-gray-500 mt-8">
            Generado con IA · Prompt2Quiz
          </div>
        </div>

        {/* Columna derecha */}
        <div className="bg-[#111827] p-8 rounded-2xl shadow-lg border border-gray-800 flex flex-col justify-center">
          <div className="space-y-4">
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selected === i;
              const isCorrect = opt.isCorrect;

              let base =
                "w-full text-left p-4 rounded-xl border transition-all duration-300 text-gray-200";
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
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
