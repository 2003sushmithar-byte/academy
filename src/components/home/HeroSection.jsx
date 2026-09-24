import React from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  Play, 
  Users, 
  Award,
  BookOpen
} from 'lucide-react';
import { Button } from '../common/Button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-32">
      {/* Glow Overlay Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admissions Open for 2026 Cohorts</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Transform Your Career with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400">Industry-Leading</span> Education.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Master in-demand skills in Software Engineering, AI, Cloud, and Data Analytics. Learn directly from industry experts with hands-on projects and guaranteed career guidance.
            </p>

            {/* Course Search Box */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center gap-2 bg-slate-800/80 p-2 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3 px-3 w-full sm:w-auto flex-1">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="What do you want to learn today?"
                    className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none py-2"
                  />
                </div>
                <Button variant="primary" size="md" className="w-full sm:w-auto gap-2">
                  <span>Search Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Trust Bullet Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>1-on-1 Mentorship</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Real-World Capstone Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Placement Assistance</span>
              </div>
            </div>

          </div>

          {/* Right Hero Graphic Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-gradient-to-tr from-slate-800 to-slate-800/90 rounded-3xl p-6 border border-slate-700/80 shadow-2xl">
              
              {/* Image Preview Box */}
              <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center border border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10" />
                <div className="text-center p-6 z-20">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 ml-1" />
                  </div>
                  <span className="text-sm font-semibold text-white block">Watch Academy Overview (2 Min)</span>
                  <span className="text-xs text-slate-400">Discover our learning methodology & campus tour</span>
                </div>
              </div>

              {/* Floating Stat Card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white text-slate-900 p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3.5 hidden sm:flex">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">15,000+</div>
                  <div className="text-xs text-slate-500 font-medium">Active Students Enrolled</div>
                </div>
              </div>

              {/* Floating Stat Card 2 */}
              <div className="absolute -top-6 -right-6 bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 hidden sm:flex">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold">4.9 / 5 Rating</div>
                  <div className="text-[10px] text-slate-400">Based on 3,400+ reviews</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
