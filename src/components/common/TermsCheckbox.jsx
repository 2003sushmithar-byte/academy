import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function TermsCheckbox({
  id = 'terms-agreement',
  checked = false,
  onChange,
  hasUnderstood = false,
  error = ''
}) {
  const { openLegalModal } = useApp();

  const handleToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!hasUnderstood) {
      openLegalModal('terms', () => {
        if (onChange) onChange(true);
      });
      return;
    }

    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div 
      onClick={handleToggle}
      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
        error
          ? 'border-red-400 bg-red-50/70 ring-1 ring-red-300'
          : checked
          ? 'border-emerald-300 bg-emerald-50/60'
          : 'border-slate-200 bg-slate-50/80 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={() => {}}
          className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0 pointer-events-none"
        />

        <div className="text-xs text-slate-800 font-semibold select-none flex-1 flex items-center flex-wrap gap-1">
          <span>I agree to</span>
          <span className="text-indigo-600 hover:text-indigo-800 underline font-bold">
            Terms &amp; Conditions
          </span>
          <span className="text-rose-500 font-bold">*</span>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-600 font-extrabold flex items-center gap-1 pt-1.5 pl-7">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
