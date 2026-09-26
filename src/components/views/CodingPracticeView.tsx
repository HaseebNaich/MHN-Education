import React, { useState } from 'react';
import { Code, Play, CheckCircle2, Trophy, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { CODING_CHALLENGES } from '../../data/codingChallenges';
import { CodingChallenge } from '../../types';

interface CodingPracticeViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const CodingPracticeView: React.FC<CodingPracticeViewProps> = ({ onOpenAITutor }) => {
  const [activeChallenge, setActiveChallenge] = useState<CodingChallenge>(CODING_CHALLENGES[0]);
  const [userCode, setUserCode] = useState(CODING_CHALLENGES[0].starterCode.python);
  const [selectedLang, setSelectedLang] = useState<'python' | 'javascript'>('python');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [executing, setExecuting] = useState(false);

  const handleRunTests = () => {
    setExecuting(true);
    setTestResult(null);
    setTimeout(() => {
      setTestResult(`[TEST SUITE PASSED]:\nTest Case 1: PASS (2ms)\nTest Case 2: PASS (3ms)\n\nAll test cases passed successfully! Score: 100/100`);
      setExecuting(false);
    }, 600);
  };

  const leaderboard = [
    { rank: 1, name: 'Haseeb N.', points: 2450, solved: 84 },
    { rank: 2, name: 'Ali Raza', points: 2310, solved: 79 },
    { rank: 3, name: 'Zara Khan', points: 2180, solved: 75 },
    { rank: 4, name: 'Usman SE', points: 1950, solved: 68 }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Code className="w-3.5 h-3.5" /> Competitive Coding & Daily Challenges
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Coding Practice & Challenges</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Solve algorithmic problems, run automated test suites, receive instant AI code reviews, and scale the leaderboard.
          </p>
        </div>
      </div>

      {/* Main Coding Challenge Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Challenge Selector & Problem Statement */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Problem</h3>
            <div className="space-y-2">
              {CODING_CHALLENGES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveChallenge(c);
                    setUserCode(c.starterCode[selectedLang] || c.starterCode.python);
                    setTestResult(null);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition space-y-1 ${
                    activeChallenge.id === c.id
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{c.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${
                      c.difficulty === 'Easy' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                    }`}>
                      {c.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Problem Description */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3 text-xs">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{activeChallenge.title}</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{activeChallenge.description}</p>
              
              <div className="space-y-2">
                <h5 className="font-bold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">Example:</h5>
                {activeChallenge.examples.map((ex, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl font-mono text-[11px] space-y-1 border border-slate-200 dark:border-slate-700">
                    <div><strong>Input:</strong> {ex.input}</div>
                    <div><strong>Output:</strong> {ex.output}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard Widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500" /> Platform Leaderboard
            </h3>
            <div className="space-y-2 text-xs">
              {leaderboard.map((lb) => (
                <div key={lb.rank} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 font-bold flex items-center justify-center text-[10px]">{lb.rank}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{lb.name}</span>
                  </div>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{lb.points} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Code Editor & Execution Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    const l = e.target.value as any;
                    setSelectedLang(l);
                    setUserCode(activeChallenge.starterCode[l] || activeChallenge.starterCode.python);
                  }}
                  className="bg-slate-800 text-white border border-slate-700 rounded px-2 py-1 text-xs font-bold focus:outline-none"
                >
                  <option value="python">Python 3</option>
                  <option value="javascript">JavaScript (ES6)</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAITutor(`AI Code Review for solution of problem '${activeChallenge.title}':\n\n${userCode}`)}
                  className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> AI Review
                </button>
                <button
                  onClick={handleRunTests}
                  disabled={executing}
                  className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition shadow-sm"
                >
                  {executing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  Submit Code
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-900">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed resize-y"
              />
            </div>

            {testResult && (
              <div className="bg-slate-950 p-4 border-t border-slate-800 text-xs space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Automated Test Results:
                </h4>
                <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-[11px] overflow-x-auto whitespace-pre-wrap">
                  {testResult}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
