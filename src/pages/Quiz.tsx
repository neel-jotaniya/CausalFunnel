import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Timer } from '../components/Timer';
import { QuestionNavigation } from '../components/QuestionNavigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Quiz() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!state.email || state.questions.length === 0) {
      navigate('/');
    }
  }, [state.email, state.questions.length, navigate]);

  const currentQuestion = state.questions[state.currentQuestion];
  const userAnswer = state.userAnswers.find(
    (a) => a.questionIndex === state.currentQuestion
  );

  // Use useMemo to ensure answers are sorted only once per question
  const allAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  const handleAnswerSelect = (answer: string) => {
    dispatch({
      type: 'SET_ANSWER',
      payload: { questionIndex: state.currentQuestion, answer },
    });
  };

  const handleNext = () => {
    if (state.currentQuestion < state.questions.length - 1) {
      const nextQuestion = state.currentQuestion + 1;
      dispatch({ type: 'SET_CURRENT_QUESTION', payload: nextQuestion });
      dispatch({ type: 'ADD_VISITED_QUESTION', payload: nextQuestion });
    } else {
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestion > 0) {
      dispatch({
        type: 'SET_CURRENT_QUESTION',
        payload: state.currentQuestion - 1,
      });
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 transition-all duration-300">
      <Timer />
      {!isMobile && <QuestionNavigation />}
      
      <div className="max-w-2xl mx-auto mt-8 md:mt-16 animate-fade-in">
        <Card className="p-4 md:p-6">
          <div className="mb-6">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              Question {state.currentQuestion + 1} of {state.questions.length}
            </h2>
            <p className="text-gray-600 text-sm">{currentQuestion.category}</p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-base md:text-lg mb-4" 
                dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
            
            <div className="space-y-3">
              {allAnswers.map((answer, index) => (
                <button
                  key={index}
                  className={`w-full p-3 md:p-4 text-left rounded-lg border transition-all duration-200 hover:shadow-md ${
                    userAnswer?.answer === answer
                      ? 'border-primary bg-primary/10 scale-[1.02]'
                      : 'border-gray-200 hover:border-primary hover:scale-[1.01]'
                  }`}
                  onClick={() => handleAnswerSelect(answer)}
                  dangerouslySetInnerHTML={{ __html: answer }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={state.currentQuestion === 0}
              className="w-full md:w-auto transition-transform duration-200 hover:scale-[1.02]"
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="w-full md:w-auto transition-transform duration-200 hover:scale-[1.02]"
            >
              {state.currentQuestion === state.questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </Card>

        {isMobile && (
          <div className="mt-6">
            <QuestionNavigation />
          </div>
        )}
      </div>
    </div>
  );
}