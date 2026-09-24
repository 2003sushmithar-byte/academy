import React, { useState } from 'react';
import DataRequestModal from './DataRequestModal';
import { Shield, Eye, Edit3, Trash2, UserX, AlertCircle, Mail, Phone, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

export default function PrivacyCenterModal({ isOpen, onClose, onOpenLegal, onOpenCookieSettings }) {
  const [dataRequestType, setDataRequestType] = useState(null); // 'view' | 'correct' | 'erase' | 'withdraw' | 'grievance'

  if (!isOpen) return null;

  const handleOpenDataRequest = (type) => {
    setDataRequestType(type);
  };

  return (
    <>
      <div
        onClick={(e) => e.target === e.currentTarget && onClose()}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200 overflow-y-auto"
      >
        <div
          className="relative w-full max-w-5xl rounded-3xl border border-slate-200 bg-[#f8fafc] shadow-2xl p-6 sm:p-10 my-8 space-y-8 max-h-[90vh] overflow-y-auto text-slate-800"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-500/25 shrink-0">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Privacy Center &amp; Data Protection
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                  Manage your educational data privacy rights, cookie consent, and grievance requests.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close Privacy Center"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 bg-slate-200 hover:bg-slate-300 text-base font-bold transition-all shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Top Banner Card: Cookie Preferences & Tracking */}
          <div className="p-6 rounded-2xl border border-indigo-200/80 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Cookie Preferences &amp; Tracking Controls
                </h3>
                <p className="text-xs font-medium text-slate-600 mt-0.5">
                  Configure which cookie categories you permit during your learning portal visits.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                if (onOpenCookieSettings) onOpenCookieSettings();
              }}
              className="px-5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs border border-indigo-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors shrink-0 shadow-sm"
            >
              <span>Manage Cookie Settings</span>
              <span>→</span>
            </button>
          </div>

          {/* 5-Card Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Card 1: View My Data */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-md">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-900">View My Data</h4>
                <div className="text-[11px] font-bold text-cyan-700">Request academic records summary</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Get a comprehensive summary of student profile records, submitted coursework, batch enrollments, and accredited certificates.
                </p>
              </div>
              <button
                onClick={() => handleOpenDataRequest('view')}
                className="mt-5 w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Request Access</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 2: Correct My Data */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md">
                  <Edit3 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-900">Correct My Data</h4>
                <div className="text-[11px] font-bold text-purple-700">Rectify student profile inaccuracies</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Request rectification of misspelled student names, outdated phone numbers, billing address details, or qualification entries.
                </p>
              </div>
              <button
                onClick={() => handleOpenDataRequest('correct')}
                className="mt-5 w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Request Rectification</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 3: Request Erasure */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-900">Request Erasure</h4>
                <div className="text-[11px] font-bold text-rose-700">Request deletion of non-essential records</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Request the removal of marketing cookies, inactive inquiry messages, and non-essential logs when no longer necessary.
                </p>
              </div>
              <button
                onClick={() => handleOpenDataRequest('erase')}
                className="mt-5 w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Request Erasure</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 4: Withdraw Consent */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
                  <UserX className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-900">Withdraw Consent</h4>
                <div className="text-[11px] font-bold text-amber-700">Revoke permissions &amp; notifications</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Opt out of optional research surveys, learning recommendation emails, or third-party analytics integrations at any moment.
                </p>
              </div>
              <button
                onClick={() => handleOpenDataRequest('withdraw')}
                className="mt-5 w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Manage Permissions</span>
                <span>→</span>
              </button>
            </div>

            {/* Card 5: Privacy Grievance */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-indigo-300 transition-all">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h4 className="text-base font-black text-slate-900">Privacy Grievance</h4>
                <div className="text-[11px] font-bold text-emerald-700">Raise a formal privacy concern</div>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  Escalate an unresolved inquiry directly to our Grievance Officer regarding data protection compliance or verification delays.
                </p>
              </div>
              <button
                onClick={() => handleOpenDataRequest('grievance')}
                className="mt-5 w-full py-2 px-3 rounded-xl border border-slate-200 hover:border-indigo-500 bg-slate-50 hover:bg-indigo-50 text-indigo-700 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>Submit Grievance</span>
                <span>→</span>
              </button>
            </div>

          </div>

          {/* Bottom Card: Designated Data Protection Grievance Officer */}
          <div className="p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-2xl">
              <div className="w-10 h-10 rounded-full border-2 border-indigo-600 text-indigo-600 flex items-center justify-center text-lg font-black shrink-0 mt-1">
                🛡️
              </div>
              <div className="space-y-1.5">
                <h4 className="text-base font-black text-slate-900">
                  Designated Data Protection Grievance Officer
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  If you have questions, feedback, or unresolved grievances regarding how Nexus Academy safeguards your personal learning data, reach out to our institutional officer:
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <a href="mailto:privacy@nexusacademy.edu" className="hover:text-indigo-600 underline">privacy@nexusacademy.edu</a>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" />
                    <a href="tel:+18005556398" className="hover:text-indigo-600">+1 (800) 555-NEXUS</a>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => {
                  onClose();
                  if (onOpenLegal) onOpenLegal('privacy');
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-extrabold text-xs text-center cursor-pointer transition-colors"
              >
                Read Privacy Policy
              </button>

              <button
                onClick={() => {
                  onClose();
                  if (onOpenLegal) onOpenLegal('terms');
                }}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs text-center cursor-pointer shadow-md shadow-indigo-600/25 transition-all"
              >
                Terms &amp; Conditions
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Sub-modal for Data Requests */}
      <DataRequestModal
        isOpen={Boolean(dataRequestType)}
        requestType={dataRequestType || 'view'}
        onClose={() => setDataRequestType(null)}
      />
    </>
  );
}
