import React from 'react';
import { 
  UserCheck, 
  Code2, 
  Briefcase, 
  Clock, 
  Award, 
  Headphones 
} from 'lucide-react';

export function WhyChooseUs() {
  const features = [
    {
      icon: UserCheck,
      title: 'Top 1% Industry Instructors',
      description: 'Learn directly from senior engineers and practitioners working at Google, AWS, Microsoft, and Meta.',
    },
    {
      icon: Code2,
      title: 'Hands-on Capstone Projects',
      description: 'Build production-ready applications for your GitHub portfolio to showcase to hiring companies.',
    },
    {
      icon: Briefcase,
      title: 'Dedicated Placement Cell',
      description: 'Resume reviews, mock technical interviews, and direct referrals to 500+ corporate hiring partners.',
    },
    {
      icon: Clock,
      title: 'Flexible Learning Schedules',
      description: 'Choose between weekend live cohorts, weekday evening classes, or self-paced video modules.',
    },
    {
      icon: Award,
      title: 'Global Verified Certification',
      description: 'Receive shareable digital certificates verified on blockchain to boost your LinkedIn profile.',
    },
    {
      icon: Headphones,
      title: '1-on-1 Mentorship & Doubts',
      description: 'Get your coding errors and questions answered in real-time by dedicated teaching assistants.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            The Academy Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Students Choose Us Over Traditional Degrees
          </h2>
          <p className="text-slate-600 text-base">
            We prioritize real practical mastery over memorization, equipping you for long-term career growth.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
