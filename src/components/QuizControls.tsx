import type { Question } from "../store/quizStore";

type QuizControlsProps = {
  currentQuestion: Question;
  isLastQuestion: boolean;
  selected: number | null;
  handleContinue: () => void;
  handleExplain: () => void;
};

const QuizControls = ({
  currentQuestion,
  isLastQuestion,
  selected,
  handleContinue,
  handleExplain,
}: QuizControlsProps) => {
  return (
    <div className="mt-12 flex flex-col gap-4">
      {/* Botón continuar */}
      <button
        onClick={handleContinue}
        className="w-full px-6 py-3 bg-linear-to-r from-indigo-500 to-cyan-400 text-white rounded-xl hover:opacity-90 transition-all cursor-pointer"
      >
        {!isLastQuestion ? "Continuar" : "Ver resultados"}
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
  );
};

export default QuizControls;
