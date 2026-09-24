import React from 'react';
import { useApp } from '../context/AppContext';
import { CAREER_OPENINGS } from '../data/mockData';
import { Briefcase, MapPin, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const { openModal } = useApp();

  return (
    <div className="section-container py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          JOIN OUR TEAM
        </span>
        <h1 className="section-title text-3xl sm:text-4xl">
          Career Openings at Nexus Academy
        </h1>
      </div>

      <div className="space-y-4">
        {CAREER_OPENINGS.map(job => (
          <div key={job.id} className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-full">
                {job.department}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{job.title}</h3>
              <p className="text-xs text-slate-500 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> {job.location} • {job.type}
              </p>
            </div>
            <button
              onClick={() => openModal('career-application', job)}
              className="btn-primary px-6 py-2.5 shrink-0 shadow-none cursor-pointer"
            >
              Apply for Role <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
