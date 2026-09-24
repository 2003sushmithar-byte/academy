import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

export function BlogNews() {
  const articles = [
    {
      category: 'Career Advice',
      title: 'Top 10 High-Paying Tech Skills in Demand for 2026',
      excerpt: 'Explore the fastest growing technology roles across Cloud, AI Engineering, Cyber Security, and Full Stack Development.',
      date: 'Sep 15, 2026',
      readTime: '5 min read',
      author: 'Academy Editorial',
    },
    {
      category: 'Web Development',
      title: 'Why React and Next.js Dominate Modern Enterprise Apps',
      excerpt: 'A deep dive into server components, static generation, and scalable front-end architecture for enterprise software.',
      date: 'Sep 10, 2026',
      readTime: '7 min read',
      author: 'Alex Rivera',
    },
    {
      category: 'Artificial Intelligence',
      title: 'Getting Started with Machine Learning Pipelines in Python',
      excerpt: 'Step-by-step roadmap for software developers transitioning into Data Science and Machine Learning roles.',
      date: 'Sep 02, 2026',
      readTime: '6 min read',
      author: 'Dr. Sarah Lin',
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            Knowledge Hub
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Latest News & Educational Articles
          </h2>
          <p className="text-slate-600 text-base">
            Stay ahead with industry insights, technical tutorials, and career transition guides.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-600 uppercase tracking-wider">{art.category}</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-xl group-hover:text-blue-600 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>{art.author}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
