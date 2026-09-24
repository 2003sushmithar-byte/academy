import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Users, 
  Globe, 
  Building2, 
  CheckCircle2, 
  Rocket, 
  Compass, 
  Target, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { FACULTY, ACHIEVEMENTS_STATS } from '../data/mockData';

export default function AboutPage() {
  const { setCurrentPage, openModal } = useApp();

  return (
    <div className="section-container py-12 space-y-16">
      
      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <span className="badge-highlight">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> OUR INSTITUTIONAL JOURNEY
        </span>
        <h1 className="hero-title text-4xl sm:text-5xl">
          Architecting the Future of High-Impact <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Technology Education</span>
        </h1>
        <p className="hero-desc text-base">
          From a humble 2018 study circle in a shared tech hub to an international tech academy serving 15,000+ alumni, Nexus Academy was founded to bridge the gap between academic theory and production engineering.
        </p>
      </div>

      {/* Campus Showcase Card (Fast & Lightweight, No Heavy Video) */}
      <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 bg-slate-900 relative group">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=80"
          alt="Nexus Academy Innovation Campus & Collaborative Tech Hub"
          className="w-full h-[380px] object-cover rounded-2xl brightness-90 group-hover:scale-105 transition-all duration-700"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none rounded-2xl" />
        <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-extrabold flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>INSIDE NEXUS ACADEMY — INNOVATION CAMPUS</span>
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 text-white">
          <div>
            <h3 className="text-xl font-black drop-shadow">World-Class Laboratories & Production Studios</h3>
            <p className="text-xs text-slate-200 mt-0.5">Hands-on infrastructure built for software, AI, cloud, and security specialists.</p>
          </div>
          <button 
            onClick={() => setCurrentPage('courses')} 
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-1.5"
          >
            Explore Programs <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Origin Story Section ("What We Were at First") */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
            <Compass className="w-4 h-4" /> OUR ORIGIN STORY (EST. 2018)
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            What We Were at First: A Grassroots Developer Collective
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            In the winter of 2018, three senior software architects from top Silicon Valley firms recognized a frustrating truth: computer science university graduates were entering the workforce with outdated textbook knowledge and zero experience with real production tools like Docker, React, PyTorch, or cloud CI/CD.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Starting with just 12 engineering students meeting on Saturdays in a small garage lab, we built an outcome-driven bootcamps model centered around one core rule: <strong>"Every concept learned must be backed by a deployed production application."</strong>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-indigo-50 dark:bg-indigo-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900 space-y-2">
            <p className="text-3xl font-black text-indigo-600">12</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">First Cohort Students (2018)</p>
            <p className="text-[11px] text-slate-500">Learned full-stack web dev in a garage lab</p>
          </div>
          <div className="p-6 bg-purple-50 dark:bg-purple-950/50 rounded-2xl border border-purple-100 dark:border-purple-900 space-y-2">
            <p className="text-3xl font-black text-purple-600">15,000+</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Global Graduates Today</p>
            <p className="text-[11px] text-slate-500">Working at Google, Meta, AWS, OpenAI</p>
          </div>
          <div className="p-6 bg-emerald-50 dark:bg-emerald-950/50 rounded-2xl border border-emerald-100 dark:border-emerald-900 space-y-2">
            <p className="text-3xl font-black text-emerald-600">500+</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Enterprise Hiring Partners</p>
            <p className="text-[11px] text-slate-500">Direct hiring access for graduates</p>
          </div>
          <div className="p-6 bg-amber-50 dark:bg-amber-950/50 rounded-2xl border border-amber-100 dark:border-amber-900 space-y-2">
            <p className="text-3xl font-black text-amber-600">96.4%</p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Placement Success Rate</p>
            <p className="text-[11px] text-slate-500">Hired within 180 days of graduation</p>
          </div>
        </div>
      </div>

      {/* Future Plan & 2030 Vision Section */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="section-subtitle">STRATEGIC ROADMAP</span>
          <h2 className="section-title">Our 2030 Vision & Future Growth Plan</h2>
          <p className="text-xs text-slate-500 font-medium">
            How Nexus Academy is preparing for the next decade of artificial intelligence, quantum computing, and global tech education.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">
              1. AI Autonomous Systems Lab
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              Establishing a $10M dedicated AI lab where students build multi-agent robotics, spatial computing software, and LLM fine-tuning pipelines using dedicated cloud H100 GPU clusters.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">
              2. Global Tech Fellowship & Career Network
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              Expanding our global career mentorship network to partner with 500+ top tech employers, providing 1-on-1 industry mentorship and accelerated interview pipelines for graduates.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-950">
              3. AI-Assisted 24/7 Code Review Tutors
            </h3>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">
              Launching proprietary real-time AI code analysis tools that evaluate student pull requests instantly, providing line-by-line feedback on memory safety, security, and algorithmic performance.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership & Faculty (Unique Avatars) */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="section-subtitle">ACADEMIC BOARD</span>
          <h2 className="section-title text-3xl font-black text-slate-950">Leadership & Senior Faculty</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FACULTY.map(person => (
            <div key={person.id} className="p-6 bg-white border border-slate-200/90 rounded-3xl text-center space-y-3 shadow-sm hover:border-indigo-500 transition-all">
              <img src={person.avatar} alt={person.name} className="w-24 h-24 rounded-2xl mx-auto object-cover ring-4 ring-indigo-500/10 shadow-md" />
              <h4 className="text-base font-extrabold text-slate-950">{person.name}</h4>
              <p className="text-xs font-bold text-indigo-600">{person.role}</p>
              <p className="text-xs text-slate-600 font-medium leading-normal">{person.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Join the Next Generation of Tech Leaders?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto font-medium">
          Explore our upcoming cohorts, review curriculum details, or schedule a 1-on-1 academic counseling session today.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button onClick={() => setCurrentPage('courses')} className="btn-primary">
            Explore Courses <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => openModal('auth')} className="px-6 py-3 text-xs font-bold text-white bg-white/10 hover:bg-white/20 rounded-xl border border-white/20">
            Student Registration
          </button>
        </div>
      </div>

    </div>
  );
}
