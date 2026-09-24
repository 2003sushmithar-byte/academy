import React, { useState } from 'react';
import { 
  ChevronDown, 
  PlayCircle, 
  FileText, 
  HelpCircle, 
  CheckCircle, 
  Lock 
} from 'lucide-react';

export default function SyllabusAccordion({ syllabus }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!syllabus || syllabus.length === 0) {
    return (
      <div className="p-8 bg-slate-100/90 dark:bg-slate-800/50 rounded-2xl text-center text-sm font-bold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs">
        Detailed syllabus curriculum updating for upcoming intake batch.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {syllabus.map((module, idx) => {
        const isExpanded = expandedIndex === idx;

        return (
          <div
            key={idx}
            className="accordion-card border border-slate-200 dark:border-slate-800 shadow-xs"
          >
            {/* Header Accordion Bar */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              className="accordion-header py-4 px-5 flex items-center justify-between w-full text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400 font-black text-xs flex items-center justify-center">
                  0{idx + 1}
                </span>
                <div>
                  <h4 className="text-base font-extrabold text-slate-950 dark:text-white">
                    {module.moduleTitle}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                    {module.lessons.length} Lessons • Hands-on Project Modules
                  </p>
                </div>
              </div>

              <ChevronDown
                className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180 text-indigo-600' : ''
                }`}
              />
            </button>

            {/* Accordion Lesson Details */}
            {isExpanded && (
              <div className="accordion-body px-5 pb-4 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {module.lessons.map((lesson, lIdx) => (
                  <div
                    key={lIdx}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-sm transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.type === 'video' && <PlayCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                      {lesson.type === 'pdf' && <FileText className="w-4 h-4 text-amber-500" />}
                      {lesson.type === 'quiz' && <HelpCircle className="w-4 h-4 text-emerald-500" />}
                      {lesson.type === 'assignment' && <CheckCircle className="w-4 h-4 text-purple-500" />}

                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-indigo-600">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-600 dark:text-slate-300 font-semibold text-xs">{lesson.duration}</span>

                      {lesson.preview ? (
                        <span className="px-2.5 py-1 text-xs font-bold text-indigo-700 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 rounded-md flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5 text-indigo-600" /> Free Preview
                        </span>
                      ) : (
                        <span className="text-slate-500 font-semibold flex items-center gap-1 text-xs" title="Enrolled Access Only">
                          <Lock className="w-3.5 h-3.5" /> Locked
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
