import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  BookOpen, 
  Users, 
  Calendar, 
  Sparkles 
} from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About Us', href: '#about' },
    { name: 'Courses', href: '#courses', hasDropdown: true },
    { name: 'Upcoming Batches', href: '#batches' },
    { name: 'Faculty', href: '#faculty' },
    { name: 'Events', href: '#events' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      {/* Top Banner Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white font-semibold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">New Admission</span>
            <span>Fall 2026 Batches Open! Reserve your cohort seat today.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+18001234567" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>+1 (800) 123-4567</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline">Mon - Sat: 9:00 AM - 7:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block leading-none">ACADEMY</span>
              <span className="text-[11px] font-medium text-blue-600 tracking-wider uppercase">Excellence in Education</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <a
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-all flex items-center gap-1"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:rotate-180" />}
                </a>

                {/* Dropdown Menu for Courses */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <a href="#courses" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Software Engineering</div>
                        <div className="text-xs text-slate-500">Full Stack, React, Node.js</div>
                      </div>
                    </a>
                    <a href="#courses" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Data Science & AI</div>
                        <div className="text-xs text-slate-500">Python, ML, Data Analytics</div>
                      </div>
                    </a>
                    <a href="#courses" className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                      <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">Cloud & Cyber Security</div>
                        <div className="text-xs text-slate-500">AWS, DevOps, Ethical Hacking</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button 
              aria-label="Search courses"
              className="p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            <Button variant="outline" size="sm" onClick={() => window.location.href = '#contact'}>
              Enquire Now
            </Button>
            <Button variant="primary" size="sm" onClick={() => window.location.href = '#batches'}>
              Explore Courses
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Button variant="outline" size="md" className="w-full">
              Enquire Now
            </Button>
            <Button variant="primary" size="md" className="w-full">
              Explore Courses
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
