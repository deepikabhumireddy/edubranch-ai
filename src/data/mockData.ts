export const courses = [
  { id: 1, title: "Python for Beginners", category: "Development", lessons: 16, duration: "8h 10min", rating: 4.7, progress: 65, color: "hsl(24, 95%, 53%)" },
  { id: 2, title: "UI/UX Design Fundamentals", category: "Design", lessons: 13, duration: "6h 30min", rating: 4.5, progress: 40, color: "hsl(217, 91%, 60%)" },
  { id: 3, title: "JavaScript Essentials", category: "Development", lessons: 12, duration: "3h 12min", rating: 4.7, progress: 80, color: "hsl(38, 92%, 50%)" },
  { id: 4, title: "Data Structures & Algorithms", category: "Development", lessons: 20, duration: "12h", rating: 4.8, progress: 30, color: "hsl(142, 71%, 45%)" },
  { id: 5, title: "Responsive Web Design", category: "Design", lessons: 10, duration: "5h", rating: 4.6, progress: 90, color: "hsl(280, 65%, 60%)" },
];

export const assessments = [
  { id: 1, title: "Python Basics Quiz", type: "quiz" as const, questions: 20, duration: 30, status: "completed" as const, score: 85, timeTaken: 22, date: "2025-09-10" },
  { id: 2, title: "JS Coding Challenge", type: "coding" as const, questions: 5, duration: 60, status: "completed" as const, score: 92, timeTaken: 48, date: "2025-09-08" },
  { id: 3, title: "UI Design Principles", type: "quiz" as const, questions: 15, duration: 20, status: "pending" as const, score: null, timeTaken: null, date: "2025-09-15" },
  { id: 4, title: "Algorithm Challenge", type: "coding" as const, questions: 3, duration: 90, status: "pending" as const, score: null, timeTaken: null, date: "2025-09-18" },
  { id: 5, title: "CSS Layout Mastery", type: "quiz" as const, questions: 25, duration: 35, status: "completed" as const, score: 78, timeTaken: 30, date: "2025-09-05" },
];

export const weeklyPerformance = [
  { day: "Mon", score: 72, time: 45 },
  { day: "Tue", score: 85, time: 60 },
  { day: "Wed", score: 90, time: 55 },
  { day: "Thu", score: 78, time: 70 },
  { day: "Fri", score: 88, time: 50 },
  { day: "Sat", score: 65, time: 30 },
  { day: "Sun", score: 92, time: 40 },
];

export const monthlyPerformance = [
  { week: "W1", score: 75, completion: 60 },
  { week: "W2", score: 80, completion: 70 },
  { week: "W3", score: 85, completion: 78 },
  { week: "W4", score: 88, completion: 85 },
];

export const leaderboard = [
  { rank: 1, name: "Michael Turner", score: 10568, courses: 25, hours: 832, certs: 32, avatar: "MT" },
  { rank: 2, name: "Ethan Brooks", score: 10112, courses: 23, hours: 752, certs: 25, avatar: "EB" },
  { rank: 3, name: "Alex Johnson", score: 9052, courses: 21, hours: 700, certs: 28, avatar: "AJ" },
  { rank: 4, name: "Olivia Bennett", score: 8025, courses: 20, hours: 620, certs: 25, avatar: "OB" },
  { rank: 5, name: "Logan Mitchell", score: 7850, courses: 18, hours: 580, certs: 20, avatar: "LM" },
];

export const activeDays = [3, 5, 6, 8, 9, 10, 12, 13, 15, 17, 19, 20, 22, 24, 25, 27];

export const tasks = [
  { id: 1, title: "Complete Python Module 5", reward: 500, type: "course" as const },
  { id: 2, title: "Submit JS Coding Challenge", reward: 1500, type: "assessment" as const },
  { id: 3, title: "Watch Design Intro Lecture", reward: 250, type: "course" as const },
  { id: 4, title: "Submit project draft for review", reward: 500, type: "assessment" as const },
];

export const students = [
  { id: 1, name: "Alex Johnson", avgScore: 85, courses: 5, drift: -2.3, trend: "stable" as const, avatar: "AJ" },
  { id: 2, name: "Michael Turner", avgScore: 92, courses: 8, drift: 3.1, trend: "up" as const, avatar: "MT" },
  { id: 3, name: "Ethan Brooks", avgScore: 78, courses: 6, drift: -8.5, trend: "down" as const, avatar: "EB" },
  { id: 4, name: "Olivia Bennett", avgScore: 88, courses: 7, drift: 1.2, trend: "up" as const, avatar: "OB" },
  { id: 5, name: "Logan Mitchell", avgScore: 65, courses: 4, drift: -12.1, trend: "down" as const, avatar: "LM" },
  { id: 6, name: "Sophia Davis", avgScore: 95, courses: 9, drift: 5.4, trend: "up" as const, avatar: "SD" },
];

export const doubts = [
  { id: 1, student: "Alex Johnson", question: "How does recursion work in Python?", course: "Python for Beginners", status: "open" as const, date: "2025-09-14" },
  { id: 2, student: "Ethan Brooks", question: "Difference between flexbox and grid?", course: "Responsive Web Design", status: "open" as const, date: "2025-09-13" },
  { id: 3, student: "Logan Mitchell", question: "What is Big O notation?", course: "Data Structures & Algorithms", status: "resolved" as const, date: "2025-09-10", answer: "Big O notation describes the upper bound of time complexity..." },
];

export const scheduleEvents = [
  { time: "13:30 - 15:20", title: "Python fundamentals: first step into coding", color: "hsl(142, 71%, 45%)" },
  { time: "16:20 - 18:00", title: "Responsive Design Basics: adapt your UI", color: "hsl(24, 95%, 53%)" },
];

export const quizQuestions = [
  { id: 1, question: "What is the output of print(2 ** 3)?", options: ["6", "8", "9", "5"], correct: 1 },
  { id: 2, question: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], correct: 2 },
  { id: 3, question: "What data type is the result of: 10 / 3?", options: ["int", "float", "str", "bool"], correct: 1 },
  { id: 4, question: "Which method adds an element to the end of a list?", options: ["add()", "push()", "append()", "insert()"], correct: 2 },
  { id: 5, question: "What does 'len()' function return?", options: ["Data type", "Length", "Last element", "First element"], correct: 1 },
];
