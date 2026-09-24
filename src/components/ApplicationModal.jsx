import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2, User, Mail, GraduationCap, Phone, Briefcase, MapPin, Globe } from 'lucide-react';
import { COURSES } from '../data/mockData';
import TermsCheckbox from './common/TermsCheckbox';

export default function ApplicationModal() {
  const { activeModal, modalData, closeModal, showToast, addAdminNotification, hasUnderstoodTerms, openLegalModal } = useApp();
  const isCareer = activeModal === 'career-application';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    courseId: COURSES[0].id,
    educationLevel: 'Undergraduate',
    experience: '',
    statement: ''
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hasUnderstoodTerms) {
      setTermsAgreed(true);
      setTermsError('');
    }
  }, [hasUnderstoodTerms]);

  if (activeModal !== 'application' && activeModal !== 'career-application') return null;

  const job = isCareer ? modalData : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      showToast('Please complete all required fields.', 'warning');
      return;
    }

    if (!termsAgreed) {
      setTermsError('You must read and agree to the Terms & Conditions before submitting.');
      showToast('Please read and agree to the Terms & Conditions.', 'warning');
      openLegalModal('terms', () => {
        setTermsAgreed(true);
        setTermsError('');
      });
      return;
    }

    if (isCareer) {
      const jobTitle = job?.title || 'Open Faculty / Staff Position';
      const jobDept = job?.department || 'Academics';
      addAdminNotification({
        type: 'career',
        title: `New Career Application: ${jobTitle}`,
        applicant: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: jobTitle,
        department: jobDept,
        details: `Applied for ${jobTitle} (${jobDept}, ${job?.location || 'Campus'}). Experience/Portfolio: ${formData.experience || 'Not specified'}. Cover Note: ${formData.statement || 'Resume submitted'}`,
        timestamp: 'Just now'
      });
      showToast(`Career application for "${jobTitle}" submitted to Admin!`, 'success');
    } else {
      const selectedCourse = COURSES.find(c => c.id === formData.courseId) || COURSES[0];
      addAdminNotification({
        type: 'admission',
        title: `New Admission Application: ${selectedCourse.title}`,
        applicant: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: selectedCourse.title,
        details: `Applied for ${selectedCourse.title}. Highest Education: ${formData.educationLevel}. Goals: ${formData.statement || 'Standard enrollment application'}`,
        timestamp: 'Just now'
      });
      showToast('Admission Application submitted successfully!', 'success');
    }

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      courseId: COURSES[0].id,
      educationLevel: 'Undergraduate',
      experience: '',
      statement: ''
    });
    closeModal();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-xl">
        
        {/* Header */}
        <div className="modal-header">
          <div className="flex items-center gap-2">
            {isCareer ? (
              <Briefcase className="w-5 h-5 text-purple-600" />
            ) : (
              <GraduationCap className="w-5 h-5 text-indigo-600" />
            )}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isCareer ? `Nexus Career Application — ${job?.title || 'Job Opening'}` : 'Nexus Academy — Student Admission Application'}
              </h3>
              {isCareer && job && (
                <p className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span className="font-semibold text-purple-600">{job.department}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location} ({job.type})</span>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {isCareer ? 'Application Submitted to Admin!' : 'Application Received!'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. {isCareer ? 'Our academic hiring panel has been notified and will review your profile shortly.' : 'Our admissions counselor will review your application and contact you within 24 hours.'}
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-[11px] text-purple-700 dark:text-purple-300 max-w-sm mx-auto font-medium">
                🔔 A real-time notification has been dispatched to the Administrator Console.
              </div>
              <button
                onClick={handleReset}
                className="btn-primary px-6 py-2.5 shadow-none cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="field-label">
                    Full Name <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input-field pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="field-label">
                    Email Address <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field pl-9"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="field-label">
                    Phone Number <span className="text-red-500 font-bold ml-0.5">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-field pl-9"
                    />
                  </div>
                </div>

                {isCareer ? (
                  <div className="space-y-1">
                    <label className="field-label">
                      Years of Experience / Portfolio
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. 5+ Years, github.com/username"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="input-field pl-9"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="field-label">
                      Target Program <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={formData.courseId}
                        onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                        className="select-field pl-9"
                      >
                        {COURSES.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="field-label">
                  {isCareer ? 'Cover Note / Why join Nexus Academy?' : 'Statement of Purpose / Career Goals'}
                </label>
                <textarea
                  rows={3}
                  placeholder={isCareer ? 'Tell us about your background, pedagogical style, and technical passion...' : 'Briefly describe your career objectives and why you wish to join...'}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  className="textarea-field"
                />
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="pt-1">
                <TermsCheckbox
                  id="application-terms-agreement"
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
                  className="h-11 sm:h-12 btn-secondary w-full text-xs sm:text-sm font-bold cursor-pointer flex items-center justify-center rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 sm:h-12 btn-primary w-full text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center rounded-xl"
                >
                  {isCareer ? 'Submit Application' : 'Submit Application'}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
