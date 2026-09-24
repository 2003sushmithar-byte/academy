import React from 'react';
import { X, Clock, User, Calendar, Tag, ArrowLeft, Share2, BookOpen, CheckCircle } from 'lucide-react';

export default function BlogPostModal({ post, isOpen, onClose }) {
  if (!isOpen || !post) return null;

  return (
    <div className="modal-backdrop overflow-y-auto py-6">
      <div className="modal-card w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden m-auto flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sticky Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shrink-0">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-300 font-medium truncate hidden sm:inline">
              Published on {post.date}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0 ml-auto"
            title="Close article modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto custom-scrollbar flex-1 p-6 sm:p-8 space-y-6">
          
          {/* Article Title */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {post.title}
            </h1>

            {/* Author Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-slate-900">{post.author}</p>
                  <p className="text-slate-500 text-[11px]">{post.authorRole || 'Academy Instructor'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 max-h-80">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
              }}
            />
          </div>

          {/* Abstract / Summary */}
          <div className="p-4 rounded-xl bg-indigo-50/70 border-l-4 border-indigo-600 text-slate-700 text-sm font-medium leading-relaxed italic">
            "{post.snippet}"
          </div>

          {/* Full Markdown Article Content */}
          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            {post.content ? (
              post.content.trim().split('\n\n').map((block, idx) => {
                const trimmed = block.trim();
                if (trimmed.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg sm:text-xl font-black text-slate-900 pt-3 border-b border-slate-100 pb-1">
                      {trimmed.replace('### ', '')}
                    </h3>
                  );
                }
                if (trimmed.startsWith('#### ')) {
                  return (
                    <h4 key={idx} className="text-base font-extrabold text-indigo-900 pt-2">
                      {trimmed.replace('#### ', '')}
                    </h4>
                  );
                }
                if (trimmed.startsWith('```')) {
                  const code = trimmed.replace(/```[a-z]*/g, '').trim();
                  return (
                    <pre key={idx} className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono overflow-x-auto my-3 shadow-inner">
                      <code>{code}</code>
                    </pre>
                  );
                }
                if (trimmed.startsWith('- ')) {
                  const items = trimmed.split('\n').filter(i => i.startsWith('- '));
                  return (
                    <ul key={idx} className="space-y-1.5 list-disc list-inside bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs sm:text-sm">
                      {items.map((item, itemIdx) => (
                        <li key={itemIdx} className="text-slate-700">
                          {item.replace('- ', '')}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={idx} className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                    {trimmed}
                  </p>
                );
              })
            ) : (
              <p className="text-slate-600 leading-relaxed text-sm">
                Full technical write-up currently compiling in curriculum archive.
              </p>
            )}
          </div>

          {/* Academic Footer Tag & Close CTA */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Verified Academy Engineering Publication</span>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer ml-auto"
            >
              Done Reading
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
