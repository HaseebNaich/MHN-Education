import React, { useState } from 'react';
import { Users, Upload, BookOpen, CheckCircle2, FileText, Sparkles, Plus } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSubject, setNoteSubject] = useState('Computer Science');
  const [noteContent, setNoteContent] = useState('');
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const handlePublishCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setPublishedSuccess(true);
    setTimeout(() => {
      setNoteTitle('');
      setNoteContent('');
      setPublishedSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Teacher Profile Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" /> Instructor & Educator Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Teacher & Educator Dashboard</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Publish free open educational notes, review student assignments, and generate automated AI quizzes for your class.
          </p>
        </div>
      </div>

      {/* Main Grid: Publish Note Tool & Class Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Course Authoring Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" /> Publish Free Educational Lesson Note
          </h2>

          <form onSubmit={handlePublishCourse} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Lesson / Topic Title:</label>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder="e.g. Introduction to Binary Search Trees"
                required
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Subject Category:</label>
              <select
                value={noteSubject}
                onChange={(e) => setNoteSubject(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Lesson Content (Markdown Supported):</label>
              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={8}
                placeholder="Write detailed explanations, code examples, and practice questions..."
                required
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none font-mono text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
            >
              <Plus className="w-4 h-4" /> Publish to Student Library
            </button>

            {publishedSuccess && (
              <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 p-3 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Lesson published successfully to MHN Education repository!
              </div>
            )}
          </form>
        </div>

        {/* Educator Analytics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Class Metrics</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
                <span>Active Enrolled Students</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">1,240</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
                <span>Notes Published</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">28 Modules</span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl flex justify-between items-center">
                <span>Quiz Submissions Graded</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">4,890</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
