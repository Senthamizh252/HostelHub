import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, FileText, Clock, Settings, CheckCircle2, Search, 
  ChevronDown, RefreshCw, Droplet, Zap, Sparkles, Wifi, 
  Armchair, Eye, ChevronRight, ChevronLeft, Info, Check, 
  Phone, Plus, Heart
} from 'lucide-react';

const complaintsData = [
  { id: '#C001', category: 'Water', icon: Droplet, iconColor: 'text-blue-500', iconBg: 'bg-blue-100', desc: 'No water supply in bathroom', room: 'A-204', priority: 'Emergency', status: 'Pending', date: '28 Sep 2026', time: '10:30 AM' },
  { id: '#C002', category: 'Electrical', icon: Zap, iconColor: 'text-orange-500', iconBg: 'bg-orange-100', desc: 'Fan not working in room', room: 'A-204', priority: 'High', status: 'In Progress', date: '27 Sep 2026', time: '04:15 PM' },
  { id: '#C003', category: 'Cleaning', icon: Sparkles, iconColor: 'text-green-500', iconBg: 'bg-green-100', desc: 'Room not cleaned properly', room: 'A-103', priority: 'Medium', status: 'Assigned', date: '26 Sep 2026', time: '11:20 AM' },
  { id: '#C004', category: 'WiFi', icon: Wifi, iconColor: 'text-blue-500', iconBg: 'bg-blue-100', desc: 'Slow internet speed in hostel', room: 'B-112', priority: 'Low', status: 'Resolved', date: '24 Sep 2026', time: '02:45 PM' },
  { id: '#C005', category: 'Furniture', icon: Armchair, iconColor: 'text-purple-500', iconBg: 'bg-purple-100', desc: 'Broken chair in study room', room: 'A-301', priority: 'Medium', status: 'Resolved', date: '21 Sep 2026', time: '09:10 AM' },
];

const getPriorityPill = (priority) => {
  switch(priority) {
    case 'Emergency': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-500">Emergency</span>;
    case 'High': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-400">High</span>;
    case 'Medium': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-500">Medium</span>;
    case 'Low': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-500">Low</span>;
    default: return null;
  }
};

const getStatusPill = (status) => {
  switch(status) {
    case 'Pending': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-500">Pending</span>;
    case 'In Progress': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-500">In Progress</span>;
    case 'Assigned': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-500">Assigned</span>;
    case 'Resolved': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-500">Resolved</span>;
    default: return null;
  }
};

const StudentComplaints = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6">
        
        {/* Breadcrumbs & Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-500 font-medium mb-3">
            <Link to="/student/dashboard" className="hover:underline">Dashboard</Link>
            <ChevronRight size={12} className="text-slate-400" />
            <span className="text-slate-500">My Complaints</span>
          </div>

          <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
            <div className="flex items-center gap-4 relative z-10">
              <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
                <Wrench size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">My Complaints</h1>
                <p className="text-slate-500 text-sm">Track your complaints and stay updated on the status.</p>
              </div>
            </div>
            
            {/* Header Graphic */}
            <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
              <div className="text-blue-500 font-medium text-sm italic transform -rotate-12 mr-6 text-center leading-tight">
                Better<br/>Facilities<br/>for a Better<br/>You! <Heart size={12} className="inline fill-current text-blue-500" />
              </div>
              
              {/* Simple Illustration via CSS/SVG */}
              <div className="relative w-32 h-24">
                 <svg viewBox="0 0 120 100" className="w-full h-full">
                    {/* Background shapes */}
                    <circle cx="60" cy="50" r="40" fill="#dbeafe" opacity="0.6"/>
                    <rect x="30" y="20" width="40" height="55" rx="4" fill="#bfdbfe" transform="rotate(-5 50 40)"/>
                    <rect x="40" y="15" width="45" height="65" rx="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5"/>
                    {/* Lines on paper */}
                    <line x1="50" y1="30" x2="75" y2="30" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="50" y1="40" x2="65" y2="40" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="50" y1="50" x2="70" y2="50" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round"/>
                    {/* Wrench over paper */}
                    <path d="M85 55 L70 70 M85 55 C88 52 87 48 84 46 C81 44 77 45 75 48 L80 52 L78 54 L73 50 M70 70 C68 72 65 72 63 70 C61 68 61 65 63 63 L70 70 Z" fill="#2563eb" stroke="#2563eb" strokeWidth="1.5" strokeLinejoin="round"/>
                    {/* Leaves */}
                    <path d="M25 60 C20 50 30 40 35 45 C35 55 30 65 25 60 Z" fill="#60a5fa"/>
                    <path d="M20 70 C10 70 15 60 25 60 C30 60 30 70 20 70 Z" fill="#93c5fd"/>
                 </svg>
              </div>
            </div>
            
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-64 h-full bg-blue-100/30 -skew-x-12 translate-x-10"></div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 text-blue-500 p-3 rounded-xl shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">Total Complaints</p>
              <h3 className="text-xl font-bold text-slate-800">5</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">All time</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-amber-50 text-amber-500 p-3 rounded-xl shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">Pending</p>
              <h3 className="text-xl font-bold text-slate-800">2</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">In progress</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-purple-50 text-purple-500 p-3 rounded-xl shrink-0">
              <Settings size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">In Progress</p>
              <h3 className="text-xl font-bold text-slate-800">1</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">Being resolved</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-50 text-green-500 p-3 rounded-xl shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">Resolved</p>
              <h3 className="text-xl font-bold text-slate-800">2</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">Completed</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Filters Bar */}
          <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search complaints..." 
                className="pl-9 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 whitespace-nowrap font-medium">
                All Categories <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 whitespace-nowrap font-medium">
                All Priorities <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 whitespace-nowrap font-medium">
                All Statuses <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 hover:text-slate-700 whitespace-nowrap font-medium ml-1">
                <RefreshCw size={14} /> Clear Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-800 font-bold bg-white border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Room</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {complaintsData.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="px-6 py-4 font-medium text-slate-500 text-xs">{complaint.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${complaint.iconBg} ${complaint.iconColor}`}>
                          <complaint.icon size={14} />
                        </div>
                        <span className="font-semibold text-slate-800 text-xs">{complaint.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-600 text-xs w-48 truncate" title={complaint.desc}>{complaint.desc}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-xs font-medium">{complaint.room}</td>
                    <td className="px-6 py-4">
                      {getPriorityPill(complaint.priority)}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusPill(complaint.status)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800 text-xs font-medium">{complaint.date}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{complaint.time}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors">
                        <Eye size={12} /> View <ChevronRight size={12} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
            <span className="text-xs text-slate-500 font-medium">Showing 1 - 5 of 5 complaints</span>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                <ChevronLeft size={14} />
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-600 text-white font-medium text-xs">
                1
              </button>
              <button className="w-7 h-7 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50" disabled>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-72 space-y-6 pt-8">
        
        {/* Submit Button */}
        <Link to="/student/complaints/new" className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold shadow-sm shadow-blue-200 transition-colors">
          <Plus size={18} /> Submit Complaint
        </Link>
        
        {/* Guidelines Card */}
        <div className="bg-[#f8faff] rounded-2xl p-5 border border-blue-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100 text-blue-600 p-1 rounded-full">
              <Info size={14} />
            </div>
            <h3 className="font-bold text-blue-800 text-sm">Complaint Guidelines</h3>
          </div>
          
          <ul className="space-y-3">
            <li className="flex gap-2.5 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={10} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Provide clear and detailed description of the issue</p>
            </li>
            <li className="flex gap-2.5 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={10} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Upload a photo if possible</p>
            </li>
            <li className="flex gap-2.5 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={10} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Choose the correct category</p>
            </li>
            <li className="flex gap-2.5 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={10} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Urgent issues will be prioritized</p>
            </li>
          </ul>
        </div>

        {/* Need Help Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm relative overflow-hidden">
          {/* Illustration */}
          <div className="h-24 bg-blue-50/50 rounded-xl mb-4 relative flex justify-center items-end overflow-hidden">
             <svg viewBox="0 0 100 80" className="w-full h-full opacity-90">
               {/* Background elements */}
               <circle cx="50" cy="40" r="30" fill="#e0e7ff" />
               <path d="M10 80 L10 60 L20 60 L20 80 Z" fill="#bfdbfe" />
               <path d="M80 80 L80 50 L90 50 L90 80 Z" fill="#bfdbfe" />
               {/* Plant */}
               <path d="M85 50 C80 40 85 30 90 35 C90 45 85 50 85 50 Z" fill="#93c5fd" />
               <path d="M85 50 C90 40 85 30 80 35 C80 45 85 50 85 50 Z" fill="#60a5fa" />
               
               {/* Character (Girl on phone) */}
               {/* Body */}
               <path d="M35 80 C35 60 40 55 50 55 C60 55 65 60 65 80 Z" fill="#3b82f6" />
               {/* Head */}
               <circle cx="50" cy="40" r="10" fill="#fcd34d" />
               {/* Hair */}
               <path d="M40 40 C40 25 60 25 60 40 L62 55 C62 55 50 50 38 55 Z" fill="#1e293b" />
               {/* Arm holding phone */}
               <path d="M50 60 L60 65 L55 50" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
               <rect x="53" y="47" width="5" height="8" rx="1" fill="#1e293b" transform="rotate(20 53 47)" />
               
               {/* Chat bubble */}
               <rect x="65" y="15" width="25" height="18" rx="4" fill="#2563eb" />
               <path d="M70 33 L65 38 L75 33 Z" fill="#2563eb" />
               <line x1="70" y1="22" x2="85" y2="22" stroke="white" strokeWidth="2" strokeLinecap="round" />
               <line x1="70" y1="26" x2="80" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round" />
             </svg>
          </div>
          
          <h3 className="font-bold text-blue-800 text-sm mb-1">Need help?</h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Contact your warden for urgent issues.
          </p>
          
          <button className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors">
            <Phone size={14} /> Contact Warden
          </button>
        </div>

      </div>
    </div>
  );
};

export default StudentComplaints;
