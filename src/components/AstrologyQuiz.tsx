import React, { useState } from 'react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which planet is associated with communication and intellect?",
    options: ["Venus", "Mars", "Mercury", "Jupiter"],
    correctAnswer: "Mercury"
  },
  {
    id: 2,
    text: "What element is associated with the zodiac sign Leo?",
    options: ["Water", "Fire", "Earth", "Air"],
    correctAnswer: "Fire"
  },
  {
    id: 3,
    text: "Which planet rules the sign of Capricorn?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Saturn"
  },
  // Add more questions as needed
];

const AstrologyQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer: string) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg">
      <h3 className="text-3xl font-light mb-6 text-white">Astrology Quiz</h3>
      {showResult ? (
        <div className="text-center">
          <h4 className="text-2xl font-semibold text-indigo-300 mb-4">Your Score: {score} / {questions.length}</h4>
          <button
            onClick={restartQuiz}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h4 className="text-xl font-semibold text-indigo-300 mb-4">Question {currentQuestion + 1} of {questions.length}</h4>
          <p className="text-white text-lg mb-4">{questions[currentQuestion].text}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AstrologyQuiz;