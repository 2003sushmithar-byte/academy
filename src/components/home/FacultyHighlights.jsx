import React from 'react';
import { Star, Award, Linkedin, BookOpen } from 'lucide-react';

export function FacultyHighlights() {
  const faculty = [
    {
      name: 'Alex Rivera',
      role: 'Head of Software Engineering',
      exCompany: 'Ex-Senior Engineer @ Google',
      experience: '12+ Yrs Exp',
      rating: 4.95,
      students: '8,500+ Students',
      initials: 'AR',
      bgColor: 'bg-blue-600',
    },
    {
      name: 'Dr. Sarah Lin',
      role: 'Lead Data Science & AI Faculty',
      exCompany: 'Ex-AI Scientist @ Meta',
      experience: '10+ Yrs Exp',
      rating: 4.92,
      students: '6,200+ Students',
      initials: 'SL',
      bgColor: 'bg-indigo-600',
    },
    {
      name: 'Marcus Vance',
      role: 'Principal Cloud & Security Architect',
      exCompany: 'Ex-Principal Engineer @ AWS',
      experience: '15+ Yrs Exp',
      rating: 4.98,
      students: '5,400+ Students',
      initials: 'MV',
      bgColor: 'bg-slate-800',
    },
    {
      name: 'Elena Rostova',
      role: 'Lead Product & UI/UX Faculty',
      exCompany: 'Ex-Lead Designer @ Figma',
      experience: '9+ Yrs Exp',
      rating: 4.89,
      students: '4,100+ Students',
      initials: 'ER',
      bgColor: 'bg-sky-600',
    },
  ];

  return (
    <section id="faculty" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-400 tracking-widest uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
            World-Class Mentors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn From Industry Practitioners
          </h2>
          <p className="text-slate-400 text-base">
            Our faculty members don't just teach theory—they bring active enterprise experience from leading tech giants into the classroom.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, i) => (
            <div
              key={i}
              className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Avatar Placeholder / Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-16 h-16 rounded-2xl ${member.bgColor} text-white font-extrabold text-xl flex items-center justify-center shadow-lg`}>
                    {member.initials}
                  </div>
                  <a href="#" className="p-2 text-slate-400 hover:text-blue-400 bg-slate-900/60 rounded-xl transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{member.name}</h3>
                  <div className="text-xs text-blue-400 font-medium">{member.role}</div>
                  <div className="text-xs text-slate-400 mt-1 font-semibold">{member.exCompany}</div>
                </div>

                <div className="pt-3 border-t border-slate-700/60 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Experience</span>
                    <span className="font-semibold text-white">{member.experience}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Rating</span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{member.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Taught</span>
                    <span className="font-semibold text-white">{member.students}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
