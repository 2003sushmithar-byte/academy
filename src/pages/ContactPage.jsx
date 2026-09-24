import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Navigation, ExternalLink } from 'lucide-react';
import TermsCheckbox from '../components/common/TermsCheckbox';

export default function ContactPage() {
  const { showToast, addAdminNotification, hasUnderstoodTerms, openLegalModal } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sync when terms are understood
  React.useEffect(() => {
    if (hasUnderstoodTerms) {
      setTermsAgreed(true);
      setTermsError('');
    }
  }, [hasUnderstoodTerms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields.', 'warning');
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
      title: `New Inquiry: ${formData.subject || 'Admissions Counseling'}`,
      applicant: formData.name,
      email: formData.email,
      subject: formData.subject || 'General Tech Inquiry',
      details: formData.message,
      timestamp: 'Just now'
    });
    showToast('Your message has been sent to Admissions!', 'success');
  };

  return (
    <div className="section-container py-12 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">
          CONTACT ADMISSIONS
        </span>
        <h1 className="section-title text-3xl sm:text-4xl text-slate-950 font-black">
          We Are Here to Assist Your Tech Journey
        </h1>
        <p className="text-sm font-semibold text-slate-700">
          Have questions regarding bootcamps, faculty mentorship, or cohort registration? Speak with our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Enlarged Black Information Box with Location & Map (lg:col-span-7) */}
        <div className="lg:col-span-7 p-7 sm:p-9 bg-slate-900 text-slate-200 rounded-3xl space-y-6 shadow-xl border border-slate-800 flex flex-col justify-between h-full">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">Main Headquarters</span>
              <h3 className="text-2xl font-black text-white mt-0.5">Innovation Campus</h3>
            </div>
            <span className="px-3 py-1 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold rounded-full flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> Open for Campus Visits
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm">Campus Location</p>
                <p className="text-slate-300 font-medium text-xs mt-0.5">750 Technology Boulevard, Innovation Park, NY 10001</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm">Admissions Line</p>
                <p className="text-slate-300 font-medium text-xs mt-0.5">+1 (800) 555-NEXUS</p>
                <p className="text-slate-300 font-medium text-xs">+1 (212) 987-6543</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm">Email Advisory</p>
                <p className="text-slate-300 font-medium text-xs mt-0.5">admissions@nexusacademy.edu</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="font-extrabold text-white text-sm">Visiting Hours</p>
                <p className="text-slate-300 font-medium text-xs mt-0.5">Mon–Fri: 8:00 AM – 7:00 PM</p>
                <p className="text-slate-300 font-medium text-xs">Sat: 9:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>

          {/* Interactive Google Map of Innovation Campus */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5 text-sm">
                <Navigation className="w-4 h-4 text-indigo-400" /> Campus Map & Directions
              </span>
              <a 
                href="https://maps.google.com/?q=Innovation+Park+NY+10001" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-bold"
              >
                <span>Full Screen View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-700/80 shadow-inner relative group">
              <iframe
                title="Nexus Innovation Campus Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528000654!2d-74.14483842630043!3d40.69763123333334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[25%] contrast-115 group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/80 text-xs text-white flex items-center gap-2 pointer-events-none shadow-lg">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="font-bold">Innovation Campus &bull; Tech Park, NY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card - Stretched to exact same height (lg:col-span-5) */}
        <div className="lg:col-span-5 p-7 sm:p-8 bg-white rounded-3xl border border-slate-200/90 shadow-md flex flex-col justify-between h-full">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-black text-slate-950">Send an Inquiry</h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">Our academic counselors respond within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4 flex-1 flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-slate-950">Message Delivered!</h3>
              <p className="text-sm font-semibold text-slate-600 max-w-xs">
                Thank you for reaching out. An academic representative will get in touch with you shortly.
              </p>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                className="btn-secondary text-xs px-5 py-2.5 mt-2 font-bold cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-4 pt-4">
              <div className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <label className="block text-sm font-black text-slate-950">
                    Your Name <span className="text-rose-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alexander Wright"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field px-4 py-2.5 text-sm font-medium text-slate-900 border border-slate-300 rounded-xl w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-black text-slate-950">
                    Your Email <span className="text-rose-500 font-bold ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alexander@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field px-4 py-2.5 text-sm font-medium text-slate-900 border border-slate-300 rounded-xl w-full"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-black text-slate-950">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Course Schedule or Prerequisites"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field px-4 py-2.5 text-sm font-medium text-slate-900 border border-slate-300 rounded-xl w-full"
                  />
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <label className="block text-sm font-black text-slate-950">
                    How can we help you? <span className="text-rose-500 font-bold ml-0.5">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write your inquiry or question here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="textarea-field p-3.5 text-sm font-medium text-slate-900 border border-slate-300 rounded-xl w-full flex-1 resize-none"
                  />
                </div>
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="pt-2">
                <TermsCheckbox
                  id="contact-terms-agreement"
                  checked={termsAgreed}
                  hasUnderstood={hasUnderstoodTerms}
                  onChange={(val) => {
                    setTermsAgreed(val);
                    if (val) setTermsError('');
                  }}
                  error={termsError}
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5 mt-3 pt-1">
                <button
                  type="button"
                  onClick={() => setFormData({ name: '', email: '', subject: '', message: '' })}
                  className="h-12 w-full rounded-2xl border border-indigo-200/90 bg-indigo-50/90 hover:bg-indigo-100 text-indigo-700 font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer shadow-xs"
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
  );
}
