import axios from "axios";
import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router";
import { useQuizStore, type Question } from "../store/quizStore";

const PromptPage = () => {
  const navigate = useNavigate();
  const { prompt, setPrompt, setQuestions } = useQuizStore();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!prompt.trim()) return alert("Por favor, escribe un prompt 🧠");

    try {
      setLoading(true);

      const response = await axios.post<Question[]>(
        `${import.meta.env.VITE_BASE_URL}/prompt2quiz/generate-quiz`,
        { prompt }
      );

      setQuestions(response.data || []);
      navigate("/quiz");
    } catch (error) {
      console.error("❌ Error al generar el quiz:", error);
      alert("Hubo un error generando el quiz. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0F172A] via-[#1E293B] to-[#0B1120] text-gray-100 flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-3xl bg-[#111827] rounded-2xl shadow-lg border border-gray-800 p-10">
        <h1 className="text-center mb-4 text-4xl ">
          <span>🧠</span>{" "}
          <span className="font-bold bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Prompt2Quiz
          </span>
        </h1>

        <p className="text-gray-200 mb-8 text-center text-lg">
          Escribe un tema o prompt para generar un quiz con inteligencia
          artificial.
        </p>

        <div className="flex flex-col gap-6">
          <textarea
            className="w-full h-40 bg-[#0B1120] border border-gray-700 rounded-xl p-4 text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ease-in-out"
            placeholder="Ejemplo: Crea un quiz sobre El Señor de los Anillos"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading
                ? "bg-linear-to-r from-indigo-400 to-cyan-400 opacity-70 cursor-not-allowed"
                : "bg-linear-to-r from-indigo-500 to-cyan-400 hover:opacity-90 cursor-pointer"
            } transition-all text-white py-3 rounded-xl text-lg font-semibold shadow-md`}
          >
            {loading ? "Generando..." : "Generar Quiz"}
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          ⚙️{" "}
          {loading
            ? "Creando tu quiz con IA..."
            : "El quiz se generará automáticamente con IA."}
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
