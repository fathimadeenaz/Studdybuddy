'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import VoiceAssistant from '@/components/VoiceAssistant';

const subjects = [
  { name: 'Mathematics', emoji: '📐', path: 'math' },
  { name: 'Science', emoji: '🔬', path: 'science' },
  { name: 'Computer Science', emoji: '💻', path: 'computerscience' },
  { name: 'Cybersecurity', emoji: '🔒', path: 'cybersecurity' },
  { name: 'AI & ML', emoji: '🤖', path: 'aiml' },
  { name: 'Web Dev', emoji: '🌍', path: 'web-dev' },
  { name: 'English', emoji: '📖', path: 'english' },
  { name: 'History', emoji: '🏛️', path: 'history' },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20 shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-[#38b6ff]">StuddyBuddy</h1>
        <div className="space-x-4 text-sm text-white/80">
          <Link href="/home" className="hover:text-[#38b6ff]">Home</Link>
          <Link href="/chat-with-docs" className="hover:text-[#38b6ff]">Chat with Docs</Link>
          <Link href="/leaderboard" className="hover:text-[#38b6ff]">Leaderboard</Link>
          <Link href="/profile" className="hover:text-[#38b6ff]">Profile</Link>
        </div>
      </nav>

      {/* Voice Assistant Intro */}
      <div
        className=" bg-white/10 backdrop-blur-sm border border-white/20 text-white max-w-4xl mx-auto mt-6 p-6 rounded-xl shadow-lg hover:border-[#38b6ff] transition-colors duration-300 select-none"
      >
        <h2 className="text-2xl font-semibold mb-2 text-[#38b6ff]">🎤 Learn with Your Voice Assistant</h2>
        <p className="text-white/80">Speak or type to explore subjects, get answers, and study smarter!</p>
      </div>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center p-8">
        <h2 className="text-3xl font-semibold mb-4 text-white">Welcome to Your Dashboard!</h2>
        <p className="text-white/80 mb-6">Use your voice to explore and learn ✨</p>

        {/* Voice Assistant */}
        <VoiceAssistant />
      </main>

      {/* Search Bar */}
      <div className="px-6 pt-4 max-w-md mx-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search subjects..."
          className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#38b6ff]"
        />
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {filteredSubjects.map(subject => (
          <Link
            key={subject.path}
            href={`/learn/${subject.path}`}
            className="group block p-6 bg-white/10 backdrop-blur-sm rounded-2xl shadow-md border border-white/20 transform transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#38b6ff]"
          >
            <div className="text-4xl mb-2">{subject.emoji}</div>
            <h2 className="text-xl font-semibold group-hover:text-[#38b6ff] transition">{subject.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
