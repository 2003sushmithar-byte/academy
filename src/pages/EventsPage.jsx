import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UPCOMING_EVENTS } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  User, 
  Search, 
  Layers, 
  ArrowRight,
  BookOpen,
  Video,
  Award,
  Zap
} from 'lucide-react';

export default function EventsPage() {
  const { showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const categories = ['All', 'Workshop', 'Webinar', 'Hackathon', 'Demo Class', 'Career Seminar'];

  const filteredEvents = UPCOMING_EVENTS.filter(ev => {
    const matchCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchSearch = searchQuery === '' || 
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleRegisterSeat = (event) => {
    if (registeredEvents.includes(event.id)) {
      showToast(`You are already registered for "${event.title}"!`, 'info');
      return;
    }
    setRegisteredEvents([...registeredEvents, event.id]);
    showToast(`Seat Confirmed for "${event.title}"! Calendar invite dispatched 🎉`, 'success');
  };

  return (
    <div className="section-container py-12 space-y-10">
      
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="badge-highlight">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" /> LIVE TECHNICAL SESSIONS & WORKSHOPS
        </span>
        <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl">
          Upcoming Workshops & Tech Summits
        </h1>
        <p className="hero-desc text-xs sm:text-sm">
          Hands-on code-along labs, system architecture deep-dives, hackathons, and demo masterclasses led by industry tech leads. 100% free for students and developers.
        </p>
      </div>

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        
        {/* Category Filter Pills (PDF Page 17) */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search workshop or speaker..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-10 pr-3 py-2 text-xs"
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(ev => {
            const isRegistered = registeredEvents.includes(ev.id);

            return (
              <div 
                key={ev.id} 
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Banner with badges */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={ev.image} 
                      alt={ev.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg backdrop-blur-md shadow ${
                        ev.category === 'Workshop' ? 'bg-indigo-600 text-white' :
                        ev.category === 'Webinar' ? 'bg-purple-600 text-white' :
                        ev.category === 'Hackathon' ? 'bg-amber-500 text-white' :
                        ev.category === 'Demo Class' ? 'bg-emerald-600 text-white' :
                        'bg-slate-900 text-white'
                      }`}>
                        {ev.category}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-950/80 backdrop-blur-md border border-white/20 text-white">
                        {ev.seatsLeft}
                      </span>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <p className="text-[11px] font-medium text-slate-200 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {ev.location}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 space-y-4">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 transition-colors">
                        {ev.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    {/* Speaker Info */}
                    <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{ev.speaker}</p>
                        <p className="text-[10px] text-slate-500 truncate">{ev.speakerRole}</p>
                      </div>
                    </div>

                    {/* Key Takeaways (From PDF) */}
                    {ev.takeaways && ev.takeaways.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          What You'll Learn & Build:
                        </span>
                        <ul className="space-y-1">
                          {ev.takeaways.map((point, idx) => (
                            <li key={idx} className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                              <span className="line-clamp-1">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Date & Time Bar */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" /> {ev.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" /> {ev.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleRegisterSeat(ev)}
                    disabled={isRegistered}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                      isRegistered
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'btn-primary'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Seat Confirmed (Link Emailed)
                      </>
                    ) : (
                      <>
                        Register Free Seat <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No sessions found in this category</h3>
          <p className="text-xs text-slate-500">Try selecting "All" to view all upcoming workshops and tech events.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="btn-outline px-4 py-2 text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
