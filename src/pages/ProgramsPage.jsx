import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UPCOMING_BATCHES, COURSES } from '../data/mockData';
import { Calendar, Clock, Zap, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProgramsPage() {
  const { openCourseDetails, openModal } = useApp();
  const [selectedMode, setSelectedMode] = useState('All');

  const filteredBatches = UPCOMING_BATCHES.filter(b => {
    if (selectedMode === 'All') return true;
    return b.mode.toLowerCase().includes(selectedMode.toLowerCase());
  });

  return (
    <div className="section-container py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          ACADEMIC BATCHES
        </span>
        <h1 className="section-title text-3xl sm:text-4xl text-slate-950 font-black">
          Intake Cohorts & Program Schedules
        </h1>
        <p className="text-sm font-semibold text-slate-700">
          Small cohort sizing ensured with a maximum limit of 30 seats per live batch.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 flex-wrap">
        {['All', 'Hybrid', 'Online', 'Weekend'].map(mode => (
          <button
            key={mode}
            onClick={() => setSelectedMode(mode)}
            className={`px-5 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              selectedMode === mode
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {mode === 'All' ? 'All Cohorts' : `${mode} Batches`}
          </button>
        ))}
      </div>

      {/* Batches List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBatches.map(batch => (
          <div key={batch.id} className="p-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-5 hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
                  {batch.mode}
                </span>
                <span className="text-xs font-black text-rose-600 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-rose-600" /> {batch.availableSeats} Seats Left
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-950 leading-snug">{batch.courseTitle}</h3>
                <p className="text-xs font-semibold text-slate-700 mt-2.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" /> Starts: {batch.startDate}
                </p>
                <p className="text-xs font-semibold text-slate-700 mt-1.5 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" /> {batch.schedule}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-800 font-medium">
                <span className="font-extrabold text-slate-950">Lead Mentor: </span>
                {batch.instructor}
              </div>
            </div>

            <div className="pt-2 flex gap-2.5">
              <button
                onClick={() => openCourseDetails(batch.courseId)}
                className="flex-1 py-2.5 text-xs font-extrabold text-slate-800 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                View Syllabus
              </button>
              <button
                onClick={() => openModal('enroll', COURSES.find(c => c.id === batch.courseId))}
                className="btn-primary flex-1 py-2.5 shadow-sm font-extrabold cursor-pointer"
              >
                Reserve Seat
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
