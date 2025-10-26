import { create } from "zustand";

export interface Question {
  question: string;
  options: string[];
  correct: number;
}

interface QuizState {
  prompt: string;
  questions: Question[];
  answers: number[]; // índices seleccionados por el usuario
  setPrompt: (prompt: string) => void;
  setQuestions: (questions: Question[]) => void;
  setAnswers: (answers: number[]) => void;
  addAnswer: (answerIndex: number) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  prompt: "",
  questions: [],
  answers: [],
  setPrompt: (prompt) => set({ prompt }),
  setQuestions: (questions) => set({ questions, answers: [] }),
  setAnswers: (answers) => set({ answers }),
  addAnswer: (answerIndex) =>
    set((state) => ({ answers: [...state.answers, answerIndex] })),
  resetQuiz: () => set({ prompt: "", questions: [], answers: [] }),
}));
