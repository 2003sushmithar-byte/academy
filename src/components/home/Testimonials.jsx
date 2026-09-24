import React from 'react';
import { Star, Quote, Building2, Briefcase } from 'lucide-react';

export function Testimonials() {
  const reviews = [
    {
      name: 'Rohan Sharma',
      role: 'Full Stack Engineer @ Microsoft',
      course: 'MERN Bootcamp',
      quote: 'Academy completely changed my career trajectory. The 1-on-1 code reviews and mock interviews gave me the confidence to crack Microsoft’s technical rounds.',
      rating: 5,
      avatar: 'RS',
    },
    {
      name: 'Jessica Taylor',
      role: 'Data Scientist @ Amazon',
      course: 'Data Science Masterclass',
      quote: 'The curriculum is super practical with zero fluff. Working on real machine learning capstones made my portfolio stand out among hundreds of applicants.',
      rating: 5,
      avatar: 'JT',
    },
    {
      name: 'Priya Nair',
      role: 'DevOps Specialist @ Deloitte',
      course: 'AWS & Cyber Security',
      quote: 'Switching from non-tech to cloud engineering felt daunting until I joined Academy. The instructors were patient and guided me step-by-step.',
      rating: 5,
      avatar: 'PN',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-100/60 px-3 py-1 rounded-full">
            Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hear From Our Alumni
          </h2>
          <p className="text-slate-600 text-base">
            Over 15,000+ graduates have transformed their careers and landed dream jobs worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6 pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3 relative z-10">
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                  <div className="text-xs text-blue-600 font-medium flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    <span>{rev.role}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Graduated: {rev.course}</div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
