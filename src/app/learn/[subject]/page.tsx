'use client';

// import ReactPlayer from 'react-player';
import React, { use, useState } from 'react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import dynamic from 'next/dynamic';

// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

function VideoPlayer({ url }: { url: string }) {
  return (
    <div className="aspect-video my-4 max-md:w-[99%] w-[80%] h-[75%] rounded-xl overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm shadow-lg">
      {/* <ReactPlayer url={url} width="100%" height="100%" controls /> */}

      <iframe
        src={url}
        title="Video Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
}

interface LearningContent {
  title: string;
  description: string;
  resources: { title: string; url: string }[];
  videos?: { title: string; url: string }[];
  quiz?: {
    question: string;
    options: string[];
    answerIndex: number;
  }[];
}

const learningModules: Record<string, LearningContent> = {
  math: {
    title: 'Mathematics',
    description: 'Master the fundamentals of algebra, geometry, and arithmetic.',
    resources: [
      { title: 'Khan Academy Math', url: 'https://www.khanacademy.org/math' },
      { title: 'Cuemath', url: 'https://www.cuemath.com/learn/maths/' }
    ],
    videos: [
      { title: 'Intro to Algebra', url: 'https://www.youtube.com/embed/MHeirBPOI6w' },
      { title: 'Basic Geometry', url: 'https://www.youtube.com/embed/302eJ3TzJQU' }
    ],
    quiz: [
      {
        question: 'What is 7 x 8?',
        options: ['54', '56', '58', '64'],
        answerIndex: 1
      },
      {
        question: 'How many sides does a pentagon have?',
        options: ['4', '5', '6', '7'],
        answerIndex: 1
      }
    ]
  },

  science: {
    title: 'Science',
    description: 'Explore physics, chemistry, and biology topics.',
    resources: [
      { title: 'Khan Academy Science', url: 'https://www.khanacademy.org/science' },
      { title: 'CK-12 Physical Science', url: 'https://www.ck12.org/physical-science/' }
    ],
    videos: [
      { title: "The Water Cycle", url: "https://www.youtube.com/embed/al-do-HGuIk" },
      { title: "Newton's Laws of Motion", url: "https://www.youtube.com/embed/kKKM8Y-u7ds" }
    ],
    quiz: [
      {
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answerIndex: 2
      },
      {
        question: "What force keeps us on the ground?",
        options: ["Magnetism", "Gravity", "Friction", "Electricity"],
        answerIndex: 1
      }
    ]
  },

  english: {
    title: 'English',
    description: 'Improve your grammar, vocabulary, and reading skills.',
    resources: [
      { title: 'Grammarly Handbook', url: 'https://www.grammarly.com/blog/category/handbook/' },
      { title: 'British Council English Skills', url: 'https://learnenglish.britishcouncil.org/skills' }
    ],
    videos: [
      { title: 'Basic Grammar Rules', url: 'https://www.youtube.com/embed/QXVzmzhxWWc' },
      { title: 'Improve Vocabulary', url: 'https://www.youtube.com/embed/5J6jAC6XxAI' }
    ],
    quiz: [
      {
        question: 'Who was the first President of the United States?',
        options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
        answerIndex: 2
      },
      {
        question: 'Which civilization built the pyramids?',
        options: ['Romans', 'Greeks', 'Egyptians', 'Chinese'],
        answerIndex: 2
      }
    ]
  },

  computerscience: {
    title: 'Computer Science',
    description: 'Start learning programming, algorithms, and basic computer systems.',
    resources: [
      { title: 'W3Schools', url: 'https://www.w3schools.com/' },
      { title: 'CS50 Harvard', url: 'https://cs50.harvard.edu/x/2023/' }
    ],
    videos: [
      { title: 'What is Programming?', url: 'https://www.youtube.com/embed/zOjov-2OZ0E' },
      { title: 'Learn HTML in 10 Minutes', url: 'https://www.youtube.com/embed/UB1O30fR-EE' }
    ],
    quiz: [
      {
        question: 'Which language is used to build websites?',
        options: ['Python', 'HTML', 'C++', 'Java'],
        answerIndex: 1
      },
      {
        question: 'What does CPU stand for?',
        options: [
          'Central Performance Unit',
          'Computer Processing Unit',
          'Central Processing Unit',
          'Core Processor Unit'
        ],
        answerIndex: 2
      }
    ]
  },
  aiml: {
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Introduction to AI concepts, machine learning basics, and practical applications.',
    resources: [
      { title: 'Coursera AI for Everyone', url: 'https://www.coursera.org/learn/ai-for-everyone' },
      { title: 'Google Machine Learning Crash Course', url: 'https://developers.google.com/machine-learning/crash-course' }
    ],
    videos: [
      { title: 'AI Explained', url: 'https://www.youtube.com/embed/2ePf9rue1Ao' },  // AI basics by CrashCourse
      { title: 'Machine Learning Basics', url: 'https://www.youtube.com/embed/GwIo3gDZCVQ' }  // Intro to ML by 3Blue1Brown
    ],
    quiz: [
      {
        question: 'Which algorithm is commonly used in supervised learning?',
        options: ['K-means', 'Linear Regression', 'Apriori', 'DBSCAN'],
        answerIndex: 1
      },
      {
        question: 'What is overfitting in machine learning?',
        options: [
          'Model performs well on training and test data',
          'Model performs poorly on training data',
          'Model performs well on training data but poorly on test data',
          'Model has no variance'
        ],
        answerIndex: 2
      }
    ]
  },

  cybersecurity: {
    title: 'Cybersecurity',
    description: 'Learn the fundamentals of protecting computer systems and networks.',
    resources: [
      { title: 'Cybrary Cybersecurity Training', url: 'https://www.cybrary.it/' },
      { title: 'OWASP Top Ten Security Risks', url: 'https://owasp.org/www-project-top-ten/' }
    ],
    videos: [
      { title: 'Cybersecurity Basics', url: 'https://www.youtube.com/embed/inWWhr5tnEA' },  // Cybersecurity explained
      { title: 'How Hackers Hack', url: 'https://www.youtube.com/embed/0Z5N6H47kVQ' }  // Hacker techniques
    ],
    quiz: [
      {
        question: 'What does the term "phishing" refer to?',
        options: [
          'A type of firewall',
          'A method of stealing sensitive information',
          'Encryption technique',
          'Virus spreading method'
        ],
        answerIndex: 1
      },
      {
        question: 'Which of these is a strong password practice?',
        options: [
          'Using "password123"',
          'Using a unique mix of characters',
          'Using birthdate',
          'Using the same password everywhere'
        ],
        answerIndex: 1
      }
    ]
  },

  webdev: {
    title: 'Web Development',
    description: 'Learn to build websites using HTML, CSS, JavaScript, and modern frameworks.',
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/en-US/' },
      { title: 'FreeCodeCamp Web Development', url: 'https://www.freecodecamp.org/learn/' }
    ],
    videos: [
      { title: 'HTML Crash Course', url: 'https://www.youtube.com/embed/UB1O30fR-EE' },
      { title: 'JavaScript Tutorial for Beginners', url: 'https://www.youtube.com/embed/hdI2bqOjy3c' }
    ],
    quiz: [
      {
        question: 'Which HTML tag is used to create a hyperlink?',
        options: ['<link>', '<a>', '<href>', '<hyperlink>'],
        answerIndex: 1
      },
      {
        question: 'Which language is primarily used to style web pages?',
        options: ['JavaScript', 'HTML', 'CSS', 'Python'],
        answerIndex: 2
      }
    ]
  },

  history: {
    title: 'History',
    description: 'Explore key historical events, civilizations, and their impact on the modern world.',
    resources: [
      { title: 'History Channel', url: 'https://www.history.com/' },
      { title: 'Khan Academy World History', url: 'https://www.khanacademy.org/humanities/world-history' }
    ],
    videos: [
      { title: 'The Renaissance Explained', url: 'https://www.youtube.com/embed/f3CTn2cgV9w' },  // CrashCourse History
      { title: 'World War II Overview', url: 'https://www.youtube.com/embed/HNz0NQq7hCc' }  // History channel video
    ],
    quiz: [
      {
        question: 'When did the Renaissance begin?',
        options: ['14th century', '16th century', '18th century', '20th century'],
        answerIndex: 0
      },
      {
        question: 'Which event started World War II?',
        options: [
          'Assassination of Archduke Franz Ferdinand',
          'Bombing of Pearl Harbor',
          'Invasion of Poland by Germany',
          'Treaty of Versailles'
        ],
        answerIndex: 2
      }
    ]
  }

};

interface LearnSubjectClientPageProps {
  subject: string;
}

function LearnSubjectClientPage({ subject }: LearnSubjectClientPageProps) {
  if (!subject || typeof subject !== 'string') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white p-6 flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold mb-4 text-white/80">Subject not found.</p>
        <button
          onClick={() => (window.location.href = '/home')}
          className="px-4 py-2 bg-[#38b6ff] text-white font-semibold rounded-md hover:bg-[#e0b1ee] transition duration-300"
        >
          ← Back to Home
        </button>
      </main>
    );
  }

  const normalizedSubject = subject.replace(/[-_\s]/g, '').toLowerCase();
  const matchedKey = Object.keys(learningModules).find(
    key => key.replace(/[-_\s]/g, '').toLowerCase() === normalizedSubject
  );
  const content = matchedKey ? learningModules[matchedKey] : null;

  if (!content) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white p-6 flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold mb-4 text-white/80">Subject not found.</p>
        <button
          onClick={() => (window.location.href = '/home')}
          className="px-4 py-2 bg-[#38b6ff] text-white font-semibold rounded-md hover:bg-[#e0b1ee] transition duration-300"
        >
          ← Back to Home
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#961ba0] to-[#6a0dad] text-white p-6">
      <nav className="mb-6">
        <button
          onClick={() => (window.location.href = '/home')}
          className="text-[#38b6ff] underline font-semibold hover:text-[#e0b1ee]"
        >
          ← Back to Home
        </button>
      </nav>

      <h1 className="text-4xl font-bold mb-4 text-[#38b6ff]">{content.title}</h1>
      <p className="mb-6 text-white/80">{content.description}</p>

      {content.resources.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-[#e0b1ee]">Resources</h2>
          <ul className="list-disc list-inside">
            {content.resources.map((res, i) => (
              <li key={i} className="mb-1">
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#38b6ff] hover:text-[#e0b1ee] underline"
                >
                  {res.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Videos */}
      {content.videos && content.videos.length > 0 && (
        <VideoPlaylist videos={content.videos} />
      )}

      {/* Quiz */}
      {content.quiz && content.quiz.length > 0 && (
        <QuizComponent quiz={content.quiz} subject={subject} />
      )}
    </main>
  );
}


function VideoPlaylist({ videos }: { videos: { title: string; url: string }[] }) {
  const [selectedVideo, setSelectedVideo] = useState(videos[0]);

  return (
    <section className="mb-10 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-white">Videos</h2>
      <div className='flex flex-col items-center'>
        <VideoPlayer url={selectedVideo.url} />
        <div className="flex flex-wrap gap-3 mt-4">
          {videos.map((video, index) => (
            <button
              key={index}
              onClick={() => setSelectedVideo(video)}
              className={`px-4 py-2 rounded-lg transition duration-300 border 
              ${video.url === selectedVideo.url
                  ? 'bg-[#38b6ff] text-white border-[#38b6ff]'
                  : 'bg-white/10 text-white/80 border-white/20 hover:bg-[#e0b1ee] hover:text-white'
                }`}
            >
              {video.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface QuizProps {
  quiz: {
    question: string;
    options: string[];
    answerIndex: number;
  }[];
  subject: string;
}

function QuizComponent({ quiz, subject }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const currentQuestion = quiz[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    if (selectedOptionIndex !== null) return;
    setSelectedOptionIndex(index);
    if (index === currentQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOptionIndex(null);
    if (currentQuestionIndex + 1 < quiz.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
      saveQuizResult();
    }
  };

  const saveQuizResult = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      await addDoc(collection(db, 'quizResults'), {
        subject,
        score,
        total: quiz.length,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      setSaveError('Failed to save quiz results. Please try again later.');
      console.error('Error saving quiz results:', error);
    }
    setSaving(false);
  };

  return (
    <section className="mb-10 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl shadow-lg text-white">
      <h2 className="text-2xl font-semibold mb-4 text-white">Quiz</h2>

      {showScore ? (
        <div className="text-center">
          <p className="mb-2 text-xl font-bold text-white">
            You scored {score} out of {quiz.length}
          </p>
          {saving && <p className="text-sm text-white/70">Saving your results...</p>}
          {saveError && <p className="text-sm text-red-400">{saveError}</p>}
          <Link href="/home" className="inline-block mt-4 px-6 py-2 bg-[#38b6ff] hover:bg-[#e0b1ee] rounded-lg font-semibold transition duration-300">
            Back to Home
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-2 text-white/80 font-semibold">
            Question {currentQuestionIndex + 1} of {quiz.length}
          </p>
          <p className="mb-4">{currentQuestion.question}</p>
          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option, i) => {
              const isSelected = selectedOptionIndex === i;
              const isCorrect = currentQuestion.answerIndex === i;
              const isAnswered = selectedOptionIndex !== null;
              let optionClass = 'cursor-pointer rounded-lg px-4 py-2 border transition duration-300';

              if (isAnswered) {
                if (isSelected) {
                  optionClass += isCorrect
                    ? ' bg-green-500 text-white border-green-600'
                    : ' bg-red-500 text-white border-red-600';
                } else if (isCorrect) {
                  optionClass += ' bg-green-400 text-white border-green-600';
                } else {
                  optionClass += ' text-white/60 border-white/20 opacity-50 cursor-not-allowed';
                }
              } else {
                optionClass += ' text-white/80 border-white/20 hover:bg-[#e0b1ee] hover:text-white';
              }

              return (
                <button
                  key={i}
                  onClick={() => handleOptionSelect(i)}
                  disabled={isAnswered}
                  className={optionClass}
                  aria-pressed={isSelected}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {selectedOptionIndex !== null && (
            <button
              onClick={handleNext}
              className="mt-6 px-6 py-2 bg-[#38b6ff] hover:bg-[#e0b1ee] rounded-lg font-semibold transition duration-300"
            >
              {currentQuestionIndex + 1 === quiz.length ? 'Finish Quiz' : 'Next Question'}
            </button>
          )}
        </>
      )}
    </section>
  );
}


export default function Page({ params }: { params: Promise<{ subject: string }> }) {
  const { subject } = use(params);
  return <LearnSubjectClientPage subject={subject} />;
}