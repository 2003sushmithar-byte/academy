import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Clock, Users, Heart, ArrowUpRight, Award } from 'lucide-react';

export default function CourseCard({ course }) {
  const { wishlist, toggleWishlist, openCourseDetails, openModal, currentUser } = useApp();
  const isWishlisted = wishlist.includes(course.id);

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
      
      {/* Thumbnail Container - Compact Aspect Ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

        {/* Category Tag */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 text-[11px] font-bold text-white bg-indigo-600/90 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
          {course.category}
        </span>

        {/* Wishlist Heart Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(course.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
              : 'bg-white/90 text-slate-700 hover:scale-110 shadow-sm'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-amber-300 bg-slate-900/90 backdrop-blur-md rounded-md shadow-sm">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{course.rating}</span>
          <span className="text-[10px] text-slate-300 font-medium">({course.reviewsCount})</span>
        </div>
      </div>

      {/* Card Content Body - Reduced padding and compact spacing */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between space-y-3 bg-white text-slate-900">
        
        <div className="space-y-2">
          {/* Metadata badges: Level & Duration */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-600">
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
              {course.level}
            </span>
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 text-slate-600 font-semibold">
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              {course.studentsEnrolled?.toLocaleString()}
            </span>
          </div>

          {/* Title - Compact & Clean */}
          <h3 
            onClick={() => openCourseDetails(course.id)} 
            className="text-sm sm:text-[15px] font-bold text-slate-900 hover:text-indigo-600 cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2">
            {course.description}
          </p>
        </div>

        {/* Instructor Info */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-slate-100">
          <img
            src={course.instructor?.avatar}
            alt={course.instructor?.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80';
            }}
            className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/20"
          />
          <div className="text-xs min-w-0">
            <p className="font-bold text-slate-900 line-clamp-1 text-xs">{course.instructor?.name}</p>
            <p className="text-[10px] text-slate-500 line-clamp-1">{course.instructor?.title}</p>
          </div>
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-100">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-black text-indigo-600 tracking-tight">
                ${course.discountPrice}
              </span>
              {course.price > course.discountPrice && (
                <span className="text-xs font-semibold text-slate-400 line-through">
                  ${course.price}
                </span>
              )}
            </div>
            {course.certificateAvailable && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                <Award className="w-3 h-3 text-emerald-600" /> Cert Verified
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => openCourseDetails(course.id)}
              className="p-2 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
              title="View Course Details"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  openCourseDetails(course.id);
                  openModal('auth', { targetCourse: course, enrollIntent: true });
                } else {
                  openCourseDetails(course.id);
                  openModal('enroll-confirmation', course);
                }
              }}
              className="px-3 py-1.5 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all cursor-pointer active:scale-95"
            >
              Enroll
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
