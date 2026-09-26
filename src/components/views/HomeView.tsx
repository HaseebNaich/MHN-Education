import React from 'react';
import { 
  GraduationCap, 
  Brain, 
  BookOpen, 
  Code, 
  Calculator, 
  BookMarked, 
  Sparkles, 
  CheckSquare, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  ShieldCheck, 
  Video,
  Award
} from 'lucide-react';
import { LEVEL_OPTIONS } from '../../data/curriculumData';

interface HomeViewProps {
  setCurrentView: (view: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  onOpenAITutor: (prompt?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentView,
  selectedLevel,
  setSelectedLevel,
  onOpenAITutor
}) => {
  const levelCategories = [
    { name: 'School Education', icon: GraduationCap, levels: LEVEL_OPTIONS.filter(l => l.category === 'School' || l.category === 'Board Exams') },
    { name: 'Computer Science & AI', icon: Cpu, levels: LEVEL_OPTIONS.filter(l => l.category === 'Computer Science' || l.category === 'Software Engineering') },
    { name: 'Mathematics & College', icon: Calculator, levels: LEVEL_OPTIONS.filter(l => l.category === 'Mathematics' || l.category === 'College' || l.category === 'Higher Ed') },
    { name: 'Competitive Exams', icon: Award, levels: LEVEL_OPTIONS.filter(l => l.category === 'Competitive') }
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Primary Bento Grid Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Bento Card (8 Cols): AI Tutor Active Hero */}
        <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[360px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider rounded-full border border-indigo-500/20 inline-flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" /> AI Tutor Active
              </span>
              <span className="text-slate-500 text-xs italic">Connected to Educational Gemini & AI Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight text-white">
              Master <span className="font-bold italic text-indigo-400">Differential Calculus & Software Engineering</span> with personalized AI guidance.
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              Grade 1 to Master's university curriculum. Complete with step-by-step proofs, 17-language code compilers, legal textbooks, and AI study planning.
            </p>
          </div>

          <div className="relative z-10 bg-slate-950/60 rounded-2xl p-5 border border-slate-800/80 mt-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-md shadow-indigo-600/30">
                AI
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Hello, Student! I've analyzed your progress in Software Engineering & Mathematics. Ready to dive into Dijkstra's Algorithm, Sprint Ceremonies, or Calculus proofs?
              </p>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <button 
                onClick={() => onOpenAITutor("Start visual proof of Integration by parts and Chain Rule step by step")}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-indigo-600/20"
              >
                Start Proof
              </button>
              <button 
                onClick={() => setCurrentView('quiz')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all border border-slate-700"
              >
                Generate Quiz
              </button>
              <button 
                onClick={() => onOpenAITutor("Explain the difference between Agile Scrum and Waterfall SDLC")}
                className="px-4 py-2 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-900 transition-all"
              >
                Ask a Question
              </button>
              <button 
                onClick={() => setCurrentView('programming')}
                className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 rounded-xl text-xs font-semibold transition-all"
              >
                Practice Compiler
              </button>
            </div>
          </div>
        </div>

        {/* Bento Card (4 Cols): Current Track Status */}
        <div className="lg:col-span-4 bg-indigo-600 rounded-3xl p-6 flex flex-col justify-between text-white shadow-xl shadow-indigo-600/20 min-h-[360px]">
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Current Track</p>
            <h2 className="text-2xl font-bold leading-tight">Data Structures & Software Engineering</h2>
            <p className="text-xs text-indigo-100 opacity-90 pt-1">BS Computer Science & Software Engineering Core Curriculum</p>
          </div>

          <div className="space-y-4 mt-6">
            <div className="bg-indigo-700/50 p-4 rounded-2xl border border-indigo-400/30 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-indigo-100">Scrum Ceremonies & AVL Trees</span>
                <span className="font-bold text-white">82%</span>
              </div>
              <div className="w-full h-2 bg-indigo-950/40 rounded-full overflow-hidden">
                <div className="w-[82%] h-full bg-white rounded-full"></div>
              </div>
              <span className="text-[10px] text-indigo-200 block">Module 4 of 12 Completed</span>
            </div>

            <button
              onClick={() => setCurrentView('curriculum')}
              className="w-full py-2.5 bg-white text-indigo-950 rounded-xl text-xs font-bold hover:bg-indigo-50 transition shadow-md flex items-center justify-center gap-2"
            >
              Continue Track <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bento Card (4 Cols): Quick Access Library */}
        <div className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BookMarked className="w-4 h-4 text-purple-400" /> Quick Access Library
            </h3>
            <button onClick={() => setCurrentView('library')} className="text-[10px] text-indigo-400 font-semibold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-2 overflow-hidden">
            <div 
              onClick={() => setCurrentView('library')}
              className="p-3 bg-slate-950/50 border border-slate-800/80 rounded-xl flex items-center justify-between hover:border-slate-700 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-400 font-mono text-xs font-bold">
                  PY
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-200">Python Official Docs</p>
                  <p className="text-[10px] text-slate-500">Official Open Reference</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">PDF</span>
            </div>

            <div 
              onClick={() => setCurrentView('library')}
              className="p-3 bg-slate-950/50 border border-slate-800/80 rounded-xl flex items-center justify-between hover:border-slate-700 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 font-mono text-xs font-bold">
                  ML
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-200">Linear Algebra (MIT OCW)</p>
                  <p className="text-[10px] text-slate-500">Gilbert Strang Edition</p>
                </div>
              </div>
              <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 font-bold">OPEN</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('library')}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-[10px] font-bold uppercase tracking-wider transition border border-slate-700/60"
          >
            Explore 100% Free Open Books
          </button>
        </div>

        {/* Bento Card (3 Cols): Coding Lab Sandbox */}
        <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between gap-3">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Code className="w-4 h-4 text-emerald-400" /> Coding Lab
            </h3>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 font-medium">
              17 Languages
            </span>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/90 font-mono text-[11px] text-slate-400 leading-relaxed">
            <span className="text-indigo-400">def</span> <span className="text-emerald-400">dijkstra</span>(graph, start):<br />
            &nbsp;&nbsp;distances = &#123;v: float(<span className="text-amber-300">'inf'</span>)&#125;<br />
            &nbsp;&nbsp;distances[start] = <span className="text-amber-300">0</span><br />
            &nbsp;&nbsp;<span className="text-indigo-400">return</span> distances
          </div>

          <button
            onClick={() => setCurrentView('programming')}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-wider transition border border-slate-700/60 flex items-center justify-center gap-1.5"
          >
            Open Compiler Playground
          </button>
        </div>

        {/* Bento Card (5 Cols): Weekly Progress Graph */}
        <div className="lg:col-span-5 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-white">Weekly Study Activity</h3>
            <span className="text-xs text-slate-400">Target: <strong className="text-indigo-400">14h / week</strong></span>
          </div>

          <div className="flex-1 flex items-end justify-between gap-2 min-h-[100px] pt-4">
            <div className="flex-1 bg-slate-800 rounded-t-lg h-[40%] transition-all hover:bg-indigo-500" title="Mon: 2.1h"></div>
            <div className="flex-1 bg-slate-800 rounded-t-lg h-[65%] transition-all hover:bg-indigo-500" title="Tue: 3.5h"></div>
            <div className="flex-1 bg-slate-800 rounded-t-lg h-[35%] transition-all hover:bg-indigo-500" title="Wed: 1.8h"></div>
            <div className="flex-1 bg-slate-800 rounded-t-lg h-[80%] transition-all hover:bg-indigo-500" title="Thu: 4.2h"></div>
            <div className="flex-1 bg-indigo-600 rounded-t-lg h-[95%] shadow-[0_0_20px_rgba(79,70,229,0.4)]" title="Fri: 5.0h (Peak)"></div>
            <div className="flex-1 bg-slate-800 rounded-t-lg h-[55%] transition-all hover:bg-indigo-500" title="Sat: 2.9h"></div>
            <div className="flex-1 bg-slate-800 rounded-t-lg h-[45%] transition-all hover:bg-indigo-500" title="Sun: 2.2h"></div>
          </div>

          <div className="flex justify-between mt-3 text-[10px] text-slate-500 uppercase font-bold tracking-wider">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span className="text-indigo-400">Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>
      </section>

      {/* Academic Level Selection Bento Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-400" /> Choose Academic Curriculum Level
            </h2>
            <p className="text-slate-400 text-xs">Tailor study notes, formula cheat sheets, and AI tutoring to your exact syllabus.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {levelCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-900/40 border border-slate-800 rounded-3xl p-5 hover:border-slate-700/80 transition space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{cat.name}</h3>
                </div>

                <div className="space-y-1.5">
                  {cat.levels.map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        setSelectedLevel(lvl.id);
                        setCurrentView('curriculum');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between group ${
                        selectedLevel === lvl.id
                          ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                          : 'bg-slate-950/60 text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 border border-slate-800/80'
                      }`}
                    >
                      <span>{lvl.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Platform Features Grid */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl font-bold text-white">Platform Modules & Learning Hubs</h2>
          <p className="text-slate-400 text-xs">Direct access to practice compilers, mathematics tools, study planner, and AI tutor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Bento Card: AI Tutor */}
          <div 
            onClick={() => onOpenAITutor()}
            className="bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 cursor-pointer transition transform hover:-translate-y-0.5 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-amber-300 flex items-center justify-center">
              <Brain className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition">24/7 AI Tutor & Professor</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Step-by-step mathematical proofs, detailed computer science explanations, visual code debugging, and instant answers.
              </p>
            </div>
            <div className="text-xs text-amber-300 font-semibold flex items-center gap-1 pt-1">
              Launch AI Teacher <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bento Card: Programming Sandbox */}
          <div 
            onClick={() => setCurrentView('programming')}
            className="bg-slate-900/40 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 cursor-pointer transition transform hover:-translate-y-0.5 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition">17 Programming Languages</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Master Python, C++, Java, JS, Rust, Go, SQL & MATLAB with starter templates, practice compiler, and AI bug fixing.
              </p>
            </div>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1 pt-1">
              Open Practice Compiler <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bento Card: Free Legal Books */}
          <div 
            onClick={() => setCurrentView('library')}
            className="bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 rounded-3xl p-6 cursor-pointer transition transform hover:-translate-y-0.5 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition">Legal Open Library (OER)</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Access official open textbooks from OpenStax, MIT OCW, Project Gutenberg, and developer documentation legally.
              </p>
            </div>
            <div className="text-xs text-purple-400 font-semibold flex items-center gap-1 pt-1">
              Explore Open Library <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bento Card: Software Eng & CS */}
          <div 
            onClick={() => setCurrentView('se')}
            className="bg-slate-900/40 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 cursor-pointer transition transform hover:-translate-y-0.5 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition">Software Engineering & SDLC</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Complete notes on SDLC, Agile Scrum, UML diagrams, SRS creation, Design Patterns, and testing strategies.
              </p>
            </div>
            <div className="text-xs text-indigo-400 font-semibold flex items-center gap-1 pt-1">
              View SE Curriculum <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bento Card: Mathematics */}
          <div 
            onClick={() => setCurrentView('math')}
            className="bg-slate-900/40 border border-slate-800 hover:border-amber-500/40 rounded-3xl p-6 cursor-pointer transition transform hover:-translate-y-0.5 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition">Mathematics & Calculus Hub</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Algebra, Trigonometry, Derivatives, Integration step-by-step, Differential Equations, and Discrete Math.
              </p>
            </div>
            <div className="text-xs text-amber-400 font-semibold flex items-center gap-1 pt-1">
              Open Math Hub <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Bento Card: AI Study Planner */}
          <div 
            onClick={() => setCurrentView('planner')}
            className="bg-slate-900/40 border border-slate-800 hover:border-rose-500/40 rounded-3xl p-6 cursor-pointer transition transform hover:-translate-y-0.5 space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white group-hover:text-rose-300 transition">AI Personal Study Planner</h3>
              <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                Generate customized day-by-day exam preparation schedules based on target exam dates, hours, and weak areas.
              </p>
            </div>
            <div className="text-xs text-rose-400 font-semibold flex items-center gap-1 pt-1">
              Build Study Schedule <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Compliance Banner */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          <div>
            <h4 className="font-bold text-sm text-white">Strict Legal & Copyright Compliance</h4>
            <p className="text-slate-400 mt-0.5">
              MHN Education strictly respects intellectual property. We do not host or distribute copyrighted books or paid materials. All resources link directly to open-access repositories (OpenStax, MIT OCW, Project Gutenberg, and official documentation).
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentView('library')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2 rounded-xl shrink-0 transition shadow-md shadow-emerald-600/20 text-xs"
        >
          View Legal Directory
        </button>
      </section>
    </div>
  );
};
