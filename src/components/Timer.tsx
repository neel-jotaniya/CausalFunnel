import { useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export function Timer() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.timeRemaining > 0) {
        dispatch({ type: 'SET_TIME_REMAINING', payload: state.timeRemaining - 1 });
      } else {
        navigate('/results');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.timeRemaining, dispatch, navigate]);

  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;

  const timerClasses = isMobile
    ? "fixed top-4 left-4 right-4 bg-white shadow-lg rounded-lg px-4 py-2 animate-fade-in z-50"
    : "fixed top-4 right-4 bg-white shadow-lg rounded-lg px-4 py-2 animate-fade-in z-50";

  return (
    <div className={timerClasses}>
      <div className="text-xl md:text-2xl font-bold text-center">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
    </div>
  );
}