import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Brain, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  Bookmark, 
  Download, 
  Share2, 
  ArrowRight,
  Layers,
  Sparkles,
  Check,
  FileText
} from 'lucide-react';
import { CURRICULUM_TOPICS, LEVEL_OPTIONS } from '../../data/curriculumData';
import { CurriculumTopic } from '../../types';

interface CurriculumViewProps {
  selectedLevel: string;
  setSelectedLevel: (lvl: string) => void;
  onOpenAITutor: (prompt?: string) => void;
  onSaveNote?: (title: string, content: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  selectedLevel,
  setSelectedLevel,
  onOpenAITutor,
  onSaveNote
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTopic, setActiveTopic] = useState<CurriculumTopic>(CURRICULUM_TOPICS[0]);
  const [activeTab, setActiveTab] = useState<'explanation' | 'diagram' | 'mcqs' | 'interview' | 'revision'>('explanation');
  const [selectedMcqAnswers, setSelectedMcqAnswers] = useState<Record<number, number>>({});
  const [savedNoteSuccess, setSavedNoteSuccess] = useState(false);

  const filteredTopics = CURRICULUM_TOPICS.filter((t) => {
    const matchesLevel = selectedLevel ? t.level === selectedLevel || t.level === 'bs-se' || t.level === 'bs-cs' : true;
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const handleMcqSelect = (mcqIdx: number, optionIdx: number) => {
    setSelectedMcqAnswers(prev => ({ ...prev, [mcqIdx]: optionIdx }));
  };

  const handleDownloadNote = () => {
    const element = document.createElement("a");
    const noteText = `MHN EDUCATION NOTES: ${activeTopic.title}\nSubject: ${activeTopic.subject}\nLevel: ${activeTopic.levelLabel}\n\n=== INTRODUCTION ===\n${activeTopic.sections.introduction}\n\n=== BASIC CONCEPTS ===\n${activeTopic.sections.basicConcepts}\n\n=== INTERMEDIATE EXPLANATION ===\n${activeTopic.sections.intermediateExplanation}\n\n=== ADVANCED EXPLANATION ===\n${activeTopic.sections.advancedExplanation}\n\n=== REVISION NOTES ===\n${activeTopic.sections.revisionNotes.join('\n')}`;
    const file = new Blob([noteText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeTopic.id}-MHN-Notes.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Top Banner & Level Selector */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> University & School Curriculum Notes
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Complete Topics & Study Notes</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Deep structured lessons including Introduction, Intermediate, Advanced explanation, Flowcharts, Solved Examples, MCQs, and Interview Qs.
          </p>
        </div>

        {/* Level Dropdown */}
        <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 w-full md:w-auto">
          <label htmlFor="curriculum-academic-level-select" className="text-xs text-slate-400 block mb-1 font-medium">Filter by Academic Level:</label>
          <select
            id="curriculum-academic-level-select"
            aria-label="Filter Curriculum by Academic Level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="w-full bg-slate-900 text-amber-300 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {LEVEL_OPTIONS.map((lvl) => (
              <option key={lvl.id} value={lvl.id}>{lvl.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Topic List & Detail Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Topic List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topics or subjects..."
              className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

          <div className="space-y-2 max-h-[650px] overflow-y-auto pr-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Available Topics ({filteredTopics.length})</h3>
            {filteredTopics.map((topic) => {
              const isActive = activeTopic.id === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => {
                    setActiveTopic(topic);
                    setSelectedMcqAnswers({});
                    setSavedNoteSuccess(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs transition space-y-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md font-semibold'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {topic.subject}
                    </span>
                    <span className="text-[10px] opacity-80">{topic.estimatedMinutes} min read</span>
                  </div>
                  <h4 className="font-bold text-xs leading-snug">{topic.title}</h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Main Content: Comprehensive Topic Reader */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          {/* Topic Title Header */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                {activeTopic.subject} • {activeTopic.levelLabel}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownloadNote}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" /> Export Notes
                </button>
                {onSaveNote && (
                  <button
                    onClick={() => {
                      onSaveNote(activeTopic.title, activeTopic.sections.introduction + '\n\n' + activeTopic.sections.basicConcepts);
                      setSavedNoteSuccess(true);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                      savedNoteSuccess ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {savedNoteSuccess ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    {savedNoteSuccess ? 'Saved to Dashboard' : 'Save Note'}
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">{activeTopic.title}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{activeTopic.summary}</p>
          </div>

          {/* Navigation Tabs for Note Sections */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('explanation')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === 'explanation' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Deep Explanations
            </button>
            <button
              onClick={() => setActiveTab('diagram')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === 'diagram' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Diagram & Flowchart
            </button>
            <button
              onClick={() => setActiveTab('mcqs')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === 'mcqs' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Practice MCQs ({activeTopic.sections.mcqs.length})
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === 'interview' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Interview Questions
            </button>
            <button
              onClick={() => setActiveTab('revision')}
              className={`px-3.5 py-2 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition ${
                activeTab === 'revision' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Revision Cheat-Sheet
            </button>
          </div>

          {/* TAB 1: Deep Explanations */}
          {activeTab === 'explanation' && (
            <div className="space-y-8 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {/* Introduction */}
              <section className="space-y-2">
                <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> 1. Introduction
                </h3>
                <p className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">{activeTopic.sections.introduction}</p>
              </section>

              {/* Basic Concepts */}
              <section className="space-y-2">
                <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> 2. Fundamental Concepts
                </h3>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-pre-line font-mono text-xs text-slate-700 dark:text-slate-300">
                  {activeTopic.sections.basicConcepts}
                </div>
              </section>

              {/* Intermediate Explanation */}
              <section className="space-y-2">
                <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> 3. Intermediate Breakdown
                </h3>
                <p className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-pre-line">{activeTopic.sections.intermediateExplanation}</p>
              </section>

              {/* Advanced Explanation */}
              <section className="space-y-2">
                <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> 4. Advanced Deep-Dive & Architectures
                </h3>
                <p className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800 whitespace-pre-line">{activeTopic.sections.advancedExplanation}</p>
              </section>

              {/* Real World Applications */}
              <section className="space-y-2">
                <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600" /> 5. Real-World Applications
                </h3>
                <ul className="space-y-2">
                  {activeTopic.sections.applications.map((app, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-blue-50/50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-100 dark:border-blue-900/40 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Solved Examples */}
              {activeTopic.sections.examples.length > 0 && (
                <section className="space-y-3">
                  <h3 className="font-bold text-base text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" /> 6. Solved Case Example
                  </h3>
                  {activeTopic.sections.examples.map((ex, idx) => (
                    <div key={idx} className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-xl space-y-2 text-xs">
                      <h4 className="font-bold text-amber-900 dark:text-amber-300">{ex.title}</h4>
                      <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line">{ex.detail}</p>
                    </div>
                  ))}
                </section>
              )}

              {/* Ask AI Button Banner */}
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-bold text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4 text-amber-300" /> Need follow-up explanations on {activeTopic.title}?
                  </h4>
                  <p className="text-xs text-blue-200">Ask your AI Teacher for step-by-step custom examples or proofs.</p>
                </div>
                <button
                  onClick={() => onOpenAITutor(`Deep dive and further details on topic: ${activeTopic.title}`)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-4 py-2 rounded-xl text-xs transition shrink-0"
                >
                  Ask AI Tutor
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Diagram & Flowcharts */}
          {activeTab === 'diagram' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" /> Structural ASCII Flowchart & Architectural Diagram
              </h3>
              <div className="bg-slate-950 text-emerald-400 p-6 rounded-2xl font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner leading-relaxed">
                <pre>{activeTopic.sections.diagramFlowchart || '[ Visual flowchart representation available for this module ]'}</pre>
              </div>
            </div>
          )}

          {/* TAB 3: Interactive MCQs */}
          {activeTab === 'mcqs' && (
            <div className="space-y-6">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" /> Interactive Practice Multiple Choice Questions
              </h3>

              <div className="space-y-6">
                {activeTopic.sections.mcqs.map((mcq, mIdx) => {
                  const selectedOption = selectedMcqAnswers[mIdx];
                  const isSubmitted = selectedOption !== undefined;
                  const isCorrect = selectedOption === mcq.answerIndex;

                  return (
                    <div key={mIdx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{mIdx + 1}. {mcq.question}</p>

                      <div className="space-y-2">
                        {mcq.options.map((opt, oIdx) => {
                          let style = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400";
                          if (isSubmitted) {
                            if (oIdx === mcq.answerIndex) style = "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold";
                            else if (oIdx === selectedOption) style = "bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200";
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleMcqSelect(mIdx, oIdx)}
                              className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${style}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && oIdx === mcq.answerIndex && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className={`p-3 rounded-lg border text-xs ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-800 dark:text-emerald-300' : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-800 dark:text-amber-300'}`}>
                          <strong>Explanation:</strong> {mcq.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: Interview Questions */}
          {activeTab === 'interview' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" /> High-Yield Technical & Exam Interview Questions
              </h3>
              <div className="space-y-4">
                {activeTopic.sections.interviewQuestions.map((iq, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Q: {iq.question}</h4>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 font-mono">
                      {iq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Revision Notes */}
          {activeTab === 'revision' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" /> High-Yield Revision Cheat-Sheet & Formula Highlights
              </h3>
              <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 p-5 rounded-2xl space-y-2 text-xs">
                {activeTopic.sections.revisionNotes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span className="font-semibold">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
