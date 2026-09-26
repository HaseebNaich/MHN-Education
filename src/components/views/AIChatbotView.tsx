import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  RotateCcw, 
  Bookmark, 
  Copy, 
  Check, 
  Brain, 
  BookOpen, 
  Code, 
  Calculator,
  Compass,
  ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

interface AIChatbotViewProps {
  onSaveNote?: (title: string, content: string) => void;
  selectedLevel?: string;
  setCurrentView?: (view: string) => void;
}

export const AIChatbotView: React.FC<AIChatbotViewProps> = ({
  onSaveNote,
  selectedLevel = 'bs-se',
  setCurrentView
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      content: `### 👋 Welcome to MHN Scholar AI!
I am your personal multi-turn educational professor and research mentor. 

You can ask me anything across your curriculum:
- **Google Scholar Research**: Landmark paper deconstructions (*Transformers, ResNet, MapReduce, Information Theory*)
- **Software Engineering & CS**: Algorithms, Design Patterns, Agile Scrum, System Architecture
- **Mathematics**: Step-by-step calculus proofs, derivations, and linear algebra
- **Multi-turn dialogue**: Ask follow-up questions, request simpler explanations, or ask for code implementations in Python/C++!

What topic would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [persona, setPersona] = useState<'professor' | 'engineer' | 'mathematician' | 'scholar'>('professor');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const personaPrompts = {
    professor: "You are an elite university professor. Provide structured academic explanations with clear definitions, examples, and practice questions.",
    engineer: "You are a Principal Software Engineer & Architect. Provide practical code snippets, software patterns, and complexity tradeoffs.",
    mathematician: "You are a Pure Mathematics Professor. Provide formal definitions, step-by-step mathematical proofs, and formula derivations.",
    scholar: "You are an Academic Research Director. Discuss Google Scholar papers, citations, theoretical breakthroughs, and methodology."
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt;
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInputPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({
            role: m.role,
            content: m.content
          })),
          systemPrompt: personaPrompts[persona],
          academicContext: `Level: ${selectedLevel}`
        })
      });

      const data = await res.json();
      const modelMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.text || 'Unable to generate response.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `model-error-${Date.now()}`,
        role: 'model',
        content: '⚠️ Failed to connect to Gemini AI Server. Please ensure server is running.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSave = (id: string, content: string) => {
    if (onSaveNote) {
      onSaveNote(`Chat Note (${new Date().toLocaleDateString()})`, content);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2000);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'model',
        content: "Chat history cleared. What topic or Google Scholar research paper should we study next?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const starterPills = [
    "Explain Self-Attention in Transformers (Vaswani et al.)",
    "Derive the Integration by Parts formula step by step",
    "How does Dijkstra algorithm work with a Min-Heap priority queue?",
    "Explain Residual Skip Connections in ResNet (He et al.)",
    "What are the best free Google Scholar courses for Machine Learning?"
  ];

  return (
    <div className="space-y-4 py-2 max-w-5xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Bot className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">MHN Scholar AI Chatbot</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Multi-Turn Memory Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Maintains full conversation history across questions. Ask follow-ups, challenge assumptions, and dive deep into academic research.
            </p>
          </div>
        </div>

        {/* Right Controls: Persona & Clear */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Persona selector */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
            <button
              onClick={() => setPersona('professor')}
              className={`px-2.5 py-1 rounded-lg transition ${persona === 'professor' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Professor
            </button>
            <button
              onClick={() => setPersona('engineer')}
              className={`px-2.5 py-1 rounded-lg transition ${persona === 'engineer' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Engineer
            </button>
            <button
              onClick={() => setPersona('mathematician')}
              className={`px-2.5 py-1 rounded-lg transition ${persona === 'mathematician' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Math
            </button>
            <button
              onClick={() => setPersona('scholar')}
              className={`px-2.5 py-1 rounded-lg transition ${persona === 'scholar' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-white'}`}
            >
              Scholar
            </button>
          </div>

          <button
            onClick={handleClearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 transition text-xs flex items-center gap-1 border border-slate-800"
            title="Clear Chat History"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Chat Conversation Container */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[650px] shadow-xl">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-sm ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'model' && (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-600/30">
                  AI
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-xs shadow-md shadow-indigo-600/20'
                    : 'bg-slate-950/70 text-slate-200 border border-slate-800/80 rounded-tl-xs'
                }`}
              >
                <div className="markdown-body">
                  <Markdown>{msg.content}</Markdown>
                </div>

                <div className={`flex items-center justify-between pt-2 border-t text-[10px] ${msg.role === 'user' ? 'border-indigo-500/40 text-indigo-200' : 'border-slate-800 text-slate-400'}`}>
                  <span>{msg.timestamp}</span>
                  
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-indigo-400 flex items-center gap-1 transition"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                      </button>

                      {onSaveNote && (
                        <button
                          onClick={() => handleSave(msg.id, msg.content)}
                          className="hover:text-indigo-400 flex items-center gap-1 transition"
                          title="Save to study dashboard notes"
                        >
                          {savedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Bookmark className="w-3 h-3" />}
                          <span>{savedId === msg.id ? 'Saved' : 'Save Note'}</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center text-slate-300 text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 text-sm items-start">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 shrink-0 flex items-center justify-center text-white text-xs font-bold animate-pulse">
                AI
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span>Scholar AI is formulating pedagogical response...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Starter Pills */}
        <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-slate-400 font-medium shrink-0">Try Asking:</span>
          {starterPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(pill)}
              className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/40 whitespace-nowrap transition"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Input Form Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Ask anything (e.g. 'Explain the Self-Attention formula', 'Can you simplify your last point?')..."
              className="flex-1 bg-slate-900 text-slate-100 text-xs rounded-xl px-4 py-3 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition disabled:opacity-50 shadow-md shadow-indigo-600/20 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
