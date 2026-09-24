import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  COURSES, 
  FACULTY, 
  UPCOMING_BATCHES, 
  TESTIMONIALS, 
  ACHIEVEMENTS_STATS, 
  AFFILIATIONS, 
  UPCOMING_EVENTS 
} from '../data/mockData';
import CourseCard from '../components/CourseCard';
import academyVideo from '../assets/academy-video.mp4';
import { 
  ArrowRight, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck, 
  Users, 
  Award, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Star, 
  Globe, 
  ChevronRight, 
  TrendingUp, 
  MessageSquare, 
  Zap, 
  MapPin, 
  Phone, 
  Mail 
} from 'lucide-react';

export default function HomePage() {
  const { 
    setCurrentPage, 
    openCourseDetails, 
    openModal, 
    setSearchQuery,
    courses = COURSES,
    facultyList = FACULTY 
  } = useApp();

  const [heroSearch, setHeroSearch] = useState('');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const heroVideoRef = useRef(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = true;
      heroVideoRef.current.defaultMuted = true;
      heroVideoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Autoplay initiated:', err);
      });
    }
  }, []);

  const togglePlay = () => {
    if (heroVideoRef.current) {
      if (heroVideoRef.current.paused) {
        heroVideoRef.current.play();
        setIsPlaying(true);
      } else {
        heroVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (heroVideoRef.current) {
      const nextMute = !heroVideoRef.current.muted;
      heroVideoRef.current.muted = nextMute;
      setIsMuted(nextMute);
    }
  };

  const activeCourses = courses && courses.length > 0 ? courses : COURSES;
  const spotlightCourses = (activeCourses.filter(c => c.featured).length >= 3 
    ? activeCourses.filter(c => c.featured).slice(0, 3) 
    : activeCourses.slice(0, 3));

  const activeFaculty = (facultyList && facultyList.length > 0 ? facultyList : FACULTY)
    .filter(f => f.status !== 'Inactive');

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim().toLowerCase() === 'admin' || heroSearch.trim().toLowerCase() === '/admin') {
      setCurrentPage('admin');
    } else {
      setSearchQuery(heroSearch);
      setCurrentPage('courses');
    }
  };

  return (
    <div className="space-y-12 pb-12">
      
      {/* SECTION 1: HERO BANNER */}
      <section className="hero-section">
        <div className="w-full px-6 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="badge-highlight">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block shrink-0" />
                <span>Next Intake Admissions Now Open • 2026 Batch</span>
              </div>

              <h1 className="hero-title">
                Master Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tech & AI</span> With World-Class Mentors.
              </h1>

              <p className="hero-desc">
                Elevate your career through production-grade engineering curricula in Full-Stack, AI, Data Systems, and Cloud DevOps with guaranteed mentorship.
              </p>

              {/* Search Bar on Hero */}
              <form onSubmit={handleHeroSearchSubmit} className="max-w-xl mx-auto lg:mx-0 flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search courses: React, Python, AI, Cloud..."
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    className="input-field py-3 pl-4 pr-10 text-sm shadow-md"
                  />
                </div>
                <button type="submit" className="btn-primary text-xs sm:text-sm px-6">
                  Search
                </button>
              </form>

              {/* Quick stats pills */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">94.8% Placement Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">1:1 Mock Interviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">ISO 9001 Accredited</span>
                </div>
              </div>
            </div>

            {/* Right Video Showcase with Play & Mute Controls */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xl xl:max-w-2xl min-h-[300px] sm:min-h-[360px] aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 group">
                <video
                  ref={heroVideoRef}
                  src={academyVideo}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Floating Controls */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                  <div className="flex justify-between items-center text-white text-xs font-semibold">
                    <span className="bg-indigo-600/80 px-2.5 py-1 rounded-full backdrop-blur-sm">Campus Life 2026</span>
                    <button 
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <button 
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-white/90 text-indigo-600 hover:bg-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                  </div>

                  <div className="text-white text-center text-[11px] font-medium">
                    Nexus Innovation Campus Tour & Labs
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 2: ACADEMY INTRODUCTION */}
      <section className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="section-subtitle">
              ABOUT NEXUS ACADEMY
            </span>
            <h2 className="section-title text-2xl sm:text-3xl">
              Engineered for the Modern Tech Workforce
            </h2>
            <p className="section-desc">
              Founded by Silicon Valley tech leads and university researchers, Nexus Academy bridges the gap between academic theory and high-growth industry requirements.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <p className="text-2xl font-extrabold text-indigo-600">500+</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Hiring Partners</p>
                <p className="text-[11px] text-slate-500">From unicorn startups to Fortune 50 enterprises.</p>
              </div>
              <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100">
                <p className="text-2xl font-extrabold text-purple-600">15,000+</p>
                <p className="text-xs font-bold text-slate-800 mt-1">Graduates Worldwide</p>
                <p className="text-[11px] text-slate-500">Working across 34 countries globally.</p>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('about')}
              className="btn-secondary"
            >
              Read Full Academy Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80"
              alt="AI Research Lab"
              className="rounded-2xl h-52 w-full object-cover shadow-md"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
              alt="Coding Lab"
              className="rounded-2xl h-52 w-full object-cover shadow-md mt-6"
            />
          </div>
        </div>
      </section>


      {/* SECTION 3: CURATED SPOTLIGHT (Top 3 Courses Teaser) */}
      <section className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div>
            <span className="section-subtitle">
              FEATURED SPOTLIGHT
            </span>
            <h2 className="section-title text-2xl sm:text-3xl">
              Curated Flagship Programs
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Top industry-certified cohorts. Explore all specializations in our full catalogue.
            </p>
          </div>
          <button
            onClick={() => { setCurrentPage('courses'); window.scrollTo(0, 0); }}
            className="btn-primary text-xs px-5 py-2.5 shadow-md flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {spotlightCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>


      {/* SECTION 5: UPCOMING BATCHES */}
      <section className="section-container">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="section-subtitle">
            LIVE ADMISSIONS
          </span>
          <h2 className="section-title">
            Upcoming Batch Intake Schedules
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Limited seats per cohort to maintain 1:1 faculty-to-student mentorship ratios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_BATCHES.map(batch => (
            <div key={batch.id} className="feature-card">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300 rounded-md">
                  {batch.mode}
                </span>
                <span className="text-xs font-bold text-rose-500 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-rose-500" /> Only {batch.availableSeats} seats left!
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {batch.courseTitle}
                </h4>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" /> Starts: {batch.startDate}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> {batch.schedule}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">Mentor: {batch.instructor}</span>
                <button
                  onClick={() => openCourseDetails(batch.courseId)}
                  className="btn-primary px-4 py-2 shadow-none cursor-pointer"
                >
                  Reserve Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 6: WHY CHOOSE US */}
      <section className="bg-slate-900 text-white py-10 rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              THE NEXUS ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why 15,000+ Students Chose Nexus Academy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Industry Practitioners', desc: 'Taught exclusively by active tech leads from Google, Amazon, and OpenAI.', icon: Users },
              { title: 'Portfolio Projects', desc: 'Graduate with 5+ production GitHub repositories ready for technical interviews.', icon: BookOpen },
              { title: 'Career Guarantee', desc: 'Comprehensive resume review, mock interviews, and direct hiring partner referrals.', icon: Award },
              { title: 'Industry Credentials', desc: 'Receive cryptographically verifiable digital certificates recognized worldwide.', icon: ShieldCheck }
            ].map((item, idx) => (
              <div key={idx} className="dark-card">
                <item.icon className="w-8 h-8 text-indigo-400" />
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 7: FACULTY HIGHLIGHTS */}
      <section className="section-container">
        <div className="flex justify-between items-end border-b border-slate-200/80 pb-4">
          <div>
            <span className="section-subtitle">EXPERT MENTORSHIP</span>
            <h2 className="section-title text-2xl sm:text-3xl">Learn from Lead Engineers</h2>
          </div>
          <button
            onClick={() => setCurrentPage('faculty')}
            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
          >
            View Full Faculty Directory →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {activeFaculty.slice(0, 4).map(instructor => (
            <div key={instructor.id} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
              {instructor.avatar ? (
                <img
                  src={instructor.avatar}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-indigo-500/20"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80';
                  }}
                />
              ) : (
                <div className="w-24 h-24 rounded-full mx-auto bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-black text-xl flex items-center justify-center ring-4 ring-indigo-500/20">
                  {instructor.name ? instructor.name.replace(/^Dr\.\s*|^Prof\.\s*/i, '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'FC'}
                </div>
              )}
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{instructor.name}</h4>
                <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{instructor.role}</p>
                <p className="text-[11px] text-slate-500 mt-1">{instructor.experience} Experience</p>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {instructor.rating || 4.9}
                </span>
                <button
                  onClick={() => openModal('application')}
                  className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  Book 1-on-1 Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 8: STUDENT TESTIMONIALS */}
      <section className="section-container">
        <div className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="section-subtitle">ALUMNI STORIES</span>
            <h2 className="section-title text-3xl sm:text-4xl text-slate-950 font-black">Student Success & Placement Impact</h2>
            <p className="text-sm font-semibold text-slate-700">Real outcomes from our graduating software engineers, AI builders, and cloud architects.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="p-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3.5">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500/20" />
                  <div>
                    <h4 className="text-base font-extrabold text-slate-950">{t.name}</h4>
                    <p className="text-sm text-indigo-600 font-bold">{t.role}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-900 leading-relaxed">"{t.quote}"</p>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-emerald-600">{t.salaryIncrease}</span>
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 9: ACHIEVEMENTS & STATISTICS */}
      <section className="section-container">
        <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {ACHIEVEMENTS_STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {stat.metric}
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">{stat.label}</p>
              <p className="text-xs text-slate-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>


      {/* SECTION 10: CERTIFICATIONS & AFFILIATIONS (SMOOTH INFINITE MARQUEE TICKER) */}
      <section className="w-full py-8 bg-[#f5efea] dark:bg-slate-950 overflow-hidden border-y border-slate-200/60 dark:border-slate-800/60 my-6">
        <div className="max-w-7xl mx-auto px-4 mb-5 text-center">
          <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest bg-indigo-100/80 dark:bg-indigo-950/80 px-4 py-1.5 rounded-full border border-indigo-200 shadow-2xs">
            ACCREDITED & POWERED BY LEADING TECH ORGANIZATIONS
          </span>
        </div>

        {/* Marquee Wrapper with Smooth Edge Gradient Fades */}
        <div className="relative w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-16 sm:before:w-28 before:bg-gradient-to-r before:from-[#f5efea] dark:before:from-slate-950 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-16 sm:after:w-28 after:bg-gradient-to-l after:from-[#f5efea] dark:after:from-slate-950 after:to-transparent after:z-10">
          <div className="flex animate-marquee gap-6 sm:gap-10 items-center py-2">
            {[...AFFILIATIONS, ...AFFILIATIONS, ...AFFILIATIONS].map((aff, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm shrink-0 hover:scale-105 hover:border-indigo-400 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-nowrap block">
                    {aff.name}
                  </span>
                  {aff.category && (
                    <span className="text-[10px] font-semibold text-slate-400 block -mt-0.5">
                      {aff.category} Partner
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 11: UPCOMING EVENTS */}
      <section className="section-container">
        <div className="flex justify-between items-end">
          <div>
            <span className="section-subtitle">EVENTS & WEBINARS</span>
            <h2 className="section-title">Upcoming Tech Workshops</h2>
          </div>
          <button onClick={() => setCurrentPage('events')} className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
            View All Events →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {UPCOMING_EVENTS.map(ev => (
            <div key={ev.id} className="flex flex-col sm:flex-row bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={ev.image} 
                alt={ev.title} 
                className="w-full sm:w-48 h-48 object-cover shrink-0" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-md">
                    {ev.category}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-950 mt-2.5">{ev.title}</h4>
                  <p className="text-xs font-semibold text-slate-700 mt-1.5 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-600" /> {ev.date} • {ev.time}
                  </p>
                </div>
                <button onClick={() => openModal('application')} className="self-start btn-primary px-4 py-2 shadow-none cursor-pointer">
                  Register Free Seat
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>




      {/* SECTION 13: CALL TO ACTION */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 py-16 px-6 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold max-w-2xl mx-auto">
          Ready to Accelerate Your Career in Tech?
        </h2>
        <p className="text-sm text-indigo-100 max-w-xl mx-auto">
          Join our next incoming cohort. Receive 1-on-1 counseling, review syllabus modules, and secure your cohort seat today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openModal('application')}
            className="px-8 py-3 text-xs font-bold text-indigo-900 bg-white hover:bg-slate-100 rounded-xl shadow-lg active:scale-95 cursor-pointer"
          >
            Apply for Admission Now
          </button>
          <button
            onClick={() => setCurrentPage('courses')}
            className="px-8 py-3 text-xs font-bold text-white border border-white/40 hover:bg-white/10 rounded-xl cursor-pointer"
          >
            Browse All Courses
          </button>
        </div>
      </section>


      {/* SECTION 14: CONTACT INFORMATION QUICK SECTION */}
      <section className="section-container">
        <div className="p-8 bg-slate-900 text-slate-300 rounded-3xl grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <MapPin className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Innovation Campus</p>
              <p className="text-[11px] text-slate-400">750 Tech Boulevard, NY 10001</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Phone className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Admissions Hotline</p>
              <p className="text-[11px] text-slate-400">+1 (800) 555-NEXUS</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <Mail className="w-8 h-8 text-indigo-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Email Advisory</p>
              <p className="text-[11px] text-slate-400">admissions@nexusacademy.edu</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
