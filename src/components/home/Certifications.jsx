import React from 'react';
import { ShieldCheck, CheckCircle, Globe, Building } from 'lucide-react';

export function Certifications() {
  const partners = [
    'GOOGLE CLOUD',
    'MICROSOFT',
    'AMAZON AWS',
    'META TECH',
    'IBM LEARNING',
    'ORACLE ACADEMY',
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Accreditation Banner */}
        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">ISO 9001:2025 Certified Educational Institution</h3>
              <p className="text-slate-600 text-xs">Our curriculum adheres to international quality standards for technical & vocational training.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
            <CheckCircle className="w-4 h-4" /> Globally Recognized Certificate
          </div>
        </div>

        {/* Corporate Hiring Partners Logo Grid */}
        <div className="text-center space-y-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Our Graduates Work At Top Global Enterprises
          </span>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all">
            {partners.map((partner, i) => (
              <span key={i} className="text-lg sm:text-xl font-extrabold text-slate-700 tracking-wider hover:text-blue-600 transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
