import React, { useState } from 'react';
import { Video, Play, Sparkles, CheckCircle2, Clock, X } from 'lucide-react';
import { CURATED_VIDEOS } from '../../data/videoData';
import { CuratedVideo } from '../../types';

interface VideoLibraryViewProps {
  onOpenAITutor: (prompt?: string) => void;
}

export const VideoLibraryView: React.FC<VideoLibraryViewProps> = ({ onOpenAITutor }) => {
  const [selectedVideo, setSelectedVideo] = useState<CuratedVideo | null>(null);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold">
            <Video className="w-3.5 h-3.5" /> Curated University & School Video Lessons
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Curated Video Library</h1>
          <p className="text-slate-400 text-xs max-w-xl">
            High quality lectures from verified channels like freeCodeCamp, MIT OCW, and Khan Academy with AI summaries.
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CURATED_VIDEOS.map((vid) => (
          <div key={vid.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
            {/* Thumbnail Placeholder */}
            <div 
              onClick={() => setSelectedVideo(vid)}
              className="bg-slate-950 text-white relative h-44 flex items-center justify-center cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center group-hover:scale-110 transition shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] px-2 py-0.5 rounded font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-rose-400" /> {vid.duration}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                  {vid.subject}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{vid.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs">{vid.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-medium">Channel: {vid.creator}</span>
                <button
                  onClick={() => onOpenAITutor(`Provide a 5-point detailed summary and key equations for video lesson: ${vid.title}`)}
                  className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Video Notes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-2xl overflow-hidden w-full max-w-4xl border border-slate-800 shadow-2xl space-y-4 p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">{selectedVideo.title}</h3>
              <button onClick={() => setSelectedVideo(null)} className="p-1 hover:bg-slate-800 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
