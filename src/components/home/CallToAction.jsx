import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';

export function CallToAction() {
  return (
    <section className="py-16 bg-slate-900 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-80 bg-blue-600/20 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-14 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Early Enrollment Cohorts Open</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Accelerate Your Career?
            </h2>
            <p className="text-blue-100 text-base leading-relaxed">
              Book a free 1-on-1 career counseling session with an academic advisor. Discover the right program, cohort curriculum, and placement path for you.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-blue-100 pt-2">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> No Obligation Counseling</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Early Bird Fee Discounts</span>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2 text-slate-900 bg-white hover:bg-slate-100" onClick={() => window.location.href = '#contact'}>
              <span>Book Free Counseling</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="light" size="lg" className="w-full sm:w-auto gap-2" onClick={() => window.location.href = '#batches'}>
              <PhoneCall className="w-4 h-4" />
              <span>Call +1 (800) 123-4567</span>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
