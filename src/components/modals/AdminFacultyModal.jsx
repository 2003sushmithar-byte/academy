import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FACULTY, COURSES } from '../../data/mockData';
import { X, UserPlus, Edit3, ShieldAlert, CheckCircle2, XCircle, BookOpen, Star, Plus } from 'lucide-react';

export default function AdminFacultyModal() {
  const { activeModal, closeModal, showToast } = useApp();
  const [facultyList, setFacultyList] = useState([
    { ...FACULTY[0], status: 'Active' },
    { ...FACULTY[1], status: 'Active' },
    { ...FACULTY[2], status: 'Active' },
    { ...FACULTY[3], status: 'Inactive' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    role: 'Instructor',
    specialization: 'Full-Stack Software Engineering',
    experience: '5+ Years',
    bio: ''
  });

  if (activeModal !== 'admin-faculty') return null;

  const toggleStatus = (id) => {
    setFacultyList(prev => prev.map(f => {
      if (f.id === id) {
        const nextStatus = f.status === 'Active' ? 'Inactive' : 'Active';
        showToast(`${f.name} status set to ${nextStatus}`, nextStatus === 'Active' ? 'success' : 'warning');
        return { ...f, status: nextStatus };
      }
      return f;
    }));
  };

  const handleAddFaculty = (e) => {
    e.preventDefault();
    if (!newFaculty.name || !newFaculty.specialization) {
      showToast('Please enter Instructor Name and Specialization', 'warning');
      return;
    }
    const created = {
      id: Date.now(),
      name: newFaculty.name,
      role: newFaculty.role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      experience: newFaculty.experience,
      specialization: newFaculty.specialization,
      rating: 4.90,
      bio: newFaculty.bio || 'Experienced faculty member.',
      coursesTaught: ['Web Development'],
      status: 'Active'
    };
    setFacultyList([created, ...facultyList]);
    setNewFaculty({ name: '', role: 'Instructor', specialization: 'Full-Stack Software Engineering', experience: '5+ Years', bio: '' });
    setShowAddForm(false);
    showToast(`New Faculty Member "${created.name}" Added Successfully!`, 'success');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
                Admin Faculty Management
                <span className="text-xs bg-purple-500/30 text-purple-300 border border-purple-500/40 px-2.5 py-0.5 rounded-full font-bold">Admin Panel</span>
              </h2>
              <p className="text-xs text-slate-400">Add, edit, activate/deactivate instructors and assign courses</p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Controls Bar */}
        <div className="bg-blue-50/80 border-b border-blue-200/80 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="text-xs font-bold text-slate-700">
            Total Instructors: <span className="text-indigo-600 font-extrabold">{facultyList.length}</span> (Active: <span className="text-emerald-600 font-extrabold">{facultyList.filter(f => f.status === 'Active').length}</span>)
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 text-xs font-extrabold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> {showAddForm ? 'Cancel Form' : 'Add New Instructor'}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#f5efea] space-y-6">

          {/* ADD FACULTY FORM */}
          {showAddForm && (
            <div className="bg-white p-6 rounded-2xl border-2 border-indigo-500/40 shadow-md space-y-4 animate-in slide-in-from-top-4 duration-200">
              <h4 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" /> Add New Faculty Member
              </h4>
              <form onSubmit={handleAddFaculty} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label mb-1 block">
                      Full Name <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Dr. Alan Turing"
                      value={newFaculty.name}
                      onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="field-label mb-1 block">Faculty Role / Title</label>
                    <input
                      type="text"
                      placeholder="Senior AI Instructor"
                      value={newFaculty.role}
                      onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="field-label mb-1 block">
                      Specialization <span className="text-red-500 font-bold ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Data Science, Machine Learning"
                      value={newFaculty.specialization}
                      onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="field-label mb-1 block">Years of Experience</label>
                    <input
                      type="text"
                      placeholder="10+ Years"
                      value={newFaculty.experience}
                      onChange={(e) => setNewFaculty({ ...newFaculty, experience: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <button type="submit" className="btn-primary py-2.5 px-6 text-xs font-bold cursor-pointer">
                  Save & Add Faculty Member
                </button>
              </form>
            </div>
          )}

          {/* FACULTY DIRECTORY TABLE */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-base font-extrabold text-slate-900">Registered Faculty Directory</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase font-extrabold text-[11px]">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Instructor</th>
                    <th className="px-4 py-3">Specialization</th>
                    <th className="px-4 py-3">Experience</th>
                    <th className="px-4 py-3">Rating</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right rounded-r-xl">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facultyList.map(f => (
                    <tr key={f.id} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3 font-bold text-slate-900 flex items-center gap-3">
                        <img src={f.avatar} alt={f.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/20" />
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{f.name}</p>
                          <p className="text-[11px] text-slate-500 font-normal">{f.role}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold">{f.specialization}</td>
                      <td className="px-4 py-3 font-semibold">{f.experience}</td>
                      <td className="px-4 py-3 font-bold text-amber-600 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {f.rating}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          f.status === 'Active' 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' 
                            : 'bg-rose-100 text-rose-700 border border-rose-300'
                        }`}>
                          {f.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button
                          onClick={() => showToast(`Assign Course modal opened for ${f.name}`, 'info')}
                          className="px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200"
                        >
                          Assign Course
                        </button>
                        <button
                          onClick={() => toggleStatus(f.id)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                            f.status === 'Active'
                              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
                              : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {f.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
