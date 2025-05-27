// components/Leaderboard.tsx
'use client';

import React from 'react';

type StudentScore = {
  id: number;
  name: string;
  score: number;
};

const dummyData: StudentScore[] = [
  { id: 1, name: 'Alice', score: 98 },
  { id: 2, name: 'Bob', score: 92 },
  { id: 3, name: 'Charlie', score: 88 },
  { id: 4, name: 'Diana', score: 85 },
  { id: 5, name: 'Ethan', score: 80 },
];

export default function Leaderboard() {
  return (
    <div className="max-w-md mx-auto bg-[#4B3621] rounded-xl p-4 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
      <ol className="list-decimal list-inside space-y-2">
        {dummyData.map(({ id, name, score }) => (
          <li key={id} className="flex justify-between text-lg">
            <span>{name}</span>
            <span>{score} pts</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
