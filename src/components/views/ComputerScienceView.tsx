import React, { useState } from 'react';
import { Cpu, Play, RefreshCw, Layers, CheckCircle2, Brain, Sparkles, ArrowRight } from 'lucide-react';

interface ComputerScienceViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const ComputerScienceView: React.FC<ComputerScienceViewProps> = ({ onOpenAITutor }) => {
  const [activeVisualizer, setActiveVisualizer] = useState<'sorting' | 'bst' | 'stack'>('sorting');
  const [arrayNumbers, setArrayNumbers] = useState<number[]>([45, 12, 89, 23, 67, 34, 90, 15]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const handleBubbleSort = async () => {
    setIsSorting(true);
    let arr = [...arrayNumbers];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveIndices([j, j + 1]);
        await new Promise(r => setTimeout(r, 400));
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArrayNumbers([...arr]);
        }
      }
    }
    setActiveIndices([]);
    setIsSorting(false);
  };

  const resetArray = () => {
    setArrayNumbers([45, 12, 89, 23, 67, 34, 90, 15]);
    setActiveIndices([]);
  };

  const csModules = [
    { title: 'Data Structures & Algorithms', desc: 'Arrays, Linked Lists, Trees, Graphs, Sorting, Hash Maps, Dynamic Programming.' },
    { title: 'Operating Systems (OS)', desc: 'Process Management, Threads, Deadlocks, Virtual Memory, Paging, Scheduling.' },
    { title: 'Computer Networks', desc: 'OSI 7-Layer Model, TCP/IP Suite, HTTP/HTTPS, DNS, BGP Routing, Socket API.' },
    { title: 'Database Management (DBMS)', desc: 'Relational Model, ER Diagrams, Normalization (3NF/BCNF), SQL, Transactions.' },
    { title: 'Object-Oriented Programming (OOP)', desc: 'Encapsulation, Abstraction, Inheritance, Polymorphism, Interfaces.' },
    { title: 'Artificial Intelligence & ML', desc: 'Supervised Learning, Neural Networks, Deep Learning, Backpropagation, Transformers.' }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
            <Cpu className="w-3.5 h-3.5" /> Computer Science Core & Interactive Visualizer
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Computer Science & DSA Visualizer</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Explore core CS university subjects and visualize algorithm execution step-by-step.
          </p>
        </div>

        <button
          onClick={() => onOpenAITutor("Explain Dijkstra algorithm and Bellman-Ford algorithm complexity differences")}
          className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 transition shrink-0"
        >
          <Brain className="w-4 h-4 text-amber-300" /> Ask CS Professor AI
        </button>
      </div>

      {/* Interactive Visualizer Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-600" /> Interactive Sorting & DSA Visualizer
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Watch real-time array state changes during Bubble Sort algorithm steps.</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBubbleSort}
              disabled={isSorting}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> {isSorting ? 'Sorting...' : 'Start Bubble Sort'}
            </button>
            <button
              onClick={resetArray}
              disabled={isSorting}
              className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 transition"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
        </div>

        {/* Visualizer Canvas Area */}
        <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex items-end justify-center gap-3 min-h-[220px]">
          {arrayNumbers.map((val, idx) => {
            const isComparing = activeIndices.includes(idx);
            return (
              <div key={idx} className="flex flex-col items-center gap-2 group">
                <span className="text-[10px] font-mono text-slate-400">{val}</span>
                <div
                  style={{ height: `${val * 1.8}px` }}
                  className={`w-8 sm:w-10 rounded-t-lg transition-all duration-300 ${
                    isComparing ? 'bg-amber-400 shadow-lg shadow-amber-400/50 scale-105' : 'bg-cyan-500 hover:bg-cyan-400'
                  }`}
                />
                <span className="text-[9px] font-mono text-slate-600">[{idx}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* University Subject Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Computer Science Core Curriculum</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csModules.map((m, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{m.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{m.desc}</p>
              <button
                onClick={() => onOpenAITutor(`Explain core principles of ${m.title}`)}
                className="text-xs text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1 pt-2 hover:underline"
              >
                Learn with AI <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
