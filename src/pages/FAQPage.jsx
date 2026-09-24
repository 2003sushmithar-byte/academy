import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FAQS } from '../data/mockData';
import { HelpCircle, ChevronDown, Search, X, MessageSquare, ArrowRight, BookOpen } from 'lucide-react';

export default function FAQPage() {
  const { setCurrentPage } = useApp();
  const [openIdx, setOpenIdx] = useState(0);
  const [search, setSearch] = useState('');

  const trimmedSearch = search.trim().toLowerCase();

  const filteredFaqs = FAQS.filter(f =>
    !trimmedSearch ||
    f.question.toLowerCase().includes(trimmedSearch) ||
    f.answer.toLowerCase().includes(trimmedSearch) ||
    f.category?.toLowerCase().includes(trimmedSearch)
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* 1. FAQ Header */}
      <div className="text-center space-y-2.5">
        <span className="section-subtitle">
          FREQUENTLY ASKED QUESTIONS
        </span>
        <h1 className="section-title text-3xl sm:text-4xl text-slate-950 font-black">
          Everything You Need to Know
        </h1>
        <p className="text-sm font-semibold text-slate-700 max-w-xl mx-auto">
          Find answers to common questions about admissions, bootcamps, certificates, cohort schedules, and career support.
        </p>
      </div>

      {/* 2. FAQ Search Box */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600 shrink-0" />
        <input
          type="text"
          placeholder="Search questions (e.g. certificates, placement, fees, enrollment)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-10 py-3 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-2xl shadow-xs placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 transition-colors"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Results Count Badge when Searching */}
      {search.trim() && (
        <div className="text-xs font-bold text-slate-600 flex items-center justify-between px-1">
          <span>Found {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} matching &ldquo;{search}&rdquo;</span>
          <button
            onClick={() => setSearch('')}
            className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      )}

      {/* 3. FAQ Accordion List */}
      {filteredFaqs.length > 0 ? (
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={faq.id || idx} 
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500/10' 
                    : 'border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left gap-3.5 cursor-pointer bg-white select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3 font-extrabold text-sm sm:text-base text-slate-950 flex-1 leading-snug">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
                    }`}>
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <span className={`p-1.5 rounded-full transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-400'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-slate-100 bg-slate-50/50">
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed pl-11">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State: No questions found */
        <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-950">No questions found</h3>
          <p className="text-sm font-medium text-slate-600 max-w-md mx-auto">
            We couldn&apos;t find any questions matching &ldquo;{search}&rdquo;. Try searching for topics like &ldquo;enrollment&rdquo;, &ldquo;certificates&rdquo;, &ldquo;duration&rdquo;, or &ldquo;placement&rdquo;.
          </p>
          <button
            onClick={() => setSearch('')}
            className="btn-secondary text-xs px-4 py-2 mt-2 font-bold cursor-pointer"
          >
            Clear Search Filter
          </button>
        </div>
      )}

      {/* 4. Still Have Questions? Quick Support Card */}
      <div className="p-6 sm:p-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-black text-slate-950">Still Have Questions?</h4>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">
              Can&apos;t find what you&apos;re looking for? Speak directly with our admissions team.
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage('contact')}
          className="btn-primary text-xs px-5 py-2.5 shadow-none shrink-0 flex items-center gap-1.5 cursor-pointer font-bold"
        >
          <span>Contact Admissions</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
