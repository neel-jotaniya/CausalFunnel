import { useQuiz } from '../context/QuizContext';
import { useIsMobile } from '@/hooks/use-mobile';

export function QuestionNavigation() {
  const { state, dispatch } = useQuiz();
  const isMobile = useIsMobile();

  const handleQuestionClick = (index: number) => {
    dispatch({ type: 'SET_CURRENT_QUESTION', payload: index });
    dispatch({ type: 'ADD_VISITED_QUESTION', payload: index });
  };

  const navigationClasses = isMobile
    ? "w-full bg-white shadow-lg rounded-lg p-4 animate-fade-in"
    : "fixed left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 animate-fade-in";

  return (
    <div className={navigationClasses}>
      <div className="grid grid-cols-5 md:grid-cols-3 gap-2">
        {state.questions.map((_, index) => {
          const isVisited = state.visitedQuestions.includes(index);
          const isAnswered = state.userAnswers.some(
            (answer) => answer.questionIndex === index
          );
          const isCurrent = state.currentQuestion === index;

          let className = "question-dot transition-all duration-200 hover:scale-110";
          if (isCurrent) className += " current";
          else if (isAnswered) className += " answered";
          else if (isVisited) className += " visited";
          else className += " bg-gray-100";

          return (
            <button
              key={index}
              className={className}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}