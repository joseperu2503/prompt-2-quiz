import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useQuizStore } from "../store/quizStore";

const ResultPage = () => {
  const { questions, answers, resetQuiz } = useQuizStore();
  const navigate = useNavigate();

  const correctCount = answers.filter(
    (answer, i) => answer === questions[i]?.correct
  ).length;

  const score = Math.round((correctCount / questions.length) * 100);

  const handleRestart = () => {
    resetQuiz();
    navigate("/");
  };

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/", { replace: true });
    }
  }, [questions, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0B1120] text-gray-100 flex flex-col items-center justify-center px-6 py-10">
      <div className="max-w-3xl w-full bg-[#111827] p-10 rounded-2xl shadow-lg border border-gray-800 text-center">
        <h1 className="text-4xl font-bold mb-4">🎉 ¡Resultados del Quiz!</h1>
        <p className="text-gray-400 mb-8">
          Has acertado{" "}
          <span className="text-white font-semibold">
            {correctCount} de {questions.length}
          </span>{" "}
          preguntas.
        </p>

        <div className="text-5xl font-bold mb-8 text-cyan-400">{score}%</div>

        <div className="space-y-6 text-left">
          {questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;

            return (
              <div
                key={i}
                className={`p-4 rounded-xl border ${
                  isCorrect
                    ? "border-green-500 bg-green-900/20"
                    : "border-red-500 bg-red-900/20"
                }`}
              >
                <p className="font-medium text-white mb-4">
                  {i + 1}. {q.question}
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Tu respuesta:</span>{" "}
                  <span className="text-gray-200">
                    {q.options[userAnswer] ?? "No respondida"}
                  </span>
                </p>
                {!isCorrect && (
                  <p className="text-sm text-green-400 mt-1">
                    <span className="font-semibold ">Respuesta correcta:</span>{" "}
                    <span>{q.options[q.correct]}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="mt-10 px-6 py-3 bg-linear-to-r from-indigo-500 to-cyan-400 text-white rounded-xl hover:opacity-90 transition-all"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
