import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { COURSES } from '../data/mockData';
import CourseCard from '../components/CourseCard';
import { Search, RotateCcw, Heart, BookOpen, SlidersHorizontal, ShieldCheck, X } from 'lucide-react';

export default function CoursesPage() {
  const {
    courses = COURSES,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    selectedDuration,
    setSelectedDuration,
    selectedPrice,
    setSelectedPrice,
    sortBy,
    setSortBy,
    wishlist,
    showWishlistOnly,
    setShowWishlistOnly,
    enrolledCourses,
    setCurrentPage
  } = useApp();

  const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

  const categories = ['All', 'Web Development', 'Artificial Intelligence', 'Data Science', 'UI/UX Design', 'Cybersecurity', 'Cloud Computing', 'Business'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const durations = ['All', 'Short', 'Medium', 'Long'];
  const prices = ['All', 'Free', 'Under $250', '$250 - $450', '$450+'];

  // Filtering Engine
  const activeCourseList = courses && courses.length > 0 ? courses : COURSES;

  const filteredCourses = activeCourseList.filter(course => {
    // Enrolled courses filter
    if (showEnrolledOnly && !enrolledCourses.includes(course.id)) return false;

    // Wishlist filter
    if (showWishlistOnly && !wishlist.includes(course.id)) return false;

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = course.title?.toLowerCase().includes(q);
      const matchCategory = course.category?.toLowerCase().includes(q);
      const matchDesc = course.description?.toLowerCase().includes(q);
      const instructorName = typeof course.instructor === 'object' ? course.instructor?.name : course.instructor;
      const matchInstructor = instructorName?.toLowerCase().includes(q);
      if (!matchTitle && !matchCategory && !matchDesc && !matchInstructor) return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && course.category !== selectedCategory) return false;

    // Level filter
    if (selectedLevel !== 'All' && course.level !== selectedLevel) return false;

    // Duration filter
    if (selectedDuration !== 'All' && course.durationCategory !== selectedDuration) return false;

    // Price filter
    if (selectedPrice !== 'All') {
      const price = course.discountPrice || course.price;
      if (selectedPrice === 'Free' && price > 0) return false;
      if (selectedPrice === 'Under $250' && price >= 250) return false;
      if (selectedPrice === '$250 - $450' && (price < 250 || price > 450)) return false;
      if (selectedPrice === '$450+' && price <= 450) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'Popularity') return (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0);
    if (sortBy === 'Rating') return (b.rating || 0) - (a.rating || 0);
    if (sortBy === 'Price: Low to High') return (a.discountPrice || a.price || 0) - (b.discountPrice || b.price || 0);
    if (sortBy === 'Price: High to Low') return (b.discountPrice || b.price || 0) - (a.discountPrice || a.price || 0);
    return 0;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedDuration('All');
    setSelectedPrice('All');
    setSortBy('Popularity');
    setShowWishlistOnly(false);
    setShowEnrolledOnly(false);
  };

  return (
    <div className="section-container py-10 space-y-6">
      
      {/* Page Title Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          COURSE CATALOGUE
        </span>
        <h1 className="section-title text-3xl sm:text-4xl font-black text-slate-950">
          Explore Industry Bootcamps & Courses
        </h1>
        <p className="text-sm font-semibold text-slate-700">
          Filter through our accredited programs by technology, level, duration, and price.
        </p>
      </div>

      {/* Control Bar: Search & Wishlist Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        
        {/* Search Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            if (searchQuery.trim().toLowerCase() === 'admin' || searchQuery.trim().toLowerCase() === '/admin') {
              setCurrentPage('admin');
            }
          }}
          className="relative w-full md:w-96"
        >
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, topic, skill or instructor..."
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (val.trim().toLowerCase() === 'admin' || val.trim().toLowerCase() === '/admin') {
                setCurrentPage('admin');
              }
            }}
            className="input-field pl-10 pr-4 py-2.5 font-medium text-slate-900"
          />
        </form>

        {/* Action Toggles: Enrolled, Wishlist View & Reset */}
        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              setShowEnrolledOnly(!showEnrolledOnly);
              setShowWishlistOnly(false);
            }}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              showEnrolledOnly
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 font-extrabold'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${showEnrolledOnly ? 'text-white' : 'text-indigo-600'}`} />
            My Enrolled Courses ({enrolledCourses.length})
          </button>

          <button
            onClick={() => {
              setShowWishlistOnly(!showWishlistOnly);
              setShowEnrolledOnly(false);
            }}
            className={`px-4 py-2.5 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              showWishlistOnly
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 font-extrabold'
            }`}
          >
            <Heart className={`w-4 h-4 ${showWishlistOnly ? 'fill-current' : ''}`} />
            Wishlist ({wishlist.length})
          </button>

          <button
            onClick={handleResetFilters}
            className="btn-outline cursor-pointer font-bold text-slate-700"
            title="Reset All Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
          </button>
        </div>

      </div>

      {/* Active Wishlist Banner */}
      {showWishlistOnly && (
        <div className="p-4 bg-rose-50 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 rounded-2xl flex items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h4 className="text-sm font-black text-rose-900 dark:text-rose-200">
                Viewing Your Wishlist Courses ({wishlist.length})
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                These are the courses you saved for later. Click on any course to view full syllabus or enroll.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowWishlistOnly(false)}
            className="px-3 py-1.5 bg-rose-200 hover:bg-rose-300 dark:bg-rose-900 text-rose-900 dark:text-rose-100 rounded-xl text-xs font-extrabold flex items-center gap-1 cursor-pointer transition-colors"
          >
            <X className="w-3.5 h-3.5" /> Show All Courses
          </button>
        </div>
      )}

      {/* Filter Options Bar with Bold, High-Contrast Headings & Labels */}
      <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-sm font-black text-slate-950 dark:text-white">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" /> Filter Criteria
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select-field pl-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 dark:bg-slate-800 dark:text-white"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Level */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Difficulty Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="select-field pl-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 dark:bg-slate-800 dark:text-white"
            >
              {levels.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Duration */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Duration
            </label>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="select-field pl-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 dark:bg-slate-800 dark:text-white"
            >
              {durations.map(d => <option key={d} value={d}>{d === 'Short' ? 'Short (<4 wks)' : d === 'Medium' ? 'Medium (4-12 wks)' : d === 'Long' ? 'Long (12+ wks)' : d}</option>)}
            </select>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Price Range
            </label>
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="select-field pl-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 dark:bg-slate-800 dark:text-white"
            >
              {prices.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider block mb-1">
              Sort Courses By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-field pl-3 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-300 dark:bg-slate-800 dark:text-white"
            >
              {['Popularity', 'Rating', 'Price: Low to High', 'Price: High to Low'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

        </div>
      </div>

      {/* Admin Search Result Banner */}
      {searchQuery.toLowerCase().includes('admin') && (
        <div className="p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-purple-900 text-white rounded-2xl shadow-xl border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Administrative Portal Access</h4>
              <p className="text-xs text-purple-200">You searched for "admin". Open the system administration and faculty controls.</p>
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentPage('admin');
            }}
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-lg"
          >
            Open Admin Portal →
          </button>
        </div>
      )}

      {/* Results Header */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
        <span>Showing {filteredCourses.length} of {activeCourseList.length} Courses</span>
        {showWishlistOnly && <span className="text-rose-600 font-extrabold">Filtered by Wishlist</span>}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No courses match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
            Try adjusting your search query, price range, or category filter to discover relevant courses.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
}
