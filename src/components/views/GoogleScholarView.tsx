import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  MapPin, 
  Award, 
  FileText, 
  CheckCircle2, 
  RefreshCw, 
  ChevronRight, 
  Layers,
  Compass,
  Bookmark,
  Share2,
  Navigation
} from 'lucide-react';
import Markdown from 'react-markdown';
import { 
  GOOGLE_SCHOLAR_COURSES, 
  GOOGLE_SCHOLAR_NOTES, 
  ScholarCourse, 
  ScholarResearchNote 
} from '../../data/scholarData';

interface GoogleScholarViewProps {
  onOpenAITutor: (prompt?: string) => void;
  onSaveNote?: (title: string, content: string) => void;
}

export const GoogleScholarView: React.FC<GoogleScholarViewProps> = ({ 
  onOpenAITutor,
  onSaveNote 
}) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'notes' | 'campus-maps'>('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modals / Details
  const [selectedCourse, setSelectedCourse] = useState<ScholarCourse | null>(null);
  const [selectedNote, setSelectedNote] = useState<ScholarResearchNote | null>(null);
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false);
  const [aiSummaryText, setAiSummaryText] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Google Maps Academic Places State
  const [mapsQuery, setMapsQuery] = useState('Boston, MA (MIT & Harvard Campuses)');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<{
    text: string;
    places: Array<{ title: string; uri: string; snippet?: string }>;
  } | null>({
    text: `### 🏛️ Top University Libraries & Academic Study Hubs\nRenowned academic centers with extensive open stacks, reading halls, and research facilities:`,
    places: [
      {
        title: "Harvard Widener & Lamont Academic Research Libraries",
        uri: "https://www.google.com/maps/search/Harvard+University+Widener+Library",
        snippet: "Flagship research library with 3.5+ million volumes, study halls, and graduate research carrels."
      },
      {
        title: "MIT Barker Engineering Library & Hayden Library",
        uri: "https://www.google.com/maps/search/MIT+Barker+Engineering+Library",
        snippet: "Iconic dome reading room with 24/7 student study zones, engineering archives, and computing labs."
      },
      {
        title: "Stanford Green Library & Tech Reading Center",
        uri: "https://www.google.com/maps/search/Stanford+University+Green+Library",
        snippet: "Premier academic library with multimedia research suites, individual carrels, and vast digital archives."
      },
      {
        title: "British Library & Academic Reading Rooms (London)",
        uri: "https://www.google.com/maps/search/British+Library+London",
        snippet: "World-class national reference library hosting over 170 million items for scholars and researchers."
      }
    ]
  });
  const [locationStatus, setLocationStatus] = useState<string>('');

  const institutions = ['All', 'Google', 'DeepMind', 'MIT', 'Stanford', 'Harvard', 'Oxford'];
  const categories = ['All', 'Machine Learning & AI', 'Computer Systems', 'Mathematics & Theory'];

  // Filtered Courses
  const filteredCourses = GOOGLE_SCHOLAR_COURSES.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesInst = selectedInstitution === 'All' || c.institution === selectedInstitution;
    return matchesSearch && matchesInst;
  });

  // Filtered Research Notes
  const filteredNotes = GOOGLE_SCHOLAR_NOTES.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || n.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Fetch AI Scholar Summary for a Paper or Course
  const handleGenerateAIScholarSummary = async (item: ScholarCourse | ScholarResearchNote, type: 'course' | 'paper') => {
    setAiSummaryLoading(true);
    setAiSummaryText(null);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/ai/scholar-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: item.title,
          authors: 'instructors' in item ? item.instructors : item.authors,
          subject: 'subject' in item ? item.subject : item.category,
          detailType: type === 'course' ? 'Free University Scholar Course' : 'Academic Research Paper'
        })
      });
      const data = await res.json();
      setAiSummaryText(data.summary || 'Summary generation completed.');
    } catch (err) {
      console.error(err);
      setAiSummaryText('Failed to generate live scholar breakdown.');
    } finally {
      setAiSummaryLoading(false);
    }
  };

  // Google Maps Search for Academic Libraries & Campus Study Hubs
  const handleSearchAcademicPlaces = async (useGeo = false) => {
    setMapsLoading(true);
    setLocationStatus(useGeo ? 'Locating your GPS coordinates...' : 'Searching Google Maps...');

    let lat: number | undefined;
    let lng: number | undefined;

    if (useGeo && 'geolocation' in navigator) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 8000 });
        });
        lat = pos.coords.latitude;
        lng = pos.coords.longitude;
        setLocationStatus(`Found location (${lat.toFixed(3)}, ${lng.toFixed(3)})`);
      } catch (e) {
        console.warn('Geolocation fallback:', e);
        setLocationStatus('Using location search text');
      }
    }

    try {
      const res = await fetch('/api/ai/academic-places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: mapsQuery || "University libraries and academic study centers",
          latitude: lat,
          longitude: lng
        })
      });
      const data = await res.json();
      setMapsResult({
        text: data.text || "No results found.",
        places: data.places || []
      });
    } catch (err) {
      console.error(err);
      setLocationStatus('Failed to load places');
    } finally {
      setMapsLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Hero Banner Bento Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-900 border border-indigo-900/40 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400" /> Google Scholar Education Hub
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Google Scholar <span className="text-indigo-400">Free Courses & Research Study Notes</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore university open-courseware from Google DeepMind, MIT, Stanford, Harvard, and Oxford. Review landmark research monographs with step-by-step mathematical proofs and find campus libraries with Google Maps data.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://scholar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-2"
            >
              <span>Visit Google Scholar</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-300" />
            </a>
            <button
              onClick={() => onOpenAITutor("Explain the most cited research papers on Google Scholar in Artificial Intelligence and Mathematics")}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ask AI Scholar</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'courses'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Free Scholar Courses ({GOOGLE_SCHOLAR_COURSES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'notes'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Research Paper Notes & Proofs ({GOOGLE_SCHOLAR_NOTES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('campus-maps')}
            className={`px-4 py-2 rounded-xl font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'campus-maps'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'bg-slate-900/60 text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Campus & Scholar Libraries Locator (Google Maps)</span>
          </button>
        </div>
      </div>

      {/* TAB 1: FREE SCHOLAR COURSES */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, professors, topics..."
                className="w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Institution Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
              <span className="text-slate-400 font-medium shrink-0">Institution:</span>
              {institutions.map(inst => (
                <button
                  key={inst}
                  onClick={() => setSelectedInstitution(inst)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                    selectedInstitution === inst
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {inst}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div 
                key={course.id}
                className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition shadow-sm hover:shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                      {course.institution} • {course.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-amber-500 flex items-center gap-1">
                      ★ {course.rating} <span className="text-slate-400 font-normal">({course.studentsEnrolled})</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-500 transition leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <strong>Instructors:</strong> {course.instructors}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-semibold text-slate-400 mb-1.5">Core Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.topicsCovered.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-md">
                          {t}
                        </span>
                      ))}
                      {course.topicsCovered.length > 3 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5">+{course.topicsCovered.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedCourse(course);
                      handleGenerateAIScholarSummary(course, 'course');
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>View Syllabus</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={course.scholarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                      title="Search Citations on Google Scholar"
                    >
                      <Search className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href={course.accessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
                    >
                      <span>Free Course</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: RESEARCH PAPER STUDY NOTES & MONOGRAPHS */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search landmark papers, formulas, authors..."
                className="w-full bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-xs rounded-xl pl-9 pr-4 py-2.5 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto text-xs">
              <span className="text-slate-400 font-medium shrink-0">Field:</span>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notes List / Grid */}
          <div className="space-y-4">
            {filteredNotes.map(note => (
              <div 
                key={note.id}
                className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 hover:border-indigo-500/50 transition shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {note.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      {note.publication} ({note.year})
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/60 w-fit">
                    Google Scholar Citations: <strong className="text-white">{note.citations}</strong>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <strong>Authors:</strong> {note.authors}
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 space-y-2">
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Abstract & Core Breakthrough</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{note.abstract}"
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 pt-1 font-medium">
                    <strong className="text-emerald-400">Contribution:</strong> {note.coreContribution}
                  </p>
                </div>

                {/* Mathematical Formulations & Concepts Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  {note.keyFormulasOrConcepts.slice(0, 2).map((kf, idx) => (
                    <div key={idx} className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 text-xs space-y-1">
                      <p className="font-semibold text-slate-900 dark:text-indigo-300">{kf.name}</p>
                      <code className="block bg-slate-200 dark:bg-slate-950 px-2 py-1 rounded font-mono text-[11px] text-amber-600 dark:text-amber-300 overflow-x-auto">
                        {kf.formulaOrConcept}
                      </code>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{kf.explanation}</p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedNote(note);
                        handleGenerateAIScholarSummary(note, 'paper');
                      }}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/20 transition"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>AI Research Deep Dive & Exam Qs</span>
                    </button>
                    <button
                      onClick={() => onOpenAITutor(`Step by step mathematical proof and implementation of: ${note.title}`)}
                      className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium transition"
                    >
                      Ask AI Tutor
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={note.scholarQueryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                    >
                      <span>Google Scholar Search</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href={note.doiOrArxivUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <span>Original Paper Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CAMPUS & SCHOLAR LIBRARIES LOCATOR (Google Maps Data Grounding) */}
      {activeTab === 'campus-maps' && (
        <div className="space-y-6">
          {/* Bento Card: Search Header */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                  <MapPin className="w-3.5 h-3.5" /> Powered by Google Maps Data Grounding
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Campus & Scholar Research Libraries Locator
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-xl">
                  Locate university campus research libraries, quiet academic study halls, national archives, and computer laboratories with real-time Google Maps coordinates and direct navigation links.
                </p>
              </div>

              <button
                onClick={() => handleSearchAcademicPlaces(true)}
                disabled={mapsLoading}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition disabled:opacity-50 shrink-0"
              >
                <Navigation className="w-4 h-4" />
                <span>Use My Geolocation</span>
              </button>
            </div>

            {/* Location Query Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchAcademicPlaces(false);
              }}
              className="flex flex-col sm:flex-row items-center gap-3 pt-2"
            >
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  placeholder="Enter city, university or campus (e.g. 'Cambridge MA', 'Stanford CA', 'London', 'Karachi NUST')..."
                  className="w-full bg-slate-950 text-slate-100 text-xs rounded-xl pl-9 pr-4 py-3 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <MapPin className="w-4 h-4 text-emerald-400 absolute left-3 top-3.5" />
              </div>
              <button
                type="submit"
                disabled={mapsLoading}
                className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-md"
              >
                {mapsLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Find Academic Places</span>
              </button>
            </form>

            {locationStatus && (
              <p className="text-[11px] text-slate-400 italic">{locationStatus}</p>
            )}
          </div>

          {/* Places Results */}
          {mapsLoading && (
            <div className="p-12 text-center text-slate-400 space-y-3 bg-slate-900/40 border border-slate-800 rounded-3xl">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-white">Retrieving academic libraries and study hubs...</p>
              <p className="text-xs text-slate-400">Grounding query with Google Maps real-time data</p>
            </div>
          )}

          {!mapsLoading && mapsResult && (
            <div className="space-y-6">
              {/* Grounded Summary Text */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 text-sm text-slate-200 leading-relaxed markdown-body">
                <Markdown>{mapsResult.text}</Markdown>
              </div>

              {/* Verified Google Maps Places Cards */}
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>Google Maps Grounded Locations & Direct Links</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mapsResult.places.map((place, idx) => (
                    <div 
                      key={idx}
                      className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition space-y-3 group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                          <h4 className="font-bold text-sm text-white group-hover:text-emerald-400 transition">
                            {place.title}
                          </h4>
                        </div>
                        {place.snippet && (
                          <p className="text-xs text-slate-400 leading-relaxed pl-8">
                            "{place.snippet}"
                          </p>
                        )}
                      </div>

                      <div className="pt-2 pl-8 flex items-center gap-3">
                        <a
                          href={place.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600 hover:text-white border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5 transition"
                        >
                          <span>Open in Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <button
                          onClick={() => onOpenAITutor(`Tell me about the collections, study spaces, and membership rules for: ${place.title}`)}
                          className="text-xs text-slate-400 hover:text-white font-medium flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          <span>Library Guide</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: Course / Research Paper AI Study Monograph */}
      {(selectedCourse || selectedNote) && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col text-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  {selectedCourse ? 'Google Scholar Free Course' : 'Landmark Research Paper Monograph'}
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedCourse ? selectedCourse.title : selectedNote?.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedCourse ? `Instructors: ${selectedCourse.instructors}` : `Authors: ${selectedNote?.authors}`}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedNote(null);
                  setAiSummaryText(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {/* Course Syllabus Preview if Course */}
              {selectedCourse && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Curriculum Syllabus Outline</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedCourse.syllabusOutline.map(w => (
                      <div key={w.week} className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 space-y-1.5">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase">Week {w.week}</span>
                        <p className="text-xs font-semibold text-white">{w.title}</p>
                        <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-0.5">
                          {w.topics.map((tp, idx) => (
                            <li key={idx}>{tp}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Research Paper Formulas if Note */}
              {selectedNote && (
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">Formulas & Theoretical Framework</h4>
                  <div className="space-y-2">
                    {selectedNote.keyFormulasOrConcepts.map((kf, idx) => (
                      <div key={idx} className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-1">
                        <p className="text-xs font-bold text-white">{kf.name}</p>
                        <code className="block bg-slate-900 p-2 rounded-lg font-mono text-xs text-amber-300">
                          {kf.formulaOrConcept}
                        </code>
                        <p className="text-xs text-slate-400">{kf.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Scholar Monograph Deep Dive */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Gemini Scholar Study Monograph & Exam Q&A</span>
                  </h4>
                  {aiSummaryText && onSaveNote && (
                    <button
                      onClick={() => {
                        const title = selectedCourse ? selectedCourse.title : selectedNote?.title || 'Scholar Note';
                        onSaveNote(`Scholar Note: ${title}`, aiSummaryText);
                        setSavedSuccess(true);
                      }}
                      className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition text-indigo-300"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{savedSuccess ? 'Saved to Dashboard!' : 'Save to Study Notes'}</span>
                    </button>
                  )}
                </div>

                {aiSummaryLoading && (
                  <div className="p-8 text-center text-slate-400 space-y-2 bg-slate-950/60 rounded-2xl border border-slate-800">
                    <RefreshCw className="w-6 h-6 animate-spin text-indigo-400 mx-auto" />
                    <p className="text-xs font-semibold text-white">Generating academic breakdown and exam questions...</p>
                  </div>
                )}

                {aiSummaryText && (
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-xs leading-relaxed markdown-body">
                    <Markdown>{aiSummaryText}</Markdown>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <a
                href={selectedCourse ? selectedCourse.accessUrl : selectedNote?.scholarQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <span>{selectedCourse ? 'Open Free Courseware' : 'View on Google Scholar'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  setSelectedCourse(null);
                  setSelectedNote(null);
                  setAiSummaryText(null);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
