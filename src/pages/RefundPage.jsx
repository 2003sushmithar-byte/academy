import React from 'react';
import { DollarSign, ShieldCheck } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-3">
        <DollarSign className="w-12 h-12 text-emerald-600 mx-auto" />
        <h1 className="section-title">Tuition Refund Policy</h1>
        <p className="text-xs text-slate-500">30-Day Risk-Free Satisfaction Guarantee</p>
      </div>

      <div className="feature-card p-8 space-y-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. 30-Day Money-Back Guarantee</h3>
          <p>If you are not completely satisfied with your course experience within the first 30 days of cohort commencement, you are entitled to a 100% full tuition refund.</p>
        </section>
        <section className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Refund Request Procedure</h3>
          <p>To request a tuition refund, simply email support@nexusacademy.edu or open a ticket through the student billing dashboard. Refunds are processed within 3-5 business days.</p>
        </section>
      </div>
    </div>
  );
}
