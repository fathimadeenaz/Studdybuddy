'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Level = 'Beginner' | 'Intermediate' | 'Advanced';

const roadmap: Record<Level, string[]> = {
  Beginner: [
    'Basics of Math',
    'Introduction to Programming',
    'Basic Science',
  ],
  Intermediate: [
    'Algebra',
    'Data Structures',
    'Physics Fundamentals',
  ],
  Advanced: [
    'Calculus',
    'Algorithms',
    'Advanced Physics',
  ],
};

const getBadge = (level: string) => {
  switch (level) {
    case 'Beginner':
      return '🐣';
    case 'Intermediate':
      return '🚀';
    case 'Advanced':
      return '🏆';
    default:
      return '';
  }
};

const getMotivationMessage = (score: number, maxScore: number) => {
  if (score === 0) {
    return "Don't worry, keep practicing and you'll improve!";
  } else if (score === maxScore) {
    return "Perfect score! Amazing job!";
  } else if (score >= maxScore * 0.7) {
    return "Great effort! Keep going!";
  } else {
    return "Good try! Keep studying and you'll get better!";
  }
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const levelParam = searchParams.get('level');
  const level: Level = (levelParam === 'Beginner' || levelParam === 'Intermediate' || levelParam === 'Advanced')
    ? levelParam
    : 'Beginner';
  const scoreStr = searchParams.get('score') || '0';
  const score = parseInt(scoreStr, 10);
  const maxScore = 15;

  const roadmapForLevel = roadmap[level] ?? roadmap['Beginner'];

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white flex justify-center items-center p-6">
      <div
        className={`max-w-xl w-full border border-white/20 bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-lg transition-all duration-700 ease-out 
          ${animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      >
        <h1 className="text-3xl font-bold mb-4 text-[#38b6ff]">🎓 Your Result</h1>

        <p className="text-lg mb-2">
          Level: <span className="font-semibold">{level} {getBadge(level)}</span>
        </p>

        <p className="text-lg">
          Score: <span className="font-semibold">{score} / {maxScore}</span>
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-4 my-3">
          <div
            className="bg-[#38b6ff] h-4 rounded-full transition-all duration-500"
            style={{ width: `${(score / maxScore) * 100}%` }}
          />
        </div>

        <p className="mb-6 italic text-white/80">{getMotivationMessage(score, maxScore)}</p>

        <h2 className="text-2xl font-semibold mb-4 text-[#38b6ff]">📚 Your Learning Roadmap</h2>

        <ul className="list-disc list-inside space-y-2 text-white">
          {roadmapForLevel.map((subject, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span>📘</span> {subject}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={() => router.push('/difficulty-test')}
            className="bg-[#38b6ff] hover:bg-[#e0b1ee] text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            Retake Test
          </button>
          <button
            onClick={() => router.push('/home')}
            className="bg-[#38b6ff] hover:bg-[#e0b1ee] text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            Start Learning
          </button>
        </div>
      </div>
    </main>
  );
}
