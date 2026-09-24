import React from 'react';
import { 
  Target, 
  Compass, 
  Award, 
  CheckCircle, 
  Lightbulb, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

export function AcademyIntro() {
  const pillars = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To bridge the gap between academic education and industry requirements through practical, skill-focused learning.'
    },
    {
      icon: Compass,
      title: 'Our Vision',
      description: 'Empowering future technology leaders and innovators globally with accessible, high-caliber professional training.'
    },
    {
      icon: Award,
      title: 'Global Recognition',
      description: 'Accredited certifications backed by top global technology brands and leading enterprise partners.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            Welcome to Academy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Empowering Careers Through Excellence in Tech & Business Education
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Founded with a vision to democratize high-quality education, Academy provides immersive bootcamp programs, professional certifications, and hands-on training engineered for today's digital economy.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold">Why Students Choose Academy Worldwide</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We combine curriculum crafted by senior engineers with live mentorship, code reviews, career counseling, and job placement assistance to ensure your success.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">15+</div>
              <div className="text-xs text-slate-300 font-medium">Years of Excellence</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">500+</div>
              <div className="text-xs text-slate-300 font-medium">Hiring Partners</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
