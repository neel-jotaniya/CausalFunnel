import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Card } from '@/components/ui/card';

export default function Results() {
  const { state } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.email || state.questions.length === 0) {
      navigate('/');
    }
  }, [state.email, state.questions.length, navigate]);

  const calculateScore = () => {
    let correct = 0;
    state.userAnswers.forEach((answer) => {
      if (state.questions[answer.questionIndex].correct_answer === answer.answer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
          <p className="text-xl mb-4">
            Score: {score} out of {state.questions.length} ({Math.round((score / state.questions.length) * 100)}%)
          </p>
          <p className="text-gray-600">Email: {state.email}</p>
        </Card>

        <div className="space-y-6">
          {state.questions.map((question, index) => {
            const userAnswer = state.userAnswers.find(
              (a) => a.questionIndex === index
            );
            const isCorrect = userAnswer?.answer === question.correct_answer;

            return (
              <Card key={index} className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Question {index + 1}
                  </h3>
                  <p className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium mb-2">Your Answer:</p>
                    <div
                      className={`p-3 rounded-lg ${
                        isCorrect ? 'bg-green-100' : 'bg-red-100'
                      }`}
                      dangerouslySetInnerHTML={{ __html: userAnswer?.answer || 'Not answered' }}
                    />
                  </div>
                  <div>
                    <p className="font-medium mb-2">Correct Answer:</p>
                    <div
                      className="p-3 rounded-lg bg-green-100"
                      dangerouslySetInnerHTML={{ __html: question.correct_answer }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}