# Quiz Application

## Overview
This is a modern, interactive quiz application built with React, TypeScript, and Tailwind CSS. The application fetches trivia questions from the Open Trivia Database (OpenTDB) API and presents them in an engaging interface with features like a countdown timer, question navigation, and detailed results.


## Technical Stack
- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Routing**: React Router
- **UI Components**: shadcn/ui
- **API Integration**: OpenTDB API

## Project Structure
```
src/
├── components/
│   ├── Timer.tsx            # Countdown timer component
│   └── QuestionNavigation.tsx # Question navigation panel
├── context/
│   └── QuizContext.tsx      # Global state management
├── pages/
│   ├── Start.tsx           # Email collection page
│   ├── Quiz.tsx            # Main quiz interface
│   └── Results.tsx         # Results display page
└── types/
    └── quiz.ts             # TypeScript definitions
```

## Setup Instructions
1. Clone the repository
```bash
git clone <repository-url>
cd quiz-application
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## Implementation Details

### State Management
The application uses React Context (QuizContext) to manage:
- Quiz questions and answers
- Timer state
- Navigation state
- User responses

### Components
1. **Timer**: 
   - Displays countdown from 30 minutes
   - Auto-submits quiz when time expires
   - Responsive positioning for different screen sizes

2. **QuestionNavigation**:
   - Visual overview of all questions
   - Indicates visited and answered questions
   - Allows direct navigation to any question

3. **Quiz Interface**:
   - Displays current question and options
   - Maintains answer state
   - Handles navigation between questions

### Responsive Design
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements
- Optimized navigation for mobile devices

## Challenges and Solutions

1. **Answer Randomization**:
   - Challenge: Answer options were re-randomizing on each render
   - Solution: Implemented useMemo hook to stabilize answer order

2. **State Management**:
   - Challenge: Complex state interactions between components
   - Solution: Centralized state management with Context API

3. **Timer Synchronization**:
   - Challenge: Keeping timer accurate across navigation
   - Solution: Implemented persistent timer state in context
