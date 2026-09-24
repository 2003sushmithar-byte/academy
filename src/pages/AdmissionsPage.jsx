import React from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, ShieldCheck, CheckCircle2, Award, ArrowRight, UserCheck, Calendar, BookOpen } from 'lucide-react';

export default function AdmissionsPage() {
  const { openModal, setCurrentPage } = useApp();

  return (
    <div className="section-container py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          ADMISSIONS & ENROLLMENT
        </span>
        <h1 className="section-title text-3xl sm:text-4xl text-slate-950 font-black">
          Admission Procedure & Enrollment Guide
        </h1>
        <p className="text-sm font-semibold text-slate-700">
          Learn about our step-by-step entry roadmap, diagnostic counseling, prerequisites, and cohort streaming.
        </p>
      </div>

      {/* 4 Step Process */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            step: '01', 
            title: 'Online Application', 
            desc: 'Submit your online enrollment application indicating your preferred tech track, batch schedule, and career targets.' 
          },
          { 
            step: '02', 
            title: 'Counseling Interview', 
            desc: 'Participate in a 15-minute diagnostic call with an academic advisor to discuss background and program fit.' 
          },
          { 
            step: '03', 
            title: 'Skill Assessment', 
            desc: 'Complete a brief logical thinking & fundamentals assessment to help stream you into the optimal learning cohort.' 
          },
          { 
            step: '04', 
            title: 'Enrollment & Access', 
            desc: 'Receive your official confirmation, access credentials to the student portal, course syllabus, and lab environment.' 
          }
        ].map((item, idx) => (
          <div key={idx} className="p-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-3.5 hover:shadow-md transition-shadow">
            <span className="text-2xl font-black text-indigo-600 tracking-tight">{item.step}</span>
            <h4 className="text-lg font-black text-slate-950 leading-snug">{item.title}</h4>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Direct Enrollment Support CTA (Replaces Scholarship) */}
      <div className="p-8 sm:p-10 bg-slate-900 text-white rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> Dedicated Academic Counseling
          </div>
          <h3 className="text-2xl font-black text-white">Need Personalized Enrollment Guidance?</h3>
          <p className="text-sm text-slate-300 max-w-xl font-medium">
            Connect directly with an admissions advisor to discuss cohort schedules, syllabus requirements, and flexible installment payment options.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => openModal('application')}
            className="px-6 py-3 text-xs font-bold text-slate-950 bg-white hover:bg-slate-100 rounded-xl shadow-lg cursor-pointer"
          >
            Apply for Admission <ArrowRight className="w-4 h-4 inline ml-1" />
          </button>
          <button
            onClick={() => setCurrentPage('courses')}
            className="px-6 py-3 text-xs font-bold text-white border border-slate-700 hover:bg-slate-800 rounded-xl cursor-pointer"
          >
            Explore Courses
          </button>
        </div>
      </div>

    </div>
  );
}
