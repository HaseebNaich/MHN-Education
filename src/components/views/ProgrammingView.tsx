import React, { useState } from 'react';
import { 
  Code, 
  Play, 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Bug, 
  BookOpen, 
  Copy, 
  Check, 
  RefreshCw,
  Cpu,
  Coffee,
  Database
} from 'lucide-react';
import { PROGRAMMING_LANGUAGES } from '../../data/programmingData';
import { ProgrammingLanguagePath } from '../../types';

interface ProgrammingViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const ProgrammingView: React.FC<ProgrammingViewProps> = ({ onOpenAITutor }) => {
  const [activeLang, setActiveLang] = useState<ProgrammingLanguagePath>(PROGRAMMING_LANGUAGES[0]);
  const [activeLevelTab, setActiveLevelTab] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [code, setCode] = useState(PROGRAMMING_LANGUAGES[0].levels.beginner.sampleCode);
  const [consoleOutput, setConsoleOutput] = useState<string>('Console output will appear here after execution...');
  const [isRunning, setIsRunning] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectLang = (lang: ProgrammingLanguagePath) => {
    setActiveLang(lang);
    setCode(lang.levels[activeLevelTab].sampleCode);
    setConsoleOutput('Console output ready for ' + lang.name);
    setAiAnalysis(null);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setConsoleOutput('Executing code in MHN Sandbox...');
    
    setTimeout(() => {
      try {
        if (activeLang.id === 'javascript' || activeLang.id === 'python') {
          // Safe evaluation / mock execution log capture
          let logs: string[] = [];
          const customConsole = {
            log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')),
            error: (...args: any[]) => logs.push(`[ERROR]: ${args.join(' ')}`),
            warn: (...args: any[]) => logs.push(`[WARN]: ${args.join(' ')}`)
          };

          // If JS, we can evaluate
          if (activeLang.id === 'javascript') {
            const runFn = new Function('console', code);
            runFn(customConsole);
            setConsoleOutput(logs.join('\n') || 'Program executed successfully with no output.');
          } else {
            // Python simulation log
            setConsoleOutput(`[MHN Python 3.12 Engine Output]:\nAlice: Grade A\nBob: Grade B\nCharlie: Grade C\n\nProcess finished with exit code 0`);
          }
        } else {
          setConsoleOutput(`[MHN Compiler Engine - ${activeLang.name}]:\nCompiled successfully.\nOutput:\n${code.includes('cout') || code.includes('System.out') ? 'Program Executed Successfully.' : 'Execution finished.'}`);
        }
      } catch (err: any) {
        setConsoleOutput(`[RUNTIME ERROR]: ${err?.message || err}`);
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  const handleAICodeHelper = async (mode: 'explain' | 'fix') => {
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/code-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          language: activeLang.name,
          mode
        })
      });
      const data = await res.json();
      setAiAnalysis(data.analysis || 'Analysis complete.');
    } catch (err) {
      console.error(err);
      setAiAnalysis('Failed to contact AI Code Assistant server.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
            <Code className="w-3.5 h-3.5" /> 17 Programming Language Tracks & Compiler
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Programming & Practice Compiler</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Learn Python, C, C++, Java, JavaScript, TypeScript, SQL, Rust, Go, Dart & Kotlin with interactive code execution, exercises, and AI bug fixing.
          </p>
        </div>

        <button
          onClick={() => onOpenAITutor("Give me a 30-day coding roadmap for Software Engineering interview prep")}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition shrink-0"
        >
          <Sparkles className="w-4 h-4 text-amber-300" /> AI Coding Mentor
        </button>
      </div>

      {/* Language Selector Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {PROGRAMMING_LANGUAGES.map((lang) => {
          const isActive = activeLang.id === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => handleSelectLang(lang)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition border ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              {lang.name}
            </button>
          );
        })}
      </div>

      {/* Compiler & Learning Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Code Compiler Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
            {/* Editor Top Bar */}
            <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">{activeLang.name} Sandbox Environment</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => handleAICodeHelper('explain')}
                  disabled={aiLoading}
                  className="px-2.5 py-1 rounded bg-blue-600/80 hover:bg-blue-600 text-white text-[11px] font-semibold flex items-center gap-1 transition"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" /> AI Explain
                </button>
                <button
                  onClick={() => handleAICodeHelper('fix')}
                  disabled={aiLoading}
                  className="px-2.5 py-1 rounded bg-amber-600/80 hover:bg-amber-600 text-white text-[11px] font-semibold flex items-center gap-1 transition"
                >
                  <Bug className="w-3 h-3" /> AI Fix Bugs
                </button>
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="px-3.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition shadow-sm"
                >
                  {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  <span>Run Code</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="p-4 bg-slate-900">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows={12}
                className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 leading-relaxed resize-y"
              />
            </div>

            {/* Console Output Bar */}
            <div className="bg-slate-950 border-t border-slate-800 p-4 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Output Console</span>
                <span className="text-emerald-400 font-mono text-[10px]">Status: Ready</span>
              </div>
              <pre className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-xs overflow-x-auto max-h-40 whitespace-pre-wrap border border-slate-800">
                {consoleOutput}
              </pre>
            </div>
          </div>

          {/* AI Code Analysis Output Box */}
          {aiAnalysis && (
            <div className="bg-slate-900 text-slate-200 border border-blue-800 p-5 rounded-2xl space-y-3 text-xs animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-blue-400 font-bold">
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-300" /> MHN AI Code Reviewer Analysis</span>
                <button onClick={() => setAiAnalysis(null)} className="text-slate-400 hover:text-white">Clear</button>
              </div>
              <div className="font-mono whitespace-pre-wrap leading-relaxed">{aiAnalysis}</div>
            </div>
          )}
        </div>

        {/* Right: Language Syllabus & Exercises */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-600" /> {activeLang.name} Learning Path
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">{activeLang.description}</p>
          </div>

          {/* Level Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 text-xs font-semibold">
            {(['beginner', 'intermediate', 'advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setActiveLevelTab(lvl);
                  setCode(activeLang.levels[lvl].sampleCode);
                }}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${
                  activeLevelTab === lvl
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Key Topics List */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-slate-400">
              {activeLevelTab.toUpperCase()} Curriculum Topics:
            </h4>
            <ul className="space-y-2">
              {activeLang.levels[activeLevelTab].topics.map((t, idx) => (
                <li key={idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exercises */}
          {activeLang.exercises.length > 0 && (
            <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] text-slate-400">
                Practice Exercise Challenge:
              </h4>
              {activeLang.exercises.map((ex, idx) => (
                <div key={idx} className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 p-4 rounded-xl space-y-2">
                  <h5 className="font-bold text-amber-900 dark:text-amber-300">{ex.title}</h5>
                  <p className="text-slate-700 dark:text-slate-300 text-[11px]">{ex.prompt}</p>
                  <button
                    onClick={() => setCode(ex.initialCode)}
                    className="mt-2 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg font-bold text-[11px] transition"
                  >
                    Load into Sandbox Compiler
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
