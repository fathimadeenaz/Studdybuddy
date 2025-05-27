export interface LearningContent {
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

export const learningModules: Record<string, LearningContent> = {
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
            { title: 'The Water Cycle', url: 'https://www.youtube.com/embed/al-do-HGuIk' },
            { title: "Newton's Laws of Motion", url: 'https://www.youtube.com/embed/kKKM8Y-u7ds' }
        ],
        quiz: [
            {
                question: 'What gas do plants absorb from the atmosphere?',
                options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
                answerIndex: 2
            },
            {
                question: 'What force keeps us on the ground?',
                options: ['Magnetism', 'Gravity', 'Friction', 'Electricity'],
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
            { title: 'AI Explained', url: 'https://www.youtube.com/embed/2ePf9rue1Ao' },
            { title: 'Machine Learning Basics', url: 'https://www.youtube.com/embed/GwIo3gDZCVQ' }
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
            { title: 'Cybersecurity Basics', url: 'https://www.youtube.com/embed/inWWhr5tnEA' },
            { title: 'How Hackers Hack', url: 'https://www.youtube.com/embed/0Z5N6H47kVQ' }
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

    webdevelopment: {
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
            { title: 'The Renaissance Explained', url: 'https://www.youtube.com/embed/f3CTn2cgV9w' },
            { title: 'World War II Overview', url: 'https://www.youtube.com/embed/HNz0NQq7hCc' }
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
