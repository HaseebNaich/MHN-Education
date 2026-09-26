import React from 'react';
import { GraduationCap, Shield, Heart, ExternalLink, BookOpen, Code, Brain } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: string) => void;
  setSelectedLevel: (lvl: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, setSelectedLevel }) => {
  return (
    <footer className="bg-slate-900/40 border-t border-slate-800 rounded-3xl text-slate-300 text-xs p-8 sm:p-10 mt-12 mb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-600/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">MHN Education</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Empowering students worldwide from Grade 1 to Master's level with AI-powered tutoring, university notes, coding compilers, legal open textbooks, and personalized study tools.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-[11px] bg-slate-950/60 p-3 rounded-2xl border border-slate-800 max-w-md">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-white">100% Legal & Open Educational Platform:</strong> We do not host copyrighted books. All textbooks link directly to official open-access repositories (OpenStax, MIT OCW, Gutenberg, official documentation).
            </span>
          </div>
        </div>

        {/* School & Board Paths */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">School & Board Paths</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => { setSelectedLevel('grade-1-5'); setCurrentView('curriculum'); }} className="hover:text-indigo-400 transition">
                Grade 1–5 Primary
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('matric-9-10'); setCurrentView('curriculum'); }} className="hover:text-indigo-400 transition">
                Matric Class 9 & 10
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('fsc-pre-eng'); setCurrentView('curriculum'); }} className="hover:text-indigo-400 transition">
                FSC Pre-Engineering
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('ics'); setCurrentView('curriculum'); }} className="hover:text-indigo-400 transition">
                ICS (Computer Science)
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('o-level'); setCurrentView('curriculum'); }} className="hover:text-indigo-400 transition">
                O-Level & A-Level (IGCSE)
              </button>
            </li>
          </ul>
        </div>

        {/* University & Degree Paths */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">University Degrees</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => { setSelectedLevel('bs-se'); setCurrentView('se'); }} className="hover:text-indigo-400 transition">
                BS Software Engineering
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('bs-cs'); setCurrentView('cs'); }} className="hover:text-indigo-400 transition">
                BS Computer Science
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('bs-ai'); setCurrentView('cs'); }} className="hover:text-indigo-400 transition">
                BS Artificial Intelligence
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('bs-cyber'); setCurrentView('cs'); }} className="hover:text-indigo-400 transition">
                BS Cyber Security
              </button>
            </li>
            <li>
              <button onClick={() => { setSelectedLevel('bs-math'); setCurrentView('math'); }} className="hover:text-indigo-400 transition">
                BS Mathematics & Calculus
              </button>
            </li>
          </ul>
        </div>

        {/* AI & Interactive Tools */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-3">AI & Interactive Tools</h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button onClick={() => setCurrentView('programming')} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-amber-400" /> Practice Compiler
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('planner')} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-indigo-400" /> AI Study Planner
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('quizzes')} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-400" /> AI Quiz Generator
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('library')} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5 text-purple-400" /> Open Books Library
              </button>
            </li>
            <li>
              <button onClick={() => setCurrentView('coding-practice')} className="hover:text-indigo-400 transition flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" /> Daily Coding Challenges
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
        <p>© {new Date().getFullYear()} MHN Education. Built for global students with excellence and passion.</p>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for free education everywhere</span>
        </div>
      </div>
    </footer>
  );
};
