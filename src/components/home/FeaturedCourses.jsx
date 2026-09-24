import React, { useState } from 'react';
import { Star, Clock, Users, BookOpen, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

export function FeaturedCourses() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'Software Engineering', 'Data & AI', 'Cloud & Cyber', 'Design & Product'];

  const courses = [
    {
      id: 1,
      category: 'Software Engineering',
      title: 'Full Stack Web Development Bootcamp (MERN)',
      rating: 4.9,
      reviews: 1240,
      duration: '24 Weeks',
      students: '4.2k enrolled',
      instructor: 'Alex Rivera (Ex-Google)',
      price: '$899',
      originalPrice: '$1,200',
      badge: 'Bestseller',
    },
    {
      id: 2,
      category: 'Data & AI',
      title: 'Data Science & Machine Learning Masterclass',
      rating: 4.8,
      reviews: 980,
      duration: '16 Weeks',
      students: '3.1k enrolled',
      instructor: 'Dr. Sarah Lin (PhD AI)',
      price: '$949',
      originalPrice: '$1,350',
      badge: 'Trending',
    },
    {
      id: 3,
      category: 'Cloud & Cyber',
      title: 'AWS Certified Cloud Solutions Architect',
      rating: 4.9,
      reviews: 850,
      duration: '12 Weeks',
      students: '2.8k enrolled',
      instructor: 'Marcus Vance (AWS Fellow)',
      price: '$699',
      originalPrice: '$999',
      badge: 'High Salary',
    },
    {
      id: 4,
      category: 'Design & Product',
      title: 'UI/UX Design Specialist & Figma Masterclass',
      rating: 4.7,
      reviews: 620,
      duration: '10 Weeks',
      students: '1.9k enrolled',
      instructor: 'Elena Rostova (Lead UX Designer)',
      price: '$499',
      originalPrice: '$750',
      badge: 'Beginner Friendly',
    },
    {
      id: 5,
      category: 'Cloud & Cyber',
      title: 'Ethical Hacking & Cyber Security Defense',
      rating: 4.9,
      reviews: 740,
      duration: '14 Weeks',
      students: '2.1k enrolled',
      instructor: 'David Miller (CEH Master)',
      price: '$799',
      originalPrice: '$1,100',
      badge: 'Featured',
    },
    {
      id: 6,
      category: 'Software Engineering',
      title: 'React & Next.js Enterprise Architecture',
      rating: 4.9,
      reviews: 1100,
      duration: '8 Weeks',
      students: '3.8k enrolled',
      instructor: 'Alex Rivera (Ex-Google)',
      price: '$399',
      originalPrice: '$599',
      badge: 'Fast Track',
    },
  ];

  const filteredCourses = activeTab === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeTab);

  return (
    <section id="courses" className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-100/60 px-3 py-1 rounded-full">
              Explore Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Certification Programs
            </h2>
            <p className="text-slate-600 text-base max-w-xl">
              Industry-aligned curricula designed with hiring managers to land high-paying roles.
            </p>
          </div>

          <Button variant="outline" size="md" className="self-start md:self-auto gap-2">
            <span>View All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Banner Top */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 relative">
                <span className="absolute top-4 right-4 bg-blue-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {course.badge}
                </span>
                <span className="text-xs font-semibold text-blue-400 block mb-2">{course.category}</span>
                <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
                  {course.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                
                {/* Specs */}
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500 font-semibold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400">({course.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{course.students}</span>
                    </div>
                    <span className="font-medium text-slate-700">{course.instructor}</span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">{course.price}</span>
                    <span className="text-xs text-slate-400 line-through ml-2">{course.originalPrice}</span>
                  </div>
                  <Button variant="primary" size="sm" className="gap-1.5">
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
