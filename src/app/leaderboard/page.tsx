// src/app/leaderboard/page.tsx
'use client';

import Link from 'next/link';

export default function LeaderboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white p-6">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/10 backdrop-blur-sm border-b border-white/20 shadow-md sticky top-0 z-50 rounded-b-xl">
        <h1 className="text-2xl font-bold text-[#e0b1ee]">StuddyBuddy</h1>
        <div className="space-x-4 text-sm">
          <Link href="/home" className="text-[#38b6ff] hover:text-[#e0b1ee]">Home</Link>
          <Link href="/chat-with-docs" className="text-[#38b6ff] hover:text-[#e0b1ee]">Chat with Docs</Link>
          <Link href="/leaderboard" className="text-[#38b6ff] hover:text-[#e0b1ee]">Leaderboard</Link>
          <Link href="/profile" className="text-[#38b6ff] hover:text-[#e0b1ee]">Profile</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto p-6 mt-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-[#38b6ff]">🏆 Leaderboard</h2>
        <ul className="space-y-4 text-lg">
          <li className="bg-white/20 text-white p-4 rounded-lg shadow-md border border-white/20">
            🥇 <span className="text-[#38b6ff] font-semibold">Alice</span> - 980 points
          </li>
          <li className="bg-white/20 text-white p-4 rounded-lg shadow-md border border-white/20">
            🥈 <span className="text-[#e0b1ee] font-semibold">Bob</span> - 870 points
          </li>
          <li className="bg-white/20 text-white p-4 rounded-lg shadow-md border border-white/20">
            🥉 <span className="text-[#38b6ff] font-semibold">Charlie</span> - 800 points
          </li>
        </ul>
      </section>
    </main>
  );
}
