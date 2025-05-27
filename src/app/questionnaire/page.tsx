'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, setDoc } from 'firebase/firestore';

const questions = [
  {
    id: 1,
    question: 'What is your current education level?',
    options: ['High School', 'Undergraduate', 'Graduate', 'Other'],
  },
  {
    id: 2,
    question: 'What subjects are you interested in?',
    options: ['Math', 'Science', 'Computer Science', 'English', 'Others'],
  },
  {
    id: 3,
    question: 'How many hours do you study daily?',
    options: ['Less than 1 hour', '1-2 hours', '3-4 hours', 'More than 4 hours'],
  },
  {
    id: 4,
    question: 'What is your preferred learning style?',
    options: ['Reading', 'Watching Videos', 'Interactive Activities', 'Listening'],
  },
];

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleOptionClick = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (user) {
        // Save to Firestore under user profile
        await setDoc(
          doc(db, 'users', user.uid),
          {
            questionnaireAnswers: answers,
            course: answers[0] || '',
            interests: answers[1] || '',
            learningStyle: answers[3] || '',
            progress: '0%',
            avatarUrl: '',
            questionnaireCompleted: true,
          },
          { merge: true }
        );

        // Save to general collection (optional)
        await addDoc(collection(db, 'questionnaireAnswers'), {
          userId: user.uid,
          answers,
          createdAt: serverTimestamp(),
        });

        // ✅ Redirect to roadmap
        router.push('/roadmap');
      } else {
        throw new Error('User not logged in');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to save your answers. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#961ba0] to-[#6a0dad] p-4">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-lg border border-white/20">
        <h1 className="text-3xl font-bold mb-6 text-white">Tell us about yourself</h1>
        <p className="mb-4 text-lg text-white">{questions[currentStep].question}</p>
        <p className="mb-6 text-sm text-white/80">
          Question {currentStep + 1} of {questions.length}
        </p>

        <div className="flex flex-col space-y-3 mb-6">
          {questions[currentStep].options.map((option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`p-3 rounded-lg border border-white/30 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#e0b1ee] ${
                answers[currentStep] === option
                  ? 'bg-[#38b6ff] border-[#38b6ff] text-white font-semibold shadow-md'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              disabled={isSaving}
            >
              {option}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 text-red-300 font-semibold">{error}</p>}

        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0 || isSaving}
            className="bg-white/20 disabled:opacity-50 text-white py-2 px-4 rounded-lg font-semibold transition duration-200 hover:bg-[#38b6ff] hover:text-white border border-white/30"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={!answers[currentStep] || isSaving}
            className="bg-[#38b6ff] disabled:opacity-50 text-white py-2 px-4 rounded-lg font-semibold transition duration-200 hover:bg-[#e0b1ee] shadow-md hover:shadow-lg"
          >
            {currentStep === questions.length - 1 ? (isSaving ? 'Saving...' : 'Finish') : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}