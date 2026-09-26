import React, { useState } from 'react';
import { BookMarked, Search, ExternalLink, ShieldCheck, Download, Sparkles, Filter } from 'lucide-react';
import { OPEN_LIBRARY_BOOKS } from '../../data/libraryData';

interface LibraryViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onOpenAITutor }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const subjects = ['All', 'Mathematics', 'Computer Science', 'Physics', 'Programming', 'Software Engineering', 'Artificial Intelligence'];

  const filteredBooks = OPEN_LIBRARY_BOOKS.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.author.toLowerCase().includes(searchTerm.toLowerCase()) || b.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || b.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'All' || b.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            <BookMarked className="w-3.5 h-3.5" /> 100% Legal Open Textbooks & Documentation
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Open Educational Resources Library</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Search peer-reviewed textbooks, public domain classics, MIT OCW courseware, arXiv open papers, and official language documentation.
          </p>
        </div>

        <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center gap-2 text-xs text-emerald-400 max-w-xs">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>Strictly compliant with copyright law. All items link to original legal publishers.</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search open books, authors, topics..."
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs rounded-xl pl-9 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>

        {/* Subject Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
                selectedSubject === sub
                  ? 'bg-purple-600 text-white font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Books Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
                  {book.subject}
                </span>
                <span className="text-[10px] font-medium text-slate-400">{book.downloadFormat}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition leading-snug">
                {book.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 text-xs">
                <strong>Author:</strong> {book.author}
              </p>

              <p className="text-slate-600 dark:text-slate-300 text-xs line-clamp-3 leading-relaxed">
                {book.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">Publisher: {book.universityOrPublisher}</span>
                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">License: {book.license}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => onOpenAITutor(`Summarize key concepts from open textbook: ${book.title}`)}
                className="text-xs text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Summary
              </button>
              
              <a
                href={book.legalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <span>Read Official Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
