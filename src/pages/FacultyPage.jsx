import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FACULTY } from '../data/mockData';
import { 
  Users, 
  Star, 
  Award, 
  Search, 
  BookOpen, 
  CheckCircle2, 
  Briefcase 
} from 'lucide-react';

export default function FacultyPage() {
  const { facultyList = FACULTY, openModal } = useApp();
  const [facultySearch, setFacultySearch] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('All');

  const activeFacultyList = facultyList && facultyList.length > 0 ? facultyList : FACULTY;

  // Extract unique specializations for quick filtering
  const specializations = ['All', ...new Set(activeFacultyList.map(f => f.specialization).filter(Boolean))];

  const filteredFaculty = activeFacultyList.filter(trainer => {
    if (trainer.status === 'Inactive') return false; // Show active faculty members
    if (filterSpecialization !== 'All' && trainer.specialization !== filterSpecialization) return false;
    if (facultySearch.trim()) {
      const q = facultySearch.toLowerCase();
      const matchName = trainer.name?.toLowerCase().includes(q);
      const matchRole = trainer.role?.toLowerCase().includes(q);
      const matchSpec = trainer.specialization?.toLowerCase().includes(q);
      const matchBio = trainer.bio?.toLowerCase().includes(q);
      if (!matchName && !matchRole && !matchSpec && !matchBio) return false;
    }
    return true;
  });

  return (
    <div className="section-container py-10 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="section-subtitle">
          ACADEMIC FACULTY DIRECTORY
        </span>
        <h1 className="section-title text-3xl sm:text-4xl font-black text-slate-950">
          Meet Our Distinguished Faculty & Mentors
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-700">
          Learn directly from senior industry architects, researchers, and technology leaders dedicated to your professional mastery.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search faculty by name or domain..."
            value={facultySearch}
            onChange={(e) => setFacultySearch(e.target.value)}
            className="input-field pl-10 pr-4 py-2 text-xs font-medium text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-black text-slate-900 dark:text-white whitespace-nowrap">
            Domain:
          </span>
          <select
            value={filterSpecialization}
            onChange={(e) => setFilterSpecialization(e.target.value)}
            className="select-field text-xs font-bold text-slate-900 bg-white border border-slate-300 dark:bg-slate-800 dark:text-white py-1.5"
          >
            {specializations.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Public Faculty Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
        {filteredFaculty.map(trainer => (
          <div key={trainer.id} className="feature-card p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start space-y-0 hover:shadow-xl transition-all border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900">
            {trainer.avatar ? (
              <img 
                src={trainer.avatar} 
                alt={trainer.name} 
                className="w-24 h-24 rounded-2xl object-cover shrink-0 ring-4 ring-indigo-500/20 shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80';
                }}
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-black text-2xl flex items-center justify-center shrink-0 ring-4 ring-indigo-500/20 shadow-md">
                {trainer.name ? trainer.name.replace(/^Dr\.\s*|^Prof\.\s*/i, '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'FC'}
              </div>
            )}

            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
              <div>
                <h3 className="text-lg font-black text-slate-950 dark:text-white">{trainer.name}</h3>
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mt-0.5">{trainer.role}</p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-700 dark:text-slate-300 mt-1.5 justify-center sm:justify-start font-semibold">
                  <span className="flex items-center gap-1 text-amber-600 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> {trainer.rating || 4.9} Rating
                  </span>
                  <span>{trainer.experience || '5+ Years'} Experience</span>
                </div>
              </div>

              <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                {trainer.bio || 'Distinguished technology instructor and mentor with deep expertise in industry practices and applied learning.'}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                  {trainer.specialization}
                </span>
                <button
                  onClick={() => openModal('application')}
                  className="btn-primary px-4 py-2 text-xs font-bold shadow-none cursor-pointer"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFaculty.length === 0 && (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Users className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No faculty members found</h3>
          <p className="text-xs text-slate-500">Try adjusting your search criteria or specialization filter.</p>
        </div>
      )}

    </div>
  );
}
