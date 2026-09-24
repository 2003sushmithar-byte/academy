import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, FileText, AlertTriangle, ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

const legalTopics = [
  {
    id: 'terms',
    title: 'Terms & Conditions',
    shortTitle: 'Terms & Conditions',
    tagline: 'Please read our academic terms and enrollment policies carefully before registering.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    sections: [
      {
        heading: '1. Acceptance of Academic Terms',
        content: 'By accessing the Nexus Academy learning platform, applying for admission cohorts, or utilizing our educational resources, you agree to be bound by these Terms & Conditions. If you do not agree with any portion of these academic regulations, please discontinue registration or use of our services.'
      },
      {
        heading: '2. Course Enrollment & Cohort Allocation',
        content: 'Enrollment in any cohort (Web Development, AI & Machine Learning, Data Science, Cybersecurity) is subject to seat availability and prerequisite verification. Nexus Academy reserves the right to allocate students to optimal batches based on diagnostic counseling and assessment results to maintain ideal mentor-to-student ratios.'
      },
      {
        heading: '3. Intellectual Property & Courseware Rights',
        content: 'All instructional videos, lecture recordings, sandbox lab code, syllabus modules, quizzes, and documentation provided remain the proprietary intellectual property of Nexus Academy. Materials are granted under a non-transferable individual educational license. Distribution, commercial redistribution, or reproduction without written authorization is strictly prohibited.'
      },
      {
        heading: '4. Attendance & Certification Requirements',
        content: 'Accredited Certificates of Completion are awarded solely to students who maintain at least an 80% attendance record in scheduled live lectures, actively participate in peer reviews, and submit satisfactory capstone milestone projects evaluated by certified instructors.'
      },
      {
        heading: '5. Student Code of Conduct & Honor Code',
        content: 'Nexus Academy fosters an inclusive, safe, and academically rigorous learning environment. Plagiarism, disruptive behavior in community channels, harassment, or unauthorized tampering with laboratory infrastructure will result in disciplinary action up to immediate termination of platform access without credential issuance.'
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Policy',
    shortTitle: 'Privacy Policy',
    tagline: 'Your privacy, student records, and data security are our highest priority.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    sections: [
      {
        heading: '1. Information We Collect',
        content: 'At Nexus Academy, we collect personal information essential to deliver comprehensive educational and training programs. This includes your full name, email address, contact telephone, educational background, cohort preferences, assignment submissions, and assessment metrics submitted via application or registration forms.'
      },
      {
        heading: '2. How We Use Student Data',
        content: 'Your data is strictly utilized to administer academic courses, track curriculum progression, issue verified completion certificates, deliver instructor feedback, facilitate career placement counseling, and send relevant batch schedules. We never sell or license your personal information to third-party telemarketers.'
      },
      {
        heading: '3. Data Security & Encryption Standards',
        content: 'We implement industry-standard encryption protocols (TLS/SSL in transit and AES-256 at rest), secure cloud database storage, and role-based access management to prevent unauthorized disclosure, alteration, or breach of learner data.'
      },
      {
        heading: '4. Third-Party Educational Processors',
        content: 'We only share student details with vetted technical educational partners (such as cloud sandbox providers, coding assessment engines, and verified hiring partners upon explicit student consent) strictly as required to fulfill curriculum and career placement commitments.'
      },
      {
        heading: '5. Student Data Rights & Privacy Office',
        content: 'You maintain the right to view, rectify, download, or request erasure of your student profile data at any time via our Privacy Center or by emailing our designated Data Protection Officer at privacy@nexusacademy.edu.'
      }
    ]
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    shortTitle: 'Disclaimer',
    tagline: 'Important disclosures regarding course outcomes, placement guidance, and website content.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    sections: [
      {
        heading: '1. Educational Purpose & Curriculum Updates',
        content: 'All syllabus modules, code snippets, tech stack demonstrations, and project blueprints displayed across the Nexus Academy website are provided for instructional and skill enhancement purposes. Nexus Academy continually modernizes course content to reflect rapidly advancing industry frameworks.'
      },
      {
        heading: '2. Career Guidance & Placement Assistance Disclaimer',
        content: 'While Nexus Academy delivers dedicated career advisory services, mock technical interviews, resume workshops, and direct hiring partner referrals, individual job placements and starting salary packages depend solely on personal dedication, market dynamics, technical portfolio strength, and hiring company evaluation.'
      },
      {
        heading: '3. Certification Recognition',
        content: 'Nexus Academy certificates represent technical mastery and successful completion of rigorous project-based curricula. Our credentials validate hands-on engineering capabilities and do not confer formal university undergraduate degrees unless explicitly registered under accredited university affiliate tracks.'
      },
      {
        heading: '4. External Software & Third-Party APIs',
        content: 'Coursework frequently utilizes external third-party software, cloud free tiers (e.g. AWS, GitHub, Docker), and open-source libraries. Nexus Academy is not responsible for external API disruptions, pricing tier revisions, or third-party service availability outside our direct control.'
      },
      {
        heading: '5. Limitation of Liability',
        content: 'Nexus Academy shall not be liable for incidental, consequential, or indirect damages arising from network interruptions, software toolchain changes, or student hardware incompatibilities during live cohort streams or self-paced exercises.'
      }
    ]
  }
];

export default function LegalModal({ isOpen, activeTab = 'terms', onClose, onUnderstood }) {
  const [currentTabId, setCurrentTabId] = useState(activeTab);

  // Sync internal state when activeTab prop changes or modal opens
  useEffect(() => {
    if (activeTab) {
      setCurrentTabId(activeTab);
    }
  }, [activeTab, isOpen]);

  const handlePrev = useCallback(() => {
    setCurrentTabId((prevId) => {
      const idx = legalTopics.findIndex((item) => item.id === prevId);
      const sIdx = idx !== -1 ? idx : 0;
      return legalTopics[(sIdx - 1 + legalTopics.length) % legalTopics.length].id;
    });
  }, []);

  const handleNext = useCallback(() => {
    setCurrentTabId((prevId) => {
      const idx = legalTopics.findIndex((item) => item.id === prevId);
      const sIdx = idx !== -1 ? idx : 0;
      return legalTopics[(sIdx + 1) % legalTopics.length].id;
    });
  }, []);

  const handleDismiss = useCallback(() => {
    if (onUnderstood) onUnderstood();
    if (onClose) onClose();
  }, [onUnderstood, onClose]);

  // Handle keyboard arrow navigation & Escape key close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleDismiss();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, handleDismiss]);

  if (!isOpen) return null;

  const currentIndex = legalTopics.findIndex((item) => item.id === currentTabId);
  const safeIndex = currentIndex !== -1 ? currentIndex : 0;
  const currentTopic = legalTopics[safeIndex];

  const prevTopic = legalTopics[(safeIndex - 1 + legalTopics.length) % legalTopics.length];
  const nextTopic = legalTopics[(safeIndex + 1) % legalTopics.length];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) handleDismiss();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col max-h-[88vh] overflow-hidden text-slate-800 transition-all duration-300"
      >
        {/* Header Section */}
        <div className="p-5 sm:p-6 border-b border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-purple-50/50 to-white shrink-0">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
                {currentTopic.icon}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {currentTopic.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-indigo-700">
                  {currentTopic.tagline}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              aria-label="Close modal"
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 text-base font-bold transition-all shrink-0 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Interactive Topic Tabs (Terms, Privacy, Disclaimer) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {legalTopics.map((topic, idx) => {
              const isActive = topic.id === currentTabId;
              return (
                <button
                  key={topic.id}
                  onClick={() => setCurrentTabId(topic.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                      : 'bg-white text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-mono font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                    {idx + 1}
                  </span>
                  <span>{topic.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-grow leading-relaxed text-sm sm:text-base">
          {currentTopic.sections.map((section, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200/90 bg-slate-50/70 hover:border-indigo-300 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-bold mb-2 flex items-center gap-2 text-indigo-950">
                <span className="w-1.5 h-4 rounded-full bg-indigo-600 inline-block" />
                {section.heading}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Footer with Previous / Next & Understood and Close Buttons */}
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/80 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Topic Counter Badge */}
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="px-2.5 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-indigo-700 font-bold">
              Topic {safeIndex + 1} of {legalTopics.length}
            </span>
            <span className="text-slate-500 font-semibold">
              {currentTopic.title}
            </span>
          </div>

          {/* Controls: Previous / Next & Understood and Close */}
          <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={handlePrev}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm cursor-pointer"
            >
              <span>← {prevTopic.shortTitle}</span>
            </button>

            <button
              onClick={handleNext}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95 cursor-pointer"
            >
              <span>{nextTopic.shortTitle} →</span>
            </button>

            {/* Crucial Understood & Close Button */}
            <button
              type="button"
              onClick={() => {
                if (onUnderstood) onUnderstood();
                if (onClose) onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-1.5 transition-all bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Understood &amp; Close</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
