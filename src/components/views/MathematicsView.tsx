import React, { useState } from 'react';
import { Calculator, Sparkles, Brain, CheckCircle2, ArrowRight } from 'lucide-react';

interface MathematicsViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const MathematicsView: React.FC<MathematicsViewProps> = ({ onOpenAITutor }) => {
  const [expression, setExpression] = useState('x^2 * sin(x)');
  const [operation, setOperation] = useState<'derivative' | 'integral'>('derivative');
  const [mathSolution, setMathSolution] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSolveMath = async () => {
    setLoading(true);
    setMathSolution(null);
    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Calculate the step-by-step ${operation} of the expression: f(x) = ${expression}. Show full work with derivative/integration rules, formulas, and final answer.`,
          subject: 'Mathematics',
          level: 'FSC / BS Level'
        })
      });
      const data = await res.json();
      setMathSolution(data.text || 'Solution calculated.');
    } catch (err) {
      console.error(err);
      setMathSolution('Failed to connect to Math Solver AI.');
    } finally {
      setLoading(false);
    }
  };

  const mathTopics = [
    { title: 'Calculus: Derivatives', desc: 'Power rule, Product rule, Quotient rule, Chain rule, Implicit differentiation, Partial derivatives.' },
    { title: 'Calculus: Integration', desc: 'Indefinite & Definite integrals, u-substitution, Integration by Parts, Partial Fractions, Area under curves.' },
    { title: 'Linear Algebra', desc: 'Matrices, Determinants, Vectors, Eigenvalues, Eigenvectors, Gaussian Elimination, Matrix Transformations.' },
    { title: 'Differential Equations', desc: 'First-order ODEs, Separable variables, Homogeneous equations, Higher-order linear differential equations.' },
    { title: 'Discrete Mathematics', desc: 'Set Theory, Propositional Logic, Mathematical Induction, Graph Theory, Combinatorics, Permutations.' },
    { title: 'Probability & Statistics', desc: 'Probability distributions, Expectation, Variance, Bayes Theorem, Hypothesis testing, Regression.' }
  ];

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" /> Mathematics & Calculus Solver Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Mathematics & Step-by-Step Solver</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Solve derivatives, integrals, linear algebra, and differential equations step-by-step with proofs.
          </p>
        </div>

        <button
          onClick={() => onOpenAITutor("Prove Fundamental Theorem of Calculus with step by step geometric and algebraic proof")}
          className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-600/20 transition shrink-0"
        >
          <Brain className="w-4 h-4 text-slate-900" /> Ask AI Math Professor
        </button>
      </div>

      {/* Interactive Step-by-Step Math Solver */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-600" /> Interactive AI Calculus Step Solver
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs">Enter any mathematical expression for step-by-step differentiation or integration.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-3">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Operation:</label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as any)}
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none"
            >
              <option value="derivative">Derivative d/dx</option>
              <option value="integral">Integral ∫ dx</option>
            </select>
          </div>

          <div className="md:col-span-6">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1">Function Expression f(x):</label>
            <input
              type="text"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g. x^2 * sin(x) or e^(3x) / (x + 1)"
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-xs rounded-xl px-4 py-2.5 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="md:col-span-3 pt-5">
            <button
              onClick={handleSolveMath}
              disabled={loading || !expression.trim()}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-slate-900" /> {loading ? 'Calculating...' : 'Solve Step-by-Step'}
            </button>
          </div>
        </div>

        {mathSolution && (
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs leading-relaxed animate-in fade-in">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step-by-Step Solved Proof:
            </h4>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-wrap">
              {mathSolution}
            </div>
          </div>
        )}
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mathematics Curriculum & Topics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mathTopics.map((mt, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Calculator className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">{mt.title}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{mt.desc}</p>
              <button
                onClick={() => onOpenAITutor(`Explain and give 3 solved examples for ${mt.title}`)}
                className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1 pt-2 hover:underline"
              >
                Solve with AI <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
