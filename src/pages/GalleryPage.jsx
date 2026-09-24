import React, { useState } from 'react';
import { GALLERY_IMAGES } from '../data/mockData';
import { Image as ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Campus', 'Labs', 'Events'];
  const filteredImages = GALLERY_IMAGES.filter(img => filter === 'All' || img.category === filter);

  return (
    <div className="section-container py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          CAMPUS GALLERY
        </span>
        <h1 className="section-title text-3xl sm:text-4xl">
          Life at Nexus Innovation Campus
        </h1>
      </div>

      <div className="flex justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              filter === cat
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img, idx) => (
          <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm aspect-square bg-slate-100">
            <img src={img.image} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">{img.category}</span>
              <h4 className="text-sm font-bold">{img.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
