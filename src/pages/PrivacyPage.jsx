import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <ShieldCheck className="w-12 h-12 text-indigo-600 mx-auto" />
        <h1 className="section-title">Privacy Policy</h1>
        <p className="text-xs text-slate-500">Effective Date: October 1, 2026</p>
      </div>

      <div className="feature-card p-8 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Information Collection</h3>
          <p>Nexus Academy collects personal data necessary for enrollment processing, educational portal authentication, certification issuing, and career placement services.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Data Security & Encryption</h3>
          <p>All student account data and payment processing details are secured using 256-bit TLS encryption protocols complying with ISO/IEC 27001 standards.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">3. Third-Party Sharing</h3>
          <p>We do not sell personal data. Information is shared only with verified institutional partners for certification verification or employer job placement referrals with student consent.</p>
        </section>
      </div>
    </div>
  );
}
