import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AITutorModal } from './components/AITutorModal';
import { HomeView } from './components/views/HomeView';
import { CurriculumView } from './components/views/CurriculumView';
import { ProgrammingView } from './components/views/ProgrammingView';
import { SoftwareEngineeringView } from './components/views/SoftwareEngineeringView';
import { ComputerScienceView } from './components/views/ComputerScienceView';
import { MathematicsView } from './components/views/MathematicsView';
import { LibraryView } from './components/views/LibraryView';
import { VideoLibraryView } from './components/views/VideoLibraryView';
import { CodingPracticeView } from './components/views/CodingPracticeView';
import { StudyPlannerView } from './components/views/StudyPlannerView';
import { QuizGeneratorView } from './components/views/QuizGeneratorView';
import { StudentDashboard } from './components/views/StudentDashboard';
import { TeacherDashboard } from './components/views/TeacherDashboard';
import { AdminPanel } from './components/views/AdminPanel';
import { CommunityView } from './components/views/CommunityView';
import { GoogleScholarView } from './components/views/GoogleScholarView';
import { AIChatbotView } from './components/views/AIChatbotView';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('bs-se');
  const [isAITutorOpen, setIsAITutorOpen] = useState<boolean>(false);
  const [aiTutorPrompt, setAiTutorPrompt] = useState<string>('');
  const [savedNotes, setSavedNotes] = useState<Array<{ title: string; content: string; date: string }>>([
    {
      title: 'Agile Scrum & Sprint Ceremonies',
      content: 'Scrum is an iterative framework operating in 2-week sprints with Product Owner, Scrum Master, and Dev Team.',
      date: '2026-08-01'
    }
  ]);

  // Sync dark class on html root element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleOpenAITutor = (prompt?: string) => {
    if (prompt) {
      setAiTutorPrompt(prompt);
    } else {
      setAiTutorPrompt('');
    }
    setIsAITutorOpen(true);
  };

  const handleSaveNote = (title: string, content: string) => {
    setSavedNotes(prev => [
      { title, content, date: new Date().toISOString().split('T')[0] },
      ...prev
    ]);
  };

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        onOpenAITutor={handleOpenAITutor}
      />

      {/* Main Page Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {currentView === 'home' && (
          <HomeView
            setCurrentView={setCurrentView}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            onOpenAITutor={handleOpenAITutor}
          />
        )}

        {currentView === 'curriculum' && (
          <CurriculumView
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
            onOpenAITutor={handleOpenAITutor}
            onSaveNote={handleSaveNote}
          />
        )}

        {currentView === 'programming' && (
          <ProgrammingView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'se' && (
          <SoftwareEngineeringView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'cs' && (
          <ComputerScienceView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'math' && (
          <MathematicsView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'library' && (
          <LibraryView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'videos' && (
          <VideoLibraryView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'coding' && (
          <CodingPracticeView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'planner' && (
          <StudyPlannerView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'quiz' && (
          <QuizGeneratorView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'dashboard' && (
          <StudentDashboard savedNotes={savedNotes} setCurrentView={setCurrentView} />
        )}

        {currentView === 'teacher' && (
          <TeacherDashboard />
        )}

        {currentView === 'admin' && (
          <AdminPanel />
        )}

        {currentView === 'community' && (
          <CommunityView onOpenAITutor={handleOpenAITutor} />
        )}

        {currentView === 'scholar' && (
          <GoogleScholarView
            onOpenAITutor={handleOpenAITutor}
            onSaveNote={handleSaveNote}
          />
        )}

        {currentView === 'chat' && (
          <AIChatbotView
            onSaveNote={handleSaveNote}
            selectedLevel={selectedLevel}
            setCurrentView={setCurrentView}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} setSelectedLevel={setSelectedLevel} />

      {/* 24/7 AI Tutor Floating Modal */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        initialPrompt={aiTutorPrompt}
        selectedLevel={selectedLevel}
        onSaveNote={handleSaveNote}
      />
    </div>
  );
}

export default App;
