import React, { useState, useEffect } from 'react';
import { Brain, X, Send, Sparkles, BookOpen, Calculator, Code, RefreshCw, Bookmark, Check } from 'lucide-react';
import Markdown from 'react-markdown';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  selectedLevel?: string;
  onSaveNote?: (title: string, content: string) => void;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  initialPrompt = '',
  selectedLevel = 'bs-se',
  onSaveNote
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; content: string }>>([]);
  const [activeMode, setActiveMode] = useState<'concept' | 'quiz' | 'math' | 'code' | 'plan'>('concept');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
      handleSendPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  if (!isOpen) return null;

  const handleSendPrompt = async (inputPrompt?: string) => {
    const query = inputPrompt || prompt;
    if (!query.trim()) return;

    setLoading(true);
    setSaved(false);
    const updatedHistory = [...chatHistory, { role: 'user' as const, content: query }];
    setChatHistory(updatedHistory);
    setPrompt('');

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory,
          academicContext: `Level: ${selectedLevel}, Mode: ${activeMode}`
        })
      });
      const data = await res.json();
      setChatHistory([...updatedHistory, { role: 'model', content: data.text || 'Unable to generate response.' }]);
    } catch (err) {
      console.error(err);
      setChatHistory([...updatedHistory, { role: 'model', content: 'Failed to connect to AI Tutor server.' }]);
    } finally {
      setLoading(false);
    }
  };

  const presetQueries = [
    { label: 'Explain Binary Search Tree', mode: 'concept', query: 'Explain Binary Search Tree with time complexity and real world use cases.' },
    { label: 'Derive Integration by Parts', mode: 'math', query: 'Step-by-step mathematical derivation of Integration by Parts formula with example.' },
    { label: 'Quiz on Agile & Scrum', mode: 'quiz', query: 'Generate 3 high-yield multiple choice questions on Agile Scrum with detailed answer explanations.' },
    { label: 'Fix Python Memory Leak', mode: 'code', query: 'How do you detect and fix memory leaks or reference cycles in Python?' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <Brain className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                MHN AI Tutor & Professor <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-blue-200">Targeting: <span className="font-semibold capitalize text-white">{selectedLevel}</span></p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
          <button
            onClick={() => setActiveMode('concept')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${activeMode === 'concept' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Concept Explanation
          </button>
          <button
            onClick={() => setActiveMode('math')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${activeMode === 'math' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
          >
            <Calculator className="w-3.5 h-3.5" /> Math Step Solver
          </button>
          <button
            onClick={() => setActiveMode('code')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${activeMode === 'code' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
          >
            <Code className="w-3.5 h-3.5" /> Code & Bug Helper
          </button>
          <button
            onClick={() => setActiveMode('quiz')}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition ${activeMode === 'quiz' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs font-semibold' : 'text-slate-600 dark:text-slate-400'}`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Quiz Me
          </button>
        </div>

        {/* Quick Presets */}
        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-medium shrink-0">Try:</span>
          {presetQueries.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(pq.query);
                setActiveMode(pq.mode as any);
                handleSendPrompt(pq.query);
              }}
              className="px-2.5 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:text-blue-600 dark:hover:text-blue-300 whitespace-nowrap transition"
            >
              {pq.label}
            </button>
          ))}
        </div>

        {/* Content / Chat Output */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatHistory.length === 0 && !loading && (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Brain className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 stroke-1" />
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Ask any question to your AI Teacher!</p>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Ask for step-by-step calculus derivations, data structure visualizers, code bug fixes, or custom study guides.
              </p>
            </div>
          )}

          {chatHistory.map((item, idx) => (
            <div key={idx} className={`space-y-1 ${item.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {item.role === 'user' ? 'You' : 'MHN AI Professor'}
              </span>
              <div
                className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                  item.role === 'user'
                    ? 'bg-blue-600 text-white inline-block max-w-[85%] text-left rounded-tr-xs shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 w-full'
                }`}
              >
                {item.role === 'model' && (
                  <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200 dark:border-slate-700/60">
                    <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Explanation
                    </span>
                    {onSaveNote && (
                      <button
                        onClick={() => {
                          onSaveNote(`AI Note: ${item.content.slice(0, 30)}...`, item.content);
                          setSaved(true);
                        }}
                        className="px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition"
                      >
                        <Bookmark className="w-3 h-3" />
                        <span>Save Note</span>
                      </button>
                    )}
                  </div>
                )}
                <div className="markdown-body space-y-1">
                  <Markdown>{item.content}</Markdown>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex flex-col items-center justify-center py-8 text-slate-500">
              <RefreshCw className="w-7 h-7 text-blue-600 animate-spin mb-2" />
              <p className="text-xs font-medium animate-pulse">MHN AI Teacher is formulating response...</p>
            </div>
          )}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask AI Teacher anything (e.g. 'Explain Dijkstra algorithm', 'Derive power rule')..."
              className="flex-1 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-xl px-4 py-3 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold text-xs flex items-center gap-1.5 hover:bg-blue-700 disabled:opacity-50 transition shadow-sm shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
