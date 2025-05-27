'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user document from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();

        // Redirect based on whether questionnaire is completed
        if (userData.questionnaireCompleted) {
          router.push('/roadmap');
        } else {
          router.push('/questionnaire');
        }
      } else {
        // If no user data, redirect to questionnaire for initial setup
        router.push('/questionnaire');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#961ba0] to-[#6a0dad]">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Login to StuddyBuddy</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="border border-white/30 bg-white/20 text-white p-3 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#e0b1ee]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-white/30 bg-white/20 text-white p-3 rounded-lg placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#e0b1ee]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#38b6ff] text-white py-3 font-semibold rounded-lg hover:bg-[#e0b1ee] transition duration-300 shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-white/80">
          No account?{' '}
          <Link href="/signup" className="text-[#38b6ff] hover:text-[#e0b1ee] underline transition duration-200">
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}