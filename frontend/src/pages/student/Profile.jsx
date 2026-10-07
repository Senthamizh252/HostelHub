import React, { useState } from 'react';
import { 
  User, Camera, GraduationCap, Building, MapPin, BedDouble, Calendar, Droplet, 
  Mail, Phone, Globe, Lock, Info, Zap, Edit, LogOut, ArrowRight, BookOpen,
  PhoneCall, ShieldCheck, ChevronRight, UserCircle
} from 'lucide-react';

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState('Personal Details');

  const tabs = ['Personal Details', 'Academic Details', 'Hostel Details', 'Contact Information'];

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans relative">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
              <User size={28} className="fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">My Profile</h1>
              <p className="text-slate-500 text-sm">Manage your personal information and account settings.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
            <div className="relative w-40 h-28 flex items-center justify-center">
               <svg viewBox="0 0 160 120" className="w-full h-full">
                 {/* Background Elements */}
                 <circle cx="80" cy="60" r="40" fill="#bfdbfe" opacity="0.3" />
                 <path d="M120 40 C130 30 140 50 150 40" fill="none" stroke="#93c5fd" strokeWidth="2" />
                 <path d="M20 80 C30 90 40 70 50 80" fill="none" stroke="#93c5fd" strokeWidth="2" />
                 <circle cx="140" cy="80" r="3" fill="#60a5fa" />
                 <circle cx="30" cy="40" r="4" fill="#93c5fd" />
                 
                 {/* Gear */}
                 <path d="M110 50 L115 45 L120 50 L115 55 Z" fill="#2563eb" />
                 <circle cx="115" cy="50" r="8" fill="none" stroke="#2563eb" strokeWidth="3" />
                 <circle cx="115" cy="50" r="3" fill="#2563eb" />
                 <path d="M115 40 L115 35 M115 60 L115 65 M105 50 L100 50 M125 50 L130 50 M108 43 L105 40 M122 57 L125 60 M108 57 L105 60 M122 43 L125 40" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />

                 {/* Document/Paper */}
                 <rect x="25" y="45" width="25" height="35" rx="2" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" transform="rotate(-10 35 60)" />
                 <line x1="30" y1="52" x2="45" y2="52" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" transform="rotate(-10 35 60)" />
                 <line x1="30" y1="60" x2="40" y2="60" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" transform="rotate(-10 35 60)" />
                 <line x1="30" y1="68" x2="45" y2="68" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" transform="rotate(-10 35 60)" />

                 {/* Person/Girl */}
                 <path d="M60 120 C60 90 100 90 100 120 Z" fill="#3b82f6" />
                 {/* Hair back */}
                 <path d="M65 55 C60 70 60 90 70 95 C80 95 100 70 95 55 Z" fill="#1e3a8a" />
                 {/* Face */}
                 <circle cx="80" cy="55" r="14" fill="#fbcfe8" />
                 {/* Hair front */}
                 <path d="M65 55 C65 45 95 45 95 55 C95 48 65 48 65 55 Z" fill="#1e3a8a" />
                 {/* Arms/Hands */}
                 <path d="M60 100 C50 100 45 95 45 90" fill="none" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" />
                 <path d="M100 100 C110 100 115 95 115 90" fill="none" stroke="#fbcfe8" strokeWidth="5" strokeLinecap="round" />
                 {/* ID Card in hand */}
                 <rect x="35" y="80" width="10" height="15" fill="#60a5fa" rx="1" transform="rotate(-20 40 85)" />
               </svg>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10 pointer-events-none"></div>
        </div>

        {/* Profile Info Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-center md:items-start relative overflow-hidden">
           
           {/* Profile Picture */}
           <div className="flex flex-col items-center gap-3 shrink-0 relative z-10">
              <div className="relative">
                 <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                 </div>
                 <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <button className="flex items-center gap-1.5 text-blue-600 font-bold text-[11px] bg-blue-50 hover:bg-blue-100 px-4 py-1.5 rounded-full transition-colors">
                 <Camera size={14} /> Change Photo
              </button>
           </div>

           {/* User Details */}
           <div className="flex-1 space-y-4 relative z-10 w-full">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                 <h2 className="text-2xl font-bold text-slate-800">Sushmitha S</h2>
                 <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">Student</span>
              </div>
              
              <div className="grid grid-cols-1 gap-y-3 gap-x-6 text-sm">
                 <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="text-blue-500 w-5 flex justify-center"><GraduationCap size={16} /></div>
                    <span className="font-medium">B.E. Computer Science and Engineering</span>
                 </div>
                 <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="text-blue-500 w-5 flex justify-center"><Building size={16} /></div>
                    <span className="font-medium">KSR College of Engineering</span>
                 </div>
                 <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="text-blue-500 w-5 flex justify-center"><User size={16} /></div>
                    <span className="font-medium">2nd Year <span className="mx-1.5 text-slate-300">|</span> Section B</span>
                 </div>
                 <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="text-blue-500 w-5 flex justify-center"><MapPin size={16} /></div>
                    <span className="font-medium">Hostel Block - North Block</span>
                 </div>
                 <div className="flex items-center gap-2.5 text-slate-600">
                    <div className="text-blue-500 w-5 flex justify-center"><BedDouble size={16} /></div>
                    <span className="font-medium">Room No. A-102</span>
                 </div>
              </div>
           </div>

           {/* Quote Card */}
           <div className="w-full md:w-56 bg-[#eff4ff] rounded-2xl p-5 relative overflow-hidden shrink-0 hidden md:block border border-blue-50">
              <div className="relative z-10 flex h-full items-center">
                 <p className="text-blue-700 italic font-medium leading-relaxed text-sm pr-6">
                   "Small steps make big progress."
                 </p>
              </div>
              {/* Leaves SVG */}
              <div className="absolute bottom-2 right-2 w-10 h-10 opacity-70">
                 <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M50 90 C30 70 80 40 90 20 C90 40 70 90 50 90 Z" fill="#93c5fd" />
                    <path d="M40 80 C20 60 70 30 80 10 C80 30 60 80 40 80 Z" fill="#60a5fa" />
                    <path d="M60 95 C40 75 90 45 100 25 C100 45 80 95 60 95 Z" fill="#93c5fd" />
                 </svg>
              </div>
           </div>
        </div>

        {/* Details Tabs & Content */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           {/* Tabs Header */}
           <div className="flex overflow-x-auto border-b border-slate-100 scrollbar-hide">
              {tabs.map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-4 text-sm font-bold whitespace-nowrap transition-colors relative ${
                     activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                   }`}
                 >
                   {tab}
                   {activeTab === tab && (
                     <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                   )}
                 </button>
              ))}
           </div>

           {/* Tab Content (Personal Details) */}
           <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                 
                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><User size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Full Name</p>
                       <p className="font-bold text-slate-800 text-sm">Sushmitha S</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Mail size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Email ID</p>
                       <p className="font-bold text-slate-800 text-sm">sushmitha.s@college.edu</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Calendar size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Date of Birth</p>
                       <p className="font-bold text-slate-800 text-sm">12 May 2005</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Phone size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Phone Number</p>
                       <p className="font-bold text-slate-800 text-sm">+91 98765 43210</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><UserCircle size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Gender</p>
                       <p className="font-bold text-slate-800 text-sm">Female</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><PhoneCall size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Emergency Contact</p>
                       <p className="font-bold text-slate-800 text-sm mb-0.5">+91 98765 67890</p>
                       <p className="text-xs text-slate-500 font-medium">(Parent)</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Droplet size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Blood Group</p>
                       <p className="font-bold text-slate-800 text-sm">B+</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><Globe size={18} /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Nationality</p>
                       <p className="font-bold text-slate-800 text-sm">Indian</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-4 md:col-span-2">
                    <div className="bg-blue-50 text-blue-500 p-2.5 rounded-full shrink-0"><MapPin size={18} className="fill-current" /></div>
                    <div>
                       <p className="text-[11px] text-slate-500 font-bold mb-1">Address</p>
                       <p className="font-bold text-slate-800 text-sm leading-relaxed max-w-sm">
                         12/4, Muthu Nagar,<br />
                         Salem - 636001
                       </p>
                    </div>
                 </div>

              </div>
           </div>
        </div>

        {/* Change Password Block */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-blue-100 transition-colors">
           <div className="flex items-center gap-4">
              <div className="bg-blue-50 text-blue-500 p-3 rounded-xl"><Lock size={20} className="fill-current" /></div>
              <div>
                 <h3 className="font-bold text-slate-800 text-sm mb-1">Change Password</h3>
                 <p className="text-[11px] text-slate-500 font-medium">Keep your account secure with a strong password.</p>
              </div>
           </div>
           <button className="whitespace-nowrap px-4 py-2 bg-white border border-blue-200 text-blue-600 font-bold text-xs rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center gap-1.5 shadow-sm">
              Change Password <ArrowRight size={14} />
           </button>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-80 space-y-6 shrink-0">
        
        {/* Quick Information */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-6">
             <div className="text-blue-600"><Info size={16} className="fill-current" /></div>
             <h3 className="font-bold text-slate-800 text-sm">Quick Information</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                 <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded-lg text-blue-500"><Building size={14} /></div>
                    <span className="text-[12px] font-medium">Hostel</span>
                 </div>
                 <span className="text-[12px] font-bold text-slate-800">North Block</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                 <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded-lg text-blue-500"><BedDouble size={14} /></div>
                    <span className="text-[12px] font-medium">Room No.</span>
                 </div>
                 <span className="text-[12px] font-bold text-slate-800">A-102</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                 <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded-lg text-blue-500"><User size={14} className="fill-current" /></div>
                    <span className="text-[12px] font-medium">Year</span>
                 </div>
                 <span className="text-[12px] font-bold text-slate-800">2nd Year</span>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                 <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-slate-50 p-1.5 rounded-lg text-blue-500"><BookOpen size={14} className="fill-current" /></div>
                    <span className="text-[12px] font-medium">Department</span>
                 </div>
                 <span className="text-[12px] font-bold text-slate-800">CSE</span>
              </div>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="text-blue-600"><Zap size={16} className="fill-current" /></div>
             <h3 className="font-bold text-slate-800 text-sm">Quick Actions</h3>
           </div>

           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><Edit size={16} className="fill-current" /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors mb-0.5">Edit Profile</h4>
                      <p className="text-[9px] text-slate-500 font-medium">Update your personal information</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><Lock size={16} className="fill-current" /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors mb-0.5">Change Password</h4>
                      <p className="text-[9px] text-slate-500 font-medium">Update your password</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><ShieldCheck size={16} className="fill-current" /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors mb-0.5">Download ID Card</h4>
                      <p className="text-[9px] text-slate-500 font-medium">Get your student ID card</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><LogOut size={16} className="fill-current" /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors mb-0.5">Logout</h4>
                      <p className="text-[9px] text-slate-500 font-medium">Sign out from your account</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>
           </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 border border-blue-100 relative overflow-hidden">
           <div className="relative z-10 flex flex-col gap-3">
              <div className="bg-blue-600 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center shadow-sm">
                 <GraduationCap size={24} className="fill-current" />
              </div>
              <div>
                 <h3 className="text-blue-700 font-bold text-sm mb-1">Keep going!</h3>
                 <p className="text-blue-600/80 text-[11px] font-medium leading-relaxed max-w-[180px]">Your hard work today builds your tomorrow.</p>
              </div>
           </div>
           
           {/* Background Leaves */}
           <div className="absolute bottom-0 right-0 w-24 h-24 opacity-60">
              <svg viewBox="0 0 100 100" fill="#93c5fd">
                 <path d="M50 50 C20 20 80 0 100 0 C100 20 80 80 50 50 Z" />
                 <path d="M50 50 C80 80 100 20 100 0 C80 0 20 20 50 50 Z" fill="#60a5fa" />
              </svg>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;
