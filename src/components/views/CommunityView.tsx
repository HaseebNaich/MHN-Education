import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Plus, Sparkles } from 'lucide-react';

interface CommunityViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ onOpenAITutor }) => {
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'How to prepare for Software Engineering SRS design assignment?',
      author: 'Ahmad SE',
      level: 'BS SE',
      replies: 12,
      likes: 34,
      content: 'Is it better to use IEEE 830 standard for SRS or Agile user story format?'
    },
    {
      id: 2,
      title: 'Calculus II Integration by Parts shortcuts and formulas',
      author: 'Sana Math',
      level: 'FSC Part 2',
      replies: 8,
      likes: 19,
      content: 'Does anyone have a cheat-sheet for the tabular method (ILATE rule)?'
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showPostModal, setShowPostModal] = useState(false);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setDiscussions([
      {
        id: Date.now(),
        title: newTitle,
        author: 'Student Learner',
        level: 'BS Level',
        replies: 0,
        likes: 1,
        content: newContent
      },
      ...discussions
    ]);
    setNewTitle('');
    setNewContent('');
    setShowPostModal(false);
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" /> Student Discussion & Peer Forum
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">MHN Student Community</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            Ask questions, form study groups, share project code, and discuss university & board exam prep.
          </p>
        </div>

        <button
          onClick={() => setShowPostModal(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition shrink-0"
        >
          <Plus className="w-4 h-4" /> Start Discussion
        </button>
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {discussions.map((d) => (
          <div key={d.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-3 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                {d.level}
              </span>
              <span className="text-xs text-slate-400">Posted by {d.author}</span>
            </div>

            <h3 className="font-bold text-base text-slate-900 dark:text-white">{d.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">{d.content}</p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5 text-indigo-600" /> {d.likes}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {d.replies} Replies</span>
              </div>
              <button
                onClick={() => onOpenAITutor(`Provide an expert academic answer to discussion prompt: ${d.title}`)}
                className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Ask AI Answer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-lg border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Start New Discussion</h3>
            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <input
                type="text"
                placeholder="Question / Discussion Title..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
              <textarea
                placeholder="Describe your question or discussion details..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Post Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
