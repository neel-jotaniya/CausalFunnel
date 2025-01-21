export interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizResponse {
  response_code: number;
  results: QuizQuestion[];
}

export interface UserAnswer {
  questionIndex: number;
  answer: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  userAnswers: UserAnswer[];
  currentQuestion: number;
  visitedQuestions: number[];
  timeRemaining: number;
  email: string;
}