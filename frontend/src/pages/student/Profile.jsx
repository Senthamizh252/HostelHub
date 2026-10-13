import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  User, Camera, GraduationCap, Building, MapPin, BedDouble, Calendar, Droplet, 
  Mail, Phone, Globe, Lock, Info, Zap, Edit, LogOut, ArrowRight, BookOpen,
  PhoneCall, ShieldCheck, ChevronRight, UserCircle, Check, X, Save, AlertCircle,
  KeyRound, BellRing, Eye, EyeOff, Sparkles, Award, Compass, FileText
} from 'lucide-react';

const defaultProfileData = {
  // Personal Details
  fullName: 'Sushmitha S',
  email: 'sushmitha.s@college.edu',
  phone: '+91 98765 43210',
  dob: '2005-05-12',
  gender: 'Female',
  bloodGroup: 'B+',
  nationality: 'Indian',
  quote: 'Small steps make big progress.',
  address: '12/4, Muthu Nagar, Salem - 636001',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',

  // Academic Details
  degree: 'B.E. Computer Science and Engineering',
  college: 'KSR College of Engineering',
  year: '2nd Year',
  section: 'Section B',
  rollNumber: '22CS104',
  registerNumber: '731522104052',
  department: 'CSE',
  cgpa: '8.84',
  advisor: 'Dr. R. Kavitha (AP/CSE)',

  // Hostel Details
  hostelBlock: 'North Block',
  roomNo: 'A-102',
  bedType: 'Single Bed (Lower)',
  floor: '1st Floor',
  wardenName: 'Mrs. Priya Shankar',
  wardenContact: '+91 98765 11223',
  admissionDate: '2023-08-16',

  // Contact Information
  emergencyContact: '+91 98765 67890',
  emergencyRelation: 'Parent (Father)',
  emergencyName: 'Senthil Kumar',
  parentEmail: 'senthil.k@gmail.com',

  // Account Settings / Preferences
  emailNotifications: true,
  smsNotifications: false,
  leaveAlerts: true,
  complaintAlerts: true,
  messAlerts: true,
  twoFactorAuth: false
};

const presetAvatars = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
];

const StudentProfile = () => {
  const { user, updateUser, logout } = useAuth();
  const fileInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState('Personal Details');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('student_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      ...defaultProfileData,
      fullName: user?.name || defaultProfileData.fullName,
      email: user?.email || defaultProfileData.email,
      avatar: user?.avatar || defaultProfileData.avatar,
    };
  });

  const [formData, setFormData] = useState(profileData);
  const [toast, setToast] = useState(null);

  // Password Modal State
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Photo Modal State
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState('');

  const tabs = [
    'Personal Details', 
    'Academic Details', 
    'Hostel Details', 
    'Contact Information',
    'Account Settings'
  ];

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    setProfileData(formData);
    localStorage.setItem('student_profile', JSON.stringify(formData));
    
    // Update global auth user so navbar and sidebar reflect updates immediately
    if (updateUser) {
      updateUser({
        name: formData.fullName,
        email: formData.email,
        avatar: formData.avatar
      });
    }

    setIsEditing(false);
    showToast('Profile details updated successfully!');
  };

  const handleCancelEdit = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  // Image Upload / Preset Selection
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result;
        updateAvatar(newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAvatar = (newAvatar) => {
    setFormData(prev => ({ ...prev, avatar: newAvatar }));
    setProfileData(prev => {
      const updated = { ...prev, avatar: newAvatar };
      localStorage.setItem('student_profile', JSON.stringify(updated));
      return updated;
    });
    if (updateUser) {
      updateUser({ avatar: newAvatar });
    }
    setShowPhotoModal(false);
    showToast('Profile photo updated successfully!');
  };

  // Password Change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword) {
      showToast('Please enter your current password.', 'error');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('New password must be at least 6 characters long.', 'error');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }

    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    showToast('Password changed successfully!');
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-12 font-sans relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl transition-all duration-300 animate-in slide-in-from-top-3 ${
          toast.type === 'success' 
            ? 'bg-slate-900 text-white border border-slate-800' 
            : 'bg-red-600 text-white'
        }`}>
          {toast.type === 'success' ? (
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div className="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0">
              <AlertCircle size={14} strokeWidth={3} />
            </div>
          )}
          <span className="text-xs font-semibold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 text-slate-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header Banner */}
        <div className="bg-[#edf4ff] rounded-[22px] px-7 py-6 relative overflow-hidden flex items-center justify-between border border-blue-100/70 shadow-sm">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-full bg-[#1a6cf0] flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
              <User size={26} className="fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-0.5">My Profile & Settings</h1>
              <p className="text-slate-500 text-[13px]">Manage and edit your personal information, hostel records, and account settings.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-2 hidden sm:flex">
            <div className="w-36 h-24 relative flex items-center justify-center">
              <svg viewBox="0 0 160 120" className="w-full h-full">
                <circle cx="80" cy="60" r="38" fill="#bfdbfe" opacity="0.4" />
                <path d="M120 40 C130 30 140 50 150 40" fill="none" stroke="#93c5fd" strokeWidth="2" />
                <path d="M20 80 C30 90 40 70 50 80" fill="none" stroke="#93c5fd" strokeWidth="2" />
                <circle cx="140" cy="80" r="3" fill="#60a5fa" />
                <circle cx="30" cy="40" r="4" fill="#93c5fd" />
                
                {/* Gear / Settings */}
                <path d="M110 50 L115 45 L120 50 L115 55 Z" fill="#2563eb" />
                <circle cx="115" cy="50" r="8" fill="none" stroke="#2563eb" strokeWidth="3" />
                <circle cx="115" cy="50" r="3" fill="#2563eb" />

                {/* Profile Card / Girl */}
                <path d="M60 120 C60 90 100 90 100 120 Z" fill="#3b82f6" />
                <path d="M65 55 C60 70 60 90 70 95 C80 95 100 70 95 55 Z" fill="#1e3a8a" />
                <circle cx="80" cy="55" r="13" fill="#fbcfe8" />
                <path d="M65 55 C65 45 95 45 95 55 C95 48 65 48 65 55 Z" fill="#1e3a8a" />
              </svg>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10 pointer-events-none"></div>
        </div>

        {/* Profile Info Overview Card */}
        <div className="bg-white rounded-[22px] p-6 sm:p-7 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-7 items-center md:items-start relative overflow-hidden">
           
          {/* Profile Picture & Change Photo Button */}
          <div className="flex flex-col items-center gap-3 shrink-0 relative z-10">
            <div className="relative group cursor-pointer" onClick={() => setShowPhotoModal(true)}>
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 ring-2 ring-blue-100">
                <img 
                  src={profileData.avatar} 
                  alt="Profile" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></div>
              <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-semibold">
                <Camera size={20} />
              </div>
            </div>

            <button 
              onClick={() => setShowPhotoModal(true)}
              className="flex items-center gap-1.5 text-[#1a6cf0] font-bold text-xs bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <Camera size={13} /> Change Photo
            </button>
          </div>

          {/* User Details Overview */}
          <div className="flex-1 space-y-3.5 relative z-10 w-full text-center md:text-left">
            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-start">
              <h2 className="text-2xl font-bold text-slate-800 tracking-tight">{profileData.fullName}</h2>
              <span className="bg-[#1a6cf0] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">STUDENT</span>
              {isEditing && (
                <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                  <Edit size={10} /> EDITING MODE
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-y-2.5 gap-x-6 text-[13px]">
              <div className="flex items-center gap-2.5 text-slate-600 justify-center md:justify-start">
                <div className="text-[#1a6cf0] w-5 flex justify-center"><GraduationCap size={16} /></div>
                <span className="font-semibold text-slate-700">{profileData.degree}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 justify-center md:justify-start">
                <div className="text-[#1a6cf0] w-5 flex justify-center"><Building size={16} /></div>
                <span className="font-medium text-slate-600">{profileData.college}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 justify-center md:justify-start">
                <div className="text-[#1a6cf0] w-5 flex justify-center"><User size={16} /></div>
                <span className="font-medium text-slate-600">{profileData.year} <span className="mx-1.5 text-slate-300">|</span> {profileData.section}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 justify-center md:justify-start">
                <div className="text-[#1a6cf0] w-5 flex justify-center"><MapPin size={16} /></div>
                <span className="font-medium text-slate-600">Hostel Block — {profileData.hostelBlock}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-600 justify-center md:justify-start">
                <div className="text-[#1a6cf0] w-5 flex justify-center"><BedDouble size={16} /></div>
                <span className="font-medium text-slate-600">Room No. {profileData.roomNo}</span>
              </div>
            </div>
          </div>

          {/* Inspirational Quote Card */}
          <div className="w-full md:w-56 bg-gradient-to-br from-[#eff5ff] to-[#e4efff] rounded-2xl p-4.5 relative overflow-hidden shrink-0 hidden lg:block border border-blue-100/60 shadow-sm">
            <div className="relative z-10 flex h-full items-center">
              <p className="text-blue-700 italic font-medium leading-relaxed text-[13px] pr-4">
                "{profileData.quote}"
              </p>
            </div>
            <div className="absolute bottom-1 right-1 w-10 h-10 opacity-60">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 90 C30 70 80 40 90 20 C90 40 70 90 50 90 Z" fill="#93c5fd" />
                <path d="M40 80 C20 60 70 30 80 10 C80 30 60 80 40 80 Z" fill="#60a5fa" />
              </svg>
            </div>
          </div>
        </div>

        {/* Details Tabs & Editable Sections Card */}
        <div className="bg-white rounded-[22px] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-hidden">
          
          {/* Tabs Header & Edit Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-100 px-4 sm:px-6">
            <div className="flex overflow-x-auto scrollbar-hide gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 sm:px-5 py-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative cursor-pointer ${
                    activeTab === tab ? 'text-[#1a6cf0]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#1a6cf0] rounded-t-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Toggle Edit Button */}
            <div className="py-2.5 sm:py-0 shrink-0 flex items-center justify-end">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#1a6cf0] hover:bg-blue-700 text-white font-semibold text-xs rounded-full shadow-sm shadow-blue-200 transition-all cursor-pointer"
                >
                  <Edit size={13} />
                  <span>Edit Details</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    <X size={13} />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-full shadow-sm shadow-emerald-200 transition-all cursor-pointer"
                  >
                    <Save size={13} />
                    <span>Save Changes</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* TAB CONTENTS */}
          <div className="p-6 md:p-8">

            {/* TAB 1: PERSONAL DETAILS */}
            {activeTab === 'Personal Details' && (
              <div>
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><User size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Full Name</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.fullName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Mail size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Email ID</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Calendar size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Date of Birth</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.dob}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Phone size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Phone Number</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><UserCircle size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Gender</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.gender}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Droplet size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Blood Group</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.bloodGroup}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Globe size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Nationality</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.nationality}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Sparkles size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Personal Bio / Quote</p>
                        <p className="font-bold text-slate-800 text-sm italic">"{profileData.quote}"</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 md:col-span-2">
                      <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><MapPin size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Permanent Address</p>
                        <p className="font-bold text-slate-800 text-sm leading-relaxed max-w-lg">{profileData.address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Form in Edit Mode */
                  <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of Birth</label>
                        <input
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Gender</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => handleInputChange('gender', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium bg-white"
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Blood Group</label>
                        <select
                          value={formData.bloodGroup}
                          onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium bg-white"
                        >
                          {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Nationality</label>
                        <input
                          type="text"
                          value={formData.nationality}
                          onChange={(e) => handleInputChange('nationality', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Personal Bio / Quote</label>
                        <input
                          type="text"
                          value={formData.quote}
                          onChange={(e) => handleInputChange('quote', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Permanent Address</label>
                        <textarea
                          rows="2"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-5 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl text-white bg-[#1a6cf0] hover:bg-blue-700 text-xs font-bold transition-all shadow-md shadow-blue-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={14} /> Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: ACADEMIC DETAILS */}
            {activeTab === 'Academic Details' && (
              <div>
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><GraduationCap size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Program / Degree</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.degree}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><Building size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">College / Institution</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.college}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><BookOpen size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Department</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.department}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><Calendar size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Academic Year & Section</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.year} — {profileData.section}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><Award size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Roll Number</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.rollNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><FileText size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Register Number</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.registerNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><Sparkles size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Current CGPA</p>
                        <p className="font-bold text-emerald-600 text-sm">{profileData.cgpa} / 10.0</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-purple-50 text-purple-600 p-2.5 rounded-full shrink-0"><User size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Faculty Advisor</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.advisor}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Program / Degree</label>
                        <input
                          type="text"
                          value={formData.degree}
                          onChange={(e) => handleInputChange('degree', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">College</label>
                        <input
                          type="text"
                          value={formData.college}
                          onChange={(e) => handleInputChange('college', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Year</label>
                        <select
                          value={formData.year}
                          onChange={(e) => handleInputChange('year', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white"
                        >
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Section</label>
                        <input
                          type="text"
                          value={formData.section}
                          onChange={(e) => handleInputChange('section', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Roll Number</label>
                        <input
                          type="text"
                          value={formData.rollNumber}
                          onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Register Number</label>
                        <input
                          type="text"
                          value={formData.registerNumber}
                          onChange={(e) => handleInputChange('registerNumber', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">CGPA</label>
                        <input
                          type="text"
                          value={formData.cgpa}
                          onChange={(e) => handleInputChange('cgpa', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Faculty Advisor</label>
                        <input
                          type="text"
                          value={formData.advisor}
                          onChange={(e) => handleInputChange('advisor', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-5 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl text-white bg-[#1a6cf0] hover:bg-blue-700 text-xs font-bold transition-all shadow-md shadow-blue-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={14} /> Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 3: HOSTEL DETAILS */}
            {activeTab === 'Hostel Details' && (
              <div>
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><Building size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Hostel Block</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.hostelBlock}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><BedDouble size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Room Number</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.roomNo}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><Compass size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Floor</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.floor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><BedDouble size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Bed Type</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.bedType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><User size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Block Warden</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.wardenName}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><PhoneCall size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Warden Contact</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.wardenContact}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><Calendar size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Hostel Admission Date</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.admissionDate}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Hostel Block</label>
                        <select
                          value={formData.hostelBlock}
                          onChange={(e) => handleInputChange('hostelBlock', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white"
                        >
                          <option value="North Block">North Block</option>
                          <option value="South Block">South Block</option>
                          <option value="East Block">East Block</option>
                          <option value="West Block">West Block</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Room Number</label>
                        <input
                          type="text"
                          value={formData.roomNo}
                          onChange={(e) => handleInputChange('roomNo', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Floor</label>
                        <input
                          type="text"
                          value={formData.floor}
                          onChange={(e) => handleInputChange('floor', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Bed Type</label>
                        <input
                          type="text"
                          value={formData.bedType}
                          onChange={(e) => handleInputChange('bedType', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Warden Name</label>
                        <input
                          type="text"
                          value={formData.wardenName}
                          onChange={(e) => handleInputChange('wardenName', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Warden Contact</label>
                        <input
                          type="text"
                          value={formData.wardenContact}
                          onChange={(e) => handleInputChange('wardenContact', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-5 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl text-white bg-[#1a6cf0] hover:bg-blue-700 text-xs font-bold transition-all shadow-md shadow-blue-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={14} /> Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 4: CONTACT INFORMATION */}
            {activeTab === 'Contact Information' && (
              <div>
                {!isEditing ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-12">
                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><Phone size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Primary Mobile Number</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><Mail size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Primary Email</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><User size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Emergency Contact Person</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.emergencyName}</p>
                        <p className="text-xs text-slate-500 font-medium">({profileData.emergencyRelation})</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><PhoneCall size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Emergency Phone</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.emergencyContact}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><Mail size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Parent / Guardian Email</p>
                        <p className="font-bold text-slate-800 text-sm">{profileData.parentEmail}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 md:col-span-2">
                      <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-full shrink-0"><MapPin size={18} /></div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-bold mb-0.5">Residential Address</p>
                        <p className="font-bold text-slate-800 text-sm leading-relaxed max-w-lg">{profileData.address}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Mobile Number</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Primary Email</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Emergency Contact Name</label>
                        <input
                          type="text"
                          value={formData.emergencyName}
                          onChange={(e) => handleInputChange('emergencyName', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Emergency Contact Phone</label>
                        <input
                          type="text"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Relationship to Student</label>
                        <input
                          type="text"
                          value={formData.emergencyRelation}
                          onChange={(e) => handleInputChange('emergencyRelation', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Parent Email</label>
                        <input
                          type="email"
                          value={formData.parentEmail}
                          onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">Residential Address</label>
                        <textarea
                          rows="2"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        ></textarea>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="px-5 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl text-white bg-[#1a6cf0] hover:bg-blue-700 text-xs font-bold transition-all shadow-md shadow-blue-200 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check size={14} /> Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB 5: ACCOUNT SETTINGS */}
            {activeTab === 'Account Settings' && (
              <div className="space-y-8 animate-in fade-in duration-300">
                {/* Security Section */}
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Lock size={16} className="text-[#1a6cf0]" /> Account Security
                  </h3>
                  
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm mb-1">Account Password</h4>
                      <p className="text-xs text-slate-500">Regularly updating your password prevents unauthorized access to your account.</p>
                    </div>
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="px-4 py-2 bg-white border border-blue-200 text-[#1a6cf0] hover:bg-blue-50 font-bold text-xs rounded-xl shadow-sm transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
                    >
                      <KeyRound size={14} /> Change Password
                    </button>
                  </div>
                </div>

                {/* Notifications Preferences */}
                <div>
                  <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <BellRing size={16} className="text-[#1a6cf0]" /> Notification Preferences
                  </h3>

                  <div className="space-y-3">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive daily updates and announcements in your inbox' },
                      { key: 'leaveAlerts', label: 'Leave Request Status Alerts', desc: 'Instant alerts when warden approves or responds to leave' },
                      { key: 'complaintAlerts', label: 'Complaint Updates', desc: 'Notifications when your maintenance complaints are updated' },
                      { key: 'messAlerts', label: 'Mess Menu & Food Announcements', desc: 'Get updates regarding special meals and menu revisions' },
                    ].map((pref) => (
                      <div key={pref.key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">{pref.label}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{pref.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={profileData[pref.key] ?? true}
                            onChange={(e) => {
                              const updated = { ...profileData, [pref.key]: e.target.checked };
                              setProfileData(updated);
                              setFormData(updated);
                              localStorage.setItem('student_profile', JSON.stringify(updated));
                              showToast(`${pref.label} preference updated.`);
                            }}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a6cf0]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Change Password Block (Prominent Quick Access) */}
        <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-blue-100 transition-colors">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-[#1a6cf0] p-3 rounded-2xl"><Lock size={20} className="fill-current" /></div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">Security & Password</h3>
              <p className="text-[12px] text-slate-500 font-medium">Keep your account secure with a strong password.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="whitespace-nowrap px-4 py-2 bg-white border border-blue-200 text-[#1a6cf0] font-bold text-xs rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            Change Password <ArrowRight size={14} />
          </button>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-80 space-y-6 shrink-0">
        
        {/* Quick Information Card */}
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-[#1a6cf0]"><Info size={16} className="fill-current" /></div>
            <h3 className="font-bold text-slate-800 text-sm">Quick Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="bg-slate-50 p-1.5 rounded-lg text-[#1a6cf0]"><Building size={14} /></div>
                <span className="text-[12px] font-medium">Hostel</span>
              </div>
              <span className="text-[12px] font-bold text-slate-800">{profileData.hostelBlock}</span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="bg-slate-50 p-1.5 rounded-lg text-[#1a6cf0]"><BedDouble size={14} /></div>
                <span className="text-[12px] font-medium">Room No.</span>
              </div>
              <span className="text-[12px] font-bold text-slate-800">{profileData.roomNo}</span>
            </div>

            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="bg-slate-50 p-1.5 rounded-lg text-[#1a6cf0]"><User size={14} className="fill-current" /></div>
                <span className="text-[12px] font-medium">Year</span>
              </div>
              <span className="text-[12px] font-bold text-slate-800">{profileData.year}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-slate-600">
                <div className="bg-slate-50 p-1.5 rounded-lg text-[#1a6cf0]"><BookOpen size={14} className="fill-current" /></div>
                <span className="text-[12px] font-medium">Department</span>
              </div>
              <span className="text-[12px] font-bold text-slate-800">{profileData.department}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-[#1a6cf0]"><Zap size={16} className="fill-current" /></div>
            <h3 className="font-bold text-slate-800 text-sm">Quick Actions</h3>
          </div>

          <div className="space-y-2.5">
            {/* Edit Profile Action */}
            <div 
              onClick={() => {
                setIsEditing(true);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-[#1a6cf0] p-2 rounded-lg group-hover:scale-105 transition-transform"><Edit size={16} className="fill-current" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Edit Profile</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Update your personal information</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
            </div>

            {/* Change Password Action */}
            <div 
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-[#1a6cf0] p-2 rounded-lg group-hover:scale-105 transition-transform"><Lock size={16} className="fill-current" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Change Password</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Update your account password</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
            </div>

            {/* Download ID Card Action */}
            <div 
              onClick={() => showToast('Student ID Card downloaded successfully!')}
              className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 text-[#1a6cf0] p-2 rounded-lg group-hover:scale-105 transition-transform"><ShieldCheck size={16} className="fill-current" /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Download ID Card</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Get verified hostel ID card</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
            </div>

            {/* Logout Action */}
            <div 
              onClick={logout}
              className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-red-200 hover:bg-red-50/30 group cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-red-50 text-red-500 p-2 rounded-lg group-hover:scale-105 transition-transform"><LogOut size={16} /></div>
                <div>
                  <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-red-700 transition-colors">Logout</h4>
                  <p className="text-[10px] text-slate-500 font-medium">Sign out from your account</p>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-red-500" />
            </div>
          </div>
        </div>

        {/* Motivation Card */}
        <div className="bg-[#eff4ff] rounded-[20px] p-6 border border-blue-100 relative overflow-hidden">
          <div className="relative z-10 flex flex-col gap-3">
            <div className="bg-[#1a6cf0] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
              <GraduationCap size={24} className="fill-current" />
            </div>
            <div>
              <h3 className="text-blue-700 font-bold text-sm mb-1">Keep going!</h3>
              <p className="text-blue-600/80 text-[11px] font-medium leading-relaxed max-w-[200px]">Your hard work today builds your tomorrow.</p>
            </div>
          </div>
          
          <div className="absolute bottom-0 right-0 w-24 h-24 opacity-60">
            <svg viewBox="0 0 100 100" fill="#93c5fd">
              <path d="M50 50 C20 20 80 0 100 0 C100 20 80 80 50 50 Z" />
              <path d="M50 50 C80 80 100 20 100 0 C80 0 20 20 50 50 Z" fill="#60a5fa" />
            </svg>
          </div>
        </div>

      </div>

      {/* =================================================== */}
      {/* MODAL 1: CHANGE PROFILE PHOTO                       */}
      {/* =================================================== */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Camera size={18} className="text-[#1a6cf0]" /> Update Profile Photo
              </h3>
              <button 
                onClick={() => setShowPhotoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-5 space-y-5">
              {/* Device Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Upload from Computer</label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3.5 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/50 hover:bg-blue-50 rounded-2xl flex flex-col items-center justify-center text-blue-600 transition-colors cursor-pointer"
                >
                  <Camera size={24} className="mb-1" />
                  <span className="text-xs font-bold">Choose Image File</span>
                  <span className="text-[10px] text-slate-400">PNG, JPG, WEBP up to 5MB</span>
                </button>
              </div>

              {/* Or Select Preset */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Or Choose a Preset Avatar</label>
                <div className="flex items-center justify-between gap-2 overflow-x-auto py-1">
                  {presetAvatars.map((url, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => updateAvatar(url)}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200 hover:border-blue-500 hover:scale-105 transition-all shrink-0 cursor-pointer"
                    >
                      <img src={url} alt={`Preset ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Or Custom URL */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Or Paste Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (photoUrlInput.trim()) updateAvatar(photoUrlInput.trim());
                    }}
                    className="px-4 py-2 bg-[#1a6cf0] text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* MODAL 2: CHANGE PASSWORD                            */}
      {/* =================================================== */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in">
          <div className="bg-white rounded-[24px] max-w-md w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Lock size={18} className="text-[#1a6cf0]" /> Change Password
              </h3>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="py-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Confirm New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  required
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1a6cf0] hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-200 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Check size={14} /> Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentProfile;
