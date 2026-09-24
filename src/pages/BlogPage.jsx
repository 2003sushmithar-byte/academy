import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import BlogPostModal from '../components/modals/BlogPostModal';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState(null);

  const categories = ['All', 'Generative AI', 'AI & Data', 'Web Tech', 'System Design', 'Cybersecurity & Cloud', 'Career & Tech'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(post => post.category.toLowerCase().includes(selectedCategory.toLowerCase()) || post.category === selectedCategory);

  return (
    <div className="section-container py-12 space-y-10">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          ACADEMY BLOG
        </span>
        <h1 className="section-title text-3xl sm:text-4xl">
          Insights, Tech Trends & Career Advice
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Deep dives into modern engineering practices, generative AI pipelines, scalable distributed systems, and real-world career growth. Click any article to read the full guide.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            onClick={() => setActivePost(post)}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative overflow-hidden bg-slate-100">
              <img
                src={post.image}
                alt={post.title}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80';
                }}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold text-white bg-slate-900/80 backdrop-blur-md rounded-full shadow-sm">
                {post.category}
              </span>
              <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold text-slate-800 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                {post.date}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {post.snippet}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  <User className="w-3.5 h-3.5 text-indigo-500" /> {post.author}
                </span>
                <span className="flex items-center gap-1.5 font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" /> {post.readTime} • Read <ArrowRight className="w-3 h-3 inline" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      <BlogPostModal
        post={activePost}
        isOpen={Boolean(activePost)}
        onClose={() => setActivePost(null)}
      />
    </div>
  );
}
