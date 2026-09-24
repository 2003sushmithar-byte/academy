import React from 'react';
import { Calendar, Clock, Video, User, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export function UpcomingEvents() {
  const events = [
    {
      type: 'Live Webinar',
      title: 'How to Crack Software Engineering Interviews in 2026',
      speaker: 'Alex Rivera (Ex-Google Senior Engineer)',
      date: 'October 05, 2026',
      time: '6:00 PM EST',
      attendees: '1,200+ Registered',
      badge: 'Free Event',
    },
    {
      type: 'Hands-on Workshop',
      title: 'Building AI Agents with Python & LLMs from Scratch',
      speaker: 'Dr. Sarah Lin (Lead AI Researcher)',
      date: 'October 14, 2026',
      time: '7:30 PM EST',
      attendees: '850+ Registered',
      badge: 'Hands-on Lab',
    },
    {
      type: 'Open House & Campus Tour',
      title: 'Academy Fall Admission Info Session & Career Counseling',
      speaker: 'Academy Admissions & Career Team',
      date: 'October 22, 2026',
      time: '11:00 AM EST',
      attendees: '500+ Registered',
      badge: 'Interactive Q&A',
    },
  ];

  return (
    <section id="events" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-100/60 px-3 py-1 rounded-full">
              Live Workshops & Masterclasses
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Upcoming Events & Webinars
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Join free interactive sessions hosted by tech leaders to gain career guidance and practical knowledge.
            </p>
          </div>

          <Button variant="outline" size="md" className="self-start md:self-auto gap-2">
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((evt, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
                    {evt.type}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {evt.badge}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors leading-snug">
                  {evt.title}
                </h3>

                <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-800">{evt.speaker}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.time}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">{evt.attendees}</span>
                <Button variant="primary" size="sm" className="gap-1">
                  <span>Register Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
