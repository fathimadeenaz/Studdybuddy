'use client';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#961ba0] to-[#6a0dad] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-white mb-8">
        Welcome to StuddyBuddy
      </h1>
      <button
        onClick={handleGetStarted}
        className="bg-white text-[#961ba0] px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-[#e2a5e7] hover:text-white transition duration-300"
      >
        Get Started
      </button>
    </div>
  );
}