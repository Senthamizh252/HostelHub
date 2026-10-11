import React, { useState, useEffect } from 'react';
import { 
  X, CheckCircle2, Clock, AlertTriangle, Calendar, MapPin, 
  User, Wrench, Wifi, Droplet, Zap, Sparkles, Armchair, 
  Check, Phone, FileText, ChevronRight, Info, ShieldCheck, ArrowUpRight
} from 'lucide-react';
import ContactWardenModal from './ContactWardenModal';

export default function ComplaintDetailsModal({ complaint, isOpen, onClose }) {
  const [isWardenModalOpen, setIsWardenModalOpen] = useState(false);
  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !complaint) return null;

  // Resolve Category Icon
  const getCategoryIcon = (category) => {
    const cat = (category || '').toLowerCase();
    if (cat.includes('wifi') || cat.includes('internet')) return <Wifi size={18} className="text-blue-500" />;
    if (cat.includes('plumb') || cat.includes('water') || cat.includes('tap')) return <Droplet size={18} className="text-cyan-500" />;
    if (cat.includes('electr') || cat.includes('fan') || cat.includes('light') || cat.includes('power')) return <Zap size={18} className="text-amber-500" />;
    if (cat.includes('clean') || cat.includes('housekeep')) return <Sparkles size={18} className="text-emerald-500" />;
    if (cat.includes('furn') || cat.includes('chair') || cat.includes('bed') || cat.includes('table')) return <Armchair size={18} className="text-purple-500" />;
    return <Wrench size={18} className="text-blue-500" />;
  };

  // Resolve Priority Pill
  const getPriorityBadge = (priority) => {
    const p = (priority || '').toLowerCase();
    if (p === 'emergency') {
      return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">Emergency</span>;
    }
    if (p === 'high') {
      return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">High Priority</span>;
    }
    if (p === 'medium') {
      return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">Medium Priority</span>;
    }
    return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">Low Priority</span>;
  };

  // Resolve Status Pill
  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'resolved') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
          <CheckCircle2 size={13} className="text-emerald-600" /> Resolved
        </span>
      );
    }
    if (s === 'in progress' || s === 'assigned') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
          <Clock size={13} className="text-blue-600" /> {status}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
        <AlertTriangle size={13} className="text-amber-600" /> Pending
      </span>
    );
  };

  const title = complaint.issue || complaint.title || complaint.desc || 'Room Maintenance Issue';
  const issueId = complaint.id || '#CMP-102';
  const category = complaint.category || 'General Maintenance';
  const priority = complaint.priority || 'Medium';
  const status = complaint.status || 'Pending';
  const room = complaint.room || 'A-102';
  const date = complaint.date || 'Today';
  const time = complaint.time || '10:00 AM';
  const reportedBy = complaint.reportedBy || 'Student (Room A-102)';
  const assignedTo = complaint.assignedTo || (status === 'Resolved' ? 'Staff Technician' : (status === 'Pending' ? 'Pending Assignment' : 'Maintenance Team'));
  const description = complaint.description || complaint.desc || 'No additional description provided.';

  // Default timeline if not provided
  const timeline = complaint.timeline || [
    {
      title: 'Complaint Registered',
      desc: `Logged by ${reportedBy}`,
      time: `${date}, ${time}`,
      done: true
    },
    {
      title: 'Warden Acknowledged',
      desc: 'Reviewed by Dr. R. Meenakshi (Warden)',
      time: status !== 'Pending' ? `${date}, ${time}` : 'Pending review',
      done: status !== 'Pending'
    },
    {
      title: 'Technician Dispatched',
      desc: `Assigned to ${assignedTo}`,
      time: status === 'Resolved' || status === 'In Progress' ? `${date}` : 'Awaiting assignment',
      done: status === 'Resolved' || status === 'In Progress'
    },
    {
      title: 'Resolution Completed',
      desc: status === 'Resolved' ? 'Work verified and marked resolved' : 'Awaiting completion',
      time: status === 'Resolved' ? (complaint.resolvedDate || `${date}`) : 'Incomplete',
      done: status === 'Resolved'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-blue-50/60 via-indigo-50/30 to-white">
          <div className="space-y-1.5 pr-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-blue-600 bg-blue-100/80 px-2.5 py-0.5 rounded-md">
                {issueId}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200/80 px-2.5 py-0.5 rounded-md shadow-2xs">
                {getCategoryIcon(category)}
                {category}
              </span>
              {getStatusBadge(status)}
              {getPriorityBadge(priority)}
            </div>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight pt-1">
              {title}
            </h2>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/60 p-2 rounded-xl transition-colors shadow-2xs shrink-0"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 divide-y divide-slate-100">
          
          {/* Top Attributes Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px] font-medium">
                <MapPin size={13} className="text-blue-500" /> Room / Location
              </div>
              <p className="font-bold text-slate-800 text-sm">{room}</p>
              <p className="text-[10px] text-slate-500">Hostel North Block</p>
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px] font-medium">
                <Calendar size={13} className="text-blue-500" /> Date Logged
              </div>
              <p className="font-bold text-slate-800 text-sm">{date}</p>
              <p className="text-[10px] text-slate-500">{time}</p>
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px] font-medium">
                <User size={13} className="text-blue-500" /> Reported By
              </div>
              <p className="font-bold text-slate-800 text-sm truncate" title={reportedBy}>{reportedBy}</p>
              <p className="text-[10px] text-slate-500">Student</p>
            </div>

            <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px] font-medium">
                <Wrench size={13} className="text-blue-500" /> Assigned To
              </div>
              <p className="font-bold text-slate-800 text-sm truncate" title={assignedTo}>{assignedTo}</p>
              <p className="text-[10px] text-slate-500">{complaint.assignedRole || 'Technician'}</p>
            </div>
          </div>

          {/* Description Section */}
          <div className="pt-5 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText size={14} className="text-slate-500" /> Issue Description
            </h3>
            <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed">
              {description}
            </div>
          </div>

          {/* Resolution Notes or Remarks (if available) */}
          {complaint.resolutionNotes && (
            <div className="pt-5 space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck size={14} className={status === 'Resolved' ? 'text-emerald-600' : 'text-blue-600'} /> 
                {status === 'Resolved' ? 'Resolution Remarks' : 'Maintenance Status & Update'}
              </h3>
              <div className={`p-4 rounded-xl text-sm leading-relaxed border ${
                status === 'Resolved' 
                  ? 'bg-emerald-50/60 border-emerald-100 text-emerald-900' 
                  : 'bg-blue-50/60 border-blue-100 text-blue-900'
              }`}>
                <p>{complaint.resolutionNotes}</p>
                {complaint.resolvedDate && (
                  <p className="text-[11px] font-medium text-slate-500 mt-2">
                    Updated: <span className="font-semibold text-slate-700">{complaint.resolvedDate}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Progress Timeline Stepper */}
          <div className="pt-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Clock size={14} className="text-slate-500" /> Tracking Timeline
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-3">
                  {/* Dot icon */}
                  <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${
                    step.done 
                      ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-50' 
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {step.done ? <Check size={11} strokeWidth={3} /> : idx + 1}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <h4 className={`text-xs font-bold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>
                        {step.title || step.status}
                      </h4>
                      <span className="text-[11px] font-medium text-slate-400">
                        {step.time}
                      </span>
                    </div>
                    {step.desc && (
                      <p className={`text-xs mt-0.5 ${step.done ? 'text-slate-600' : 'text-slate-400'}`}>
                        {step.desc}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Info size={14} className="text-blue-500 shrink-0" />
            <span>Need urgent help? Call the hostel warden desk at <strong>+91 98765 43210</strong></span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {status === 'Pending' && (
              <button 
                type="button"
                onClick={() => setIsWardenModalOpen(true)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Phone size={13} /> Contact Warden
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shadow-sm shadow-blue-200 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Contact Warden Modal */}
      <ContactWardenModal 
        isOpen={isWardenModalOpen} 
        onClose={() => setIsWardenModalOpen(false)} 
      />
    </div>
  );
}
