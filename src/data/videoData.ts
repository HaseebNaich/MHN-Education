import { CuratedVideo } from '../types';

export const CURATED_VIDEOS: CuratedVideo[] = [
  {
    id: 'vid-1',
    title: 'Data Structures & Algorithms Full Course in 8 Hours',
    creator: 'freeCodeCamp.org',
    subject: 'Computer Science',
    topic: 'Data Structures & Algorithms',
    level: 'BS CS / Software Engineering',
    duration: '8h 15m',
    youtubeId: '8hly31xKLI0',
    description: 'Master arrays, linked lists, stacks, queues, binary trees, dynamic programming, and algorithm complexity analysis.',
    keyTakeaways: [
      'Big O notation and time-space tradeoffs.',
      'Recursion vs Iteration in tree traversals.',
      'Dynamic Programming memoization strategies.'
    ]
  },
  {
    id: 'vid-2',
    title: 'Calculus 1 Full College Course',
    creator: 'Khan Academy / 3Blue1Brown',
    subject: 'Mathematics',
    topic: 'Calculus & Derivatives',
    level: 'FSC / BS Level',
    duration: '4h 30m',
    youtubeId: 'WUvTyaaNkzM',
    description: 'Visual intuition of derivatives, limits, chain rule, and fundamental theorem of calculus with step-by-step examples.',
    keyTakeaways: [
      'Intuitive geometric meaning of rate of change.',
      'Derivative shortcuts: Power, Product, and Quotient rules.',
      'Area under curves via Riemann Sums.'
    ]
  },
  {
    id: 'vid-3',
    title: 'Python for Beginners & Full Stack AI',
    creator: 'Programming with Mosh',
    subject: 'Programming',
    topic: 'Python',
    level: 'Beginner to Intermediate',
    duration: '6h 10m',
    youtubeId: '_uQrJ0TkZlc',
    description: 'Complete hands-on Python guide covering variables, data structures, OOP, file handling, and API integration.',
    keyTakeaways: [
      'Clean readable Pythonic code style.',
      'Building CLI applications with error handling.',
      'Working with external APIs and JSON objects.'
    ]
  },
  {
    id: 'vid-4',
    title: 'Agile Scrum & Software Engineering Architecture',
    creator: 'MIT OpenCourseWare',
    subject: 'Software Engineering',
    topic: 'Software Engineering',
    level: 'BS Software Engineering',
    duration: '2h 45m',
    youtubeId: 'z6X5oEIg6Ak',
    description: 'University level lecture on software lifecycle, agile sprints, system architecture, and UML design patterns.',
    keyTakeaways: [
      'Iterative development vs traditional waterfall.',
      'Clean Architecture and separation of concerns.',
      'Requirements engineering with SRS documentation.'
    ]
  }
];
