import React, { useState } from 'react';
import { Shield, CheckCircle2, X, Send, Lock, User, Mail, Phone, FileText } from 'lucide-react';

const requestTypeDetails = {
  view: {
    title: 'Request to Access My Student Data',
    subtitle: 'Request a comprehensive export of personal details, course progress, and certification records.',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    icon: '🔍',
    btnText: 'Submit Data Access Request'
  },
  correct: {
    title: 'Request Data Rectification',
    subtitle: 'Request updates or corrections to personal contact information, name spelling, or academic records.',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: '✏️',
    btnText: 'Submit Rectification Request'
  },
  erase: {
    title: 'Request Student Profile Erasure',
    subtitle: 'Request deletion of optional accounts, marketing records, or inactive profiles (where permissible).',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    icon: '🗑️',
    btnText: 'Submit Erasure Request'
  },
  withdraw: {
    title: 'Withdraw Data Processing Consent',
    subtitle: 'Manage or withdraw consent given for optional cookies, surveys, or promotional communications.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: '⚠️',
    btnText: 'Submit Withdrawal Request'
  },
  grievance: {
    title: 'File a Privacy Grievance',
    subtitle: 'Submit a formal data protection complaint directly to the Data Protection Grievance Officer.',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: '🛡️',
    btnText: 'Submit Privacy Grievance'
  }
};

export default function DataRequestModal({ isOpen, requestType = 'view', onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    reason: '',
    declaration: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  if (!isOpen) return null;

  const currentType = requestTypeDetails[requestType] || requestTypeDetails.view;

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `REQ-${Date.now().toString().slice(-6)}`;
    setTrackingId(id);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      studentId: '',
      reason: '',
      declaration: false
    });
    if (onClose) onClose();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && handleReset) handleReset();
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200 overflow-y-auto"
    >
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-6 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{currentType.icon}</span>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {currentType.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Nexus Academy Data Privacy Office
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-black text-slate-900">
              Request Received Successfully
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Your request has been logged with our Data Protection Officer. We will process your verification within 48 business hours.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="text-slate-500">Tracking Reference: </span>
              <span className="font-mono font-black text-indigo-600">{trackingId}</span>
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md cursor-pointer"
            >
              Done &amp; Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
              {currentType.subtitle}
            </p>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Alexander Wright"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Registered Student / Contact Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="e.g. alexander@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Student ID / Enrolled Cohort (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. STU-2026-001 or Batch FS-01"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">
                Details &amp; Reason for Request <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                placeholder="Please describe your specific request or the personal data category involved..."
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="pt-1">
              <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={formData.declaration}
                  onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>
                  I confirm that I am the authorized account holder or data subject making this request.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/25 transition-all cursor-pointer"
            >
              {currentType.btnText}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
