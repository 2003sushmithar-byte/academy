import React, { useState, useEffect } from 'react';
import { Cookie, Sliders, Check, X, Shield, ArrowRight } from 'lucide-react';

export default function CookieBanner({ onOpenPrivacyPolicy, onOpenPrivacyCenter }) {
  // Shows by default on each page load for demo
  const [isVisible, setIsVisible] = useState(true);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const [cookieSettings, setCookieSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_cookie_preferences');
      return saved ? JSON.parse(saved) : {
        essential: true, // Always Active
        analytics: true,
        marketing: true
      };
    } catch (e) {
      return { essential: true, analytics: true, marketing: true };
    }
  });

  useEffect(() => {
    const handleOpen = (e) => {
      setIsVisible(true);
      if (e?.detail?.openPreferences) {
        setIsPreferencesOpen(true);
      }
    };
    window.addEventListener('open-cookie-banner', handleOpen);
    return () => window.removeEventListener('open-cookie-banner', handleOpen);
  }, []);

  const handleAgreeAll = () => {
    const all = { essential: true, analytics: true, marketing: true };
    setCookieSettings(all);
    try {
      localStorage.setItem('nexus_cookie_consent', 'accepted');
      localStorage.setItem('nexus_cookie_preferences', JSON.stringify(all));
    } catch (e) {}
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const handleDecline = () => {
    const min = { essential: true, analytics: false, marketing: false };
    setCookieSettings(min);
    try {
      localStorage.setItem('nexus_cookie_consent', 'declined');
      localStorage.setItem('nexus_cookie_preferences', JSON.stringify(min));
    } catch (e) {}
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('nexus_cookie_consent', 'customized');
      localStorage.setItem('nexus_cookie_preferences', JSON.stringify(cookieSettings));
    } catch (e) {}
    setIsVisible(false);
    setIsPreferencesOpen(false);
  };

  const toggleSetting = (key) => {
    if (key === 'essential') return;
    setCookieSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* ───────────────────────────────────────────────────────────── */}
      {/* PERSISTENT HORIZONTAL COOKIE BANNER (DOCKED AT BOTTOM)        */}
      {/* ───────────────────────────────────────────────────────────── */}
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Main Horizontal Strip */}
          <div className="bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/80 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] px-4 sm:px-6 py-4">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
              
              {/* Left Cookie Information */}
              <div className="flex items-start sm:items-center gap-3.5 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 text-xl shrink-0 shadow-inner">
                  🍪
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-extrabold text-sm sm:text-base tracking-tight">
                      We use cookies
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                    Nexus Academy uses cookies and tracking technologies to optimize course delivery, remember your learning preferences, analyze platform performance, and support admissions counseling. Review our{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyPolicy}
                      className="text-white font-black underline hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>{' '}
                    or customize in our{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyCenter}
                      className="text-white font-black underline hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      Privacy Center
                    </button>.
                  </p>
                </div>
              </div>

              {/* Right Action Buttons (Horizontal layout) */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto justify-end">
                {/* I agree button */}
                <button
                  type="button"
                  onClick={handleAgreeAll}
                  className="px-4 sm:px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg shadow-indigo-600/30 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  I agree
                </button>

                {/* I decline button */}
                <button
                  type="button"
                  onClick={handleDecline}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-extrabold text-xs active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  I decline
                </button>

                {/* Change my preferences link */}
                <button
                  type="button"
                  onClick={() => setIsPreferencesOpen((prev) => !prev)}
                  className="px-3 py-2 text-xs font-bold text-slate-300 hover:text-white underline decoration-slate-500 hover:decoration-white transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isPreferencesOpen ? 'Hide Preferences' : 'Change my preferences'}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Expandable Preferences Drawer */}
          {isPreferencesOpen && (
            <div className="bg-slate-950 border-t border-slate-800 px-4 sm:px-6 py-6 animate-in slide-in-from-bottom-2 duration-200">
              <div className="max-w-7xl mx-auto space-y-5">
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-sm font-black text-white">
                      <span className="text-amber-400">🎛️</span>
                      <span>Cookie &amp; Tracking Preferences</span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">
                      Configure which cookies you permit on this browser. Essential cookies remain active to preserve authentication and session integrity.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPreferencesOpen(false)}
                    className="text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* 3 Dark Preference Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Card 1: Essential / Necessary Cookies */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-5 rounded-full bg-emerald-500 flex items-center px-1 opacity-80 cursor-not-allowed">
                        <div className="w-3.5 h-3.5 rounded-full bg-white translate-x-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                        Always Active
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white">Essential &amp; Security Cookies</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Required for login sessions, student credential verification, video player tokens, and fraud prevention.
                    </p>
                  </div>

                  {/* Card 2: Analytics & Performance */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleSetting('analytics')}
                        className={`w-10 h-5 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                          cookieSettings.analytics ? 'bg-indigo-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                            cookieSettings.analytics ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        Optional
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white">Analytics &amp; Course Engagement</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Helps instructors evaluate lecture playback completion, pinpoint difficult quiz modules, and enhance curricula.
                    </p>
                  </div>

                  {/* Card 3: Marketing & Recommendations */}
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleSetting('marketing')}
                        className={`w-10 h-5 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                          cookieSettings.marketing ? 'bg-indigo-500' : 'bg-slate-700'
                        }`}
                      >
                        <div
                          className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                            cookieSettings.marketing ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        Optional
                      </span>
                    </div>
                    <h4 className="text-xs font-black text-white">Curriculum Recommendations</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Used to recommend complementary technical workshops, certificate track upgrades, and admissions schedules.
                    </p>
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleSavePreferences}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md cursor-pointer"
                  >
                    Save My Preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPreferencesOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs cursor-pointer"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}
