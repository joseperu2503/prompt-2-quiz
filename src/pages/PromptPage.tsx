import type { MouseEvent } from "react";
import { useNavigate } from "react-router";

const PromptPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    navigate("/question");
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
          />

          {/* Botón */}
          <button
            onClick={handleSubmit}
            className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white py-3 rounded-xl text-lg font-semibold shadow-md"
          >
            Generar Quiz
          </button>
        </div>

        {/* Vista previa del loader / estado */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            ⚙️ El quiz se generará automáticamente con IA.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
