'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        questionnaireCompleted: false,
        createdAt: new Date(),
      });

      alert('Account created!');
      router.push('/questionnaire'); // Redirect to questionnaire
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#961ba0] to-[#6a0dad]">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Create your StuddyBuddy Account
        </h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSignup}>
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
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-white/80">
          Already have an account?{' '}
          <Link href="/login" className="text-[#38b6ff] hover:text-[#e0b1ee] underline transition duration-200">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}