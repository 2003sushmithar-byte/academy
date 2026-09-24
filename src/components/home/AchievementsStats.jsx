import React from 'react';
import { Users, TrendingUp, Building, Award } from 'lucide-react';

export function AchievementsStats() {
  const stats = [
    {
      icon: Users,
      value: '15,000+',
      label: 'Graduates Trained',
      sublabel: 'Across 40+ Countries',
    },
    {
      icon: TrendingUp,
      value: '98%',
      label: 'Placement Success Rate',
      sublabel: 'Within 180 Days',
    },
    {
      icon: Building,
      value: '500+',
      label: 'Corporate Partners',
      sublabel: 'Active Tech Recruiters',
    },
    {
      icon: Award,
      value: '$95,000',
      label: 'Average Starting Salary',
      sublabel: 'For Bootcamp Alumni',
    },
  ];

  return (
    <section className="py-16 bg-blue-600 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-blue-500/50">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="pt-6 sm:pt-0 sm:px-6 text-center space-y-2 first:pt-0">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto mb-3 backdrop-blur-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-blue-100">{stat.label}</div>
                <div className="text-xs text-blue-200/80">{stat.sublabel}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
