import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuizQuestion, QuizState, UserAnswer } from '../types/quiz';

type QuizAction =
  | { type: 'SET_QUESTIONS'; payload: QuizQuestion[] }
  | { type: 'SET_ANSWER'; payload: UserAnswer }
  | { type: 'SET_CURRENT_QUESTION'; payload: number }
  | { type: 'ADD_VISITED_QUESTION'; payload: number }
  | { type: 'SET_TIME_REMAINING'; payload: number }
  | { type: 'SET_EMAIL'; payload: string };

const initialState: QuizState = {
  questions: [],
  userAnswers: [],
  currentQuestion: 0,
  visitedQuestions: [0],
  timeRemaining: 30 * 60, // 30 minutes in seconds
  email: '',
};

const QuizContext = createContext<{
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
} | null>(null);

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_ANSWER':
      const existingAnswerIndex = state.userAnswers.findIndex(
        (a) => a.questionIndex === action.payload.questionIndex
      );
      const newUserAnswers = [...state.userAnswers];
      if (existingAnswerIndex >= 0) {
        newUserAnswers[existingAnswerIndex] = action.payload;
      } else {
        newUserAnswers.push(action.payload);
      }
      return { ...state, userAnswers: newUserAnswers };
    case 'SET_CURRENT_QUESTION':
      return { ...state, currentQuestion: action.payload };
    case 'ADD_VISITED_QUESTION':
      if (!state.visitedQuestions.includes(action.payload)) {
        return {
          ...state,
          visitedQuestions: [...state.visitedQuestions, action.payload],
        };
      }
      return state;
    case 'SET_TIME_REMAINING':
      return { ...state, timeRemaining: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}