import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Mail, Lock, User, ArrowRight, AlertCircle, GraduationCap } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminLoginPage() {
  const { loginAdmin, registerAdmin } = useAdminAuth();
  const [tab, setTab] = useState('login'); // 'login' | 'signup'

  // Login state
  const [loginEmail, setLoginEmail]       = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPwd, setShowLoginPwd]   = useState(false);
  const [loginError, setLoginError]       = useState('');
  const [loginLoading, setLoginLoading]   = useState(false);

  // Sign up state
  const [signupName, setSignupName]             = useState('');
  const [signupEmail, setSignupEmail]           = useState('');
  const [signupPassword, setSignupPassword]     = useState('');
  const [signupConfirm, setSignupConfirm]       = useState('');
  const [showSignupPwd, setShowSignupPwd]       = useState(false);
  const [showSignupConf, setShowSignupConf]     = useState(false);
  const [signupError, setSignupError]           = useState('');
  const [signupLoading, setSignupLoading]       = useState(false);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both email and password.');
      return;
    }
    setLoginLoading(true);
    // Simulate slight network delay so UX feels real
    setTimeout(() => {
      const result = loginAdmin(loginEmail.trim(), loginPassword);
      setLoginLoading(false);
      if (!result.success) setLoginError(result.error);
    }, 600);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setSignupError('');
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword || !signupConfirm) {
      setSignupError('All fields are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      setSignupError('Please enter a valid email address.');
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError('Password must be at least 6 characters.');
      return;
    }
    if (signupPassword !== signupConfirm) {
      setSignupError('Passwords do not match.');
      return;
    }
    setSignupLoading(true);
    setTimeout(() => {
      const result = registerAdmin(signupName.trim(), signupEmail.trim(), signupPassword);
      setSignupLoading(false);
      if (!result.success) setSignupError(result.error);
    }, 600);
  };

  // ── Shared input class ───────────────────────────────────────────────────
  const inputCls = (hasErr) =>
    `w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800 border rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 transition-all ${
      hasErr ? 'border-rose-500 focus:ring-rose-500/30' : 'border-slate-700 focus:ring-purple-500/40 focus:border-purple-500'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Branding */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-600 shadow-lg shadow-purple-600/30 mx-auto">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">Nexus Academy</h1>
            <div className="inline-flex items-center gap-1.5 mt-1 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Console
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-slate-800">
            {[{ id: 'login', label: 'Admin Login' }, { id: 'signup', label: 'Create Account' }].map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setLoginError(''); setSignupError(''); }}
                className={`flex-1 py-3.5 text-sm font-bold transition-all cursor-pointer ${
                  tab === t.id
                    ? 'text-white border-b-2 border-purple-500 bg-slate-900'
                    : 'text-slate-500 hover:text-slate-300 bg-slate-900/60'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-8">
            {/* ── LOGIN FORM ─────────────────────────────────────────── */}
            {tab === 'login' && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Email / Username</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="admin@nexusacademy.edu"
                      value={loginEmail}
                      onChange={e => { setLoginEmail(e.target.value); setLoginError(''); }}
                      className={inputCls(!!loginError)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type={showLoginPwd ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={e => { setLoginPassword(e.target.value); setLoginError(''); }}
                      className={`${inputCls(!!loginError)} pr-10`}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => setShowLoginPwd(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showLoginPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                >
                  {loginLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Signing in…
                    </>
                  ) : (
                    <>Sign In <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                <p className="text-center text-xs text-slate-500 pt-1">
                  Seed credentials:&nbsp;
                  <span className="text-slate-400 font-mono">admin@nexusacademy.edu</span>
                  &nbsp;/&nbsp;
                  <span className="text-slate-400 font-mono">Admin@123</span>
                </p>
              </form>
            )}

            {/* ── SIGN UP FORM ───────────────────────────────────────── */}
            {tab === 'signup' && (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Admin Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Academy Admin"
                      value={signupName}
                      onChange={e => { setSignupName(e.target.value); setSignupError(''); }}
                      className={inputCls(!!signupError)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      placeholder="admin@example.com"
                      value={signupEmail}
                      onChange={e => { setSignupEmail(e.target.value); setSignupError(''); }}
                      className={inputCls(!!signupError)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showSignupPwd ? 'text' : 'password'}
                        placeholder="Min. 6 chars"
                        value={signupPassword}
                        onChange={e => { setSignupPassword(e.target.value); setSignupError(''); }}
                        className={`${inputCls(!!signupError)} pr-10`}
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowSignupPwd(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer">
                        {showSignupPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type={showSignupConf ? 'text' : 'password'}
                        placeholder="Repeat password"
                        value={signupConfirm}
                        onChange={e => { setSignupConfirm(e.target.value); setSignupError(''); }}
                        className={`${inputCls(!!signupError)} pr-10`}
                      />
                      <button type="button" tabIndex={-1} onClick={() => setShowSignupConf(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer">
                        {showSignupConf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {signupError && (
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 rounded-xl px-3 py-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {signupError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={signupLoading}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed mt-1"
                >
                  {signupLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Creating Account…
                    </>
                  ) : (
                    <>Create Admin Account <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Nexus Academy · Secure Administrative Console · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
