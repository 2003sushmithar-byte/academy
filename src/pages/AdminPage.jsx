import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAdminAuth } from '../context/AdminAuthContext';
import { FACULTY, COURSES } from '../data/mockData';
import StudentEnrollmentAnalytics from '../components/admin/StudentEnrollmentAnalytics';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Search,
  UserPlus,
  CheckCircle2,
  XCircle,
  Plus,
  Activity,
  Layers,
  GraduationCap,
  ArrowLeft,
  Calendar,
  Clock,
  Phone,
  Mail,
  Filter,
  Edit2,
  Check,
  X,
  Briefcase,
  Coffee,
  UserX,
  Trash2,
  CalendarCheck,
  Bell,
  Send,
  MessageSquare,
  ExternalLink,
  Sparkles,
  CheckCheck,
  LogOut,
  Settings,
  BarChart2,
  User,
  ChevronDown,
  Pencil,
  Eye,
  LayoutDashboard,
  TrendingUp,
  PieChart,
  BookMarked,
  Camera,
  Upload,
} from 'lucide-react';

// Dedicated Faculty Avatar Presets (internal fallback)
const FACULTY_AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
];

// Dedicated Student Avatar Presets (internal fallback)
const STUDENT_AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
];

// Mock Initial Enrolled Students Data (All distinct student profiles)
const INITIAL_STUDENTS = [
  {
    id: 'stu-1',
    studentId: 'STU-2026-001',
    name: 'Sophia Chen',
    phone: '+1 555-0192',
    email: 'sophia.c@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    enrolledCourses: ['Full-Stack Web Development Masterclass', 'Modern Next.js 14 & React 19 Full-Stack Architecture', 'Cloud Architecture & DevOps'],
    batch: 'Batch FS-01',
    attendanceStatus: 'Present',
    attendanceRate: '96%',
    attendedDays: 24,
    totalDays: 25,
    joinedDate: 'Sep 01, 2026'
  },
  {
    id: 'stu-2',
    studentId: 'STU-2026-002',
    name: 'Liam O\'Connor',
    phone: '+1 555-0284',
    email: 'liam.oc@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    enrolledCourses: ['Applied AI & Machine Learning Specialization'],
    batch: 'Batch AI-02',
    attendanceStatus: 'On Leave',
    attendanceRate: '88%',
    attendedDays: 22,
    totalDays: 25,
    joinedDate: 'Sep 03, 2026'
  },
  {
    id: 'stu-3',
    studentId: 'STU-2026-003',
    name: 'Aaliyah Patel',
    phone: '+1 555-0371',
    email: 'aaliyah.p@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    enrolledCourses: ['Data Science & Predictive Modeling', 'Cloud Architecture & DevOps'],
    batch: 'Batch DS-03',
    attendanceStatus: 'Present',
    attendanceRate: '92%',
    attendedDays: 23,
    totalDays: 25,
    joinedDate: 'Sep 05, 2026'
  },
  {
    id: 'stu-4',
    studentId: 'STU-2026-004',
    name: 'Noah Davis',
    phone: '+1 555-0466',
    email: 'noah.d@icloud.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    enrolledCourses: ['Cybersecurity Defense & Ethical Hacking'],
    batch: 'Batch SEC-01',
    attendanceStatus: 'Day Off',
    attendanceRate: '90%',
    attendedDays: 18,
    totalDays: 20,
    joinedDate: 'Sep 08, 2026'
  },
  {
    id: 'stu-5',
    studentId: 'STU-2026-005',
    name: 'Maya Lin',
    phone: '+1 555-0588',
    email: 'maya.lin@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    enrolledCourses: ['Full-Stack Web Development Masterclass', 'UI/UX Design Systems with Figma'],
    batch: 'Batch FS-01',
    attendanceStatus: 'Present',
    attendanceRate: '100%',
    attendedDays: 25,
    totalDays: 25,
    joinedDate: 'Sep 02, 2026'
  },
  {
    id: 'stu-6',
    studentId: 'STU-2026-006',
    name: 'Alex Rivera',
    phone: '+1 555-0612',
    email: 'alex.r@yahoo.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    enrolledCourses: ['Modern Next.js 14 & React 19 Full-Stack Architecture'],
    batch: 'Batch FS-01',
    attendanceStatus: 'On Leave',
    attendanceRate: '84%',
    attendedDays: 21,
    totalDays: 25,
    joinedDate: 'Sep 10, 2026'
  }
];

// Mock Batches
const INITIAL_BATCHES = [
  { id: 'b-1', code: 'Batch FS-01', course: 'Full-Stack Web Development', faculty: 'Dr. Sarah Jenkins', schedule: 'Mon, Wed, Fri (6 PM - 8 PM)', maxStudents: 30, enrolled: 28, status: 'Active' },
  { id: 'b-2', code: 'Batch AI-02', course: 'Artificial Intelligence & Neural Systems', faculty: 'Prof. Marcus Vance', schedule: 'Tue, Thu (6 PM - 8:30 PM)', maxStudents: 25, enrolled: 22, status: 'Active' },
  { id: 'b-3', code: 'Batch DS-03', course: 'Data Science & Predictive Modeling', faculty: 'Elena Rostova', schedule: 'Sat, Sun (10 AM - 1 PM)', maxStudents: 30, enrolled: 25, status: 'Active' },
  { id: 'b-4', code: 'Batch SEC-01', course: 'Cybersecurity Defense & Ethical Hacking', faculty: 'David Chen', schedule: 'Weekends (2 PM - 5 PM)', maxStudents: 20, enrolled: 18, status: 'Upcoming' },
];

// Initial Audit Logs
const INITIAL_AUDIT_LOGS = [
  { id: 1, action: 'Course Allocated', detail: 'Dr. Sarah Jenkins assigned to Batch FS-01', time: '10 mins ago', user: 'Admin' },
  { id: 2, action: 'Faculty Attendance Update', detail: 'Elena Rostova marked as On Leave (Personal Leave)', time: '40 mins ago', user: 'Admin' },
  { id: 3, action: 'Student Attendance Validated', detail: 'Sophia Chen marked as Present for Batch FS-01', time: '2 hours ago', user: 'Admin' },
  { id: 4, action: 'Faculty Attendance Update', detail: 'David Chen marked as Day Off', time: '4 hours ago', user: 'Admin' },
  { id: 5, action: 'Batch FS-01 Audit', detail: 'Daily attendance session completed with 96% attendance', time: 'Yesterday', user: 'System' },
];

// ─── Settings Content Sub-Component ──────────────────────────────────────────
function SettingsContent({ adminUser, showToast, changeAdminPassword, updateAdminProfile }) {
  const [settingsTab, setSettingsTab] = useState('profile');
  const [profileName, setProfileName] = useState(adminUser?.name || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPwd, setConfirmNewPwd] = useState('');
  const [notifToggles, setNotifToggles] = useState({ emailNewInquiry: true, emailCareerApp: true, emailEnrollment: false, pushAll: true });

  const settingsTabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'account', label: 'Account' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Settings sub-tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto">
        {settingsTabs.map(t => (
          <button key={t.id} onClick={() => setSettingsTab(t.id)}
            className={`px-5 py-3 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              settingsTab === t.id ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50 dark:bg-purple-950/20' : 'text-slate-500 hover:text-slate-800'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 space-y-5 max-w-lg">
        {settingsTab === 'profile' && (
          <>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white font-black text-2xl">
                {adminUser?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <div>
                <div className="text-sm font-extrabold text-slate-900 dark:text-white">{adminUser?.name}</div>
                <div className="text-xs text-slate-500">{adminUser?.email}</div>
                <div className="text-[11px] text-purple-600 font-semibold mt-0.5">{adminUser?.role}</div>
              </div>
            </div>
            <div>
              <label className="field-label">Display Name</label>
              <input value={profileName} onChange={e => setProfileName(e.target.value)} className="input-field mt-1" placeholder="Admin display name" />
            </div>
            <button onClick={() => { updateAdminProfile({ name: profileName }); showToast('Profile updated!', 'success'); }} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl cursor-pointer">Save Profile</button>
          </>
        )}

        {settingsTab === 'account' && (
          <>
            <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
              {[
                { label: 'Admin Name', value: adminUser?.name },
                { label: 'Email Address', value: adminUser?.email },
                { label: 'Role', value: adminUser?.role },
                { label: 'Account Created', value: adminUser?.createdAt || '2026-01-01' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-500 dark:text-slate-400">{row.label}</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">To change your email address, contact the system administrator.</p>
          </>
        )}

        {settingsTab === 'notifications' && (
          <div className="space-y-4">
            {[
              { key: 'emailNewInquiry', label: 'Email on New Inquiry', desc: 'Receive email when a new student inquiry is submitted' },
              { key: 'emailCareerApp', label: 'Email on Career Application', desc: 'Receive email when someone applies for a career role' },
              { key: 'emailEnrollment', label: 'Email on Course Enrollment', desc: 'Receive email when a student enrolls in a course' },
              { key: 'pushAll', label: 'In-App Notifications', desc: 'Show badge counts and bell alerts inside the dashboard' },
            ].map(item => (
              <div key={item.key} className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                </div>
                <button
                  onClick={() => { setNotifToggles(prev => ({ ...prev, [item.key]: !prev[item.key] })); showToast('Preference updated', 'success'); }}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0 ${ notifToggles[item.key] ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700' }`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${ notifToggles[item.key] ? 'translate-x-5' : 'translate-x-0.5' }`} />
                </button>
              </div>
            ))}
          </div>
        )}

        {settingsTab === 'security' && (
          <>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Change Password</h4>
            <div className="space-y-3">
              <div><label className="field-label">Current Password</label><input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} className="input-field mt-1" placeholder="••••••••" /></div>
              <div><label className="field-label">New Password</label><input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="input-field mt-1" placeholder="Min 6 characters" /></div>
              <div><label className="field-label">Confirm New Password</label><input type="password" value={confirmNewPwd} onChange={e => setConfirmNewPwd(e.target.value)} className="input-field mt-1" placeholder="Repeat new password" /></div>
            </div>
            <button onClick={() => {
              if (!oldPassword || !newPassword || !confirmNewPwd) { showToast('All fields are required', 'warning'); return; }
              if (newPassword !== confirmNewPwd) { showToast('New passwords do not match', 'warning'); return; }
              if (newPassword.length < 6) { showToast('Password must be at least 6 characters', 'warning'); return; }
              const result = changeAdminPassword(oldPassword, newPassword);
              if (result.success) { showToast('Password changed successfully!', 'success'); setOldPassword(''); setNewPassword(''); setConfirmNewPwd(''); }
              else showToast(result.error, 'warning');
            }} className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl cursor-pointer">Update Password</button>
          </>
        )}
      </div>
    </div>
  );
}

export const getStudentCourseProgressDetails = (student) => {
  if (!student) return [];
  const baseData = {
    'Full-Stack Web Development Masterclass': { totalModules: 16, totalLabs: 8 },
    'Modern Next.js 14 & React 19 Full-Stack Architecture': { totalModules: 12, totalLabs: 6 },
    'Cloud Architecture & DevOps': { totalModules: 14, totalLabs: 7 },
    'Applied AI & Machine Learning Specialization': { totalModules: 18, totalLabs: 10 },
    'Data Science & Predictive Modeling': { totalModules: 15, totalLabs: 8 },
    'Cybersecurity Defense & Ethical Hacking': { totalModules: 16, totalLabs: 9 },
    'UI/UX Design Systems with Figma': { totalModules: 10, totalLabs: 5 },
  };

  const seed = (student.name || '').charCodeAt(0) || 75;
  return (student.enrolledCourses || []).map((courseName, idx) => {
    const meta = baseData[courseName] || { totalModules: 12, totalLabs: 6 };
    const rateNum = parseInt(student.attendanceRate) || 85;
    const offset = ((seed * (idx + 3)) % 15) - 5;
    const progressPercent = Math.min(100, Math.max(35, rateNum - 10 + offset));
    const completedModules = Math.round((progressPercent / 100) * meta.totalModules);
    const completedLabs = Math.round((progressPercent / 100) * meta.totalLabs);
    const grade = progressPercent >= 90 ? 'A+ (Distinction)' : progressPercent >= 80 ? 'A (Excellent)' : progressPercent >= 70 ? 'B+ (Proficient)' : 'B (Passing)';
    return {
      courseName,
      progressPercent,
      completedModules,
      totalModules: meta.totalModules,
      completedLabs,
      totalLabs: meta.totalLabs,
      grade,
      status: progressPercent >= 95 ? 'Completed' : 'In Progress'
    };
  });
};

// ─── Main AdminPage Component ─────────────────────────────────────────────────
export default function AdminPage() {
  const {
    showToast,
    setCurrentPage,
    adminNotifications = [],
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearAllNotifications,
    courses: adminCourses = [],
    addCourse: appAddCourse,
    updateCourse: appUpdateCourse,
    deleteCourse: appDeleteCourse,
    facultyList = [],
    setFacultyList,
    addFaculty: appAddFaculty,
    updateFaculty: appUpdateFaculty,
    deleteFaculty: appDeleteFaculty
  } = useApp();

  const { adminUser, logoutAdmin, changeAdminPassword, updateAdminProfile } = useAdminAuth();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState('faculty');

  // Bell Dropdown state
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  // Profile dropdown state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Course Modal state
  const [showCourseModal, setShowCourseModal] = useState(false); // 'add' | 'edit' | 'view' | false
  const [courseModalMode, setCourseModalMode] = useState('add');
  const [selectedCourseForEdit, setSelectedCourseForEdit] = useState(null);
  const [courseDeleteConfirm, setCourseDeleteConfirm] = useState(null);
  const [courseSearchQ, setCourseSearchQ] = useState('');
  const [newCourse, setNewCourse] = useState({ title: '', category: 'Web Development', level: 'Beginner', description: '', duration: '12 Weeks', instructor: '', imageUrl: '', modules: [''] });

  // Faculty Delete Confirm
  const [facultyDeleteConfirm, setFacultyDeleteConfirm] = useState(null);

  // Student Delete Confirm
  const [studentDeleteConfirm, setStudentDeleteConfirm] = useState(null);

  const [searchQ, setSearchQ] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    role: 'Instructor',
    specialization: '',
    experience: '5+ Years',
    email: '',
    avatar: FACULTY_AVATAR_PRESETS[0],
    assignedBatch: 'Batch FS-01',
    attendanceStatus: 'Working'
  });

  // Modal for Editing Faculty Attendance
  const [editingFaculty, setEditingFaculty] = useState(null);

  // Batches State
  const [batches, setBatches] = useState(INITIAL_BATCHES);
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [newBatch, setNewBatch] = useState({
    code: '',
    course: 'Full-Stack Web Development',
    faculty: 'Dr. Sarah Jenkins',
    schedule: 'Weekdays (6 PM - 8 PM)',
    maxStudents: 30
  });

  // Students Management State
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [studentSearchQ, setStudentSearchQ] = useState('');
  const [studentFilter, setStudentFilter] = useState('All');
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [viewingStudentProgress, setViewingStudentProgress] = useState(null);
  const [expandedCourses, setExpandedCourses] = useState({});
  const toggleCourseExpand = (studentId) => {
    setExpandedCourses(prev => ({ ...prev, [studentId]: !prev[studentId] }));
  };
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: STUDENT_AVATAR_PRESETS[0],
    selectedCourses: ['Full-Stack Web Development Masterclass'],
    batch: 'Batch FS-01',
    attendanceStatus: 'Present'
  });

  // Inquiries Tab Filter & Search
  const [inquiryFilter, setInquiryFilter] = useState('All');
  const [inquirySearchQ, setInquirySearchQ] = useState('');

  // Reply Modal State
  const [replyTarget, setReplyTarget] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [replyError, setReplyError] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [replySending, setReplySending] = useState(false);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Unread notifications count
  const unreadCount = adminNotifications.filter(n => !n.isRead).length;

  // ─── Handlers ───────────────────────────────────────────────────────────────

  // Toggle Faculty Account Status (Active / Inactive)
  const toggleStatus = (id) => {
    setFacultyList(prev => prev.map(f => {
      if (f.id === id) {
        const next = f.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`${f.name} status updated to ${next}`, next === 'Active' ? 'success' : 'warning');
        setAuditLogs(logs => [{
          id: Date.now(),
          action: 'Faculty Status Changed',
          detail: `${f.name} account set to ${next}`,
          time: 'Just now',
          user: 'Admin'
        }, ...logs]);
        return { ...f, status: next };
      }
      return f;
    }));
  };

  // Update Faculty Attendance & Leave Status
  const updateFacultyAttendance = (id, newStatus, note = '') => {
    setFacultyList(prev => prev.map(f => {
      if (f.id === id) {
        const statusNote = note || (newStatus === 'Working' ? 'On Duty' : newStatus === 'On Leave' ? 'Approved Leave' : 'Scheduled Day Off');
        showToast(`${f.name} attendance updated to: ${newStatus}`, newStatus === 'Working' ? 'success' : newStatus === 'On Leave' ? 'warning' : 'info');
        setAuditLogs(logs => [{
          id: Date.now(),
          action: 'Faculty Attendance Update',
          detail: `${f.name} marked as ${newStatus} (${statusNote})`,
          time: 'Just now',
          user: 'Admin'
        }, ...logs]);
        return {
          ...f,
          attendanceStatus: newStatus,
          attendanceNote: statusNote
        };
      }
      return f;
    }));
  };

  // Update Student Attendance Status — bug fix: was using `return f` instead of `return s`
  const updateStudentAttendance = (id, newStatus) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        showToast(`${s.name} attendance updated to: ${newStatus}`, newStatus === 'Present' ? 'success' : newStatus === 'On Leave' ? 'warning' : 'info');
        setAuditLogs(logs => [{
          id: Date.now(),
          action: 'Student Attendance Update',
          detail: `${s.name} marked as ${newStatus}`,
          time: 'Just now',
          user: 'Admin'
        }, ...logs]);
        return { ...s, attendanceStatus: newStatus };
      }
      return s;
    }));
  };

  // Add Faculty
  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name.trim() || !newFaculty.specialization.trim()) {
      showToast('Please enter Instructor Name and Specialization', 'warning');
      return;
    }
    const created = {
      id: Date.now(),
      name: newFaculty.name.trim(),
      role: newFaculty.role,
      avatar: newFaculty.avatar || FACULTY_AVATAR_PRESETS[0],
      experience: newFaculty.experience,
      specialization: newFaculty.specialization.trim(),
      rating: 4.95,
      bio: 'Senior certified instructor at Nexus Academy.',
      coursesTaught: ['Full Stack Development'],
      status: 'Active',
      attendanceStatus: newFaculty.attendanceStatus || 'Working',
      attendanceNote: 'Active Duty',
      email: newFaculty.email || `${newFaculty.name.split(' ')[0].toLowerCase()}@nexusacademy.edu`,
      assignedBatch: newFaculty.assignedBatch
    };
    appAddFaculty(created);
    setNewFaculty({
      name: '',
      role: 'Instructor',
      specialization: '',
      experience: '5+ Years',
      email: '',
      avatar: FACULTY_AVATAR_PRESETS[0],
      assignedBatch: 'Batch FS-01',
      attendanceStatus: 'Working'
    });
    setShowAddForm(false);
    showToast(`Faculty Member "${created.name}" added successfully!`, 'success');
  };

  // Delete Faculty (with confirmation)
  const handleDeleteFaculty = (facultyId) => {
    appDeleteFaculty(facultyId);
    setAuditLogs(logs => [{ id: Date.now(), action: 'Faculty Removed', detail: `Faculty record removed by Admin`, time: 'Just now', user: 'Admin' }, ...logs]);
    showToast('Faculty member removed', 'info');
    setFacultyDeleteConfirm(null);
  };

  // Save Faculty Edit (Details, Photo, Attendance)
  const handleSaveFacultyEdit = (e) => {
    if (e) e.preventDefault();
    if (!editingFaculty) return;
    if (!editingFaculty.name?.trim()) {
      showToast('Faculty name is required', 'warning');
      return;
    }
    const updatedFaculty = {
      ...editingFaculty,
      name: editingFaculty.name.trim(),
      specialization: editingFaculty.specialization?.trim() || editingFaculty.specialization,
      avatar: editingFaculty.avatar,
      assignedBatch: editingFaculty.assignedBatch,
      attendanceStatus: editingFaculty.attendanceStatus,
      attendanceNote: editingFaculty.attendanceNote,
    };
    appUpdateFaculty(updatedFaculty);
    setAuditLogs(logs => [{
      id: Date.now(),
      action: 'Faculty Profile Updated',
      detail: `Faculty "${editingFaculty.name}" profile, photo & duty status updated by Admin`,
      time: 'Just now',
      user: 'Admin'
    }, ...logs]);
    showToast(`Faculty member "${editingFaculty.name}" updated successfully!`, 'success');
    setEditingFaculty(null);
  };

  // Add Batch
  const handleAddBatch = (e) => {
    e.preventDefault();
    if (!newBatch.code.trim()) {
      showToast('Please enter Batch Code (e.g. Batch FS-02)', 'warning');
      return;
    }
    const created = {
      id: `b-${Date.now()}`,
      code: newBatch.code,
      course: newBatch.course,
      faculty: newBatch.faculty,
      schedule: newBatch.schedule,
      maxStudents: Number(newBatch.maxStudents) || 30,
      enrolled: 0,
      status: 'Upcoming'
    };
    setBatches([created, ...batches]);
    setShowAddBatch(false);
    setNewBatch({ code: '', course: 'Full-Stack Web Development', faculty: 'Dr. Sarah Jenkins', schedule: 'Weekdays (6 PM - 8 PM)', maxStudents: 30 });
    showToast(`New Batch "${created.code}" created successfully!`, 'success');
  };

  // Add Student Handler
  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name.trim() || !newStudent.email.trim()) {
      showToast('Please enter Student Name and Email', 'warning');
      return;
    }
    const created = {
      id: `stu-${Date.now()}`,
      studentId: `STU-2026-00${students.length + 1}`,
      name: newStudent.name.trim(),
      email: newStudent.email.trim(),
      phone: newStudent.phone.trim() || '+1 555-0100',
      avatar: newStudent.avatar || '',
      enrolledCourses: newStudent.selectedCourses.length > 0 ? newStudent.selectedCourses : ['Full-Stack Web Development Masterclass'],
      batch: newStudent.batch,
      attendanceStatus: newStudent.attendanceStatus,
      attendanceRate: '100%',
      attendedDays: 1,
      totalDays: 1,
      joinedDate: 'Today'
    };
    setStudents([created, ...students]);
    setShowAddStudentForm(false);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      avatar: STUDENT_AVATAR_PRESETS[0],
      selectedCourses: ['Full-Stack Web Development Masterclass'],
      batch: 'Batch FS-01',
      attendanceStatus: 'Present'
    });
    setAuditLogs(logs => [{
      id: Date.now(),
      action: 'Student Enrolled',
      detail: `${created.name} registered and enrolled in ${created.enrolledCourses.join(', ')}`,
      time: 'Just now',
      user: 'Admin'
    }, ...logs]);
    showToast(`Student "${created.name}" registered successfully!`, 'success');
  };

  // Delete Student
  const handleDeleteStudent = (studentId) => {
    const student = students.find(s => s.id === studentId);
    setStudents(prev => prev.filter(s => s.id !== studentId));
    setAuditLogs(logs => [{
      id: Date.now(),
      action: 'Student Removed',
      detail: `${student?.name} record removed by Admin`,
      time: 'Just now',
      user: 'Admin'
    }, ...logs]);
    showToast(`Student "${student?.name}" removed successfully`, 'info');
    setStudentDeleteConfirm(null);
  };

  // Course Management handlers
  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title.trim()) { showToast('Course name is required', 'warning'); return; }
    const created = {
      ...newCourse,
      id: `course-admin-${Date.now()}`,
      enrolledLearners: 0,
      studentsEnrolled: 0,
      rating: 5.0,
      reviewsCount: 1,
      thumbnail: newCourse.imageUrl || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80',
      instructor: {
        name: newCourse.instructor || (facultyList[0]?.name || 'Nexus Faculty'),
        title: 'Senior Technical Instructor',
        avatar: FACULTY_AVATAR_PRESETS[0],
        bio: 'Senior instructor at Nexus Academy.'
      },
      syllabus: (newCourse.modules || []).filter(m => m && m.trim()).map((mod, idx) => ({
        moduleTitle: `Module ${idx + 1}: ${mod}`,
        lessons: [
          { title: `${mod} Fundamentals & Setup`, duration: '45 mins', type: 'video', preview: true },
          { title: `${mod} Comprehensive Cheat Sheet`, duration: '15 mins', type: 'pdf' }
        ]
      })),
      price: 199,
      discountPrice: 149
    };
    appAddCourse(created);
    setNewCourse({ title: '', category: 'Web Development', level: 'Beginner', description: '', duration: '12 Weeks', instructor: '', imageUrl: '', modules: [''] });
    setShowCourseModal(false);
    setAuditLogs(logs => [{ id: Date.now(), action: 'Course Added', detail: `"${created.title}" added to Course Management`, time: 'Just now', user: 'Admin' }, ...logs]);
    showToast(`Course "${created.title}" added successfully!`, 'success');
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    const updated = {
      ...selectedCourseForEdit,
      thumbnail: selectedCourseForEdit.imageUrl || selectedCourseForEdit.image || selectedCourseForEdit.thumbnail,
      instructor: typeof selectedCourseForEdit.instructor === 'object'
        ? selectedCourseForEdit.instructor
        : {
            name: selectedCourseForEdit.instructor || 'Nexus Faculty',
            title: 'Senior Technical Instructor',
            avatar: FACULTY_AVATAR_PRESETS[0],
            bio: 'Senior instructor at Nexus Academy.'
          }
    };
    appUpdateCourse(updated);
    setAuditLogs(logs => [{ id: Date.now(), action: 'Course Edited', detail: `"${selectedCourseForEdit.title}" updated`, time: 'Just now', user: 'Admin' }, ...logs]);
    showToast(`Course "${selectedCourseForEdit.title}" updated!`, 'success');
    setShowCourseModal(false);
    setSelectedCourseForEdit(null);
  };

  const handleDeleteCourse = (course) => {
    appDeleteCourse(course.id);
    setAuditLogs(logs => [{ id: Date.now(), action: 'Course Deleted', detail: `"${course.title}" removed from Course Management`, time: 'Just now', user: 'Admin' }, ...logs]);
    showToast(`Course "${course.title}" deleted`, 'info');
    setCourseDeleteConfirm(null);
  };

  // ─── Reply Modal Handlers ──────────────────────────────────────────────────
  const openReplyModal = (item) => {
    setReplyTarget(item);
    setReplyMessage('');
    setReplyError('');
    setReplySent(false);
    setReplySending(false);
  };

  const closeReplyModal = () => {
    setReplyTarget(null);
    setReplyMessage('');
    setReplyError('');
    setReplySent(false);
    setReplySending(false);
  };

  const handleReply = () => {
    if (!replyMessage.trim()) {
      setReplyError('Message cannot be empty. Please write a reply before sending.');
      return;
    }
    setReplyError('');
    setReplySending(true);

    setTimeout(() => {
      setReplySending(false);
      setReplySent(true);
      markNotificationAsRead(replyTarget.id);
      setAuditLogs(logs => [{
        id: Date.now(),
        action: 'Reply Sent',
        detail: `Admin replied to ${replyTarget.applicant} (${replyTarget.email}) regarding "${replyTarget.title}"`,
        time: 'Just now',
        user: 'Admin'
      }, ...logs]);
      showToast(`Reply sent to ${replyTarget.applicant} successfully!`, 'success');
      setTimeout(closeReplyModal, 1800);
    }, 900);
  };

  // ─── Filtered lists ────────────────────────────────────────────────────────
  const filteredFaculty = facultyList.filter(f =>
    f.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    f.specialization.toLowerCase().includes(searchQ.toLowerCase()) ||
    (f.attendanceStatus && f.attendanceStatus.toLowerCase().includes(searchQ.toLowerCase()))
  );

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearchQ.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearchQ.toLowerCase()) ||
      s.studentId.toLowerCase().includes(studentSearchQ.toLowerCase()) ||
      s.enrolledCourses.some(c => c.toLowerCase().includes(studentSearchQ.toLowerCase()));
    const matchesFilter = studentFilter === 'All' || s.attendanceStatus === studentFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredInquiries = adminNotifications.filter(item => {
    const matchesSearch =
      item.applicant?.toLowerCase().includes(inquirySearchQ.toLowerCase()) ||
      item.email?.toLowerCase().includes(inquirySearchQ.toLowerCase()) ||
      item.title?.toLowerCase().includes(inquirySearchQ.toLowerCase()) ||
      item.details?.toLowerCase().includes(inquirySearchQ.toLowerCase());

    if (inquiryFilter === 'unread') return matchesSearch && !item.isRead;
    if (inquiryFilter === 'career') return matchesSearch && item.type === 'career';
    if (inquiryFilter === 'inquiry') return matchesSearch && item.type === 'inquiry';
    return matchesSearch;
  });

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="section-container py-8 space-y-8">

      {/* Admin Header Console */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative">
        <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-extrabold">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> SECURE ADMINISTRATIVE CONSOLE
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Nexus Academy Administration Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Central management portal for faculty rosters, staff attendance &amp; leave tracking, academic batches, student enrollment, and career/inquiry notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* NOTIFICATION BELL BUTTON WITH SMOOTHLY SCROLLING DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className={`relative px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 cursor-pointer shadow ${
                  unreadCount > 0
                    ? 'bg-purple-950/80 border-purple-500 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                }`}
                title="Notifications"
              >
                <div className="relative">
                  <Bell className={`w-4 h-4 ${unreadCount > 0 ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[9px] font-extrabold ring-2 ring-slate-900">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Notifications</span>
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 text-slate-900 dark:text-white flex flex-col max-h-[80vh] animate-in fade-in slide-in-from-top-2">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0 rounded-t-2xl">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-purple-600" />
                        <span className="font-extrabold text-xs">Real-Time Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {adminNotifications.length > 0 && (
                        <button
                          onClick={markAllNotificationsAsRead}
                          className="text-[10px] font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    {/* Scrollable notifications list */}
                    <div className="overflow-y-auto max-h-[55vh] divide-y divide-slate-100 dark:divide-slate-800 custom-scrollbar overscroll-contain">
                      {adminNotifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-400">
                          No notifications yet. New inquiries and applications will appear here.
                        </div>
                      ) : (
                        adminNotifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => markNotificationAsRead(n.id)}
                            className={`p-3.5 transition-colors cursor-pointer text-xs space-y-1 hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                              !n.isRead ? 'bg-purple-50/50 dark:bg-purple-950/20' : ''
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                                n.type === 'career'
                                  ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                                  : n.type === 'inquiry'
                                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              }`}>
                                {n.type === 'career' ? <Briefcase className="w-2.5 h-2.5" /> : <Mail className="w-2.5 h-2.5" />}
                                {n.type === 'career' ? 'Career Role' : 'Inquiry'}
                              </span>
                              <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                            </div>
                            <div className="font-extrabold text-slate-900 dark:text-white line-clamp-1">
                              {n.applicant}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                              {n.details || n.title}
                            </p>
                            <div className="text-[10px] text-slate-400 pt-0.5">
                              {n.email} {n.phone ? `• ${n.phone}` : ''}
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-2.5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 text-center shrink-0 rounded-b-2xl">
                      <button
                        onClick={() => {
                          setShowNotifDropdown(false);
                          setActiveTab('inquiries');
                        }}
                        className="text-xs font-bold text-purple-600 hover:text-purple-700 dark:text-purple-400 cursor-pointer"
                      >
                        View All Submissions &amp; Inquiries ({adminNotifications.length}) →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Return to Website */}
            <button
              onClick={() => setCurrentPage('home')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all border border-slate-700 flex items-center gap-2 cursor-pointer shadow"
            >
              <ArrowLeft className="w-4 h-4 text-purple-400" /> Return to Website
            </button>

            {/* Admin Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white font-black text-xs">
                  {adminUser?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-white">{adminUser?.name || 'Admin'}</div>
                  <div className="text-[10px] text-slate-400">{adminUser?.role || 'Admin'}</div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showProfileDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">{adminUser?.name || 'Admin'}</div>
                      <div className="text-[11px] text-slate-500 truncate">{adminUser?.email || 'admin@nexusacademy.edu'}</div>
                    </div>
                    <div className="py-1">
                      {[
                        { label: 'Admin Profile', icon: User, tab: 'settings' },
                        { label: 'Account Settings', icon: Settings, tab: 'settings' },
                        { label: 'Notifications', icon: Bell, tab: 'inquiries' },
                        { label: 'Analytics', icon: BarChart2, tab: 'analytics' },
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.label}
                            onClick={() => { setActiveTab(item.tab); setShowProfileDropdown(false); }}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors cursor-pointer"
                          >
                            <Icon className="w-3.5 h-3.5" /> {item.label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800 py-1">
                      <button
                        onClick={() => { logoutAdmin(); setShowProfileDropdown(false); }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-800">
          <div
            onClick={() => setActiveTab('faculty')}
            className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Faculty</span>
            <div className="text-xl font-black text-white mt-0.5">{facultyList.length}</div>
          </div>
          <div
            onClick={() => setActiveTab('faculty')}
            className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Staff On Duty</span>
            <div className="text-xl font-black text-emerald-400 mt-0.5">
              {facultyList.filter(f => f.attendanceStatus === 'Working').length} / {facultyList.length}
            </div>
          </div>
          <div
            onClick={() => setActiveTab('batches')}
            className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Active Batches</span>
            <div className="text-xl font-black text-indigo-400 mt-0.5">{batches.length}</div>
          </div>
          <div
            onClick={() => setActiveTab('students')}
            className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 cursor-pointer hover:border-slate-500 transition-colors"
          >
            <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Total Students</span>
            <div className="text-xl font-black text-purple-400 mt-0.5">{students.length}</div>
          </div>
          <div
            onClick={() => setActiveTab('inquiries')}
            className="bg-slate-800/60 p-3 rounded-2xl border border-purple-500/40 cursor-pointer hover:border-purple-400 transition-colors"
          >
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>Submissions</span>
              {unreadCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
            </span>
            <div className="text-xl font-black text-amber-400 mt-0.5 flex items-center gap-1.5">
              {adminNotifications.length}
              {unreadCount > 0 && <span className="text-[10px] font-bold text-rose-400">({unreadCount} new)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* UNREAD NOTIFICATIONS ALERT BANNER */}
      {unreadCount > 0 && (
        <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-slate-900 border border-purple-500/40 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0 shadow">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-extrabold text-white">
                  New Form Submissions Waiting for Review
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                  {unreadCount} Unread
                </span>
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5">
                New candidate applications from the Careers page and student inquiries have been received.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('inquiries')}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all shadow cursor-pointer"
            >
              Review Submissions ({adminNotifications.length})
            </button>
            <button
              onClick={markAllNotificationsAsRead}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl transition-all border border-slate-700 cursor-pointer"
            >
              Mark All Read
            </button>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'faculty', label: `1. Faculty Management (${facultyList.length})`, icon: Users },
            { id: 'batches', label: `2. Batch Management (${batches.length})`, icon: Layers },
            { id: 'students', label: `3. Student Management (${students.length})`, icon: GraduationCap },
            { id: 'courses', label: `4. Course Management (${adminCourses.length})`, icon: BookOpen },
            {
              id: 'inquiries',
              label: `5. Inquiries & Career Applications (${adminNotifications.length})`,
              icon: Bell,
              hasBadge: unreadCount > 0,
              badgeText: `${unreadCount} new`
            },
            { id: 'audit', label: `6. Audit Logs (${auditLogs.length})`, icon: Activity },
            { id: 'analytics', label: '7. Analytics', icon: BarChart2 },
            { id: 'settings', label: '8. Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-black rounded-xl transition-all duration-200 cursor-pointer relative shadow-sm ${
                  active
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-600 scale-[1.02]'
                    : 'bg-white hover:bg-purple-50 text-slate-900 hover:text-purple-700 border-2 border-slate-300 hover:border-purple-400'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-800'}`} />
                <span className="font-black tracking-tight">{tab.label}</span>
                {tab.hasBadge && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white rounded-full text-[9px] font-black animate-pulse shadow-sm">
                    {tab.badgeText}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {activeTab === 'faculty' && (
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty name, status..."
              value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
            />
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. FACULTY MANAGEMENT & ATTENDANCE                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'faculty' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-purple-50/70 dark:bg-purple-950/20 p-4 rounded-2xl border border-purple-100 dark:border-purple-900/50">
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                  Faculty Attendance &amp; Duty Roster
                </h4>
                <p className="text-[11px] text-slate-500">
                  Maintain whether faculty is working on-duty, on leave, or scheduled day off with quick edit controls.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-extrabold flex items-center gap-1 text-[11px]">
                <Briefcase className="w-3 h-3" /> Working: {facultyList.filter(f => f.attendanceStatus === 'Working').length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-extrabold flex items-center gap-1 text-[11px]">
                <UserX className="w-3 h-3" /> On Leave: {facultyList.filter(f => f.attendanceStatus === 'On Leave').length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-extrabold flex items-center gap-1 text-[11px]">
                <Coffee className="w-3 h-3" /> Day Off: {facultyList.filter(f => f.attendanceStatus === 'Day Off').length}
              </span>
              {/* Add Instructor button inside faculty section */}
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
              >
                <UserPlus className="w-3.5 h-3.5" /> {showAddForm ? 'Close Form' : 'Add Instructor'}
              </button>
            </div>
          </div>

          {/* Add Instructor Form — now inside faculty tab */}
          {showAddForm && (
            <form onSubmit={handleAddFaculty} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-lg space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-purple-600" /> Add New Faculty Member
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Identity Badge (Avatar removed to prevent misuse) */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-black text-sm flex items-center justify-center ring-2 ring-purple-500 shadow-xs shrink-0">
                  {newFaculty.name ? newFaculty.name.replace(/^Dr\.\s*|^Prof\.\s*/i, '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'FC'}
                </div>
                <div>
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                    Faculty Official Identity
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Official instructor badge generated securely from name for faculty records.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="field-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.name}
                    onChange={e => setNewFaculty({ ...newFaculty, name: e.target.value })}
                    placeholder="Dr. Jordan Taylor"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="field-label">Specialization *</label>
                  <input
                    type="text"
                    required
                    value={newFaculty.specialization}
                    onChange={e => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                    placeholder="Cloud Architecture & Kubernetes"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="field-label">Assign Batch</label>
                  <select
                    value={newFaculty.assignedBatch}
                    onChange={e => setNewFaculty({ ...newFaculty, assignedBatch: e.target.value })}
                    className="input-field"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.code}>{b.code} ({b.course})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Initial Attendance Status</label>
                  <select
                    value={newFaculty.attendanceStatus}
                    onChange={e => setNewFaculty({ ...newFaculty, attendanceStatus: e.target.value })}
                    className="input-field"
                  >
                    <option value="Working">🟢 Working / On Duty</option>
                    <option value="On Leave">🔴 On Leave</option>
                    <option value="Day Off">🟡 Day Off</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Save Instructor
                </button>
              </div>
            </form>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-6 py-3.5">Instructor</th>
                    <th className="px-6 py-3.5">Specialization</th>
                    <th className="px-6 py-3.5">Assigned Batch</th>
                    <th className="px-6 py-3.5">Account Status</th>
                    <th className="px-6 py-3.5 min-w-[240px]">
                      <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                        <Edit2 className="w-3 h-3" /> Attendance / Leave (Edit &amp; Show)
                      </span>
                    </th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredFaculty.map(f => (
                    <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-xs flex items-center justify-center ring-2 ring-purple-500/20 shadow-xs shrink-0">
                          {f.name ? f.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'FC'}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                            {f.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{f.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700 dark:text-slate-300">
                        {f.specialization}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-[11px]">
                          {f.assignedBatch || 'Batch FS-01'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                          f.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}>
                          {f.status === 'Active' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {f.status}
                        </span>
                      </td>

                      {/* EDIT & SHOW ATTENDANCE COLUMN */}
                      <td className="px-6 py-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <select
                              value={f.attendanceStatus || 'Working'}
                              onChange={(e) => updateFacultyAttendance(f.id, e.target.value)}
                              className={`text-[11px] font-extrabold rounded-lg px-2.5 py-1 border transition-all cursor-pointer shadow-xs focus:ring-2 focus:ring-purple-500 ${
                                f.attendanceStatus === 'Working'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800'
                                  : f.attendanceStatus === 'On Leave'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-200 dark:border-rose-800'
                                  : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800'
                              }`}
                            >
                              <option value="Working">🟢 Working / On Duty</option>
                              <option value="On Leave">🔴 On Leave</option>
                              <option value="Day Off">🟡 Day Off</option>
                            </select>

                            <button
                              onClick={() => setEditingFaculty(f)}
                              title="Edit Attendance Note & Reason"
                              className="p-1.5 text-slate-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                            <span>Note:</span>
                            <span className="text-slate-600 dark:text-slate-300 italic">{f.attendanceNote || 'Regular Shift'}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleStatus(f.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            f.status === 'Active'
                              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/50'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/50'
                          }`}
                        >
                          {f.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => setEditingFaculty({ ...f })}
                          title="Edit Faculty Details & Photo"
                          className="p-1.5 ml-1 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setFacultyDeleteConfirm(f)}
                          title="Delete faculty"
                          className="p-1.5 ml-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Profile & Attendance Edit Modal */}
      {editingFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Pencil className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Edit Faculty Profile: {editingFaculty.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingFaculty(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFacultyEdit} className="space-y-4">
              {/* Profile Identity Badge (Avatar removed to prevent misuse) */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white font-black text-sm flex items-center justify-center ring-2 ring-purple-500 shadow-xs shrink-0">
                  {editingFaculty.name ? editingFaculty.name.replace(/^Dr\.\s*|^Prof\.\s*/i, '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'FC'}
                </div>
                <div>
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                    Faculty Official Identity
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Verified instructor record for academic faculty roster.
                  </p>
                </div>
              </div>

              {/* Name & Specialization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingFaculty.name || ''}
                    onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                    className="input-field mt-1"
                  />
                </div>
                <div>
                  <label className="field-label">Specialization</label>
                  <input
                    type="text"
                    value={editingFaculty.specialization || ''}
                    onChange={(e) => setEditingFaculty({ ...editingFaculty, specialization: e.target.value })}
                    className="input-field mt-1"
                  />
                </div>
              </div>

              {/* Assigned Batch */}
              <div>
                <label className="field-label">Assigned Batch</label>
                <select
                  value={editingFaculty.assignedBatch || 'Batch FS-01'}
                  onChange={(e) => setEditingFaculty({ ...editingFaculty, assignedBatch: e.target.value })}
                  className="select-field mt-1"
                >
                  {batches.map(b => (
                    <option key={b.id} value={b.code}>{b.code} ({b.course})</option>
                  ))}
                  <option value="Unassigned">Unassigned</option>
                </select>
              </div>

              {/* Duty / Leave Status */}
              <div>
                <label className="field-label">Duty / Leave Status</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { id: 'Working', label: 'Working', color: 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' },
                    { id: 'On Leave', label: 'On Leave', color: 'border-rose-500 bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200' },
                    { id: 'Day Off', label: 'Day Off', color: 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200' },
                  ].map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setEditingFaculty({ ...editingFaculty, attendanceStatus: option.id })}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                        editingFaculty.attendanceStatus === option.id
                          ? `${option.color} ring-2 ring-purple-500/30`
                          : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="field-label">Attendance Note / Leave Reason</label>
                <input
                  type="text"
                  value={editingFaculty.attendanceNote || ''}
                  onChange={(e) => setEditingFaculty({ ...editingFaculty, attendanceNote: e.target.value })}
                  placeholder="e.g. Approved Sick Leave, Vacation, Scheduled Off"
                  className="input-field mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingFaculty(null)}
                  className="btn-secondary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. BATCH MANAGEMENT                                          */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'batches' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-purple-600" /> Academic Batch Roster
            </h3>
            <button
              onClick={() => setShowAddBatch(!showAddBatch)}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-3.5 h-3.5" /> Create Batch
            </button>
          </div>

          {showAddBatch && (
            <form onSubmit={handleAddBatch} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow space-y-4">
              <h4 className="text-xs font-extrabold text-purple-700 dark:text-purple-400">Configure New Student Batch</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Batch Code (e.g. Batch FS-02)"
                  required
                  value={newBatch.code}
                  onChange={e => setNewBatch({ ...newBatch, code: e.target.value })}
                  className="input-field text-xs py-2"
                />
                <select
                  value={newBatch.course}
                  onChange={e => setNewBatch({ ...newBatch, course: e.target.value })}
                  className="select-field text-xs py-2"
                >
                  {COURSES.slice(0, 6).map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
                </select>
                <select
                  value={newBatch.faculty}
                  onChange={e => setNewBatch({ ...newBatch, faculty: e.target.value })}
                  className="select-field text-xs py-2"
                >
                  {FACULTY.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                </select>
                <input
                  type="number"
                  placeholder="Max Students (e.g. 30)"
                  value={newBatch.maxStudents}
                  onChange={e => setNewBatch({ ...newBatch, maxStudents: e.target.value })}
                  className="input-field text-xs py-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddBatch(false)} className="px-3 py-1.5 text-xs text-slate-500 cursor-pointer">Cancel</button>
                <button type="submit" className="btn-primary px-4 py-1.5 text-xs cursor-pointer">Save Batch</button>
              </div>
            </form>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Batch Code</th>
                  <th className="px-6 py-3.5">Associated Course</th>
                  <th className="px-6 py-3.5">Assigned Faculty</th>
                  <th className="px-6 py-3.5">Class Schedule</th>
                  <th className="px-6 py-3.5">Enrolled / Max</th>
                  <th className="px-6 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {batches.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-4 font-black text-purple-700 dark:text-purple-300">{b.code}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{b.course}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{b.faculty}</td>
                    <td className="px-6 py-4 text-slate-500">{b.schedule}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 dark:text-white">{b.enrolled}</span> / {b.maxStudents}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        b.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. STUDENT MANAGEMENT & ATTENDANCE                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'students' && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" /> Student Enrollment &amp; Attendance Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage student profiles, view enrolled courses, and track/edit daily attendance (Present, On Leave, Day Off).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student or course..."
                  value={studentSearchQ}
                  onChange={e => setStudentSearchQ(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                {['All', 'Present', 'On Leave', 'Day Off'].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setStudentFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      studentFilter === filter
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAddStudentForm(!showAddStudentForm)}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-3.5 h-3.5" /> {showAddStudentForm ? 'Close Form' : 'Enroll Student'}
              </button>
            </div>
          </div>

          {showAddStudentForm && (
            <form onSubmit={handleAddStudent} className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-lg space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h4 className="text-xs font-extrabold text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4" /> Enroll New Student
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddStudentForm(false)}
                  className="text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Profile Identity Badge (Avatar removed to prevent misuse) */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center ring-2 ring-purple-500 shadow-xs shrink-0">
                  {newStudent.name ? newStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST'}
                </div>
                <div>
                  <label className="text-xs font-extrabold text-slate-900 dark:text-white block">
                    Student System Badge
                  </label>
                  <p className="text-[11px] text-slate-500">
                    Official student badge automatically generated for system and course records.
                  </p>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                  <label className="field-label">Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jordan Smith"
                    value={newStudent.name}
                    onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="input-field text-xs py-2"
                  />
                </div>
                <div>
                  <label className="field-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="jordan.smith@gmail.com"
                    value={newStudent.email}
                    onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                    className="input-field text-xs py-2"
                  />
                </div>
                <div>
                  <label className="field-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+1 555-0987"
                    value={newStudent.phone}
                    onChange={e => setNewStudent({ ...newStudent, phone: e.target.value })}
                    className="input-field text-xs py-2"
                  />
                </div>
                <div>
                  <label className="field-label">Primary Enrolled Course</label>
                  <select
                    value={newStudent.selectedCourses[0] || COURSES[0].title}
                    onChange={e => setNewStudent({ ...newStudent, selectedCourses: [e.target.value] })}
                    className="select-field text-xs py-2"
                  >
                    {COURSES.map(c => (
                      <option key={c.id} value={c.title}>{c.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Assigned Batch</label>
                  <select
                    value={newStudent.batch}
                    onChange={e => setNewStudent({ ...newStudent, batch: e.target.value })}
                    className="select-field text-xs py-2"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.code}>{b.code} ({b.course})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">Initial Attendance</label>
                  <select
                    value={newStudent.attendanceStatus}
                    onChange={e => setNewStudent({ ...newStudent, attendanceStatus: e.target.value })}
                    className="select-field text-xs py-2"
                  >
                    <option value="Present">🟢 Present</option>
                    <option value="On Leave">🟠 On Leave</option>
                    <option value="Day Off">🟡 Day Off</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddStudentForm(false)}
                  className="btn-secondary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
                >
                  Save Student Enrollment
                </button>
              </div>
            </form>
          )}

          {/* Student Details Table - Modernized Academy Admin Layout */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50/90 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th scope="col" className="px-6 py-4 min-w-[280px] sm:min-w-[320px] sticky left-0 z-20 bg-slate-50 dark:bg-slate-800 backdrop-blur-xs">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[240px] max-w-[320px]">
                      Enrolled Courses
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[110px]">
                      Batch
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[190px]">
                      Attendance
                    </th>
                    <th scope="col" className="px-6 py-4 min-w-[150px]">
                      Attendance Rate
                    </th>
                    <th scope="col" className="px-6 py-4 text-right w-20 min-w-[80px]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                        <GraduationCap className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
                        <p className="font-bold text-slate-600 dark:text-slate-400 text-xs">No students found matching your criteria</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Try adjusting your search query or filter options</p>
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(student => {
                      const isExpanded = !!expandedCourses[student.id];
                      const totalCourses = student.enrolledCourses.length;
                      const displayedCourses = isExpanded ? student.enrolledCourses : student.enrolledCourses.slice(0, 2);
                      const hasMore = totalCourses > 2;

                      return (
                        <tr 
                          key={student.id} 
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors group"
                        >
                          {/* 1. STUDENT (WIDEST COLUMN, STICKY LEFT ON MOBILE) */}
                          <td className="px-6 py-4 align-middle sticky left-0 z-10 bg-white dark:bg-slate-900 group-hover:bg-slate-50/90 dark:group-hover:bg-slate-800/60 transition-colors">
                            <div className="flex items-center gap-3.5">
                              <div className="relative shrink-0">
                                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center ring-2 ring-purple-500/20 shadow-xs">
                                  {student.name ? student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST'}
                                </div>
                                <span 
                                  className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                                    student.attendanceStatus === 'Present'
                                      ? 'bg-emerald-500'
                                      : student.attendanceStatus === 'On Leave'
                                      ? 'bg-rose-500'
                                      : 'bg-amber-500'
                                  }`} 
                                  title={`Status: ${student.attendanceStatus}`}
                                />
                              </div>

                              <div className="min-w-0 space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight">
                                    {student.name}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
                                    {student.studentId}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap">
                                  <span className="flex items-center gap-1 truncate max-w-[180px]">
                                    <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                    {student.email}
                                  </span>
                                  <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
                                  <span className="flex items-center gap-1 shrink-0 text-slate-400 dark:text-slate-500">
                                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                    {student.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* 2. ENROLLED COURSES (COMPACT BADGES WITH +N MORE EXPAND) */}
                          <td className="px-6 py-4 align-middle">
                            <div className="flex flex-wrap items-center gap-1.5 max-w-[320px]">
                              {displayedCourses.map((courseTitle, idx) => (
                                <span
                                  key={idx}
                                  title={courseTitle}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 font-bold text-[11px] border border-purple-200/60 dark:border-purple-900/60 max-w-[220px] truncate shadow-2xs"
                                >
                                  <BookOpen className="w-2.5 h-2.5 text-purple-500 shrink-0" />
                                  <span className="truncate">{courseTitle}</span>
                                </span>
                              ))}

                              {hasMore && (
                                <button
                                  type="button"
                                  onClick={() => toggleCourseExpand(student.id)}
                                  className="px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-100 hover:bg-purple-100 dark:bg-slate-800 dark:hover:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 transition-colors cursor-pointer"
                                  title={isExpanded ? 'Collapse courses' : 'Show all enrolled courses'}
                                >
                                  {isExpanded ? 'Show less' : `+${totalCourses - 2} more`}
                                </button>
                              )}
                            </div>
                          </td>

                          {/* 3. BATCH (COMPACT BADGE e.g. FS-01) */}
                          <td className="px-6 py-4 align-middle">
                            <span 
                              className="inline-flex items-center px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-extrabold text-[11px] border border-indigo-200/60 dark:border-indigo-900/60 shadow-2xs tracking-wide"
                              title={student.batch}
                            >
                              {student.batch.replace(/^Batch\s+/i, '')}
                            </span>
                          </td>

                          {/* 4. ATTENDANCE (SINGLE CLEAN COLUMN: DROPDOWN + EDIT ICON) */}
                          <td className="px-6 py-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="relative">
                                <select
                                  value={student.attendanceStatus}
                                  onChange={(e) => updateStudentAttendance(student.id, e.target.value)}
                                  className={`text-[11px] font-extrabold rounded-xl pl-2.5 pr-7 py-1.5 border appearance-none transition-all cursor-pointer shadow-2xs outline-none focus:ring-2 focus:ring-purple-500/40 ${
                                    student.attendanceStatus === 'Present'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-200 dark:border-emerald-800'
                                      : student.attendanceStatus === 'On Leave'
                                      ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/70 dark:text-rose-200 dark:border-rose-800'
                                      : 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/70 dark:text-amber-200 dark:border-amber-800'
                                  }`}
                                >
                                  <option value="Present">🟢 Present</option>
                                  <option value="On Leave">🟠 On Leave</option>
                                  <option value="Day Off">🟡 Day Off</option>
                                </select>
                                <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                              </div>

                            </div>
                          </td>

                          {/* 5. ATTENDANCE RATE (BOLD %, DAYS COUNT, COMPACT PROGRESS BAR) */}
                          <td className="px-6 py-4 align-middle">
                            <div className="space-y-1 min-w-[130px]">
                              <div className="flex items-baseline justify-between gap-2">
                                <span className="font-black text-sm text-slate-900 dark:text-white">
                                  {student.attendanceRate}
                                </span>
                                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                                  {student.attendedDays || 24} / {student.totalDays || 25} Days
                                </span>
                              </div>
                              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    parseInt(student.attendanceRate) >= 90
                                      ? 'bg-emerald-500'
                                      : parseInt(student.attendanceRate) >= 75
                                      ? 'bg-amber-500'
                                      : 'bg-rose-500'
                                  }`}
                                  style={{ width: student.attendanceRate }}
                                />
                              </div>
                            </div>
                          </td>

                          {/* 6. ACTIONS: EYE (VIEW PROGRESS) -> PENCIL (EDIT) -> TRASH (DELETE) */}
                          <td className="px-6 py-4 align-middle text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setViewingStudentProgress(student)}
                                title={`View academic course progress for ${student.name}`}
                                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-indigo-200 dark:hover:border-indigo-900/60"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditingStudent(student)}
                                title={`Edit details and attendance for ${student.name}`}
                                className="p-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/60 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-purple-200 dark:hover:border-purple-900/60"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setStudentDeleteConfirm(student)}
                                title={`Remove student ${student.name}`}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/60 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center border border-transparent hover:border-rose-200 dark:hover:border-rose-900/60"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Edit Student: {editingStudent.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingStudent(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[72vh] overflow-y-auto custom-scrollbar pr-1">
              {/* Identity Header (Photo/Avatar removed to prevent misuse) */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-xs flex items-center justify-center ring-2 ring-purple-500 shadow-xs">
                    {editingStudent.name ? editingStudent.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'ST'}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">{editingStudent.name}</span>
                    <span className="text-[11px] text-purple-600 dark:text-purple-400 font-extrabold">{editingStudent.studentId || 'STU-RECORD'}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200">
                  Verified Student
                </span>
              </div>

              {/* Editable Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.name || ''}
                    onChange={e => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="input-field text-xs py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="field-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={editingStudent.email || ''}
                    onChange={e => setEditingStudent({ ...editingStudent, email: e.target.value })}
                    className="input-field text-xs py-2 mt-1"
                  />
                </div>
              </div>

              {/* Editable Phone & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="field-label">Phone Number</label>
                  <input
                    type="text"
                    value={editingStudent.phone || ''}
                    onChange={e => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                    className="input-field text-xs py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="field-label">Assigned Batch</label>
                  <select
                    value={editingStudent.batch}
                    onChange={e => setEditingStudent({ ...editingStudent, batch: e.target.value })}
                    className="select-field text-xs py-2 mt-1"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={b.code}>{b.code} ({b.course})</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Attendance Status */}
              <div>
                <label className="field-label">Attendance Status</label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  {[
                    { id: 'Present', label: '🟢 Present', color: 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200' },
                    { id: 'On Leave', label: '🟠 On Leave', color: 'border-orange-500 bg-orange-50 text-orange-800 dark:bg-orange-950 dark:text-orange-200' },
                    { id: 'Day Off', label: '🟡 Day Off', color: 'border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200' },
                  ].map(option => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setEditingStudent({ ...editingStudent, attendanceStatus: option.id })}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${
                        editingStudent.attendanceStatus === option.id
                          ? `${option.color} ring-2 ring-purple-500/30`
                          : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-400'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editable Attended Days & Total Days with Live Attendance Rate Calculation */}
              <div className="grid grid-cols-2 gap-3 bg-purple-50/60 dark:bg-purple-950/30 p-3.5 rounded-xl border border-purple-200 dark:border-purple-900/50">
                <div>
                  <label className="field-label text-purple-950 dark:text-purple-200 font-bold">
                    Attended Days
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={editingStudent.attendedDays !== undefined ? editingStudent.attendedDays : 24}
                    onChange={e => {
                      const val = Math.max(0, parseInt(e.target.value) || 0);
                      const total = Math.max(1, parseInt(editingStudent.totalDays) || 25);
                      const rate = `${Math.min(100, Math.round((val / total) * 100))}%`;
                      setEditingStudent({ ...editingStudent, attendedDays: val, attendanceRate: rate });
                    }}
                    className="input-field text-xs py-1.5 mt-1 bg-white dark:bg-slate-900 font-black text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="field-label text-purple-950 dark:text-purple-200 font-bold">
                    Total Academic Days
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingStudent.totalDays !== undefined ? editingStudent.totalDays : 25}
                    onChange={e => {
                      const total = Math.max(1, parseInt(e.target.value) || 1);
                      const attended = Math.max(0, parseInt(editingStudent.attendedDays) || 0);
                      const rate = `${Math.min(100, Math.round((attended / total) * 100))}%`;
                      setEditingStudent({ ...editingStudent, totalDays: total, attendanceRate: rate });
                    }}
                    className="input-field text-xs py-1.5 mt-1 bg-white dark:bg-slate-900 font-black text-slate-900 dark:text-white"
                  />
                </div>
                <div className="col-span-2 flex items-center justify-between text-xs pt-1 px-1 border-t border-purple-200/50 dark:border-purple-900/40 mt-1">
                  <span className="font-semibold text-slate-600 dark:text-slate-400">Live Attendance Rate:</span>
                  <span className="font-black text-sm text-purple-700 dark:text-purple-300">
                    {editingStudent.attendanceRate || '96%'}
                  </span>
                </div>
              </div>

              {/* Enrolled Courses */}
              <div>
                <label className="field-label">Enrolled Courses</label>
                <div className="space-y-1.5 mt-1 max-h-36 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  {COURSES.slice(0, 8).map(course => {
                    const isEnrolled = editingStudent.enrolledCourses?.includes(course.title);
                    return (
                      <label key={course.id} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isEnrolled}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setEditingStudent({
                                ...editingStudent,
                                enrolledCourses: [...(editingStudent.enrolledCourses || []), course.title]
                              });
                            } else {
                              if ((editingStudent.enrolledCourses || []).length > 1) {
                                setEditingStudent({
                                  ...editingStudent,
                                  enrolledCourses: editingStudent.enrolledCourses.filter(c => c !== course.title)
                                });
                              } else {
                                showToast('A student must be enrolled in at least one course', 'warning');
                              }
                            }
                          }}
                          className="rounded text-purple-600"
                        />
                        <span className="line-clamp-1">{course.title}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer with Equal Width Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setEditingStudent(null)}
                className="btn-secondary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const finalAttended = Math.max(0, parseInt(editingStudent.attendedDays) || 0);
                  const finalTotal = Math.max(1, parseInt(editingStudent.totalDays) || 1);
                  const finalRate = `${Math.min(100, Math.round((finalAttended / finalTotal) * 100))}%`;
                  const updatedStudent = {
                    ...editingStudent,
                    attendedDays: finalAttended,
                    totalDays: finalTotal,
                    attendanceRate: finalRate
                  };
                  setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
                  setAuditLogs(logs => [{
                    id: Date.now(),
                    action: 'Student Profile Updated',
                    detail: `${updatedStudent.name}: ${updatedStudent.attendanceStatus}, ${updatedStudent.attendanceRate} (${updatedStudent.attendedDays}/${updatedStudent.totalDays} days), Batch: ${updatedStudent.batch}`,
                    time: 'Just now',
                    user: 'Admin'
                  }, ...logs]);
                  showToast(`${updatedStudent.name} profile & attendance updated successfully`, 'success');
                  setEditingStudent(null);
                }}
                className="btn-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Progress View Modal (Triggered by Eye Icon) */}
      {viewingStudentProgress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-3xl border border-indigo-200 dark:border-indigo-900/60 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-indigo-300 flex items-center justify-center font-bold">
                  <Eye className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-white">
                      {viewingStudentProgress.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                      {viewingStudentProgress.studentId || 'STU-RECORD'}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200/80 font-medium">
                    {viewingStudentProgress.batch} • Academic Progress &amp; Attendance Report
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingStudentProgress(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Quick Academic Metric Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Attendance Rate</span>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {viewingStudentProgress.attendanceRate}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {viewingStudentProgress.attendedDays || 24} / {viewingStudentProgress.totalDays || 25} Days
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                  <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
                    {viewingStudentProgress.attendanceStatus}
                  </div>
                  <span className="text-[10px] text-slate-500">On Campus Record</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Enrolled Programs</span>
                  <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {viewingStudentProgress.enrolledCourses?.length || 0}
                  </div>
                  <span className="text-[10px] text-slate-500">Active Curriculum</span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Batch</span>
                  <div className="text-sm font-black text-purple-600 dark:text-purple-400 mt-1 truncate">
                    {viewingStudentProgress.batch}
                  </div>
                  <span className="text-[10px] text-slate-500">Joined {viewingStudentProgress.joinedDate || 'Sep 2026'}</span>
                </div>
              </div>

              {/* Course-by-Course Progress Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    Course Completion &amp; Module Progress
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-400">
                    Live LMS Sync
                  </span>
                </div>

                <div className="space-y-3">
                  {getStudentCourseProgressDetails(viewingStudentProgress).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-indigo-300 dark:hover:border-indigo-800 transition-all shadow-xs space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <h5 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                            {item.courseName}
                          </h5>
                          <span className="text-[10px] font-bold text-slate-400">
                            Academic Assessment: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{item.grade}</span>
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                            {item.progressPercent}%
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 block">Overall Completion</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.progressPercent >= 85
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                              : item.progressPercent >= 70
                              ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
                              : 'bg-gradient-to-r from-amber-500 to-orange-500'
                          }`}
                          style={{ width: `${item.progressPercent}%` }}
                        />
                      </div>

                      {/* Modules & Labs details */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Modules: <strong className="text-slate-900 dark:text-white">{item.completedModules} / {item.totalModules}</strong> completed</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Labs: <strong className="text-slate-900 dark:text-white">{item.completedLabs} / {item.totalLabs}</strong> submitted</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                            item.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          }`}>
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{viewingStudentProgress.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{viewingStudentProgress.phone}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  Enrolled: {viewingStudentProgress.joinedDate || 'Sep 2026'}
                </div>
              </div>

            </div>

            {/* Footer Buttons with Equal Width */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setViewingStudentProgress(null)}
                className="btn-secondary w-full py-2.5 text-xs font-bold justify-center cursor-pointer"
              >
                Close Report
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = viewingStudentProgress;
                  setViewingStudentProgress(null);
                  setEditingStudent(target);
                }}
                className="btn-primary w-full py-2.5 text-xs font-bold justify-center cursor-pointer flex items-center gap-1.5"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Student Records</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. COURSE MANAGEMENT                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'courses' && (
        <div className="space-y-4 animate-in fade-in">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" /> Course Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Add, edit, view and manage all academy courses.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search courses..." value={courseSearchQ} onChange={e => setCourseSearchQ(e.target.value)} className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl" />
              </div>
              <button
                onClick={() => { setCourseModalMode('add'); setNewCourse({ title: '', category: 'Web Development', level: 'Beginner', description: '', duration: '12 Weeks', instructor: facultyList[0]?.name || '', imageUrl: '', modules: [''] }); setShowCourseModal(true); }}
                className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Plus className="w-3.5 h-3.5" /> Add Course
              </button>
            </div>
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminCourses.filter(c => c.title?.toLowerCase().includes(courseSearchQ.toLowerCase()) || c.category?.toLowerCase().includes(courseSearchQ.toLowerCase())).map(course => (
              <div key={course.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-shadow">
                <div className="h-32 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                  {course.image || course.imageUrl || course.thumbnail ? (
                    <img src={course.image || course.imageUrl || course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-slate-400" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-600 text-white text-[10px] font-extrabold">{course.level || 'Beginner'}</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white line-clamp-2">{course.title}</h4>
                  <div className="text-[11px] text-slate-500">{course.category} • {course.duration}</div>
                  <div className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                    {course.instructor?.name || course.instructor || course.trainer}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => { setSelectedCourseForEdit(course); setCourseModalMode('view'); setShowCourseModal(true); }}
                      className="flex-1 py-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button
                      onClick={() => { setSelectedCourseForEdit({...course}); setCourseModalMode('edit'); setShowCourseModal(true); }}
                      className="flex-1 py-1.5 text-[11px] font-bold text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/50 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => setCourseDeleteConfirm(course)}
                      className="flex-1 py-1.5 text-[11px] font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. INQUIRIES & CAREER APPLICATIONS                           */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4 animate-in fade-in">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-purple-600" /> Inquiries &amp; Career Applications Management
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time submissions from Careers Page applications, Student Inquiries, and Enrollment requests.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative w-56">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search applicant, subject..."
                  value={inquirySearchQ}
                  onChange={e => setInquirySearchQ(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs">
                {[
                  { id: 'All', label: 'All' },
                  { id: 'career', label: 'Careers' },
                  { id: 'inquiry', label: 'Inquiries' },
                  { id: 'unread', label: `Unread (${unreadCount})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setInquiryFilter(tab.id)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                      inquiryFilter === tab.id
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {adminNotifications.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <CheckCheck className="w-3.5 h-3.5" /> Mark All Read
                  </button>
                  <button
                    onClick={clearAllNotifications}
                    className="px-3 py-1.5 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Submissions List */}
          {filteredInquiries.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">No Submissions Found</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Any application submitted on the Careers page or inquiry submitted on the Contact form will instantly arrive here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredInquiries.map(item => (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border p-5 space-y-3 transition-all shadow-xs relative ${
                    !item.isRead
                      ? 'border-purple-300 dark:border-purple-800 ring-2 ring-purple-500/10'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                        item.type === 'career'
                          ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                          : item.type === 'inquiry'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {item.type === 'career' ? <Briefcase className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                        {item.type === 'career' ? 'Career Role Application' : 'Student Inquiry Form'}
                      </span>

                      {!item.isRead ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                          New Unread
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-slate-400">
                          Reviewed ✓
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium">
                      {item.timestamp}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {item.applicant}
                      </span>
                      <span>•</span>
                      <a href={`mailto:${item.email}`} className="text-purple-600 hover:underline flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {item.email}
                      </a>
                      {item.phone && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {item.phone}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.details}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400">
                      ID: {item.id}
                    </span>
                    <div className="flex items-center gap-2">
                      {!item.isRead ? (
                        <button
                          onClick={() => markNotificationAsRead(item.id)}
                          className="px-3 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-950 dark:text-purple-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      ) : (
                        <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Checked
                        </span>
                      )}
                      <button
                        onClick={() => openReplyModal(item)}
                        className="px-3 py-1 bg-slate-900 text-white dark:bg-slate-700 text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Reply <Send className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. AUDIT & ACTIVITY LOGS                                     */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm animate-in fade-in">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-600" /> Administrative Audit &amp; Security Trail
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified chronological activity log of faculty duty updates, leave records, student admissions, and attendance edits.
            </p>
          </div>

          <div className="space-y-3">
            {auditLogs.map(log => (
              <div key={log.id} className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-xs">
                    {log.user[0]}
                  </div>
                  <div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{log.action}</span>
                    <p className="text-[11px] text-slate-500">{log.detail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-semibold">{log.time}</span>
                  <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">{log.user}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 7. ANALYTICS                                                 */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'analytics' && (
        <StudentEnrollmentAnalytics />
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 8. SETTINGS                                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === 'settings' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" /> Admin Settings
            </h3>
          </div>
          <SettingsContent
            adminUser={adminUser}
            showToast={showToast}
            changeAdminPassword={changeAdminPassword}
            updateAdminProfile={updateAdminProfile}
          />
        </div>
      )}

      {/* ─── REPLY MODAL ─────────────────────────────────────────────── */}
      {replyTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="reply-modal-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeReplyModal}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in zoom-in-95">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h2 id="reply-modal-title" className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Send Reply
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Composing reply to&nbsp;
                    <span className="font-bold text-purple-600">{replyTarget.applicant}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={closeReplyModal}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                aria-label="Close reply modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4">

              {/* Success State */}
              {replySent ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Reply Sent Successfully!</h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Your reply has been delivered to&nbsp;
                    <span className="font-bold text-purple-600">{replyTarget.applicant}</span>
                    &nbsp;({replyTarget.email}).
                  </p>
                </div>
              ) : (
                <>
                  {/* Recipient Details */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 p-3.5 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-500 dark:text-slate-400 w-14 shrink-0">To:</span>
                      <span className="font-extrabold text-slate-900 dark:text-white">{replyTarget.applicant}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-slate-500 dark:text-slate-400 w-14 shrink-0">Email:</span>
                      <a
                        href={`mailto:${replyTarget.email}`}
                        className="text-purple-600 hover:underline font-semibold flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" /> {replyTarget.email}
                      </a>
                    </div>
                    <div className="flex items-start gap-2 text-xs">
                      <span className="font-bold text-slate-500 dark:text-slate-400 w-14 shrink-0 pt-0.5">Re:</span>
                      <span className="text-slate-700 dark:text-slate-300">{replyTarget.title}</span>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="space-y-1.5">
                    <label htmlFor="reply-message" className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Message <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="reply-message"
                      rows={5}
                      value={replyMessage}
                      onChange={e => {
                        setReplyMessage(e.target.value);
                        if (replyError) setReplyError('');
                      }}
                      placeholder={`Write your reply to ${replyTarget.applicant}...`}
                      className={`w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border rounded-xl resize-none focus:outline-none focus:ring-2 transition-all ${
                        replyError
                          ? 'border-rose-400 focus:ring-rose-400/30'
                          : 'border-slate-200 dark:border-slate-700 focus:ring-purple-500/30 focus:border-purple-400'
                      } text-slate-800 dark:text-slate-200 placeholder:text-slate-400`}
                    />
                    {/* Character count & Error */}
                    <div className="flex items-center justify-between">
                      {replyError ? (
                        <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                          <XCircle className="w-3.5 h-3.5" /> {replyError}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-[11px] text-slate-400 ml-auto">
                        {replyMessage.length} characters
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer Actions */}
            {!replySent && (
              <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <button
                  onClick={closeReplyModal}
                  disabled={replySending}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReply}
                  disabled={replySending}
                  className="px-4 py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {replySending ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" /> Send Reply
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Add/Edit/View Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in" onClick={(e) => { if (e.target === e.currentTarget) setShowCourseModal(false); }}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl border border-purple-200 dark:border-purple-900/60 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-600" />
                {courseModalMode === 'add' ? 'Add New Course' : courseModalMode === 'edit' ? `Edit: ${selectedCourseForEdit?.title}` : `View: ${selectedCourseForEdit?.title}`}
              </h3>
              <button onClick={() => setShowCourseModal(false)} className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {courseModalMode === 'view' ? (
                <div className="space-y-3 text-xs">
                  {selectedCourseForEdit?.image || selectedCourseForEdit?.imageUrl || selectedCourseForEdit?.thumbnail ? (
                    <img src={selectedCourseForEdit.image || selectedCourseForEdit.imageUrl || selectedCourseForEdit.thumbnail} alt={selectedCourseForEdit.title} className="w-full h-40 object-cover rounded-xl" />
                  ) : null}
                  {[
                    ['Title', selectedCourseForEdit?.title],
                    ['Category', selectedCourseForEdit?.category],
                    ['Level', selectedCourseForEdit?.level],
                    ['Duration', selectedCourseForEdit?.duration],
                    ['Instructor', selectedCourseForEdit?.instructor?.name || selectedCourseForEdit?.instructor || selectedCourseForEdit?.trainer],
                    ['Description', selectedCourseForEdit?.description]
                  ].map(([k, v]) => v ? (
                    <div key={k}><span className="font-bold text-slate-500">{k}:</span> <span className="text-slate-900 dark:text-white ml-1">{v}</span></div>
                  ) : null)}
                </div>
              ) : (
                <form onSubmit={courseModalMode === 'add' ? handleAddCourse : handleEditCourse} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="field-label">Course Name *</label>
                      <input
                        required
                        value={courseModalMode === 'add' ? newCourse.title : selectedCourseForEdit?.title || ''}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, title: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, title: e.target.value})}
                        className="input-field mt-1"
                        placeholder="e.g. Full-Stack Web Development"
                      />
                    </div>
                    <div>
                      <label className="field-label">Category</label>
                      <select
                        value={courseModalMode === 'add' ? newCourse.category : selectedCourseForEdit?.category || 'Web Development'}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, category: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, category: e.target.value})}
                        className="select-field mt-1"
                      >
                        {'Web Development,Artificial Intelligence,Data Science,UI/UX Design,Cybersecurity,Cloud & DevOps,Other'.split(',').map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="field-label">Level</label>
                      <select
                        value={courseModalMode === 'add' ? newCourse.level : selectedCourseForEdit?.level || 'Beginner'}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, level: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, level: e.target.value})}
                        className="select-field mt-1"
                      >
                        {['Beginner','Intermediate','Advanced'].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="field-label">Duration</label>
                      <input
                        value={courseModalMode === 'add' ? newCourse.duration : selectedCourseForEdit?.duration || ''}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, duration: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, duration: e.target.value})}
                        className="input-field mt-1"
                        placeholder="e.g. 12 Weeks"
                      />
                    </div>
                    <div>
                      <label className="field-label">Assigned Instructor</label>
                      <select
                        value={courseModalMode === 'add' ? newCourse.instructor : selectedCourseForEdit?.instructor || ''}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, instructor: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, instructor: e.target.value})}
                        className="select-field mt-1"
                      >
                        {facultyList.map(f => <option key={f.id} value={f.name}>{f.name}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="field-label">Course Image URL</label>
                      <input
                        value={courseModalMode === 'add' ? newCourse.imageUrl : selectedCourseForEdit?.imageUrl || selectedCourseForEdit?.image || ''}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, imageUrl: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, imageUrl: e.target.value, image: e.target.value})}
                        className="input-field mt-1"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="field-label">Description</label>
                      <textarea
                        rows={3}
                        value={courseModalMode === 'add' ? newCourse.description : selectedCourseForEdit?.description || ''}
                        onChange={e => courseModalMode === 'add' ? setNewCourse({...newCourse, description: e.target.value}) : setSelectedCourseForEdit({...selectedCourseForEdit, description: e.target.value})}
                        className="input-field mt-1 resize-none"
                        placeholder="Brief course description..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button type="button" onClick={() => setShowCourseModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer">Cancel</button>
                    <button type="submit" className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow cursor-pointer">{courseModalMode === 'add' ? 'Add Course' : 'Save Changes'}</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course Delete Confirmation */}
      {courseDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Delete Course?</h3>
              <p className="text-xs text-slate-500 mt-1">Are you sure you want to delete <strong>&ldquo;{courseDeleteConfirm.title}&rdquo;</strong>? This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setCourseDeleteConfirm(null)} className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl cursor-pointer">Cancel</button>
              <button onClick={() => handleDeleteCourse(courseDeleteConfirm)} className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Faculty Delete Confirmation */}
      {facultyDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Remove Faculty Member?</h3>
              <p className="text-xs text-slate-500 mt-1">Are you sure you want to remove <strong>{facultyDeleteConfirm.name}</strong>? The faculty record will be permanently deleted.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setFacultyDeleteConfirm(null)} className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl cursor-pointer">Cancel</button>
              <button onClick={() => handleDeleteFaculty(facultyDeleteConfirm.id)} className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer">Yes, Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* Student Delete Confirmation */}
      {studentDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 text-rose-600" />
            </div>
            <div className="text-center">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Remove Student Record?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to remove <strong>{studentDeleteConfirm.name}</strong> ({studentDeleteConfirm.studentId}) from the student roster?
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Note: Removing this record only deletes it from the admin roster. Other pages, course content, and batches are not affected.
              </p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setStudentDeleteConfirm(null)} 
                className="flex-1 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDeleteStudent(studentDeleteConfirm.id)} 
                className="flex-1 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl cursor-pointer shadow"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
