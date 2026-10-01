import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarCheck, FileText, Clock, CheckCircle2, XCircle, Search, 
  ChevronDown, RefreshCw, Eye, ChevronRight, ChevronLeft, Info, Check, 
  Plus, Heart, BarChart2, Calendar
} from 'lucide-react';

const leavesData = [
  { id: '#LR001', dates: ['02 Oct 2026', '04 Oct 2026'], reason: 'Home visit', type: 'Personal', status: 'Approved', remarks: ['Have a safe trip!', '- Warden'] },
  { id: '#LR002', dates: ['10 Oct 2026', '12 Oct 2026'], reason: 'Family function', type: 'Family', status: 'Pending', remarks: ['—'] },
  { id: '#LR003', dates: ['15 Oct 2026', '16 Oct 2026'], reason: 'Medical appointment', type: 'Health', status: 'Rejected', remarks: ['Not enough details', 'provided.'] },
  { id: '#LR004', dates: ['20 Oct 2026', '22 Oct 2026'], reason: ['Project work', '(College)'], type: 'Academic', status: 'Approved', remarks: ['Approved.', 'Take care!'] },
  { id: '#LR005', dates: ['28 Oct 2026', '30 Oct 2026'], reason: 'Personal work', type: 'Personal', status: 'Pending', remarks: ['—'] },
];

const getTypePill = (type) => {
  switch(type) {
    case 'Personal': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600">Personal</span>;
    case 'Family': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-600">Family</span>;
    case 'Health': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-600">Health</span>;
    case 'Academic': return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-600">Academic</span>;
    default: return <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">{type}</span>;
  }
};

const getStatusPill = (status) => {
  switch(status) {
    case 'Pending': 
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-600">
          <Clock size={12} /> Pending
        </span>
      );
    case 'Approved': 
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-green-100 text-green-600">
          <CheckCircle2 size={12} /> Approved
        </span>
      );
    case 'Rejected': 
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-100 text-red-600">
          <XCircle size={12} /> Rejected
        </span>
      );
    default: return null;
  }
};

const StudentLeaves = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6">
        
        {/* Header */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
              <CalendarCheck size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Leave Requests</h1>
              <p className="text-slate-500 text-sm">Apply for leave and track your request status.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
            <div className="text-blue-500 font-medium text-sm italic transform -rotate-12 mr-8 text-center leading-tight">
              Take a break<br/>You deserve it ! <Heart size={12} className="inline fill-current text-blue-500" />
            </div>
            
            {/* Simple Illustration via CSS/SVG */}
            <div className="relative w-40 h-24 flex items-end">
               <svg viewBox="0 0 160 100" className="w-full h-full opacity-90">
                 {/* Plane */}
                 <path d="M120 20 L135 15 L145 25 L130 30 Z" fill="#93c5fd" />
                 <path d="M125 22 L145 25 L140 35 Z" fill="#60a5fa" />
                 <path d="M110 30 C110 30 115 25 125 22 L130 30 L115 35 Z" fill="#93c5fd" />
                 {/* Clouds */}
                 <circle cx="100" cy="40" r="8" fill="#dbeafe" />
                 <circle cx="110" cy="35" r="10" fill="#dbeafe" />
                 <circle cx="120" cy="40" r="8" fill="#dbeafe" />
                 
                 {/* Plants */}
                 <path d="M20 90 C15 70 25 60 30 70 C30 80 25 90 20 90 Z" fill="#93c5fd" />
                 <path d="M25 90 C35 70 25 60 20 70 C20 80 25 90 25 90 Z" fill="#60a5fa" />
                 
                 <path d="M140 90 C135 70 145 60 150 70 C150 80 145 90 140 90 Z" fill="#60a5fa" />
                 <path d="M145 90 C155 70 145 60 140 70 C140 80 145 90 145 90 Z" fill="#93c5fd" />

                 {/* Girl with backpack */}
                 {/* Body */}
                 <path d="M75 90 L75 60 L85 60 L85 90 Z" fill="#2563eb" />
                 <path d="M72 65 C72 50 88 50 88 65 Z" fill="#3b82f6" />
                 {/* Backpack */}
                 <path d="M85 55 C95 55 95 70 85 70 Z" fill="#1e40af" />
                 {/* Head */}
                 <circle cx="80" cy="45" r="8" fill="#fcd34d" />
                 {/* Hair */}
                 <path d="M72 45 C72 35 88 35 88 45 L90 55 L85 52 L75 55 Z" fill="#1e293b" />
               </svg>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10"></div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 text-blue-500 p-3 rounded-xl shrink-0">
              <FileText size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">Total Requests</p>
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
              <p className="text-slate-400 text-[10px] mt-0.5">Awaiting approval</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-green-50 text-green-500 p-3 rounded-xl shrink-0">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">Approved</p>
              <h3 className="text-xl font-bold text-slate-800">2</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">Completed</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="bg-red-50 text-red-500 p-3 rounded-xl shrink-0">
              <XCircle size={22} />
            </div>
            <div>
              <p className="text-slate-500 font-semibold text-xs mb-0.5">Rejected</p>
              <h3 className="text-xl font-bold text-slate-800">1</h3>
              <p className="text-slate-400 text-[10px] mt-0.5">Not approved</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
             <h2 className="text-lg font-bold text-slate-800">Leave Requests</h2>
          </div>
          {/* Filters Bar */}
          <div className="px-5 py-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search by reason or date.." 
                className="pl-9 pr-4 py-2 w-full bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 whitespace-nowrap font-medium min-w-[120px] justify-between">
                All Status <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-100 whitespace-nowrap font-medium min-w-[120px] justify-between">
                All Types <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 text-sm text-blue-500 hover:text-blue-700 whitespace-nowrap font-medium ml-1">
                <RefreshCw size={14} /> Clear Filters
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-800 font-bold bg-white border-b border-slate-100">
                <tr>
                  <th className="px-5 py-4">ID</th>
                  <th className="px-5 py-4">Dates</th>
                  <th className="px-5 py-4">Reason</th>
                  <th className="px-5 py-4">Type</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Warden Remarks</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {leavesData.map((leave, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors bg-white">
                    <td className="px-5 py-4 font-medium text-slate-500 text-xs">{leave.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-600 text-xs font-medium">{leave.dates[0]}</span>
                        <span className="text-slate-500 text-[11px]">- {leave.dates[1]}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {Array.isArray(leave.reason) ? (
                        <div className="flex flex-col gap-0.5">
                           <span className="text-slate-600 text-xs font-medium">{leave.reason[0]}</span>
                           <span className="text-slate-500 text-[11px]">{leave.reason[1]}</span>
                        </div>
                      ) : (
                        <span className="text-slate-600 text-xs font-medium">{leave.reason}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {getTypePill(leave.type)}
                    </td>
                    <td className="px-5 py-4">
                      {getStatusPill(leave.status)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-600 text-[11px]">{leave.remarks[0]}</span>
                        {leave.remarks[1] && <span className="text-slate-500 text-[10px]">{leave.remarks[1]}</span>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
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
            <span className="text-xs text-slate-500 font-medium">Showing 1 - 5 of 5 requests</span>
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
      <div className="w-full xl:w-72 space-y-6">
        
        {/* Submit Button */}
        <Link to="/student/leaves/new" className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-semibold shadow-sm shadow-blue-200 transition-colors">
          <Plus size={18} /> Apply for Leave
        </Link>
        
        {/* Guidelines Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-100 text-blue-600 p-1.5 rounded-full">
              <Info size={16} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Leave Request Guidelines</h3>
          </div>
          
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Apply at least 2 days in advance</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Provide valid reason and emergency contact number</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Get warden approval before leaving</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0 text-blue-600">
                <Check size={12} strokeWidth={3} />
              </div>
              <p className="text-xs text-slate-600 leading-tight">Update your return date if needed</p>
            </li>
          </ul>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-blue-600">
              <BarChart2 size={20} />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Quick Stats</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                 <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg"><Calendar size={14} /></div>
                 This Month
              </div>
              <span className="font-bold text-slate-800 text-sm">3</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                 <div className="bg-green-50 text-green-500 p-1.5 rounded-lg"><CheckCircle2 size={14} /></div>
                 Approved
              </div>
              <span className="font-bold text-slate-800 text-sm">2</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                 <div className="bg-amber-50 text-amber-500 p-1.5 rounded-lg"><Clock size={14} /></div>
                 Pending
              </div>
              <span className="font-bold text-slate-800 text-sm">1</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-600 text-xs font-medium">
                 <div className="bg-red-50 text-red-500 p-1.5 rounded-lg"><XCircle size={14} /></div>
                 Rejected
              </div>
              <span className="font-bold text-slate-800 text-sm">0</span>
            </div>
          </div>
        </div>

        {/* Bottom Graphic */}
        <div className="bg-[#f4f7fe] rounded-2xl p-6 border border-blue-50/50 relative overflow-hidden flex items-center h-28">
           <div className="flex-1 -rotate-6 z-10 pl-2">
             <p className="text-blue-700 font-semibold text-sm leading-tight">
               Plan your leave,<br/>make it count! <Heart size={10} className="inline fill-current text-blue-500 ml-1" />
             </p>
           </div>
           
           <div className="relative z-10 w-16 h-full flex items-end justify-end">
              <svg viewBox="0 0 60 60" className="w-16 h-16 transform translate-x-2 translate-y-2 opacity-80">
                 <path d="M10 50 C20 40 40 40 50 20" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" />
                 <path d="M40 30 C45 25 50 20 50 20 C50 20 55 25 50 30 C45 35 40 30 40 30 Z" fill="#93c5fd" />
                 <path d="M25 45 C30 40 35 35 35 35 C35 35 40 40 35 45 C30 50 25 45 25 45 Z" fill="#3b82f6" />
                 <path d="M15 50 C20 55 25 50 25 50 C25 50 20 45 15 50 Z" fill="#60a5fa" />
              </svg>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StudentLeaves;
