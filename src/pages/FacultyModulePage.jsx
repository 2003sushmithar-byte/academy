import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FACULTY, UPCOMING_BATCHES, COURSES } from '../data/mockData';
import {
  GraduationCap, BookOpen, Users, Calendar, CheckCircle2, Clock,
  FileText, MessageSquare, DollarSign, Video, Send, User,
  Star, Plus, Edit3, ShieldCheck, XCircle, Award, BarChart2,
  Layers, ClipboardList, Activity, Settings, ChevronDown, ChevronUp,
  Mail, Phone, Lock, Unlock, Eye, TrendingUp, Search, Filter,
  UserPlus, AlertCircle, CheckSquare
} from 'lucide-react';

// ─── Mock Data ──────────────────────────────────────────────────────────────

const MOCK_STUDENTS = [
  { id: 'std-1', name: 'Alexander Wright', email: 'alex.w@academy.edu', mobile: '9876543210', batch: 'Cohort Oct 2026', course: 'Full-Stack Web Development', progress: 85, attendance: 92 },
  { id: 'std-2', name: 'Beatrix Vance', email: 'beatrix.v@academy.edu', mobile: '9876543211', batch: 'Cohort Oct 2026', course: 'Full-Stack Web Development', progress: 92, attendance: 97 },
  { id: 'std-3', name: 'Carlos Mendez', email: 'carlos.m@academy.edu', mobile: '9876543212', batch: 'Cohort Oct 2026', course: 'Applied AI & ML', progress: 78, attendance: 88 },
  { id: 'std-4', name: 'Diana Prince', email: 'diana.p@academy.edu', mobile: '9876543213', batch: 'Cohort Nov 2026', course: 'Data Science Bootcamp', progress: 96, attendance: 99 },
  { id: 'std-5', name: 'Ethan Hunt', email: 'ethan.h@academy.edu', mobile: '9876543214', batch: 'Cohort Nov 2026', course: 'Cybersecurity', progress: 88, attendance: 85 },
];

const MOCK_SUBMISSIONS = [
  { id: 'sub-1', student: 'Alexander Wright', title: 'React E-Commerce Cart Project', submitted: 'Oct 18, 2026', type: 'Assignment', grade: '95/100', status: 'Graded' },
  { id: 'sub-2', student: 'Beatrix Vance', title: 'REST API Backend Architecture', submitted: 'Oct 19, 2026', type: 'Assignment', grade: '', status: 'Pending' },
  { id: 'sub-3', student: 'Carlos Mendez', title: 'Mid-Term Examination — Module 3', submitted: 'Oct 20, 2026', type: 'Exam', grade: '72/100', status: 'Graded' },
  { id: 'sub-4', student: 'Diana Prince', title: 'PyTorch Model Training Notebook', submitted: 'Oct 21, 2026', type: 'Assignment', grade: '', status: 'Pending' },
];

const EARNINGS_DATA = [
  { label: 'Full-Stack Web Development', hours: '40 Hrs', amount: 48000 },
  { label: '1-on-1 Code Mentorship & Grading', hours: '25 Hrs', amount: 25000 },
  { label: 'Weekend Masterclass Bonus', hours: 'Bonus', amount: 11500 },
];

const RESULTS_DATA = [
  { student: 'Alexander Wright', midterm: 88, endterm: 92, assignment: 95, total: 91.5, grade: 'A+' },
  { student: 'Beatrix Vance', midterm: 91, endterm: 89, assignment: 95, total: 91.7, grade: 'A+' },
  { student: 'Carlos Mendez', midterm: 72, endterm: 75, assignment: 80, total: 75.3, grade: 'B' },
  { student: 'Diana Prince', midterm: 96, endterm: 98, assignment: 100, total: 98.0, grade: 'A+' },
  { student: 'Ethan Hunt', midterm: 85, endterm: 87, assignment: 88, total: 86.7, grade: 'A' },
];

// ─── Faculty Dashboard Panel ─────────────────────────────────────────────────

function FacultyDashboard({ faculty }) {
  const { showToast } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [attendanceMap, setAttendanceMap] = useState(
    Object.fromEntries(MOCK_STUDENTS.map(s => [s.id, 'Present']))
  );
  const [announcement, setAnnouncement] = useState('');
  const [announcements, setAnnouncements] = useState([
    { id: 1, date: 'Today, 10:30 AM', text: 'Module 2 Assignment Deadline Extended by 2 Days', batch: 'Cohort Oct 2026' },
    { id: 2, date: 'Yesterday, 2:15 PM', text: 'Live Q&A Recording Uploaded to Student Portal', batch: 'All Batches' },
  ]);
  const [gradeInput, setGradeInput] = useState({});

  const assignedBatches = UPCOMING_BATCHES.filter(b => b.instructor === faculty.name);
  const assignedCourses = COURSES.filter(c => c.instructor.name === faculty.name);

  const totalEarnings = EARNINGS_DATA.reduce((s, e) => s + e.amount, 0);

  const tabs = [
    { id: 'overview', label: 'Courses & Batches', icon: BookOpen },
    { id: 'classes', label: "Today's Classes", icon: Calendar },
    { id: 'students', label: 'Students & Attendance', icon: Users },
    { id: 'assignments', label: 'Assignments & Exams', icon: FileText },
    { id: 'results', label: 'Results', icon: BarChart2 },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
  ];

  const toggleAttendance = id => {
    setAttendanceMap(prev => {
      const next = prev[id] === 'Present' ? 'On Leave' : 'Present';
      showToast(`Marked ${MOCK_STUDENTS.find(s => s.id === id)?.name} as ${next}`, 'info');
      return { ...prev, [id]: next };
    });
  };

  const postAnnouncement = e => {
    e.preventDefault();
    if (!announcement.trim()) return;
    setAnnouncements([{ id: Date.now(), date: 'Just now', text: announcement, batch: 'All Assigned Batches' }, ...announcements]);
    setAnnouncement('');
    showToast('Announcement posted to all assigned student portals!', 'success');
  };

  const submitGrade = (subId, student) => {
    const val = gradeInput[subId];
    if (!val) { showToast('Enter a grade value first', 'warning'); return; }
    showToast(`Graded ${student} — ${val}`, 'success');
    setGradeInput(prev => ({ ...prev, [subId]: '' }));
  };

  return (
    <div className="space-y-0">
      {/* Profile Bar */}
      <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white px-6 py-5 rounded-2xl mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={faculty.avatar} alt={faculty.name} className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30 shadow-lg" />
          <div>
            <h2 className="text-xl font-extrabold">{faculty.name}</h2>
            <p className="text-indigo-200 text-sm font-semibold">{faculty.role}</p>
            <p className="text-indigo-300 text-xs mt-0.5">{faculty.specialization}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Courses', value: assignedCourses.length || 1, color: 'bg-white/20' },
            { label: 'Batches', value: assignedBatches.length || 2, color: 'bg-white/20' },
            { label: 'Students', value: 145, color: 'bg-white/20' },
            { label: 'Rating', value: `⭐ ${faculty.rating}`, color: 'bg-amber-400/30' },
          ].map(s => (
            <div key={s.label} className={`${s.color} rounded-xl px-4 py-2 text-center`}>
              <p className="text-xs text-indigo-100 font-semibold">{s.label}</p>
              <p className="text-lg font-black text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-2 gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shrink-0 ${
                active ? 'border-indigo-600 text-indigo-600 bg-indigo-50/60' : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div className="bg-slate-50 rounded-b-2xl p-6 space-y-5 border border-t-0 border-slate-200 min-h-[340px]">

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" /> Assigned Courses ({assignedCourses.length || 1})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(assignedCourses.length > 0 ? assignedCourses : [COURSES[0]]).map(c => (
                  <div key={c.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 bg-slate-50 hover:bg-indigo-50/40 transition-colors">
                    <img src={c.thumbnail} alt={c.title} className="w-20 h-14 rounded-lg object-cover shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded">{c.category}</span>
                      <p className="text-xs font-bold text-slate-900 mt-1 line-clamp-1">{c.title}</p>
                      <p className="text-[11px] text-slate-500">{c.duration} • {c.level}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-600" /> Assigned Batches ({assignedBatches.length || 2})
              </h4>
              <div className="space-y-2">
                {(assignedBatches.length > 0 ? assignedBatches : UPCOMING_BATCHES.slice(0, 2)).map(b => (
                  <div key={b.id} className="p-3 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-900">{b.courseTitle}</p>
                      <p className="text-[11px] text-slate-500">{b.schedule} • {b.mode} • Starts {b.startDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {b.totalSeats - b.availableSeats}/{b.totalSeats} seats
                      </span>
                      <button onClick={() => showToast(`Opening batch ${b.id} portal…`, 'info')}
                        className="px-3 py-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg">
                        Manage
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: CLASSES */}
        {activeTab === 'classes' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Today's Live Classes
                <span className="ml-auto text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">2 Scheduled</span>
              </h4>
              <div className="space-y-3">
                <div className="p-4 rounded-xl border-2 border-indigo-500/30 bg-indigo-50/40 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded uppercase">Starting Soon</span>
                    <p className="text-sm font-extrabold text-slate-900 mt-1">Module 3: React State Management & Hooks</p>
                    <p className="text-[11px] text-slate-600">Full-Stack Masterclass • 6:00 PM – 8:30 PM IST</p>
                  </div>
                  <button onClick={() => showToast('Launching live class session…', 'success')}
                    className="px-5 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-2">
                    <Video className="w-4 h-4" /> Start Class
                  </button>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded uppercase">Upcoming</span>
                    <p className="text-sm font-bold text-slate-900 mt-1">Module 1: Deep Learning Architectures</p>
                    <p className="text-[11px] text-slate-600">AI Specialization • Tomorrow 7:00 PM IST</p>
                  </div>
                  <button onClick={() => showToast('Class link active 15 mins prior', 'info')}
                    className="px-4 py-2 text-[11px] font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl">
                    View Outline
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: STUDENTS & ATTENDANCE */}
        {activeTab === 'students' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-extrabold text-slate-900">Student Roster & Attendance</h4>
              <button onClick={() => showToast('Attendance saved to LMS!', 'success')}
                className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl">
                Save Attendance
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Student</th>
                    <th className="px-4 py-3">Batch / Course</th>
                    <th className="px-4 py-3">Progress</th>
                    <th className="px-4 py-3">Attendance %</th>
                    <th className="px-4 py-3 text-right rounded-r-xl">Today</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {MOCK_STUDENTS.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-bold text-slate-900">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-[11px]">
                            {s.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold">{s.name}</p>
                            <p className="text-[10px] text-slate-400">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <p className="font-semibold">{s.batch}</p>
                        <p className="text-[10px] text-slate-400">{s.course}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-1.5 min-w-[60px]">
                            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: `${s.progress}%` }} />
                          </div>
                          <span className="font-bold text-indigo-600">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-bold text-emerald-600">{s.attendance}%</td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => toggleAttendance(s.id)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                            attendanceMap[s.id] === 'Present'
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                              : 'bg-rose-100 text-rose-700 border border-rose-300'
                          }`}
                        >
                          {attendanceMap[s.id] === 'Present' ? '✓ Present' : '✗ On Leave'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: ASSIGNMENTS & EXAMS */}
        {activeTab === 'assignments' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 mb-4">Submissions — Assignments & Exams</h4>
              <div className="space-y-3">
                {MOCK_SUBMISSIONS.map(sub => (
                  <div key={sub.id} className="p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${sub.type === 'Exam' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {sub.type}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${sub.status === 'Graded' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">{sub.title}</p>
                      <p className="text-[11px] text-slate-500">By <strong>{sub.student}</strong> • {sub.submitted}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {sub.grade && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                          {sub.grade}
                        </span>
                      )}
                      {sub.status === 'Pending' && (
                        <div className="flex items-center gap-1">
                          <input
                            type="text"
                            placeholder="Score"
                            value={gradeInput[sub.id] || ''}
                            onChange={e => setGradeInput(prev => ({ ...prev, [sub.id]: e.target.value }))}
                            className="w-20 border border-slate-300 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-indigo-500"
                          />
                          <button onClick={() => submitGrade(sub.id, sub.student)}
                            className="px-3 py-1 text-[11px] font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg">
                            Grade
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: RESULTS */}
        {activeTab === 'results' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-extrabold text-slate-900">Student Results & Grade Sheet</h4>
              <button onClick={() => showToast('Results published to student portals!', 'success')}
                className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl">
                Publish Results
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-slate-700">
                <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] font-extrabold">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Student</th>
                    <th className="px-4 py-3 text-center">Mid-Term</th>
                    <th className="px-4 py-3 text-center">End-Term</th>
                    <th className="px-4 py-3 text-center">Assignments</th>
                    <th className="px-4 py-3 text-center">Total %</th>
                    <th className="px-4 py-3 text-center rounded-r-xl">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RESULTS_DATA.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-bold text-slate-900">{r.student}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">{r.midterm}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">{r.endterm}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">{r.assignment}</td>
                      <td className="px-4 py-3 text-center font-extrabold text-indigo-600">{r.total.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                          r.grade === 'A+' ? 'bg-emerald-100 text-emerald-700' :
                          r.grade === 'A' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                        }`}>{r.grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 mb-4">Broadcast Announcement to Students</h4>
              <form onSubmit={postAnnouncement} className="space-y-3">
                <textarea
                  rows={3}
                  placeholder="Write an announcement for your assigned batches…"
                  value={announcement}
                  onChange={e => setAnnouncement(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                />
                <button type="submit" className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-2">
                  <Send className="w-4 h-4" /> Post Announcement
                </button>
              </form>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="text-sm font-extrabold text-slate-900 mb-3">Recent Announcements</h4>
              <div className="space-y-2">
                {announcements.map(a => (
                  <div key={a.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50/60">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="font-bold text-indigo-600">{a.batch}</span>
                      <span className="text-slate-400">{a.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">Earnings & Honorarium</h4>
                <p className="text-[11px] text-slate-500">October 2026 Cycle</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-emerald-600">₹{totalEarnings.toLocaleString()}</p>
                <p className="text-[11px] text-slate-400">Net Payout</p>
              </div>
            </div>
            <div className="space-y-3">
              {EARNINGS_DATA.map((e, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{e.label}</p>
                    <p className="text-[11px] text-slate-500">{e.hours}</p>
                  </div>
                  <span className="text-sm font-extrabold text-emerald-700">₹{e.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <button onClick={() => showToast('Payout request submitted!', 'success')}
              className="w-full py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl">
              Request Payout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Admin Faculty Management Panel ─────────────────────────────────────────

function AdminFacultyPanel() {
  const { showToast } = useApp();
  const [facultyList, setFacultyList] = useState(
    FACULTY.map((f, i) => ({ ...f, status: i < 3 ? 'Active' : 'Inactive', email: `${f.name.split(' ')[0].toLowerCase()}@academy.edu`, phone: `98765432${10 + i}` }))
  );
  const [showForm, setShowForm] = useState(false);
  const [viewPerformance, setViewPerformance] = useState(null);
  const [searchQ, setSearchQ] = useState('');
  const [newFaculty, setNewFaculty] = useState({ name: '', role: 'Instructor', specialization: '', experience: '5+ Years', email: '', phone: '' });

  const filtered = facultyList.filter(f =>
    f.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    f.specialization.toLowerCase().includes(searchQ.toLowerCase())
  );

  const toggleStatus = id => {
    setFacultyList(prev => prev.map(f => {
      if (f.id !== id) return f;
      const next = f.status === 'Active' ? 'Inactive' : 'Active';
      showToast(`${f.name} set to ${next}`, next === 'Active' ? 'success' : 'warning');
      return { ...f, status: next };
    }));
  };

  const handleAdd = e => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.specialization) { showToast('Name & Specialization are required', 'warning'); return; }
    const created = {
      id: Date.now(),
      name: newFaculty.name,
      role: newFaculty.role,
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80',
      experience: newFaculty.experience,
      specialization: newFaculty.specialization,
      rating: 4.90,
      bio: 'New faculty member.',
      coursesTaught: [],
      status: 'Active',
      email: newFaculty.email,
      phone: newFaculty.phone,
    };
    setFacultyList([created, ...facultyList]);
    setNewFaculty({ name: '', role: 'Instructor', specialization: '', experience: '5+ Years', email: '', phone: '' });
    setShowForm(false);
    showToast(`Faculty "${created.name}" added successfully!`, 'success');
  };

  const assignCourse = (f) => showToast(`Course assignment panel opened for ${f.name}`, 'info');
  const assignBatch = (f) => showToast(`Batch assignment panel opened for ${f.name}`, 'info');
  const assignSubject = (f) => showToast(`Subject assignment panel opened for ${f.name}`, 'info');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" /> Faculty Management — Admin Panel
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Total: <strong className="text-slate-800">{facultyList.length}</strong> &nbsp;|&nbsp;
              Active: <strong className="text-emerald-600">{facultyList.filter(f => f.status === 'Active').length}</strong> &nbsp;|&nbsp;
              Inactive: <strong className="text-rose-600">{facultyList.filter(f => f.status === 'Inactive').length}</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search instructors…"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                className="pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 w-52"
              />
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" /> {showForm ? 'Cancel' : 'Add Instructor'}
            </button>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl border-2 border-indigo-500/40 shadow-md">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 mb-4">
            <UserPlus className="w-5 h-5 text-indigo-600" /> Add New Faculty Member
          </h4>
          <form onSubmit={handleAdd}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { label: 'Full Name *', key: 'name', placeholder: 'Dr. Alan Turing' },
                { label: 'Role / Title', key: 'role', placeholder: 'Senior Instructor' },
                { label: 'Specialization *', key: 'specialization', placeholder: 'Data Science, Machine Learning' },
                { label: 'Years of Experience', key: 'experience', placeholder: '10+ Years' },
                { label: 'Email', key: 'email', placeholder: 'instructor@academy.edu' },
                { label: 'Phone', key: 'phone', placeholder: '9876543210' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={newFaculty[f.key]}
                    onChange={e => setNewFaculty(prev => ({ ...prev, [f.key]: e.target.value }))}
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}
            </div>
            <button type="submit" className="px-6 py-2.5 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl">
              Save & Add Faculty
            </button>
          </form>
        </div>
      )}

      {/* Faculty Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 text-slate-800 uppercase text-[11px] font-extrabold">
              <tr>
                <th className="px-5 py-3 rounded-l-xl">Instructor</th>
                <th className="px-5 py-3">Specialization</th>
                <th className="px-5 py-3">Experience</th>
                <th className="px-5 py-3 text-center">Rating</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right rounded-r-xl">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-100 shrink-0" />
                      <div>
                        <p className="font-extrabold text-slate-900">{f.name}</p>
                        <p className="text-[10px] text-slate-500">{f.role}</p>
                        {f.email && <p className="text-[10px] text-slate-400">{f.email}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-700 max-w-[160px]">{f.specialization}</td>
                  <td className="px-5 py-4 font-semibold">{f.experience}</td>
                  <td className="px-5 py-4 text-center font-bold text-amber-600">
                    <span className="flex items-center gap-1 justify-center">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {f.rating}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      f.status === 'Active' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-rose-100 text-rose-700 border border-rose-300'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5 flex-wrap">
                      <button onClick={() => assignCourse(f)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200">
                        Courses
                      </button>
                      <button onClick={() => assignBatch(f)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200">
                        Batches
                      </button>
                      <button onClick={() => assignSubject(f)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200">
                        Subjects
                      </button>
                      <button onClick={() => setViewPerformance(viewPerformance?.id === f.id ? null : f)} className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-teal-600 bg-teal-50 hover:bg-teal-100 border border-teal-200">
                        Performance
                      </button>
                      <button onClick={() => toggleStatus(f.id)} className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                        f.status === 'Active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                      }`}>
                        {f.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                    {/* Inline Performance View */}
                    {viewPerformance?.id === f.id && (
                      <div className="mt-3 text-left bg-teal-50 border border-teal-200 rounded-xl p-3 space-y-1">
                        <p className="text-[11px] font-extrabold text-teal-800 mb-2">📊 Performance Overview</p>
                        {[
                          { label: 'Avg Student Rating', value: `${f.rating} / 5.0` },
                          { label: 'Courses Taught', value: f.coursesTaught?.length || 2 },
                          { label: 'Student Satisfaction', value: '94%' },
                          { label: 'Assignment Graded', value: '48 / 52' },
                          { label: 'Attendance Rate', value: '97%' },
                        ].map(p => (
                          <div key={p.label} className="flex justify-between text-[11px]">
                            <span className="text-teal-700 font-semibold">{p.label}</span>
                            <span className="font-extrabold text-teal-900">{p.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-10 text-center text-slate-400 text-sm">No instructors match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Faculty Module Page ─────────────────────────────────────────────────

export default function FacultyModulePage() {
  const { openModal } = useApp();
  const [activeSection, setActiveSection] = useState('directory'); // 'directory' | 'dashboard' | 'admin'
  const [selectedFacultyId, setSelectedFacultyId] = useState(1);

  const selectedFaculty = FACULTY.find(f => f.id === selectedFacultyId) || FACULTY[0];

  const sections = [
    { id: 'directory', label: 'Faculty Directory', icon: Users },
    { id: 'dashboard', label: 'Faculty Dashboard', icon: GraduationCap },
    { id: 'admin', label: 'Admin Management', icon: Settings },
  ];

  return (
    <div className="section-container py-12 space-y-10">

      {/* Page Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="section-subtitle">FACULTY / TRAINER MODULE</span>
        <h1 className="section-title text-3xl sm:text-4xl">Faculty & Trainer Management</h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Manage instructors, assign courses & batches, track attendance, grade assignments, and view performance — all in one place.
        </p>
      </div>

      {/* Section Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex bg-slate-100 rounded-2xl p-1.5 gap-1">
          {sections.map(sec => {
            const Icon = sec.icon;
            const active = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  active ? 'bg-white text-indigo-700 shadow-md shadow-indigo-100' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {sec.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SECTION: FACULTY DIRECTORY ── */}
      {activeSection === 'directory' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FACULTY.map(trainer => (
              <div key={trainer.id} className="feature-card p-6 flex flex-col sm:flex-row gap-5 items-center sm:items-start hover:shadow-lg transition-shadow">
                <img src={trainer.avatar} alt={trainer.name} className="w-28 h-28 rounded-2xl object-cover shrink-0 ring-4 ring-indigo-500/20" />
                <div className="flex-1 space-y-3 text-center sm:text-left w-full">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{trainer.name}</h3>
                    <p className="text-xs font-semibold text-indigo-600">{trainer.role}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1 justify-center sm:justify-start">
                      <span className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" /> {trainer.rating} Rating
                      </span>
                      <span>{trainer.experience} Experience</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{trainer.bio}</p>
                  <div className="text-[11px] text-slate-500">
                    <strong>Specialization:</strong> {trainer.specialization}
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 justify-center sm:justify-start">
                    <button
                      onClick={() => { setSelectedFacultyId(trainer.id); setActiveSection('dashboard'); }}
                      className="px-4 py-2 text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-xl"
                    >
                      View Dashboard
                    </button>
                    <button
                      onClick={() => openModal('application')}
                      className="btn-primary px-4 py-2 shadow-none text-xs"
                    >
                      Book Consultation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SECTION: FACULTY DASHBOARD ── */}
      {activeSection === 'dashboard' && (
        <div className="space-y-6">
          {/* Faculty Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-bold text-slate-700">Viewing Dashboard As:</p>
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-500 font-semibold">Select Instructor:</label>
              <select
                value={selectedFacultyId}
                onChange={e => setSelectedFacultyId(Number(e.target.value))}
                className="border border-slate-300 rounded-xl px-4 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 bg-white cursor-pointer"
              >
                {FACULTY.map(f => (
                  <option key={f.id} value={f.id}>{f.name} — {f.specialization.split(',')[0]}</option>
                ))}
              </select>
            </div>
          </div>
          <FacultyDashboard faculty={selectedFaculty} />
        </div>
      )}

      {/* ── SECTION: ADMIN MANAGEMENT ── */}
      {activeSection === 'admin' && (
        <AdminFacultyPanel />
      )}

    </div>
  );
}
