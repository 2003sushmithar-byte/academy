import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, GraduationCap, CheckCircle2, User, Mail, BookOpen, AlertCircle, UserCheck } from 'lucide-react';
import TermsCheckbox from './common/TermsCheckbox';

export default function EnrollmentModal() {
  const { 
    activeModal, 
    closeModal, 
    modalData, 
    enrollInCourse, 
    showToast, 
    addAdminNotification, 
    currentUser,
    setCurrentPage,
    hasUnderstoodTerms,
    openLegalModal
  } = useApp();

  const [studentName, setStudentName] = useState(currentUser?.name || '');
  const [studentEmail, setStudentEmail] = useState(currentUser?.email || '');
  const [learningMode, setLearningMode] = useState('Self-Paced + Live Mentorship');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (hasUnderstoodTerms) {
      setTermsAgreed(true);
      setTermsError('');
    }
  }, [hasUnderstoodTerms]);

  useEffect(() => {
    if (currentUser) {
      setStudentName(currentUser.name || '');
      setStudentEmail(currentUser.email || '');
    }
  }, [currentUser, activeModal]);

  if ((activeModal !== 'enroll' && activeModal !== 'enroll-confirmation') || !modalData) return null;

  const course = modalData;

  const validate = (name, email) => {
    const errs = {};
    if (!name.trim()) {
      errs.name = 'Student Full Name is required';
    } else if (name.trim().length < 3) {
      errs.name = 'Full Name must be at least 3 characters long';
    }
    if (!email.trim()) {
      errs.email = 'Student Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    return errs;
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    const currentName = studentName || currentUser?.name || 'Student';
    const currentEmail = studentEmail || currentUser?.email || 'student@nexusacademy.edu';

    const errs = validate(currentName, currentEmail);
    setErrors(errs);
    setTouched({ name: true, email: true });

    if (Object.keys(errs).length > 0) {
      showToast(Object.values(errs)[0], 'warning');
      return;
    }

    if (!termsAgreed) {
      setTermsError('You must read and agree to the Terms & Conditions before confirming enrollment.');
      showToast('Please read and agree to the Terms & Conditions.', 'warning');
      openLegalModal('terms', () => {
        setTermsAgreed(true);
        setTermsError('');
      });
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
      enrollInCourse(course.id);
      addAdminNotification({
        type: 'enrollment',
        title: `New Course Enrollment: ${course.title}`,
        applicant: currentName,
        email: currentEmail,
        subject: course.title,
        details: `Student confirmed enrollment in ${course.title} with track: ${learningMode}`,
        timestamp: 'Just now'
      });
    }, 600);
  };

  const resetAndClose = () => {
    setCompleted(false);
    setErrors({});
    setTouched({});
    closeModal();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-xl">
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Course Enrollment Confirmation
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="modal-body">
          
          {completed ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Enrollment Confirmed!
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Congratulations <strong>{studentName || currentUser?.name}</strong>! You now have full access to <strong>{course.title}</strong>. This course has been added to your <strong>My Enrolled Courses</strong>!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    resetAndClose();
                    setCurrentPage('courses');
                  }}
                  className="btn-primary px-6 py-2.5 cursor-pointer text-xs font-bold"
                >
                  View My Enrolled Courses
                </button>
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  Continue Learning
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Course Brief */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {course.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {course.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Instructor: {course.instructor.name} • {course.duration} • {course.level}
                  </p>
                </div>
              </div>

              {/* Logged in student banner */}
              {currentUser && (
                <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white">Enrolling as: </span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">{currentUser.name}</span>
                      <span className="text-[10px] text-slate-400 ml-1">({currentUser.email})</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    Verified Student
                  </span>
                </div>
              )}

              {/* Instant Enrollment Badge */}
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-extrabold">Instant Free Enrollment:</span> Course access is provided immediately upon confirmation.
                </div>
              </div>

              {/* Student Details & Confirmation Form */}
              <form onSubmit={handleEnrollSubmit} noValidate className="space-y-4">
                <div className="space-y-1.5">
                  <label className="field-label flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" /> 
                    <span>Student Full Name</span>
                    <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => {
                      setStudentName(e.target.value);
                      if (touched.name) setErrors(validate(e.target.value, studentEmail));
                    }}
                    onBlur={() => {
                      setTouched({ ...touched, name: true });
                      setErrors(validate(studentName, studentEmail));
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`input-field ${
                      touched.name && errors.name 
                        ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                        : ''
                    }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="field-label flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> 
                    <span>Student Email Address</span>
                    <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => {
                      setStudentEmail(e.target.value);
                      if (touched.email) setErrors(validate(studentName, e.target.value));
                    }}
                    onBlur={() => {
                      setTouched({ ...touched, email: true });
                      setErrors(validate(studentName, studentEmail));
                    }}
                    placeholder="e.g. student@nexusacademy.edu"
                    className={`input-field ${
                      touched.email && errors.email 
                        ? 'border-red-500 ring-1 ring-red-400 focus:border-red-500' 
                        : ''
                    }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1 font-semibold">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="field-label flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" /> Preferred Learning Track
                  </label>
                  <select
                    value={learningMode}
                    onChange={(e) => setLearningMode(e.target.value)}
                    className="input-field"
                  >
                    <option value="Self-Paced + Live Mentorship">Self-Paced + Live Mentorship</option>
                    <option value="Weekend Intensive Cohort">Weekend Intensive Cohort</option>
                    <option value="Full-Time Accelerated Boot Camp">Full-Time Accelerated Boot Camp</option>
                  </select>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="pt-1">
                  <TermsCheckbox
                    id="enrollment-terms-agreement"
                    checked={termsAgreed}
                    hasUnderstood={hasUnderstoodTerms}
                    onChange={(val) => {
                      setTermsAgreed(val);
                      if (val) setTermsError('');
                    }}
                    error={termsError}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={isProcessing}
                    className="h-11 sm:h-12 btn-secondary w-full flex items-center justify-center cursor-pointer font-bold text-xs sm:text-sm rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="h-11 sm:h-12 btn-primary w-full flex items-center justify-center gap-2 cursor-pointer font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30"
                  >
                    {isProcessing ? (
                      'Enrolling...'
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Confirm Enrollment
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
}
