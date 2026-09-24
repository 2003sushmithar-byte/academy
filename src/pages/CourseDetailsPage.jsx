import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/mockData';
import SyllabusAccordion from '../components/SyllabusAccordion';
import { 
  Star, 
  Clock, 
  Users, 
  Award, 
  CheckCircle2, 
  Heart, 
  HelpCircle, 
  FileCheck
} from 'lucide-react';

export default function CourseDetailsPage() {
  const { 
    selectedCourseId, 
    courses = COURSES,
    wishlist, 
    toggleWishlist, 
    openModal, 
    enrolledCourses, 
    currentUser 
  } = useApp();

  const [activeTab, setActiveTab] = useState('syllabus');

  const course = courses?.find(c => c.id === selectedCourseId) || courses?.[0] || COURSES[0];
  const isWishlisted = wishlist.includes(course.id);
  const isEnrolled = enrolledCourses.includes(course.id);

  const handleEnrollClick = () => {
    if (!currentUser) {
      // Guest student: open existing Student Login/Register page with enrollment message
      openModal('auth', { targetCourse: course, enrollIntent: true });
    } else {
      // Logged-in student: proceed to enrollment confirmation
      openModal('enroll-confirmation', course);
    }
  };

  return (
    <div className="section-container py-10 space-y-12">
      
      {/* SECTION 1: HEADER BANNER & SUMMARY */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold text-indigo-400 bg-indigo-950/80 rounded-full border border-indigo-800">
                {course.category}
              </span>
              <span className="px-3 py-1 text-xs font-semibold text-slate-300 bg-slate-800 rounded-full">
                Level: {course.level}
              </span>
              <span className="px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 rounded-full flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Certified Course
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.rating}</span>
                <span className="text-slate-400 font-normal">({course.reviewsCount || 48} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <span className="font-medium">{(course.studentsEnrolled || 1250).toLocaleString()} Students Enrolled</span>
              </div>
            </div>
          </div>

          {/* Course Banner Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 group shadow-xl">
              <img
                src={course.thumbnail || course.image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'}
                alt={course.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center justify-between text-xs text-white">
                  <span className="font-bold flex items-center gap-1.5 bg-indigo-600/90 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Award className="w-3.5 h-3.5 text-amber-400" /> Verified Curriculum
                  </span>
                  <span className="font-semibold text-slate-300">Cohort & Self-Paced</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* SECTION 2: MAIN DETAILS CONTENT & SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Main Content (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Navigation Tabs (Image 3) */}
          <div className="flex border-b border-slate-300 dark:border-slate-800 space-x-6 text-sm sm:text-base font-extrabold">
            {[
              { id: 'syllabus', label: 'Course Syllabus & Modules' },
              { id: 'outcomes', label: 'What You Will Learn' },
              { id: 'instructor', label: 'Instructor Bio' },
              { id: 'reviews', label: 'Student Reviews' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 font-black'
                    : 'text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: SYLLABUS & MODULES */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-950 dark:text-white">
                  Curriculum & Hands-on Modules
                </h3>
              </div>

              <SyllabusAccordion syllabus={course.syllabus} />
            </div>
          )}

          {/* TAB 2: OBJECTIVES & WHAT YOU WILL LEARN */}
          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                Course Objectives & Learning Outcomes
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(course.objectives || [
                  'Build enterprise-ready full-stack applications with industry best practices.',
                  'Master data modeling, system architecture, and API security paradigms.',
                  'Implement automated testing, CI/CD deployment pipelines, and cloud monitoring.',
                  'Develop a capstone portfolio project evaluated by senior industry engineers.'
                ]).map((obj, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-semibold">
                      {obj}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="text-base font-extrabold text-slate-950 dark:text-white">
                  Prerequisites & Requirements
                </h4>
                <ul className="list-disc list-inside space-y-2 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {(course.requirements || [
                    'Basic understanding of programming fundamentals and logic.',
                    'A modern computer (Windows, macOS, or Linux) with internet access.',
                    'Dedication of 6-8 hours weekly for hands-on assignments and capstone builds.'
                  ]).map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 3: INSTRUCTOR BIO */}
          {activeTab === 'instructor' && (
            <div className="feature-card p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={course.instructor?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'}
                  alt={course.instructor?.name || 'Instructor'}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow"
                />
                <div>
                  <h3 className="text-lg font-black text-slate-950 dark:text-white">
                    {course.instructor?.name || 'Dr. Sarah Jenkins'}
                  </h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 font-bold">
                    {course.instructor?.title || 'Principal Architect & Lead Instructor'}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300 mt-1 font-semibold">
                    <span className="flex items-center gap-1 text-amber-600 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.instructor?.rating || 4.9}
                    </span>
                    <span>{(course.instructor?.studentsCount || 4500).toLocaleString()} Students</span>
                    <span>{course.instructor?.coursesCount || 6} Courses</span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-200 leading-relaxed">
                {course.instructor?.bio || 'Distinguished academic instructor and industry advisor with over a decade of experience guiding thousands of engineers into world-class technology careers.'}
              </p>
            </div>
          )}

          {/* TAB 4: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between shadow-xs">
                <div>
                  <h3 className="text-3xl font-black text-slate-950 dark:text-white flex items-center gap-2">
                    {course.rating || 4.9} <Star className="w-7 h-7 fill-amber-400 text-amber-400" />
                  </h3>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                    Based on {course.reviewsCount || 48} verified student cohort reviews
                  </p>
                </div>
                <button
                  onClick={() => openModal('application')}
                  className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 dark:bg-slate-800 border border-indigo-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-indigo-100"
                >
                  Write a Student Review
                </button>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-3">
                {[
                  { name: 'Marcus Sterling', date: '2 weeks ago', rating: 5, text: 'The curriculum depth and practical hands-on modules helped me transition directly into a Senior Developer role. Highly recommended!' },
                  { name: 'Priya Sharma', date: 'Last month', rating: 5, text: 'Exceptional faculty instruction and structured cheatsheets. The practical labs made complex concepts feel natural.' }
                ].map((rev, i) => (
                  <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-slate-950 dark:text-white">{rev.name}</span>
                      <span className="text-xs font-semibold text-slate-500">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{rev.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Accordion Section */}
          {course.faqs && course.faqs.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                Course Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-xs">
                    <h4 className="text-sm font-extrabold text-slate-950 dark:text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-indigo-600" /> {faq.question}
                    </h4>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>


        {/* Right Sidebar (4 cols): Enrollment Card (Image 2) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">
            
            {/* Price Badge */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500">Total Course Tuition</span>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">
                  ${course.discountPrice || course.price}
                </span>
                {course.price > (course.discountPrice || course.price) && (
                  <span className="text-base text-slate-400 line-through">
                    ${course.price}
                  </span>
                )}
                {course.price > (course.discountPrice || course.price) && (
                  <span className="px-2 py-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-100 rounded-full">
                    Save {Math.round(((course.price - course.discountPrice) / course.price) * 100)}%
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {isEnrolled ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl border border-emerald-500/40 text-center space-y-1">
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> You are Enrolled!
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Access course materials in your student dashboard.</p>
                </div>
              ) : (
                <button
                  onClick={handleEnrollClick}
                  className="btn-primary w-full py-3.5 cursor-pointer text-sm font-extrabold"
                >
                  Enroll Now & Get Instant Access
                </button>
              )}

              <button
                onClick={() => toggleWishlist(course.id)}
                className={`w-full py-2.5 text-xs font-bold rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isWishlisted
                    ? 'border-rose-500 text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Included Perks List: ONLY Downloadable PDF cheatsheets & Official Certificate (Image 2) */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 text-sm text-slate-800 dark:text-slate-200">
              <p className="font-extrabold text-slate-950 dark:text-white text-sm">This course includes:</p>
              <div className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-slate-100">
                <FileCheck className="w-4 h-4 text-indigo-600" /> Downloadable PDF cheatsheets
              </div>
              <div className="flex items-center gap-2.5 font-semibold text-slate-900 dark:text-slate-100">
                <Award className="w-4 h-4 text-indigo-600" /> Official Nexus Certificate
              </div>
            </div>

            {/* Certificate Preview Trigger (Image 2) */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-2">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">
                Official Nexus Certificate
              </span>
              <button
                onClick={() => openModal('certificate', course)}
                className="w-full py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Preview Certificate <Award className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
