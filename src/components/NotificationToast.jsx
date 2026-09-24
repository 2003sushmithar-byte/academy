import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isWarning = toast.type === 'warning';

  return (
    <div className="toast-container">
      <div className={`toast-box ${
        isSuccess
          ? 'bg-emerald-900/90 text-emerald-100 border-emerald-500/50'
          : isWarning
          ? 'bg-amber-900/90 text-amber-100 border-amber-500/50'
          : 'bg-indigo-900/90 text-indigo-100 border-indigo-500/50'
      }`}>
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isWarning && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
        {!isSuccess && !isWarning && <Info className="w-5 h-5 text-indigo-400 shrink-0" />}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
