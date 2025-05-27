'use client';

import { useState, useEffect } from 'react';
import { db, auth } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const questions = [
  { question: 'What is 2 + 2?', options: ['3', '4', '5', '6'], answer: '4' },
  { question: 'Which one is a mammal?', options: ['Shark', 'Frog', 'Whale', 'Octopus'], answer: 'Whale' },
  { question: 'What color do you get by mixing red and blue?', options: ['Purple', 'Green', 'Orange', 'Yellow'], answer: 'Purple' },
  { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Mars' },
  { question: 'What is 10 / 2?', options: ['2', '5', '10', '20'], answer: '5' },
  { question: 'What gas do plants breathe in?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Carbon Dioxide' },
  { question: 'Who wrote "Romeo and Juliet"?', options: ['Shakespeare', 'Dickens', 'Tolkien', 'Rowling'], answer: 'Shakespeare' },
  { question: 'What is H2O?', options: ['Oxygen', 'Hydrogen', 'Water', 'Salt'], answer: 'Water' },
  { question: 'What language is primarily spoken in Brazil?', options: ['Spanish', 'English', 'Portuguese', 'French'], answer: 'Portuguese' },
  { question: 'Which is the largest ocean?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
  { question: 'What is 7 * 6?', options: ['42', '36', '48', '56'], answer: '42' },
  { question: 'Which organ pumps blood?', options: ['Brain', 'Heart', 'Lungs', 'Liver'], answer: 'Heart' },
  { question: 'What do bees collect?', options: ['Water', 'Pollen', 'Nectar', 'Leaves'], answer: 'Nectar' },
  { question: 'What is the boiling point of water?', options: ['50°C', '100°C', '150°C', '200°C'], answer: '100°C' },
  { question: 'Which element has the chemical symbol "O"?', options: ['Oxygen', 'Gold', 'Osmium', 'Iron'], answer: 'Oxygen' },
];

const getBadge = (level: string) => {
  switch (level) {
    case 'Beginner': return '🐣';
    case 'Intermediate': return '🚀';
    case 'Advanced': return '🏆';
    default: return '';
  }
};

export default function DifficultyTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [level, setLevel] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (showResult) setAnimate(true);
  }, [showResult]);

  const handleNext = async () => {
    if (isProcessing || !questions[currentQuestion]) return;
    setIsProcessing(true);

    const isCorrect = selectedOption === questions[currentQuestion].answer;
    const newScore = isCorrect ? score + 1 : score;
    setScore(newScore);

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      const level = newScore <= 5 ? 'Beginner' : newScore <= 10 ? 'Intermediate' : 'Advanced';
      setFinalScore(newScore);
      setLevel(level);
      setShowResult(true);

      try {
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, 'users', user.uid), { score: newScore, level }, { merge: true });
        }
      } catch (error) {
        console.error('Error saving results:', error);
        alert('Failed to save your results. Please try again.');
        setIsProcessing(false);
        return;
      }

      setTimeout(() => {
        router.push(`/result?score=${newScore}&level=${level}`);
      }, 3000);
    } else {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption('');
      setIsProcessing(false);
    }
  };

  const current = questions[currentQuestion];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#961ba0] to-[#6a0dad] text-white flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-lg">
        {!showResult ? (
          current ? (
            <>
              <h2 className="text-xl font-bold mb-4 text-white/80">
                Question {currentQuestion + 1} of {questions.length}
              </h2>
              <p className="mb-6">{current.question}</p>
              <div className="space-y-2 mb-6">
                {current.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedOption(option)}
                    className={`w-full py-2 px-4 rounded-lg font-medium transition duration-300 ${
                      selectedOption === option
                        ? 'bg-[#38b6ff] text-[#4B3621]'
                        : 'bg-white/10 text-white hover:border-[#38b6ff] border border-white/20'
                    }`}
                    disabled={isProcessing}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={handleNext}
                disabled={!selectedOption || isProcessing}
                className={`bg-[#38b6ff] hover:bg-[#e0b1ee] text-[#4B3621] px-4 py-2 rounded-full font-semibold transition duration-300 ${
                  !selectedOption || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
              </button>
            </>
          ) : (
            <p className="text-center text-red-400">Failed to load question.</p>
          )
        ) : (
          <div className={`text-center transition-all duration-700 ease-out ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
            <div className="text-3xl font-bold mb-4 text-white">🎉 Test Complete!</div>
            <div className="bg-[#38b6ff] inline-block px-6 py-2 rounded-full text-[#4B3621] font-semibold shadow-md mb-4">
              {getBadge(level)} You’re a {level}!
            </div>
            <p className="mt-4 text-sm text-white/80">
              Your score: {finalScore} / {questions.length}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
