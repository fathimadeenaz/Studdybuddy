'use client';

import React, { JSX } from 'react';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  BookOpen,
  FlaskConical,
  Sigma,
  Code2,
  FileText,
  Atom,
  PenLine,
  Brain,
  PlayCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

type Level = 'Beginner' | 'Intermediate' | 'Advanced';

const roadmap: Record<Level, string[]> = {
  Beginner: ['Basic Math', 'Basic Science', 'Intro to Programming', 'Grammar Basics'],
  Intermediate: ['Algebra', 'Biology', 'JavaScript Basics', 'Essay Writing'],
  Advanced: ['Calculus', 'Physics', 'Data Structures', 'Literary Analysis'],
};

const subjectIcons: Record<string, () => JSX.Element> = {
  'Basic Math': () => <Sigma className="w-6 h-6 text-[#38b6ff]" />,
  'Basic Science': () => <FlaskConical className="w-6 h-6 text-[#e0b1ee]" />,
  'Intro to Programming': () => <Code2 className="w-6 h-6 text-[#38b6ff]" />,
  'Grammar Basics': () => <BookOpen className="w-6 h-6 text-[#e0b1ee]" />,
  Algebra: () => <Sigma className="w-6 h-6 text-[#38b6ff]" />,
  Biology: () => <Atom className="w-6 h-6 text-[#e0b1ee]" />,
  'JavaScript Basics': () => <Code2 className="w-6 h-6 text-[#38b6ff]" />,
  'Essay Writing': () => <PenLine className="w-6 h-6 text-[#e0b1ee]" />,
  Calculus: () => <Brain className="w-6 h-6 text-[#38b6ff]" />,
  Physics: () => <Atom className="w-6 h-6 text-[#e0b1ee]" />,
  'Data Structures': () => <Code2 className="w-6 h-6 text-[#38b6ff]" />,
  'Literary Analysis': () => <FileText className="w-6 h-6 text-[#e0b1ee]" />,
};

const subjectProgress: Record<string, number> = {
  'Basic Math': 30,
  'Basic Science': 50,
  'Intro to Programming': 10,
  'Grammar Basics': 70,
  Algebra: 40,
  Biology: 20,
  'JavaScript Basics': 60,
  'Essay Writing': 90,
  Calculus: 15,
  Physics: 35,
  'Data Structures': 45,
  'Literary Analysis': 80,
};

export default function RoadmapPage() {
  const [level, setLevel] = useState<Level | ''>('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserLevel = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (['Beginner', 'Intermediate', 'Advanced'].includes(data.level)) {
            setLevel(data.level as Level);
          }
        }
      }
      setLoading(false);
    };

    fetchUserLevel();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#961ba0] to-[#6a0dad] p-6">
        <svg
          className="animate-spin h-10 w-10 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <span className="sr-only">Loading roadmap...</span>
      </main>
    );
  }

  if (!level) {
    return (
      <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#961ba0] to-[#6a0dad] p-6 text-white">
        <h2 className="text-3xl mb-4">Roadmap Not Found</h2>
        <p className="mb-6 text-center max-w-md">
          Please complete the difficulty test to unlock your personalized learning
          roadmap.
        </p>
        <button
          onClick={() => router.push('/difficulty-test')}
          className="bg-[#38b6ff] hover:bg-[#e0b1ee] px-6 py-3 rounded-lg font-semibold text-white transition shadow-md"
        >
          Take Difficulty Test
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#961ba0] to-[#6a0dad] p-6 flex flex-col items-center text-white">
      <h1 className="text-4xl font-bold mb-8">Your {level} Learning Roadmap</h1>
      <section className="grid gap-8 w-full max-w-4xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {roadmap[level].map((subject) => {
          const Icon = subjectIcons[subject] || BookOpen;

          return (
            <article
              key={subject}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 flex flex-col hover:border-[#38b6ff] transition-colors"
            >
              <header className="flex items-center gap-3 mb-4">
                <Icon />
                <h2 className="text-xl font-semibold">{subject}</h2>
              </header>
              <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden mb-2">
                <div
                  className="bg-[#38b6ff] h-3 rounded-full transition-all duration-500"
                  style={{ width: `${subjectProgress[subject] || 0}%` }}
                />
              </div>
              <p className="text-sm text-right text-white/80">
                {subjectProgress[subject] || 0}% complete
              </p>
            </article>
          );
        })}
      </section>

      <button
        onClick={() => router.push('/home')}
        className="mt-12 bg-[#38b6ff] hover:bg-[#e0b1ee] px-8 py-3 rounded-full font-bold text-white shadow-lg transition duration-300"
      >
        Start Learning
      </button>
    </main>
  );
}