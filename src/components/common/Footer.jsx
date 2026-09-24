import React from 'react';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ArrowUp,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from './Button';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About Academy', href: '#about' },
    { name: 'Browse Courses', href: '#courses' },
    { name: 'Upcoming Batches', href: '#batches' },
    { name: 'Our Faculty', href: '#faculty' },
    { name: 'Webinars & Events', href: '#events' },
    { name: 'Articles & News', href: '#blog' },
  ];

  const legalLinks = [
    { name: 'Admissions Process', href: '#contact' },
    { name: 'Installment Options', href: '#batches' },
    { name: 'Careers & Hiring', href: '#about' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Refund Policy', href: '#' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block leading-none">ACADEMY</span>
                <span className="text-[10px] font-medium text-amber-400 tracking-wider uppercase">Excellence in Education</span>
              </div>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering students and professionals with industry-relevant skills, expert mentorship, and career-transforming education for over 15 years.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</h4>
            {/* Glowing Golden Half-Underline */}
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 mb-4 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="hover:text-amber-400 transition-all flex items-center gap-2 group text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Admissions & Legal Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Admissions & Legal</h4>
            {/* Glowing Golden Half-Underline */}
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 mb-4 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            
            <ul className="space-y-2.5 text-sm">
              {legalLinks.map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={item.href} 
                    className="hover:text-amber-400 transition-all flex items-center gap-2 group text-slate-300"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscribe Column */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Stay Updated</h4>
            {/* Glowing Golden Half-Underline */}
            <div className="w-10 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full mt-2 mb-4 shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
            
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe to get the latest course updates, free workshop invites, and tech insights.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2.5">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/50 transition-all"
                />
              </div>
              <Button variant="primary" size="sm" className="w-full gap-2 font-bold shadow-lg shadow-blue-600/20">
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Academy Inc. All rights reserved. Built with React & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> ISO 9001:2025 Certified
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors font-medium"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
