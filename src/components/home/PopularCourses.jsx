import React from 'react';
import { Flame, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

export function PopularCourses() {
  const popularTracks = [
    {
      title: 'Full Stack MERN Developer',
      salary: '$95,000 / yr',
      placementRate: '98%',
      skills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'TypeScript'],
      level: 'Beginner to Advanced',
    },
    {
      title: 'AI & Data Science Specialist',
      salary: '$115,000 / yr',
      placementRate: '96%',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'SQL', 'Scikit-Learn'],
      level: 'Intermediate',
    },
    {
      title: 'Cloud DevOps & Security Engineer',
      salary: '$120,000 / yr',
      placementRate: '99%',
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
      level: 'All Levels',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>High Demand Careers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Popular Career Outcome Tracks
          </h2>
          <p className="text-slate-600 text-base">
            Structured 6-month career paths designed to transition you into high-growth tech roles.
          </p>
        </div>

        {/* Popular Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popularTracks.map((track, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Top Accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                    {track.level}
                  </span>
                  <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                    <TrendingUp className="w-4 h-4" />
                    <span>{track.placementRate} Hired</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white leading-snug">{track.title}</h3>

                <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                  <div className="text-xs text-slate-400 font-medium">Average Graduate Starting Salary</div>
                  <div className="text-2xl font-extrabold text-emerald-400 pt-0.5">{track.salary}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Skills Covered</div>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="bg-slate-800 text-slate-200 text-xs font-medium px-2.5 py-1 rounded-lg border border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-8 relative z-10">
                <Button variant="primary" size="md" className="w-full gap-2 group-hover:bg-blue-500">
                  <span>View Track Syllabus</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
