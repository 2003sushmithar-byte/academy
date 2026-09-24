import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Play, ShieldCheck } from 'lucide-react';

export default function VideoModal() {
  const { activeModal, closeModal, modalData } = useApp();

  if (activeModal !== 'video') return null;

  // Real tech promo video URL
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';
  const title = modalData?.title || 'Nexus Academy — Engineering & Technology Program Overview';

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-4xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="modal-header bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Play className="w-4 h-4 text-indigo-400 fill-indigo-400" />
            <span>{title}</span>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-slate-950">
          <video
            controls
            autoPlay
            className="w-full h-full object-cover"
            src={videoUrl}
          >
            Your browser does not support HTML5 video tags.
          </video>
        </div>

        {/* Footer info */}
        <div className="modal-footer bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs font-semibold text-slate-700 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-slate-800 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Nexus Academy Interactive Tech Curriculum Trailer
          </span>
          <span className="text-indigo-600 font-bold bg-indigo-50 px-2.5 py-1 rounded-lg">1080p HD Video</span>
        </div>
      </div>
    </div>
  );
}
