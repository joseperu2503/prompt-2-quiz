import axios from "axios";
import { useState, type MouseEvent } from "react";
import { useNavigate } from "react-router";

const PromptPage = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!prompt.trim()) return alert("Por favor, escribe un prompt 🧠");

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/prompt2quiz/generate-quiz",
        {
          prompt,
        }
      );

      console.log("✅ Quiz generado:", response.data);

      // puedes guardar el resultado en el estado global o localStorage si lo necesitas
      navigate("/question");
    } catch (error) {
      console.error("❌ Error al generar el quiz:", error);
      alert("Hubo un error generando el quiz. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-indigo-400 text-center">
          🧠 Prompt2Quiz
        </h1>

        <p className="text-gray-400 mb-8 text-center">
          Escribe un tema o prompt para generar un quiz con inteligencia
          artificial.
        </p>

        <div className="flex flex-col gap-6">
          {/* Área del prompt */}
          <textarea
            className="w-full h-40 bg-gray-900 border border-gray-700 rounded-xl p-4 text-gray-100 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Ejemplo: Crea un quiz sobre El Señor de los Anillos"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          {/* Botón */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            } transition-colors text-white py-3 rounded-xl text-lg font-semibold shadow-md`}
          >
            {loading ? "Generando..." : "Generar Quiz"}
          </button>
        </div>

        {/* Vista previa del loader / estado */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ⚙️{" "}
            {loading
              ? "Creando tu quiz con IA..."
              : "El quiz se generará automáticamente con IA."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
