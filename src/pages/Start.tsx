import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export default function Start() {
  const [email, setEmail] = useState('');
  const { dispatch } = useQuiz();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      const data = await response.json();
      
      if (data.response_code === 0) {
        dispatch({ type: 'SET_QUESTIONS', payload: data.results });
        dispatch({ type: 'SET_EMAIL', payload: email });
        navigate('/quiz');
      } else {
        throw new Error('Failed to fetch questions');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load quiz questions. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to the Quiz</h1>
          <p className="mt-2 text-gray-600">Enter your email to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Start Quiz
          </Button>
        </form>
      </div>
    </div>
  );
}