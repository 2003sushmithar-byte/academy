import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import TermsCheckbox from '../common/TermsCheckbox';

export function ContactInfo() {
  const { showToast, addAdminNotification, hasUnderstoodTerms, openLegalModal } = useApp();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', course: 'Full Stack Web Bootcamp', message: '' });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (hasUnderstoodTerms) {
      setTermsAgreed(true);
      setTermsError('');
    }
  }, [hasUnderstoodTerms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Please provide your name and email.', 'warning');
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

    setSubmitted(true);
    addAdminNotification({
      type: 'inquiry',
      title: `Admission Inquiry: ${formData.course}`,
      applicant: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.course,
      details: formData.message || `Inquiry regarding ${formData.course}`,
      timestamp: 'Just now'
    });
    showToast('Inquiry submitted to Admissions!', 'success');
  };
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-blue-600 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Have Questions? Contact Our Admissions Team
          </h2>
          <p className="text-slate-600 text-base">
            Visit our campus or send us a message. We're here to help guide your education journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Main Campus Address</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Academy Knowledge Park, 500 Tech Innovation Way, Suite 400, Silicon Valley, CA 94025
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Toll-Free Helpline</h4>
                <p className="text-slate-600 text-sm">+1 (800) 123-4567 / +1 (800) 987-6543</p>
                <p className="text-xs text-slate-400 mt-1">Mon - Sat: 9:00 AM - 7:00 PM EST</p>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base mb-1">Email Support</h4>
                <p className="text-slate-600 text-sm">admissions@academy.edu</p>
                <p className="text-slate-600 text-sm">careers@academy.edu</p>
              </div>
            </div>

          </div>

          {/* Right Quick Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-blue-400" />
              Send Us a Quick Message
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Fill out the form below and an admissions counselor will reach out within 2 hours.
            </p>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Thank you! An academic counselor will contact you at {formData.email} within 2 hours.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setFormData({ name: '', phone: '', email: '', course: 'Full Stack Web Bootcamp', message: '' }); }}
                  className="text-xs font-bold text-indigo-400 hover:underline pt-2 cursor-pointer"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Interested Course</label>
                    <select
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Full Stack Web Bootcamp</option>
                      <option>Data Science & AI</option>
                      <option>AWS Cloud Solutions</option>
                      <option>UI/UX Design Masterclass</option>
                      <option>Other Enquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Your Message</label>
                  <textarea
                    rows="3"
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                {/* Terms and Conditions Checkbox */}
                <div className="pt-1">
                  <TermsCheckbox
                    id="home-contact-terms"
                    checked={termsAgreed}
                    hasUnderstood={hasUnderstoodTerms}
                    onChange={(val) => {
                      setTermsAgreed(val);
                      if (val) setTermsError('');
                    }}
                    error={termsError}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ name: '', phone: '', email: '', course: 'Full Stack Web Bootcamp', message: '' })}
                    className="h-12 w-full rounded-2xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-xs"
                  >
                    <span>Cancel</span>
                  </button>
                  <button
                    type="submit"
                    className="h-12 w-full rounded-2xl border border-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-md shadow-indigo-600/25"
                  >
                    <span>Send</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
