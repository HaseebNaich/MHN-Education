import React, { useState } from 'react';
import { Calendar, Sparkles, Brain, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';

interface StudyPlannerViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({ onOpenAITutor }) => {
  const [goal, setGoal] = useState('BS CS Final Exams / FSC Board Exams');
  const [availableHours, setAvailableHours] = useState('4');
  const [examDate, setExamDate] = useState('2026-09-15');
  const [weakAreas, setWeakAreas] = useState('Data Structures, Calculus Integration, Operating Systems');
  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPlanResult(null);

    try {
      const res = await fetch('/api/ai/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal,
          availableHours,
          examDate,
          weakAreas
        })
      });
      const data = await res.json();
      setPlanResult(data.plan || 'Plan generated successfully.');
    } catch (err) {
      console.error(err);
      setPlanResult('Failed to contact AI Study Planner server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" /> AI Automated Schedule Builder
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Study Planner & Optimizer</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Input your upcoming exam target date, daily available study hours, and weak subject areas to generate an optimal daily preparation schedule.
          </p>
        </div>
      </div>

      {/* Main Form & Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-500" /> Plan Parameters
          </h3>

          <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Academic Goal / Exam:</label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Daily Study Hours:</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={availableHours}
                  onChange={(e) => setAvailableHours(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Target Exam Date:</label>
                <input
                  type="date"
                  value={examDate}
                  onChange={(e) => setExamDate(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Weak Topics / Priority Focus:</label>
              <textarea
                value={weakAreas}
                onChange={(e) => setWeakAreas(e.target.value)}
                rows={3}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/20 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> {loading ? 'Building AI Schedule...' : 'Generate AI Study Schedule'}
            </button>
          </form>
        </div>

        {/* Output Plan Display */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-rose-600" /> Generated Custom Study Schedule
          </h3>

          {planResult ? (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs leading-relaxed space-y-3">
              <div className="markdown-body">
                <Markdown>{planResult}</Markdown>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 space-y-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <Calendar className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-xs font-medium">Fill in your exam details on the left and click Generate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
