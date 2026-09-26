import React from 'react';
import { User, Award, Flame, Bookmark, Download, BookOpen, Clock, CheckCircle2 } from 'lucide-react';

interface StudentDashboardProps {
  savedNotes: Array<{ title: string; content: string; date: string }>;
  setCurrentView: (v: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ savedNotes, setCurrentView }) => {
  const stats = [
    { label: 'Current Study Streak', val: '7 Days', icon: Flame, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950' },
    { label: 'Topics Completed', val: '14 Modules', icon: BookOpen, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950' },
    { label: 'Certificates Earned', val: '3 Verified', icon: Award, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950' },
    { label: 'Saved Study Notes', val: `${savedNotes.length} Notes`, icon: Bookmark, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950' }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Student Profile Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-blue-900">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-lg">
            HN
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Welcome back, Student!</h1>
            <p className="text-slate-300 text-xs">Degree: BS Computer Science / Software Engineering • Semester 4</p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('curriculum')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition shrink-0"
        >
          Continue Learning Path
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold block">{s.label}</span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-white">{s.val}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Saved Notes Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-blue-600" /> Saved Curriculum Notes ({savedNotes.length})
        </h2>

        {savedNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedNotes.map((note, idx) => (
              <div key={idx} className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white">{note.title}</h3>
                  <span className="text-[10px] text-slate-400">{note.date}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 line-clamp-3">{note.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">No saved notes yet. Click 'Save Note' inside any topic in the Curriculum View!</p>
        )}
      </div>
    </div>
  );
};
