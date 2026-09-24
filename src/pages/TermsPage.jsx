import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <FileText className="w-12 h-12 text-indigo-600 mx-auto" />
        <h1 className="section-title">Terms & Conditions</h1>
        <p className="text-xs text-slate-500">Effective Date: October 1, 2026</p>
      </div>

      <div className="feature-card p-8 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Acceptable Usage</h3>
          <p>Enrolled students receive a personal, non-exclusive license to access course materials, project labs, and video archives for educational purposes.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Code of Conduct</h3>
          <p>Nexus Academy maintains strict zero-tolerance policies regarding plagiarism, academic dishonesty, and non-inclusive behavior across Discord and live lab sessions.</p>
        </section>
      </div>
    </div>
  );
}
