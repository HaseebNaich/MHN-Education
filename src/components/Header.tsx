import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Mic, 
  Sun, 
  Moon, 
  Sparkles, 
  Menu, 
  X, 
  BookOpen, 
  Code, 
  Brain, 
  Calculator, 
  BookMarked, 
  Video, 
  CheckSquare, 
  Calendar, 
  User, 
  ShieldCheck, 
  Users,
  Cpu
} from 'lucide-react';
import { LEVEL_OPTIONS } from '../data/curriculumData';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  onOpenAITutor: (initialPrompt?: string) => void;
  userRole?: 'student' | 'teacher' | 'admin';
  setUserRole?: (role: 'student' | 'teacher' | 'admin') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  selectedLevel,
  setSelectedLevel,
  darkMode,
  setDarkMode,
  onOpenAITutor,
  userRole: propRole,
  setUserRole: propSetRole
}) => {
  const [internalRole, setInternalRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const userRole = propRole || internalRole;
  const setUserRole = propSetRole || setInternalRole;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setGlobalSearch(transcript);
        onOpenAITutor(`Explain: ${transcript}`);
      };
      recognition.start();
    } else {
      const promptText = prompt("Voice Search is not natively supported in this browser. Enter your topic query for AI Search:");
      if (promptText) {
        setGlobalSearch(promptText);
        onOpenAITutor(`Explain: ${promptText}`);
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      onOpenAITutor(`Search and detailed explanation for: ${globalSearch}`);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: GraduationCap },
    { id: 'curriculum', label: 'Notes & Curriculum', icon: BookOpen },
    { id: 'programming', label: 'Programming', icon: Code },
    { id: 'se', label: 'Software Eng.', icon: Code },
    { id: 'cs', label: 'Computer Science', icon: Cpu },
    { id: 'math', label: 'Mathematics', icon: Calculator },
    { id: 'library', label: 'Free Books', icon: BookMarked },
    { id: 'videos', label: 'Videos', icon: Video },
    { id: 'coding', label: 'Coding Practice', icon: Code },
    { id: 'quiz', label: 'AI Quizzes', icon: CheckSquare },
    { id: 'planner', label: 'Study Planner', icon: Calendar },
    { id: 'community', label: 'Community', icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-[#020617]/90 backdrop-blur-md transition-colors">
      {/* Top Banner Bar for Role & Level Selection */}
      <div className="bg-slate-900 border-b border-slate-800/80 text-white text-xs py-1.5 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 overflow-x-auto py-0.5">
          <span className="font-semibold text-indigo-400 flex items-center gap-1.5 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> World's Free AI Education Platform:
          </span>
          <div className="flex items-center gap-2">
            <label htmlFor="academic-level-select" className="text-slate-400 font-medium whitespace-nowrap">Target Level:</label>
            <select
              id="academic-level-select"
              aria-label="Target Academic Level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-950 text-indigo-300 border border-slate-800 rounded-lg px-2.5 py-0.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {LEVEL_OPTIONS.map((lvl) => (
                <option key={lvl.id} value={lvl.id}>
                  {lvl.label} ({lvl.category})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Role switcher */}
          <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800">
            <button
              onClick={() => setUserRole('student')}
              className={`px-2.5 py-0.5 rounded-md text-xs transition ${userRole === 'student' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Student
            </button>
            <button
              onClick={() => setUserRole('teacher')}
              className={`px-2.5 py-0.5 rounded-md text-xs transition ${userRole === 'teacher' ? 'bg-indigo-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Teacher
            </button>
            <button
              onClick={() => setUserRole('admin')}
              className={`px-2.5 py-0.5 rounded-md text-xs transition ${userRole === 'admin' ? 'bg-amber-600 text-white font-semibold shadow-sm' : 'text-slate-400 hover:text-white'}`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
            M
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">MHN Education</span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">Grade 1 to Master's AI Learning</p>
          </div>
        </div>

        {/* Global AI Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center flex-1 max-w-md mx-4 relative">
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder="Ask AI Teacher anything or search..."
            className="w-full bg-slate-900/50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-100 placeholder-slate-500 text-xs rounded-full pl-9 pr-20 py-2 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <div className="absolute right-2.5 top-1.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleVoiceSearch}
              title="Voice Search"
              className={`p-1 rounded-md transition ${isListening ? 'text-rose-500 animate-bounce' : 'text-slate-400 hover:text-indigo-400'}`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <kbd className="text-[10px] bg-slate-800/90 px-1.5 py-0.5 rounded text-slate-400 font-mono border border-slate-700/60 hidden sm:inline-block">Ctrl+K</kbd>
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* AI Tutor Launch Button */}
          <button
            onClick={() => onOpenAITutor()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition"
          >
            <Brain className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">AI Teacher</span>
          </button>

          {/* User Dashboard / Portal Button depending on role */}
          {userRole === 'student' && (
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                currentView === 'dashboard'
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">My Dashboard</span>
            </button>
          )}

          {userRole === 'teacher' && (
            <button
              onClick={() => setCurrentView('teacher')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                currentView === 'teacher'
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Teacher Portal</span>
            </button>
          )}

          {userRole === 'admin' && (
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition ${
                currentView === 'admin'
                  ? 'bg-amber-500/10 border-amber-500/40 text-amber-400 font-semibold'
                  : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Admin Panel</span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode((prev: boolean) => !prev)}
            aria-label="Toggle dark mode"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-transparent hover:border-slate-700/50"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Row for Desktop */}
      <nav aria-label="Main Navigation" className="hidden lg:block border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1.5 overflow-x-auto py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-indigo-400 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 space-y-2">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex items-center relative mb-3">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search or ask AI Tutor..."
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-lg pl-8 pr-10 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5" />
          </form>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-2 rounded-md text-xs font-medium flex items-center gap-2 transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
