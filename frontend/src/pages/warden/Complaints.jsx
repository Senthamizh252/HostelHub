import { useState, useMemo } from 'react';
import {
  MessageSquare, AlertTriangle, CheckCircle2, Clock, Search, Filter,
  RotateCcw, Eye, Edit3, X, User, Phone, Calendar, Building,
  Wrench, ShieldAlert, Check, ChevronDown, Image as ImageIcon,
  Send, Layers, Sparkles, AlertCircle
} from 'lucide-react';
import clsx from 'clsx';

// Theme Palette
const G = {
  forest: '#075E54',
  mint: '#DDF3E8',
  warm: '#F7FAF7',
  teal: '#183B3A',
};

// Initial Sample Complaints Data
const INIT_COMPLAINTS = [
  {
    id: 'CMP-1001',
    student: { name: 'Sneha R', roll: '21CS101', phone: '+91 98765 43210' },
    room: 'B-208',
    block: 'B',
    floor: '2',
    category: 'Electrical',
    title: 'Ceiling fan making rattling noise & sparks near switchboard',
    description: 'The ceiling fan regulator seems faulty and starts emitting a buzzing sound on speed 3. Yesterday night noticed tiny spark flashes behind the main switch socket.',
    date: '2026-10-12',
    priority: 'High',
    status: 'Pending',
    assignedStaff: 'Ramesh (Electrician)',
    imageUrl: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&q=80&w=400',
    notes: 'Safety inspection requested immediately. Power to switchboard isolated temporarily.',
    history: [
      { status: 'Pending', date: '2026-10-12 09:30 AM', note: 'Complaint logged by student' },
      { status: 'Pending', date: '2026-10-12 11:15 AM', note: 'Assigned to Ramesh (Electrician)' }
    ]
  },
  {
    id: 'CMP-1002',
    student: { name: 'Arun K', roll: '21ME301', phone: '+91 98765 43214' },
    room: 'A-104',
    block: 'A',
    floor: '1',
    category: 'Plumbing',
    title: 'Severe flush tank leakage causing washroom overflow',
    description: 'The flush mechanism gets jammed continuously, leading to steady water overflow since 6 AM. The floor drain is also moving very slow.',
    date: '2026-10-11',
    priority: 'Medium',
    status: 'In Progress',
    assignedStaff: 'Murugan (Plumber)',
    imageUrl: '',
    notes: 'Plumber inspected the float valve. Replacement valve order placed.',
    history: [
      { status: 'Pending', date: '2026-10-11 08:00 AM', note: 'Ticket filed by student' },
      { status: 'In Progress', date: '2026-10-11 02:40 PM', note: 'Murugan inspected valve seal' }
    ]
  },
  {
    id: 'CMP-1003',
    student: { name: 'Priya S', roll: '21EC201', phone: '+91 98765 43212' },
    room: 'C-312',
    block: 'C',
    floor: '3',
    category: 'Cleaning',
    title: 'Deep cleaning required post balcony water clogging',
    description: 'Rain water back-flow settled dry leaves and mud stains inside balcony floor. Needs pressure wash and sanitization.',
    date: '2026-10-10',
    priority: 'Low',
    status: 'Resolved',
    assignedStaff: 'Sanitation Team B',
    imageUrl: '',
    notes: 'Cleaned thoroughly by housekeeping team on Sunday afternoon.',
    history: [
      { status: 'Pending', date: '2026-10-10 10:15 AM', note: 'Submitted by student' },
      { status: 'In Progress', date: '2026-10-10 01:20 PM', note: 'Housekeeping dispatched' },
      { status: 'Resolved', date: '2026-10-10 04:30 PM', note: 'Balcony washed and verified' }
    ]
  },
  {
    id: 'CMP-1004',
    student: { name: 'Vikram T', roll: '21ME303', phone: '+91 98765 43216' },
    room: 'B-110',
    block: 'B',
    floor: '1',
    category: 'Wi-Fi',
    title: 'Wi-Fi access point dropping signal constantly',
    description: 'The corridor access point B-101-AP goes offline every 15 minutes. Students unable to attend online laboratory submissions.',
    date: '2026-10-12',
    priority: 'Medium',
    status: 'Pending',
    assignedStaff: 'Suresh (Network Admin)',
    imageUrl: '',
    notes: 'Switch port PoE flap noticed on core switch.',
    history: [
      { status: 'Pending', date: '2026-10-12 04:10 PM', note: 'Issue submitted via portal' }
    ]
  },
  {
    id: 'CMP-1005',
    student: { name: 'Divya M', roll: '21CS102', phone: '+91 98765 43211' },
    room: 'A-203',
    block: 'A',
    floor: '2',
    category: 'Furniture',
    title: 'Study table drawer lock broken and drawer handle cracked',
    description: 'The wooden sliding runner of the drawer is stuck and the lock barrel slipped out. Unable to secure study materials.',
    date: '2026-10-09',
    priority: 'High',
    status: 'In Progress',
    assignedStaff: 'Velu (Carpenter)',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400',
    notes: 'New drawer runner rails supplied to carpenter.',
    history: [
      { status: 'Pending', date: '2026-10-09 11:00 AM', note: 'Logged by student' },
      { status: 'In Progress', date: '2026-10-11 10:00 AM', note: 'Hardware bought & assigned to Velu' }
    ]
  },
  {
    id: 'CMP-1006',
    student: { name: 'Rahul M', roll: '21ME302', phone: '+91 98765 43215' },
    room: 'B-101',
    block: 'B',
    floor: '1',
    category: 'Plumbing',
    title: 'No hot water supply in geyser line during mornings',
    description: 'Solar heating valve seems jammed on line B1. Water temperature is completely cold between 6 AM and 8 AM.',
    date: '2026-10-08',
    priority: 'High',
    status: 'Resolved',
    assignedStaff: 'Murugan (Plumber)',
    imageUrl: '',
    notes: 'Thermostat reset and manifold strainer unclogged.',
    history: [
      { status: 'Pending', date: '2026-10-08 07:15 AM', note: 'Complaint reported' },
      { status: 'In Progress', date: '2026-10-08 09:30 AM', note: 'Heating technician attended' },
      { status: 'Resolved', date: '2026-10-08 02:00 PM', note: 'Water temperature verified at 48°C' }
    ]
  },
  {
    id: 'CMP-1007',
    student: { name: 'Kavya T', roll: '21EC202', phone: '+91 98765 43213' },
    room: 'A-102',
    block: 'A',
    floor: '1',
    category: 'Electrical',
    title: 'Tube light flickering continuously on desk side',
    description: 'Left tube fixture has high-frequency flickering causing severe eye strain during study hours.',
    date: '2026-10-13',
    priority: 'Low',
    status: 'Pending',
    assignedStaff: 'Unassigned',
    imageUrl: '',
    notes: 'Routine LED batten swap needed.',
    history: [
      { status: 'Pending', date: '2026-10-13 08:30 AM', note: 'New ticket raised' }
    ]
  },
  {
    id: 'CMP-1008',
    student: { name: 'Kiran S', roll: '21CE401', phone: '+91 98765 43217' },
    room: 'B-102',
    block: 'B',
    floor: '1',
    category: 'Cleaning',
    title: 'Corridor dustbins overflowing outside room door',
    description: 'Garbage collection missed this morning on 1st floor corridor. Trash bins are overflowing causing foul odor.',
    date: '2026-10-13',
    priority: 'Medium',
    status: 'In Progress',
    assignedStaff: 'Sanitation Team A',
    imageUrl: '',
    notes: 'Sanitation supervisor alerted for afternoon pickup.',
    history: [
      { status: 'Pending', date: '2026-10-13 09:10 AM', note: 'Student reported issue' },
      { status: 'In Progress', date: '2026-10-13 10:00 AM', note: 'Team dispatched' }
    ]
  }
];

const CATEGORIES = ['All', 'Electrical', 'Plumbing', 'Cleaning', 'Wi-Fi', 'Furniture'];
const PRIORITIES = ['All', 'High', 'Medium', 'Low'];
const BLOCKS = ['All', 'A', 'B', 'C'];
const STATUSES = ['All', 'Pending', 'In Progress', 'Resolved'];
const STAFF_LIST = [
  'Unassigned',
  'Ramesh (Electrician)',
  'Murugan (Plumber)',
  'Velu (Carpenter)',
  'Suresh (Network Admin)',
  'Sanitation Team A',
  'Sanitation Team B',
  'Hostel Maintenance General'
];

export default function WardenComplaints() {
  const [complaints, setComplaints] = useState(INIT_COMPLAINTS);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [prioFilter, setPrioFilter] = useState('All');
  const [blockFilter, setBlockFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [detailModal, setDetailModal] = useState(null); // complaint object
  const [editModal, setEditModal] = useState(null); // complaint object

  // Form states inside Action Modal
  const [actionStatus, setActionStatus] = useState('');
  const [actionPriority, setActionPriority] = useState('');
  const [actionStaff, setActionStaff] = useState('');
  const [newNote, setNewNote] = useState('');

  // Summary counts
  const stats = useMemo(() => {
    return {
      total: complaints.length,
      pending: complaints.filter(c => c.status === 'Pending').length,
      inProgress: complaints.filter(c => c.status === 'In Progress').length,
      resolved: complaints.filter(c => c.status === 'Resolved').length,
      highPriority: complaints.filter(c => c.priority === 'High' && c.status !== 'Resolved').length
    };
  }, [complaints]);

  // Filtered complaints
  const filtered = useMemo(() => {
    return complaints.filter(c => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.id.toLowerCase().includes(q) ||
        c.student.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.room.toLowerCase().includes(q);

      const matchCat = catFilter === 'All' || c.category === catFilter;
      const matchPrio = prioFilter === 'All' || c.priority === prioFilter;
      const matchBlock = blockFilter === 'All' || c.block === blockFilter;
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;

      return matchSearch && matchCat && matchPrio && matchBlock && matchStatus;
    });
  }, [complaints, search, catFilter, prioFilter, blockFilter, statusFilter]);

  const hasActiveFilters = search || catFilter !== 'All' || prioFilter !== 'All' || blockFilter !== 'All' || statusFilter !== 'All';

  const resetFilters = () => {
    setSearch('');
    setCatFilter('All');
    setPrioFilter('All');
    setBlockFilter('All');
    setStatusFilter('All');
  };

  // Open Edit Action Modal
  const openActionModal = (complaint) => {
    setEditModal(complaint);
    setActionStatus(complaint.status);
    setActionPriority(complaint.priority);
    setActionStaff(complaint.assignedStaff || 'Unassigned');
    setNewNote('');
  };

  // Save Edit Action
  const handleSaveAction = (e) => {
    e.preventDefault();
    if (!editModal) return;

    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setComplaints(prev =>
      prev.map(c => {
        if (c.id === editModal.id) {
          const updatedHistory = [...c.history];
          if (c.status !== actionStatus || newNote.trim()) {
            updatedHistory.push({
              status: actionStatus,
              date: timestamp,
              note: newNote.trim() || `Status updated to ${actionStatus}`
            });
          }

          const combinedNotes = newNote.trim()
            ? (c.notes ? `${c.notes}\n[${timestamp}]: ${newNote.trim()}` : newNote.trim())
            : c.notes;

          return {
            ...c,
            status: actionStatus,
            priority: actionPriority,
            assignedStaff: actionStaff,
            notes: combinedNotes,
            history: updatedHistory
          };
        }
        return c;
      })
    );

    // If detail modal is open for the same item, keep it updated
    if (detailModal && detailModal.id === editModal.id) {
      setDetailModal(prev => ({
        ...prev,
        status: actionStatus,
        priority: actionPriority,
        assignedStaff: actionStaff,
        notes: newNote.trim()
          ? (prev.notes ? `${prev.notes}\n[${timestamp}]: ${newNote.trim()}` : newNote.trim())
          : prev.notes
      }));
    }

    setEditModal(null);
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const getStatusBadge = (s) => {
    switch (s) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
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
            <MessageSquare size={26} style={{ color: G.forest }} />
            Complaints Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review, prioritize, and resolve hostel complaints.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-800 self-start sm:self-auto">
          <Sparkles size={14} className="text-emerald-600" />
          <span>Active Response Mode</span>
        </div>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {[
          { label: 'Total Complaints', value: stats.total, icon: MessageSquare, bg: '#F8FAFC', color: '#475569', border: '#E2E8F0' },
          { label: 'Pending', value: stats.pending, icon: Clock, bg: '#FFFBEB', color: '#D97706', border: '#FDE68A' },
          { label: 'In Progress', value: stats.inProgress, icon: Wrench, bg: '#EFF6FF', color: '#2563EB', border: '#BFDBFE' },
          { label: 'Resolved', value: stats.resolved, icon: CheckCircle2, bg: G.mint, color: G.forest, border: '#A7F3D0' },
          { label: 'High Priority', value: stats.highPriority, icon: AlertTriangle, bg: '#FEF2F2', color: '#DC2626', border: '#FECACA' }
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
              placeholder="Search by ID, student name, title, or room..."
              className="w-full pl-10 pr-4 py-2.5 text-[13px] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            {/* Category */}
            <div className="relative min-w-[125px] flex-1 sm:flex-initial">
              <select
                value={catFilter}
                onChange={(e) => setCatFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 text-[12.5px] font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-700 appearance-none cursor-pointer"
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Priority */}
            <div className="relative min-w-[120px] flex-1 sm:flex-initial">
              <select
                value={prioFilter}
                onChange={(e) => setPrioFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 text-[12.5px] font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-700 appearance-none cursor-pointer"
              >
                {PRIORITIES.map(p => (
                  <option key={p} value={p}>{p === 'All' ? 'All Priorities' : `${p} Priority`}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Block */}
            <div className="relative min-w-[110px] flex-1 sm:flex-initial">
              <select
                value={blockFilter}
                onChange={(e) => setBlockFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2.5 text-[12.5px] font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-700 appearance-none cursor-pointer"
              >
                {BLOCKS.map(b => (
                  <option key={b} value={b}>{b === 'All' ? 'All Blocks' : `Block ${b}`}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            {/* Status */}
            <div className="relative min-w-[120px] flex-1 sm:flex-initial">
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
              Showing <strong>{filtered.length}</strong> of {complaints.length} complaints matching current filters
            </span>
          </div>
        )}
      </div>

      {/* ── Complaints Directory Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: G.warm }}>
          <div className="flex items-center gap-2">
            <Layers size={17} style={{ color: G.forest }} />
            <h2 className="text-[14px] font-bold text-slate-800">Complaint Records</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">{filtered.length} items listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[980px]">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider" style={{ background: G.warm }}>
                <th className="px-4 py-3.5">Complaint ID</th>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5">Room</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Issue Title</th>
                <th className="px-4 py-3.5">Submitted</th>
                <th className="px-4 py-3.5">Priority</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Assigned Staff</th>
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
                      <h3 className="text-sm font-bold text-slate-800">No complaints found</h3>
                      <p className="text-xs text-slate-500 mt-1">There are no records matching your current filter or search criteria.</p>
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
                        <p className="text-[11px] text-slate-400">{item.student.roll}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold" style={{ backgroundColor: G.mint, color: G.teal }}>
                        {item.room}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-[12.5px] font-medium text-slate-700">{item.category}</span>
                    </td>
                    <td className="px-4 py-3.5 max-w-[240px]">
                      <p className="text-[13px] text-slate-800 font-medium truncate" title={item.title}>
                        {item.title}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                      {item.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={clsx('inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border', getPriorityBadge(item.priority))}>
                        {item.priority === 'High' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={clsx('inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border whitespace-nowrap', getStatusBadge(item.status))}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs font-medium text-slate-600 max-w-[160px] truncate" title={item.assignedStaff}>
                      {item.assignedStaff || 'Unassigned'}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setDetailModal(item)}
                          title="View Full Details"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openActionModal(item)}
                          title="Update Status / Staff"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── View Complaint Details Modal ── */}
      {detailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={() => setDetailModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ background: G.warm }}>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-slate-200 text-slate-800">
                  {detailModal.id}
                </span>
                <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full border', getPriorityBadge(detailModal.priority))}>
                  {detailModal.priority} Priority
                </span>
                <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full border', getStatusBadge(detailModal.status))}>
                  {detailModal.status}
                </span>
              </div>
              <button
                onClick={() => setDetailModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 space-y-6 scrollbar-hide text-slate-800">
              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-bold text-slate-900">{detailModal.title}</h3>
                <p className="text-sm text-slate-600 mt-2 bg-slate-50 border border-slate-100 p-3.5 rounded-xl leading-relaxed">
                  {detailModal.description}
                </p>
              </div>

              {/* Student & Room Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User size={13} style={{ color: G.forest }} /> Student Details
                  </p>
                  <p className="text-sm font-bold text-slate-800">{detailModal.student.name}</p>
                  <p className="text-xs text-slate-500">Roll No: {detailModal.student.roll}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Phone size={12} className="text-slate-400" /> {detailModal.student.phone}
                  </p>
                </div>

                <div className="border border-slate-100 rounded-xl p-3.5 bg-slate-50/50 space-y-1.5">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building size={13} style={{ color: G.forest }} /> Location & Assignment
                  </p>
                  <p className="text-sm font-bold text-slate-800">Room {detailModal.room} (Block {detailModal.block})</p>
                  <p className="text-xs text-slate-500">Floor: {detailModal.floor} &bull; Category: {detailModal.category}</p>
                  <p className="text-xs text-slate-600 font-medium">Assigned: {detailModal.assignedStaff || 'Unassigned'}</p>
                </div>
              </div>

              {/* Uploaded Attachment preview */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ImageIcon size={14} className="text-slate-400" /> Attached Photo / Evidence
                </p>
                {detailModal.imageUrl ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 max-h-56 bg-slate-100">
                    <img
                      src={detailModal.imageUrl}
                      alt="Complaint attachment"
                      className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center text-xs text-slate-400">
                    No image attachment provided by student.
                  </div>
                )}
              </div>

              {/* Resolution Notes & History */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status History & Notes</p>
                <div className="space-y-2 border-l-2 border-emerald-500/40 ml-2 pl-3.5">
                  {detailModal.history && detailModal.history.map((hist, i) => (
                    <div key={i} className="text-xs space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{hist.status}</span>
                        <span className="text-[11px] text-slate-400">&bull; {hist.date}</span>
                      </div>
                      <p className="text-slate-600">{hist.note}</p>
                    </div>
                  ))}
                </div>
                {detailModal.notes && (
                  <div className="mt-3 p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <strong>Warden Notes:</strong> {detailModal.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between" style={{ background: G.warm }}>
              <span className="text-xs text-slate-400">Submitted on {detailModal.date}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const target = detailModal;
                    setDetailModal(null);
                    openActionModal(target);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-sm"
                  style={{ backgroundColor: G.forest }}
                >
                  Update Status / Staff
                </button>
                <button
                  type="button"
                  onClick={() => setDetailModal(null)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Warden Action Modal (Status, Priority, Staff, Notes) ── */}
      {editModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" onClick={() => setEditModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100" style={{ background: G.warm }}>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Take Action on {editModal.id}</h3>
                <p className="text-xs text-slate-500 truncate max-w-xs">{editModal.title}</p>
              </div>
              <button
                onClick={() => setEditModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Form */}
            <form onSubmit={handleSaveAction} className="p-6 space-y-4">
              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Complaint Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Pending', 'In Progress', 'Resolved'].map(st => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setActionStatus(st)}
                      className={clsx(
                        'py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center',
                        actionStatus === st
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-800 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Priority Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['High', 'Medium', 'Low'].map(pr => (
                    <button
                      key={pr}
                      type="button"
                      onClick={() => setActionPriority(pr)}
                      className={clsx(
                        'py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center',
                        actionPriority === pr
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      )}
                    >
                      {pr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Assigned Staff */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assign Maintenance Staff
                </label>
                <div className="relative">
                  <select
                    value={actionStaff}
                    onChange={(e) => setActionStaff(e.target.value)}
                    className="w-full pl-3 pr-8 py-2.5 text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-800 appearance-none cursor-pointer"
                  >
                    {STAFF_LIST.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* New Resolution Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Resolution Note / Action Log
                </label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="e.g. Electrician inspected wire joints; parts replaced and verified..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 text-slate-800 placeholder:text-slate-400 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm transition-all flex items-center justify-center gap-1.5"
                  style={{ backgroundColor: G.forest }}
                >
                  <Check size={14} /> Save Action
                </button>
                <button
                  type="button"
                  onClick={() => setEditModal(null)}
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
