import React, { useState } from 'react';
import { CheckSquare, Sparkles, Brain, CheckCircle2, RefreshCw } from 'lucide-react';
import { QuizQuestion } from '../../types';

interface QuizGeneratorViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const QuizGeneratorView: React.FC<QuizGeneratorViewProps> = ({ onOpenAITutor }) => {
  const [topic, setTopic] = useState('Data Structures & Algorithms');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState<QuizQuestion[] | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQuizzes(null);
    setSelectedAnswers({});
    setScoreSubmitted(false);

    try {
      const res = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          difficulty,
          questionCount
        })
      });
      const data = await res.json();
      setQuizzes(data.quizzes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = () => {
    if (!quizzes) return 0;
    let correct = 0;
    quizzes.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) correct++;
    });
    return correct;
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" /> AI Automated Quiz & MCQ Test Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Quiz & Exam Generator</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Automatically generate high-yield multiple-choice test sets for any subject or level with instant AI scoring.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Generator Controls Form */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" /> Quiz Settings
          </h3>

          <form onSubmit={handleGenerateQuiz} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Subject / Topic Name:</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Difficulty Level:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              >
                <option value="Beginner">Beginner / Grade 1-8</option>
                <option value="Intermediate">Intermediate / Board Exams & FSC</option>
                <option value="Advanced">Advanced / BS University Level</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Number of Questions:</label>
              <input
                type="number"
                min="2"
                max="10"
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> {loading ? 'Generating Quiz...' : 'Generate AI Quiz Set'}
            </button>
          </form>
        </div>

        {/* Interactive Test Panel */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" /> Active Quiz Workspace
            </h3>
            {quizzes && scoreSubmitted && (
              <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                Final Score: {calculateScore()} / {quizzes.length}
              </span>
            )}
          </div>

          {loading && (
            <div className="text-center py-16 text-slate-500 space-y-3">
              <RefreshCw className="w-8 h-8 mx-auto text-emerald-600 animate-spin" />
              <p className="text-xs font-medium">MHN AI is drafting custom high-yield questions for "{topic}"...</p>
            </div>
          )}

          {!loading && quizzes && quizzes.length > 0 && (
            <div className="space-y-6">
              {quizzes.map((q, qIdx) => {
                const userChoice = selectedAnswers[qIdx];
                return (
                  <div key={qIdx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                    <p className="font-bold text-sm text-slate-900 dark:text-white">{qIdx + 1}. {q.question}</p>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-emerald-400";
                        if (userChoice === oIdx) btnStyle = "bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 font-bold text-emerald-900 dark:text-emerald-200";

                        if (scoreSubmitted) {
                          if (oIdx === q.correctAnswer) btnStyle = "bg-emerald-100 dark:bg-emerald-950 border-emerald-600 font-bold text-emerald-900 dark:text-emerald-200";
                          else if (userChoice === oIdx && userChoice !== q.correctAnswer) btnStyle = "bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200";
                        }

                        return (
                          <button
                            key={oIdx}
                            onClick={() => !scoreSubmitted && setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                            className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {scoreSubmitted && oIdx === q.correctAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          </button>
                        );
                      })}
                    </div>

                    {scoreSubmitted && (
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 rounded-xl text-blue-900 dark:text-blue-200 text-xs">
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}

              {!scoreSubmitted && (
                <button
                  onClick={() => setScoreSubmitted(true)}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-xs transition shadow-md"
                >
                  Submit & Score Quiz
                </button>
              )}
            </div>
          )}

          {!loading && !quizzes && (
            <div className="text-center py-16 text-slate-400 space-y-2 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
              <CheckSquare className="w-10 h-10 mx-auto stroke-1" />
              <p className="text-xs font-medium">Set topic on left and click Generate AI Quiz Set.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
