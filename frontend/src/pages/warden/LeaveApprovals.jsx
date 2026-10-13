import { useState, useMemo } from 'react';
import {
  FileText, CheckCircle2, XCircle, Clock, Search, Filter,
  RotateCcw, Eye, Check, X, User, Phone, Calendar, Building,
  AlertCircle, MessageSquare, ChevronDown, CheckCheck, ShieldCheck
} from 'lucide-react';
import clsx from 'clsx';

// Theme Palette
const G = {
  forest: '#075E54',
  mint: '#DDF3E8',
  warm: '#F7FAF7',
  teal: '#183B3A',
};

// Realistic mock leave request data
const INIT_LEAVES = [
  {
    id: 'LV-2026-001',
    student: {
      name: 'Sneha R',
      regNo: '21CS101',
      phone: '+91 98765 43210',
      parentPhone: '+91 98765 11111',
      dept: 'B.Tech CSE, 3rd Year'
    },
    room: 'B-208',
    block: 'B',
    leaveType: 'Family',
    departureDate: '2026-10-16',
    departureTime: '05:00 PM',
    returnDate: '2026-10-19',
    returnTime: '08:00 AM',
    reason: 'Attending elder sister’s wedding ceremony in Coimbatore with family.',
    submittedDate: '2026-10-13 10:15 AM',
    status: 'Pending',
    wardenRemarks: '',
    history: [
      { status: 'Pending', date: '2026-10-13 10:15 AM', note: 'Request submitted by student' }
    ]
  },
  {
    id: 'LV-2026-002',
    student: {
      name: 'Arun K',
      regNo: '21ME301',
      phone: '+91 98765 43214',
      parentPhone: '+91 98765 22222',
      dept: 'B.Tech Mechanical, 3rd Year'
    },
    room: 'A-104',
    block: 'A',
    leaveType: 'Medical',
    departureDate: '2026-10-14',
    departureTime: '09:00 AM',
    returnDate: '2026-10-17',
    returnTime: '06:00 PM',
    reason: 'Severe dental surgery scheduled at hometown dental hospital.',
    submittedDate: '2026-10-12 04:30 PM',
    status: 'Pending',
    wardenRemarks: '',
    history: [
      { status: 'Pending', date: '2026-10-12 04:30 PM', note: 'Request submitted with doctor prescription' }
    ]
  },
  {
    id: 'LV-2026-003',
    student: {
      name: 'Priya S',
      regNo: '21EC201',
      phone: '+91 98765 43212',
      parentPhone: '+91 98765 33333',
      dept: 'B.Tech ECE, 3rd Year'
    },
    room: 'C-312',
    block: 'C',
    leaveType: 'Academic',
    departureDate: '2026-10-15',
    departureTime: '07:00 AM',
    returnDate: '2026-10-16',
    returnTime: '09:00 PM',
    reason: 'Representing college at IIT Madras Tech Fest project presentation.',
    submittedDate: '2026-10-11 11:00 AM',
    status: 'Approved',
    wardenRemarks: 'HOD permission letter verified. Good luck for presentation.',
    history: [
      { status: 'Pending', date: '2026-10-11 11:00 AM', note: 'Submitted with recommendation letter' },
      { status: 'Approved', date: '2026-10-12 02:15 PM', note: 'Approved by Dr. Priya Sharma (Warden)' }
    ]
  },
  {
    id: 'LV-2026-004',
    student: {
      name: 'Vikram T',
      regNo: '21ME303',
      phone: '+91 98765 43216',
      parentPhone: '+91 98765 44444',
      dept: 'B.Tech Mechanical, 3rd Year'
    },
    room: 'B-110',
    block: 'B',
    leaveType: 'Personal',
    departureDate: '2026-10-18',
    departureTime: '06:00 PM',
    returnDate: '2026-10-21',
    returnTime: '07:30 AM',
    reason: 'Visiting hometown for Diwali festival preparations with family.',
    submittedDate: '2026-10-10 03:20 PM',
    status: 'Approved',
    wardenRemarks: 'Parent confirmed over phone.',
    history: [
      { status: 'Pending', date: '2026-10-10 03:20 PM', note: 'Request logged' },
      { status: 'Approved', date: '2026-10-11 05:00 PM', note: 'Approved post parent verification' }
    ]
  },
  {
    id: 'LV-2026-005',
    student: {
      name: 'Rahul M',
      regNo: '21ME302',
      phone: '+91 98765 43215',
      parentPhone: '+91 98765 55555',
      dept: 'B.Tech Mechanical, 3rd Year'
    },
    room: 'B-101',
    block: 'B',
    leaveType: 'Personal',
    departureDate: '2026-10-13',
    departureTime: '04:00 PM',
    returnDate: '2026-10-15',
    returnTime: '08:00 AM',
    reason: 'Weekend trip to hill station with friends.',
    submittedDate: '2026-10-12 08:45 PM',
    status: 'Rejected',
    wardenRemarks: 'Unapproved trip during continuous internal assessment week. Parent not in consent.',
    history: [
      { status: 'Pending', date: '2026-10-12 08:45 PM', note: 'Request logged' },
      { status: 'Rejected', date: '2026-10-13 09:00 AM', note: 'Rejected due to CIA exam schedule' }
    ]
  },
  {
    id: 'LV-2026-006',
    student: {
      name: 'Divya M',
      regNo: '21CS102',
      phone: '+91 98765 43211',
      parentPhone: '+91 98765 66666',
      dept: 'B.Tech CSE, 3rd Year'
    },
    room: 'A-203',
    block: 'A',
    leaveType: 'Academic',
    departureDate: '2026-10-20',
    departureTime: '08:00 AM',
    returnDate: '2026-10-22',
    returnTime: '06:00 PM',
    reason: 'Attending Smart India Hackathon zonal round in Bangalore.',
    submittedDate: '2026-10-13 11:30 AM',
    status: 'Pending',
    wardenRemarks: '',
    history: [
      { status: 'Pending', date: '2026-10-13 11:30 AM', note: 'Application filed with team list' }
    ]
  },
  {
    id: 'LV-2026-007',
    student: {
      name: 'Kavya T',
      regNo: '21EC202',
      phone: '+91 98765 43213',
      parentPhone: '+91 98765 77777',
      dept: 'B.Tech ECE, 3rd Year'
    },
    room: 'A-102',
    block: 'A',
    leaveType: 'Medical',
    departureDate: '2026-10-14',
    departureTime: '02:00 PM',
    returnDate: '2026-10-16',
    returnTime: '10:00 AM',
    reason: 'Eye check-up and power retinal imaging follow-up.',
    submittedDate: '2026-10-13 01:10 PM',
    status: 'Pending',
    wardenRemarks: '',
    history: [
      { status: 'Pending', date: '2026-10-13 01:10 PM', note: 'Request raised' }
    ]
  }
];

const LEAVE_TYPES = ['All', 'Personal', 'Family', 'Medical', 'Academic'];
const STATUSES = ['All', 'Pending', 'Approved', 'Rejected'];

export default function LeaveApprovals() {
  const [leaves, setLeaves] = useState(INIT_LEAVES);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');

  // Modals
  const [viewModal, setViewModal] = useState(null); // leave object
  const [rejectModal, setRejectModal] = useState(null); // leave object
  const [remarksModal, setRemarksModal] = useState(null); // leave object

  // Inputs inside action modals
  const [rejectReason, setRejectReason] = useState('');
  const [rejectError, setRejectError] = useState('');
  const [wardenRemarkText, setWardenRemarkText] = useState('');

  // Dynamically calculate counts
  const stats = useMemo(() => {
    return {
      total: leaves.length,
      pending: leaves.filter(l => l.status === 'Pending').length,
      approved: leaves.filter(l => l.status === 'Approved').length,
      rejected: leaves.filter(l => l.status === 'Rejected').length,
    };
  }, [leaves]);

  // Filtered leaves
  const filtered = useMemo(() => {
    return leaves.filter(l => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        l.id.toLowerCase().includes(q) ||
        l.student.name.toLowerCase().includes(q) ||
        l.student.regNo.toLowerCase().includes(q) ||
        l.room.toLowerCase().includes(q);

      const matchType = typeFilter === 'All' || l.leaveType === typeFilter;
      const matchStatus = statusFilter === 'All' || l.status === statusFilter;
      const matchDate = !dateFilter || l.departureDate === dateFilter;

      return matchSearch && matchType && matchStatus && matchDate;
    });
  }, [leaves, search, typeFilter, statusFilter, dateFilter]);

  const hasActiveFilters = search || typeFilter !== 'All' || statusFilter !== 'All' || dateFilter;

  const resetFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setStatusFilter('All');
    setDateFilter('');
  };

  const getTimestamp = () => {
    return new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Direct Approve action
  const handleApprove = (leave) => {
    const time = getTimestamp();
    setLeaves(prev =>
      prev.map(item => {
        if (item.id === leave.id) {
          return {
            ...item,
            status: 'Approved',
            wardenRemarks: item.wardenRemarks || 'Approved by Warden',
            history: [
              ...item.history,
              { status: 'Approved', date: time, note: 'Approved by Dr. Priya Sharma (Warden)' }
            ]
          };
        }
        return item;
      })
    );

    if (viewModal && viewModal.id === leave.id) {
      setViewModal(prev => ({
        ...prev,
        status: 'Approved',
        wardenRemarks: prev.wardenRemarks || 'Approved by Warden',
        history: [
          ...prev.history,
          { status: 'Approved', date: time, note: 'Approved by Dr. Priya Sharma (Warden)' }
        ]
      }));
    }
  };

  // Open Reject Modal
  const openRejectModal = (leave) => {
    setRejectModal(leave);
    setRejectReason('');
    setRejectError('');
  };

  // Submit Reject
  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setRejectError('Please specify a rejection reason for the record.');
      return;
    }

    const time = getTimestamp();
    const reasonText = rejectReason.trim();

    setLeaves(prev =>
      prev.map(item => {
        if (item.id === rejectModal.id) {
          return {
            ...item,
            status: 'Rejected',
            wardenRemarks: reasonText,
            history: [
              ...item.history,
              { status: 'Rejected', date: time, note: `Rejected: ${reasonText}` }
            ]
          };
        }
        return item;
      })
    );

    if (viewModal && viewModal.id === rejectModal.id) {
      setViewModal(prev => ({
        ...prev,
        status: 'Rejected',
        wardenRemarks: reasonText,
        history: [
          ...prev.history,
          { status: 'Rejected', date: time, note: `Rejected: ${reasonText}` }
        ]
      }));
    }

    setRejectModal(null);
  };

  // Open Add Remarks Modal
  const openRemarksModal = (leave) => {
    setRemarksModal(leave);
    setWardenRemarkText(leave.wardenRemarks || '');
  };

  // Save Remarks
  const handleSaveRemarks = (e) => {
    e.preventDefault();
    if (!remarksModal) return;

    const time = getTimestamp();
    const updatedText = wardenRemarkText.trim();

    setLeaves(prev =>
      prev.map(item => {
        if (item.id === remarksModal.id) {
          const updatedHistory = [...item.history];
          if (updatedText) {
            updatedHistory.push({
              status: item.status,
              date: time,
              note: `Remark updated: ${updatedText}`
            });
          }
          return {
            ...item,
            wardenRemarks: updatedText,
            history: updatedHistory
          };
        }
        return item;
      })
    );

    if (viewModal && viewModal.id === remarksModal.id) {
      setViewModal(prev => ({
        ...prev,
        wardenRemarks: updatedText
      }));
    }

    setRemarksModal(null);
  };

  const getStatusBadge = (s) => {
    switch (s) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getTypeBadge = (t) => {
    switch (t) {
      case 'Academic':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Medical':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Family':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Personal':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <FileText size={26} style={{ color: G.forest }} />
            Leave Approvals
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review student leave requests and manage approvals.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-800 self-start sm:self-auto">
          <ShieldCheck size={15} className="text-emerald-600" />
          <span>Warden Authority Level 1</span>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {[
          { label: 'Total Requests', value: stats.total, icon: FileText, bg: '#F8FAFC', color: '#475569', border: '#E2E8F0' },
          { label: 'Pending Approval', value: stats.pending, icon: Clock, bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
          { label: 'Approved', value: stats.approved, icon: CheckCircle2, bg: G.mint, color: G.forest, border: '#A7F3D0' },
          { label: 'Rejected', value: stats.rejected, icon: XCircle, bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border p-4 sm:p-5 shadow-sm transition-all hover:shadow-md flex items-center justify-between"
              style={{ borderColor: item.border }}
            >
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500">{item.label}</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-1">{item.value}</p>
              </div>
              <div
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: item.bg }}
              >
                <Icon size={22} style={{ color: item.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Search & Filters ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by student name, request ID, register number, or room..."
              className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Leave Type */}
            <div className="relative min-w-[130px] flex-1 sm:flex-initial">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 text-[12.5px] font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-700 appearance-none cursor-pointer"
              >
                {LEAVE_TYPES.map(t => (
                  <option key={t} value={t}>{t === 'All' ? 'All Leave Types' : `${t} Leave`}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Status */}
            <div className="relative min-w-[130px] flex-1 sm:flex-initial">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 text-[12.5px] font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-700 appearance-none cursor-pointer"
              >
                {STATUSES.map(s => (
                  <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Departure Date */}
            <div className="relative min-w-[145px] flex-1 sm:flex-initial">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                title="Filter by Departure Date"
                className="w-full px-3 py-2.5 text-[12.5px] font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-700"
              />
            </div>

            {/* Reset */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-[12.5px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
              >
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong>{filtered.length}</strong> of {leaves.length} requests matching filters
            </span>
          </div>
        )}
      </div>

      {/* ── Leave Requests Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: G.warm }}>
          <div className="flex items-center gap-2">
            <Calendar size={17} style={{ color: G.forest }} />
            <h2 className="text-[14px] font-bold text-slate-800">Student Applications</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">{filtered.length} entries</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[1020px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider" style={{ background: G.warm }}>
                <th className="px-4 py-3.5">Request ID</th>
                <th className="px-4 py-3.5">Student Name</th>
                <th className="px-4 py-3.5">Reg. Number</th>
                <th className="px-4 py-3.5">Room</th>
                <th className="px-4 py-3.5">Leave Type</th>
                <th className="px-4 py-3.5">Departure</th>
                <th className="px-4 py-3.5">Return</th>
                <th className="px-4 py-3.5">Reason</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-16 px-4">
                    <div className="max-w-sm mx-auto flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-slate-100 text-slate-400 mb-3">
                        <AlertCircle size={28} />
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">No leave requests found</h3>
                      <p className="text-xs text-slate-500 mt-1">There are no records matching your current filter criteria.</p>
                      {hasActiveFilters && (
                        <button
                          onClick={resetFilters}
                          className="mt-4 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                        >
                          Clear all filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <p className="font-semibold text-slate-800 text-[13px]">{item.student.name}</p>
                        <p className="text-[11px] text-slate-400">{item.student.dept}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-600">
                      {item.student.regNo}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: G.mint, color: G.teal }}>
                        {item.room}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={clsx('inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border', getTypeBadge(item.leaveType))}>
                        {item.leaveType}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                      <div className="font-medium">{item.departureDate}</div>
                      <div className="text-[10.5px] text-slate-400">{item.departureTime}</div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-700 whitespace-nowrap">
                      <div className="font-medium">{item.returnDate}</div>
                      <div className="text-[10.5px] text-slate-400">{item.returnTime}</div>
                    </td>
                    <td className="px-4 py-3.5 max-w-[200px]">
                      <p className="text-[12.5px] text-slate-700 font-medium truncate" title={item.reason}>
                        {item.reason}
                      </p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={clsx('inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap', getStatusBadge(item.status))}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewModal(item)}
                          title="View Details"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        {item.status === 'Pending' ? (
                          <>
                            <button
                              onClick={() => handleApprove(item)}
                              title="Approve Request"
                              className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100 transition-colors"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => openRejectModal(item)}
                              title="Reject Request"
                              className="p-1.5 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => openRemarksModal(item)}
                            title="Add / Edit Remarks"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          >
                            <MessageSquare size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── View Details Modal ── */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={() => setViewModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ background: G.warm }}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-200 text-slate-800">
                  {viewModal.id}
                </span>
                <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full border', getTypeBadge(viewModal.leaveType))}>
                  {viewModal.leaveType} Leave
                </span>
                <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full border', getStatusBadge(viewModal.status))}>
                  {viewModal.status}
                </span>
              </div>
              <button
                onClick={() => setViewModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6 scrollbar-hide text-slate-800">
              {/* Student and Room Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} style={{ color: G.forest }} /> Student Information
                  </p>
                  <p className="text-sm font-bold text-slate-800">{viewModal.student.name}</p>
                  <p className="text-xs text-slate-500">Reg No: {viewModal.student.regNo}</p>
                  <p className="text-xs text-slate-500">{viewModal.student.dept}</p>
                  <div className="pt-1 text-xs text-slate-600 space-y-0.5">
                    <p className="flex items-center gap-1"><Phone size={12} className="text-slate-400" /> Student: {viewModal.student.phone}</p>
                    <p className="flex items-center gap-1"><Phone size={12} className="text-slate-400" /> Parent: {viewModal.student.parentPhone}</p>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building size={13} style={{ color: G.forest }} /> Hostel Room & Dates
                  </p>
                  <p className="text-sm font-bold text-slate-800">Room {viewModal.room} (Block {viewModal.block})</p>
                  <div className="pt-2 text-xs text-slate-700 space-y-1">
                    <p><strong>Departure:</strong> {viewModal.departureDate} at {viewModal.departureTime}</p>
                    <p><strong>Return:</strong> {viewModal.returnDate} at {viewModal.returnTime}</p>
                    <p className="text-slate-400 text-[11px] pt-1">Submitted on: {viewModal.submittedDate}</p>
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Reason for Leave</p>
                <div className="text-sm text-slate-700 bg-slate-50 border border-slate-100 p-3.5 rounded-xl leading-relaxed">
                  {viewModal.reason}
                </div>
              </div>

              {/* Decision Remarks */}
              {viewModal.wardenRemarks && (
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 text-xs text-emerald-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCheck size={14} className="text-emerald-700" /> Warden Decision Remarks
                  </p>
                  <p className="text-emerald-800">{viewModal.wardenRemarks}</p>
                </div>
              )}

              {/* Status History */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status History</p>
                <div className="space-y-2 border-l-2 border-emerald-500/40 ml-2 pl-3.5">
                  {viewModal.history && viewModal.history.map((hist, i) => (
                    <div key={i} className="text-xs space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{hist.status}</span>
                        <span className="text-[11px] text-slate-400">&bull; {hist.date}</span>
                      </div>
                      <p className="text-slate-600">{hist.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between" style={{ background: G.warm }}>
              <span className="text-xs text-slate-400">Hostel Management Portal &bull; Leaves</span>
              <div className="flex gap-2">
                {viewModal.status === 'Pending' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleApprove(viewModal)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm flex items-center gap-1.5"
                      style={{ backgroundColor: G.forest }}
                    >
                      <Check size={14} /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const target = viewModal;
                        setViewModal(null);
                        openRejectModal(target);
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-100 hover:bg-red-200 transition-colors flex items-center gap-1.5"
                    >
                      <X size={14} /> Reject
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => setViewModal(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Reject Modal with Required Reason ── */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={() => setRejectModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ background: G.warm }}>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Reject Leave Application</h3>
                <p className="text-xs text-slate-500">{rejectModal.id} &bull; {rejectModal.student.name}</p>
              </div>
              <button
                onClick={() => setRejectModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="p-6 space-y-4">
              <div className="bg-red-50/70 border border-red-200 rounded-xl p-3 text-xs text-red-800">
                Please provide a mandatory reason for rejection so that the student is properly informed.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rejection Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => {
                    setRejectReason(e.target.value);
                    if (rejectError) setRejectError('');
                  }}
                  placeholder="e.g. CIA examination scheduled on requested date / Parent phone verification failed..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200 text-slate-800 placeholder:text-slate-400 resize-none"
                />
                {rejectError && <p className="text-xs text-red-600 mt-1 font-medium">{rejectError}</p>}
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <X size={14} /> Confirm Rejection
                </button>
                <button
                  type="button"
                  onClick={() => setRejectModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add / Edit Decision Remarks Modal ── */}
      {remarksModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={() => setRemarksModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ background: G.warm }}>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Decision Remarks</h3>
                <p className="text-xs text-slate-500">{remarksModal.id} &bull; {remarksModal.student.name}</p>
              </div>
              <button
                onClick={() => setRemarksModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveRemarks} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Warden Notes & Remarks
                </label>
                <textarea
                  rows={3}
                  value={wardenRemarkText}
                  onChange={(e) => setWardenRemarkText(e.target.value)}
                  placeholder="e.g. Parent informed; late entry permit granted till 9 PM..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-800 placeholder:text-slate-400 resize-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: G.forest }}
                >
                  <Check size={14} /> Save Remarks
                </button>
                <button
                  type="button"
                  onClick={() => setRemarksModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
