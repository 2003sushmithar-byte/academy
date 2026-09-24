import React from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export function UpcomingBatches() {
  const batches = [
    {
      course: 'Full Stack MERN Bootcamp',
      startDate: 'October 12, 2026',
      mode: 'Online Live',
      timing: 'Mon, Wed, Fri (7:00 PM - 9:00 PM)',
      seatsLeft: '4 Seats Left',
      status: 'Filling Fast',
    },
    {
      course: 'Data Science & Machine Learning',
      startDate: 'October 18, 2026',
      mode: 'Classroom / Campus',
      timing: 'Sat & Sun (10:00 AM - 2:00 PM)',
      seatsLeft: '2 Seats Left',
      status: 'Almost Full',
    },
    {
      course: 'AWS Cloud Solutions Architect',
      startDate: 'November 02, 2026',
      mode: 'Online Live',
      timing: 'Tue & Thu (8:00 PM - 10:00 PM)',
      seatsLeft: '8 Seats Left',
      status: 'Admissions Open',
    },
    {
      course: 'UI/UX Design Masterclass',
      startDate: 'November 10, 2026',
      mode: 'Hybrid (Online + Campus)',
      timing: 'Sat & Sun (3:00 PM - 6:00 PM)',
      seatsLeft: '6 Seats Left',
      status: 'Admissions Open',
    },
  ];

  return (
    <section id="batches" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-100/60 px-3 py-1 rounded-full">
            Batch Schedules
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Upcoming Batches & Start Dates
          </h2>
          <p className="text-slate-600 text-base">
            Reserve your seat early. Small batch sizes guaranteed to maintain high-quality 1-on-1 interaction.
          </p>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Course Name</th>
                <th className="py-4 px-6">Start Date</th>
                <th className="py-4 px-6">Learning Mode</th>
                <th className="py-4 px-6">Batch Timings</th>
                <th className="py-4 px-6">Seat Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {batches.map((b, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{b.course}</td>
                  <td className="py-4 px-6 text-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>{b.startDate}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {b.mode}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {b.timing}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      {b.seatsLeft}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button variant="primary" size="sm" className="gap-1">
                      <span>Reserve Seat</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Cards View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:hidden">
          {batches.map((b, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-bold text-slate-900 text-lg">{b.course}</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {b.seatsLeft}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold">{b.startDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{b.mode}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{b.timing}</span>
                </div>
              </div>
              <Button variant="primary" size="sm" className="w-full gap-1">
                <span>Reserve Seat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
