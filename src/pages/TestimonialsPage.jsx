import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, Award } from 'lucide-react';

export default function TestimonialsPage() {
  return (
    <div className="section-container py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          STUDENT TESTIMONIALS
        </span>
        <h1 className="section-title text-3xl sm:text-4xl text-slate-950">
          Real Career Transformations
        </h1>
        <p className="text-sm font-medium text-slate-700">
          Discover how our graduates transitioned into top-tier tech roles at world-class companies.
        </p>
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
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
