type QuestionHeaderProps = {
  currentIndex: number;
  totalQuestions: number;
  question: string;
};

export const QuestionHeader = ({
  currentIndex,
  totalQuestions,
  question,
}: QuestionHeaderProps) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex flex-col p-8">
      <div>
        <div className="text-sm text-gray-300 mb-2">
          Pregunta {currentIndex + 1} de {totalQuestions}
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div
            className="bg-linear-to-r from-indigo-500 to-cyan-400 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold leading-snug text-white">
          {question}
        </h2>
      </div>

      <div className="text-sm text-gray-400 mt-8">
        Generado con IA · Prompt2Quiz
      </div>
    </div>
  );
};
