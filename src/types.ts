export type AcademicLevel = 
  | 'grade-1-5'
  | 'grade-6-8'
  | 'matric-9-10'
  | 'fsc-pre-eng'
  | 'fsc-pre-med'
  | 'ics'
  | 'icom'
  | 'dae'
  | 'o-level'
  | 'a-level'
  | 'bs-se'
  | 'bs-cs'
  | 'bs-ai'
  | 'bs-ds'
  | 'bs-cyber'
  | 'bs-math'
  | 'bs-eng'
  | 'masters'
  | 'competitive-exams';

export interface CurriculumTopic {
  id: string;
  title: string;
  subject: string;
  level: AcademicLevel;
  levelLabel: string;
  category: 'School' | 'Board Exams' | 'College' | 'Computer Science' | 'Software Engineering' | 'Mathematics' | 'Higher Ed' | 'Competitive';
  estimatedMinutes: number;
  summary: string;
  sections: {
    introduction: string;
    basicConcepts: string;
    intermediateExplanation: string;
    advancedExplanation: string;
    applications: string[];
    examples: { title: string; detail: string; solution?: string }[];
    diagramFlowchart?: string; // Textual diagram / ASCII flowchart representation
    practiceQuestions: string[];
    mcqs: { question: string; options: string[]; answerIndex: number; explanation: string }[];
    interviewQuestions: { question: string; answer: string }[];
    assignments: string[];
    revisionNotes: string[];
  };
}

export interface ProgrammingLanguagePath {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  levels: {
    beginner: { topics: string[]; sampleCode: string };
    intermediate: { topics: string[]; sampleCode: string };
    advanced: { topics: string[]; sampleCode: string };
  };
  projects: { title: string; description: string; difficulty: 'Beginner' | 'Intermediate' | 'Advanced' }[];
  interviewQuestions: { question: string; answer: string }[];
  exercises: { title: string; prompt: string; initialCode: string; solution: string }[];
}

export interface OpenBookResource {
  id: string;
  title: string;
  author: string;
  subject: string;
  level: string;
  difficulty: 'Introductory' | 'Intermediate' | 'Advanced' | 'Expert';
  language: string;
  universityOrPublisher: string;
  license: string;
  description: string;
  legalUrl: string;
  coverColor: string;
  downloadFormat: 'PDF' | 'Web Docs' | 'HTML' | 'EPUB';
}

export interface CuratedVideo {
  id: string;
  title: string;
  creator: string;
  subject: string;
  topic: string;
  level: string;
  duration: string;
  youtubeId: string;
  description: string;
  keyTakeaways: string[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Algorithms' | 'Data Structures' | 'Strings' | 'Math' | 'Dynamic Programming' | 'System Design';
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  starterCode: Record<string, string>; // lang -> code
  testCases: { input: string; expectedOutput: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface StudyPlanItem {
  day: number;
  dateStr: string;
  topic: string;
  subject: string;
  durationMinutes: number;
  taskType: 'Theory Note' | 'Practice Quiz' | 'Coding Problem' | 'Revision';
  completed: boolean;
}

export interface UserProgress {
  completedTopicIds: string[];
  savedNoteIds: string[];
  bookmarkedBookIds: string[];
  solvedChallengeIds: string[];
  quizScores: Record<string, number>;
  streakDays: number;
  certificates: { courseName: string; issueDate: string; certificateId: string }[];
}
