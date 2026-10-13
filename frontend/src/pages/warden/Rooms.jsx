import { useState, useMemo } from 'react';
import {
  Building2, BedDouble, CheckCircle2, Wrench, Search, Filter,
  Plus, Edit2, Eye, Users, X, ChevronDown, RotateCcw,
  MapPin, Layers, Hash, User, Phone, GraduationCap, Save,
  AlertTriangle, CheckCheck, Minus
} from 'lucide-react';
import clsx from 'clsx';

// ─── Theme colours ────────────────────────────────────────────────────────────
const G = {
  forest: '#075E54',
  mint:   '#DDF3E8',
  warm:   '#F7FAF7',
  teal:   '#183B3A',
};

// ─── Mock data ────────────────────────────────────────────────────────────────
const INIT_ROOMS = [
  { id:1,  number:'A-101', block:'A', floor:1, type:'Double',   beds:2, occupied:2, status:'Full',               facilities:['WiFi','AC','Attached Bathroom'], students:[{name:'Sneha R',  roll:'21CS101',phone:'9876543210',course:'B.Tech CSE'},{name:'Divya M',  roll:'21CS102',phone:'9876543211',course:'B.Tech CSE'}] },
  { id:2,  number:'A-102', block:'A', floor:1, type:'Triple',   beds:3, occupied:2, status:'Partially Occupied', facilities:['WiFi','Fan','Common Bathroom'],   students:[{name:'Priya S',  roll:'21EC201',phone:'9876543212',course:'B.Tech ECE'},{name:'Kavya T',  roll:'21EC202',phone:'9876543213',course:'B.Tech ECE'}] },
  { id:3,  number:'A-201', block:'A', floor:2, type:'Single',   beds:1, occupied:0, status:'Available',          facilities:['WiFi','AC','Attached Bathroom'], students:[] },
  { id:4,  number:'A-202', block:'A', floor:2, type:'Double',   beds:2, occupied:0, status:'Available',          facilities:['WiFi','Fan','Common Bathroom'],   students:[] },
  { id:5,  number:'B-101', block:'B', floor:1, type:'Triple',   beds:3, occupied:3, status:'Full',               facilities:['WiFi','AC','Attached Bathroom'], students:[{name:'Arun K',   roll:'21ME301',phone:'9876543214',course:'B.Tech MECH'},{name:'Rahul M',  roll:'21ME302',phone:'9876543215',course:'B.Tech MECH'},{name:'Vikram T', roll:'21ME303',phone:'9876543216',course:'B.Tech MECH'}] },
  { id:6,  number:'B-102', block:'B', floor:1, type:'Double',   beds:2, occupied:1, status:'Partially Occupied', facilities:['WiFi','Fan','Common Bathroom'],   students:[{name:'Kiran S',  roll:'21CE401',phone:'9876543217',course:'B.Tech CIVIL'}] },
  { id:7,  number:'B-201', block:'B', floor:2, type:'Quad',     beds:4, occupied:4, status:'Full',               facilities:['WiFi','Fan','Common Bathroom'],   students:[{name:'Siva R',   roll:'21EE501',phone:'9876543218',course:'B.Tech EEE'},{name:'Mani K',   roll:'21EE502',phone:'9876543219',course:'B.Tech EEE'},{name:'Suresh P', roll:'21EE503',phone:'9876543220',course:'B.Tech EEE'},{name:'Harish B', roll:'21EE504',phone:'9876543221',course:'B.Tech EEE'}] },
  { id:8,  number:'B-202', block:'B', floor:2, type:'Single',   beds:1, occupied:0, status:'Maintenance',        facilities:['WiFi','AC'],                     students:[] },
  { id:9,  number:'C-101', block:'C', floor:1, type:'Double',   beds:2, occupied:2, status:'Full',               facilities:['WiFi','AC','Attached Bathroom'], students:[{name:'Meena V',  roll:'22CS601',phone:'9876543222',course:'B.Tech CSE'},{name:'Geetha P', roll:'22CS602',phone:'9876543223',course:'B.Tech CSE'}] },
  { id:10, number:'C-102', block:'C', floor:1, type:'Triple',   beds:3, occupied:1, status:'Partially Occupied', facilities:['WiFi','Fan','Common Bathroom'],   students:[{name:'Anitha R', roll:'22EC701',phone:'9876543224',course:'B.Tech ECE'}] },
  { id:11, number:'C-201', block:'C', floor:2, type:'Quad',     beds:4, occupied:0, status:'Available',          facilities:['WiFi','AC','Attached Bathroom'], students:[] },
  { id:12, number:'C-202', block:'C', floor:2, type:'Double',   beds:2, occupied:0, status:'Maintenance',        facilities:['WiFi'],                          students:[] },
  { id:13, number:'D-101', block:'D', floor:1, type:'Triple',   beds:3, occupied:2, status:'Partially Occupied', facilities:['WiFi','Fan','Common Bathroom'],   students:[{name:'Veni S',   roll:'22ME801',phone:'9876543225',course:'B.Tech MECH'},{name:'Sathya K', roll:'22ME802',phone:'9876543226',course:'B.Tech MECH'}] },
  { id:14, number:'D-102', block:'D', floor:1, type:'Double',   beds:2, occupied:2, status:'Full',               facilities:['WiFi','AC','Attached Bathroom'], students:[{name:'Reka M',   roll:'22CE901',phone:'9876543227',course:'B.Tech CIVIL'},{name:'Nisha P',  roll:'22CE902',phone:'9876543228',course:'B.Tech CIVIL'}] },
  { id:15, number:'D-201', block:'D', floor:2, type:'Single',   beds:1, occupied:1, status:'Full',               facilities:['WiFi','AC','Attached Bathroom'], students:[{name:'Lavanya B',roll:'22EE001',phone:'9876543229',course:'B.Tech EEE'}] },
];

const BLOCKS  = ['All','A','B','C','D'];
const FLOORS  = ['All','1','2','3'];
const STATUSES = ['All','Available','Partially Occupied','Full','Maintenance'];
const TYPES   = ['Single','Double','Triple','Quad'];
const FACILITIES_LIST = ['WiFi','AC','Fan','Attached Bathroom','Common Bathroom','Study Table','Wardrobe'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const statusBadge = (s) => {
  const map = {
    'Available':          'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Partially Occupied': 'bg-amber-100  text-amber-700  border-amber-200',
    'Full':               'bg-red-100    text-red-700    border-red-200',
    'Maintenance':        'bg-slate-100  text-slate-600  border-slate-200',
  };
  return map[s] || 'bg-slate-100 text-slate-600';
};

const statusIcon = (s) => {
  if (s === 'Available')          return <CheckCircle2 size={12} />;
  if (s === 'Partially Occupied') return <Minus size={12} />;
  if (s === 'Full')               return <Users size={12} />;
  return <Wrench size={12} />;
};

const calcStatus = (beds, occupied) => {
  if (occupied === 0)       return 'Available';
  if (occupied === beds)    return 'Full';
  return 'Partially Occupied';
};

// ─── Small reusable components ────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = 'primary', size = 'md', className = '', disabled = false, type = 'button' }) => {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed';
  const sizes = { sm: 'px-3 py-1.5 text-[12px]', md: 'px-4 py-2 text-[13px]', lg: 'px-5 py-2.5 text-[14px]' };
  const variants = {
    primary:  'text-white shadow-sm',
    outline:  'border border-slate-200 text-slate-600 hover:bg-slate-50',
    ghost:    'text-slate-500 hover:bg-slate-100',
    danger:   'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100',
    mint:     'border text-emerald-700 hover:bg-emerald-100',
  };
  const primaryStyle = variant === 'primary' ? { backgroundColor: G.forest } : {};
  const mintStyle    = variant === 'mint'    ? { backgroundColor: G.mint, borderColor: '#a7f3d0' } : {};
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...primaryStyle, ...mintStyle }}
      className={clsx(base, sizes[size], variants[variant], className)}
    >
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type = 'text', required, error }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-[12px] font-semibold text-slate-600">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={clsx(
        'w-full px-3 py-2.5 text-[13px] rounded-xl border bg-white transition-shadow focus:outline-none focus:ring-2',
        error ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:ring-emerald-100'
      )}
    />
    {error && <p className="text-[11px] text-red-500">{error}</p>}
  </div>
);

const Select = ({ label, value, onChange, options, required }) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-[12px] font-semibold text-slate-600">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>}
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-[13px] rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100 appearance-none pr-8"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </div>
  </div>
);

// ─── Modal shell ──────────────────────────────────────────────────────────────
const Modal = ({ title, onClose, children, wide = false }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
    <div className={clsx(
      'relative bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] w-full',
      wide ? 'max-w-3xl' : 'max-w-lg'
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0" style={{ background: G.warm }}>
        <h3 className="text-[15px] font-bold text-slate-800">{title}</h3>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
          <X size={18} />
        </button>
      </div>
      {/* Body */}
      <div className="overflow-y-auto p-6 flex-1 scrollbar-hide">{children}</div>
    </div>
  </div>
);

// ─── Room Form ────────────────────────────────────────────────────────────────
const EMPTY_FORM = { number:'', block:'A', floor:'1', type:'Double', beds:'2', facilities:['WiFi','Fan'], status:'Available' };

const RoomForm = ({ initial = EMPTY_FORM, onSave, onClose, isEdit }) => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const toggleFacility = (f) =>
    set('facilities', form.facilities.includes(f) ? form.facilities.filter(x => x !== f) : [...form.facilities, f]);

  const validate = () => {
    const e = {};
    if (!form.number.trim()) e.number = 'Room number is required';
    if (!form.beds || isNaN(form.beds) || +form.beds < 1) e.beds = 'Enter a valid bed count (min 1)';
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave({ ...form, beds: +form.beds });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Room Number" value={form.number} onChange={v => set('number', v)} placeholder="e.g. A-101" required error={errors.number} />
        <Select label="Hostel Block" value={form.block} onChange={v => set('block', v)} options={['A','B','C','D']} required />
        <Select label="Floor" value={form.floor} onChange={v => set('floor', v)} options={['1','2','3']} required />
        <Select label="Room Type" value={form.type} onChange={v => set('type', v)} options={TYPES} required />
        <Input label="Total Beds" value={form.beds} onChange={v => set('beds', v)} type="number" placeholder="e.g. 2" required error={errors.beds} />
        <Select label="Status" value={form.status} onChange={v => set('status', v)} options={['Available','Maintenance']} />
      </div>

      <div>
        <p className="text-[12px] font-semibold text-slate-600 mb-2">Facilities</p>
        <div className="flex flex-wrap gap-2">
          {FACILITIES_LIST.map(f => (
            <button
              key={f} type="button"
              onClick={() => toggleFacility(f)}
              className={clsx(
                'px-3 py-1.5 rounded-xl text-[12px] font-medium border transition-all',
                form.facilities.includes(f)
                  ? 'text-emerald-700 border-emerald-300'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-emerald-200'
              )}
              style={form.facilities.includes(f) ? { backgroundColor: G.mint } : {}}
            >{f}</button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Btn onClick={handleSave} size="lg" className="flex-1">
          <Save size={15} /> {isEdit ? 'Save Changes' : 'Add Room'}
        </Btn>
        <Btn onClick={onClose} variant="outline" size="lg">Cancel</Btn>
      </div>
    </div>
  );
};

// ─── View Details Modal ───────────────────────────────────────────────────────
const ViewDetails = ({ room, onClose, onEdit }) => {
  const pct = room.beds ? Math.round((room.occupied / room.beds) * 100) : 0;
  return (
    <Modal title={`Room ${room.number} — Details`} onClose={onClose} wide>
      <div className="space-y-5">
        {/* Top row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: Hash,       label: 'Room No.',  val: room.number },
            { icon: Building2,  label: 'Block',     val: `Block ${room.block}` },
            { icon: Layers,     label: 'Floor',     val: `Floor ${room.floor}` },
            { icon: BedDouble,  label: 'Type',      val: room.type },
            { icon: BedDouble,  label: 'Total Beds', val: room.beds },
            { icon: Users,      label: 'Occupied',  val: room.occupied },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="rounded-xl border border-slate-100 p-3 flex items-center gap-3" style={{ background: G.warm }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: G.mint }}>
                <Icon size={15} style={{ color: G.forest }} />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-medium">{label}</p>
                <p className="text-[13px] font-bold text-slate-800">{val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Occupancy bar */}
        <div className="rounded-xl border border-slate-100 p-4" style={{ background: G.warm }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-[12px] font-semibold text-slate-600">Occupancy</span>
            <span className="text-[12px] font-bold" style={{ color: G.forest }}>{pct}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${pct}%`, backgroundColor: G.forest }}
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">{room.occupied} of {room.beds} beds occupied · {room.beds - room.occupied} available</p>
        </div>

        {/* Status & Facilities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-slate-100 p-4" style={{ background: G.warm }}>
            <p className="text-[12px] font-semibold text-slate-600 mb-2">Status</p>
            <span className={clsx('inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold border', statusBadge(room.status))}>
              {statusIcon(room.status)} {room.status}
            </span>
          </div>
          <div className="rounded-xl border border-slate-100 p-4" style={{ background: G.warm }}>
            <p className="text-[12px] font-semibold text-slate-600 mb-2">Facilities</p>
            <div className="flex flex-wrap gap-1.5">
              {room.facilities.map(f => (
                <span key={f} className="px-2.5 py-1 rounded-full text-[11px] font-medium border" style={{ backgroundColor: G.mint, color: G.teal, borderColor: '#a7f3d0' }}>{f}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Assigned Students */}
        <div className="rounded-xl border border-slate-100 p-4" style={{ background: G.warm }}>
          <p className="text-[12px] font-semibold text-slate-600 mb-3 flex items-center gap-1.5">
            <GraduationCap size={14} style={{ color: G.forest }} /> Assigned Students ({room.students.length})
          </p>
          {room.students.length === 0
            ? <p className="text-[13px] text-slate-400">No students assigned.</p>
            : (
              <div className="space-y-2">
                {room.students.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white rounded-xl px-3 py-2.5 border border-slate-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{ backgroundColor: G.mint, color: G.forest }}>
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800">{s.name}</p>
                      <p className="text-[11px] text-slate-400">{s.roll} · {s.course}</p>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Phone size={11} />{s.phone}
                    </div>
                  </div>
                ))}
              </div>
            )
          }
        </div>

        <div className="flex gap-3">
          <Btn onClick={() => { onClose(); onEdit(room); }} size="md" className="flex-1">
            <Edit2 size={14} /> Edit Room
          </Btn>
          <Btn onClick={onClose} variant="outline" size="md">Close</Btn>
        </div>
      </div>
    </Modal>
  );
};

// ─── Allocate Modal ───────────────────────────────────────────────────────────
const AllocateModal = ({ room, onClose, onSave }) => {
  const [students, setStudents] = useState(room.students);
  const [form, setForm] = useState({ name: '', roll: '', phone: '', course: '' });
  const [err, setErr] = useState('');

  const addStudent = () => {
    if (students.length >= room.beds) { setErr('Room is at full capacity.'); return; }
    if (!form.name.trim() || !form.roll.trim()) { setErr('Name and Roll No. are required.'); return; }
    setStudents(p => [...p, { ...form }]);
    setForm({ name: '', roll: '', phone: '', course: '' });
    setErr('');
  };

  const removeStudent = (i) => setStudents(p => p.filter((_, idx) => idx !== i));

  const handleSave = () => {
    const newOccupied = students.length;
    const newStatus = calcStatus(room.beds, newOccupied);
    onSave({ ...room, students, occupied: newOccupied, status: newStatus });
  };

  return (
    <Modal title={`Manage Allocation — Room ${room.number}`} onClose={onClose} wide>
      <div className="space-y-5">
        {/* Occupancy banner */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl border" style={{ backgroundColor: G.mint, borderColor: '#a7f3d0' }}>
          <BedDouble size={18} style={{ color: G.forest }} />
          <p className="text-[13px] font-semibold" style={{ color: G.teal }}>
            {students.length} / {room.beds} beds occupied &nbsp;·&nbsp; {room.beds - students.length} available
          </p>
        </div>

        {/* Current occupants */}
        <div>
          <p className="text-[12px] font-semibold text-slate-600 mb-2">Current Occupants</p>
          {students.length === 0
            ? <p className="text-[13px] text-slate-400 italic">No students assigned yet.</p>
            : (
              <div className="space-y-2">
                {students.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-3 py-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0"
                      style={{ backgroundColor: G.mint, color: G.forest }}>
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-slate-800">{s.name}</p>
                      <p className="text-[11px] text-slate-400">{s.roll} · {s.course || '—'}</p>
                    </div>
                    <button onClick={() => removeStudent(i)} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )
          }
        </div>

        {/* Add student form */}
        {students.length < room.beds && (
          <div className="rounded-xl border border-dashed border-emerald-200 p-4" style={{ backgroundColor: G.warm }}>
            <p className="text-[12px] font-semibold text-slate-600 mb-3">Add Student</p>
            {err && <p className="text-[12px] text-red-500 mb-2">{err}</p>}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Input label="Full Name" value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} placeholder="e.g. Sneha R" required />
              <Input label="Roll No." value={form.roll} onChange={v => setForm(p => ({ ...p, roll: v }))} placeholder="e.g. 22CS101" required />
              <Input label="Phone" value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} placeholder="e.g. 9876543210" />
              <Input label="Course" value={form.course} onChange={v => setForm(p => ({ ...p, course: v }))} placeholder="e.g. B.Tech CSE" />
            </div>
            <Btn onClick={addStudent} size="sm" variant="mint">
              <Plus size={13} /> Add Occupant
            </Btn>
          </div>
        )}

        <div className="flex gap-3">
          <Btn onClick={handleSave} size="lg" className="flex-1">
            <Save size={15} /> Save Allocation
          </Btn>
          <Btn onClick={onClose} variant="outline" size="lg">Cancel</Btn>
        </div>
      </div>
    </Modal>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WardenRooms() {
  const [rooms, setRooms]         = useState(INIT_ROOMS);
  const [search, setSearch]       = useState('');
  const [fBlock, setFBlock]       = useState('All');
  const [fFloor, setFFloor]       = useState('All');
  const [fStatus, setFStatus]     = useState('All');
  const [modal, setModal]         = useState(null); // null | 'add' | 'edit' | 'view' | 'allocate'
  const [selected, setSelected]   = useState(null);

  // ── computed stats ──
  const stats = useMemo(() => ({
    total:       rooms.length,
    occupied:    rooms.filter(r => r.status === 'Full').length,
    available:   rooms.filter(r => r.status === 'Available').length,
    maintenance: rooms.filter(r => r.status === 'Maintenance').length,
  }), [rooms]);

  // ── filtered rooms ──
  const filtered = useMemo(() => rooms.filter(r => {
    if (search  && !r.number.toLowerCase().includes(search.toLowerCase())) return false;
    if (fBlock  !== 'All' && r.block  !== fBlock)  return false;
    if (fFloor  !== 'All' && String(r.floor) !== fFloor) return false;
    if (fStatus !== 'All' && r.status !== fStatus) return false;
    return true;
  }), [rooms, search, fBlock, fFloor, fStatus]);

  const isFiltered = search || fBlock !== 'All' || fFloor !== 'All' || fStatus !== 'All';
  const resetFilters = () => { setSearch(''); setFBlock('All'); setFFloor('All'); setFStatus('All'); };

  // ── CRUD helpers ──
  const openAdd  = ()    => setModal('add');
  const openEdit = (r)   => { setSelected(r); setModal('edit'); };
  const openView = (r)   => { setSelected(r); setModal('view'); };
  const openAlloc= (r)   => { setSelected(r); setModal('allocate'); };
  const closeModal = ()  => { setModal(null); setSelected(null); };

  const handleAddSave = (data) => {
    setRooms(p => [...p, { ...data, id: Date.now(), occupied: 0, students: [], status: 'Available' }]);
    closeModal();
  };

  const handleEditSave = (data) => {
    setRooms(p => p.map(r => r.id === selected.id ? { ...r, ...data } : r));
    closeModal();
  };

  const handleAllocSave = (updated) => {
    setRooms(p => p.map(r => r.id === updated.id ? updated : r));
    closeModal();
  };

  // ── Summary cards config ──
  const summaryCards = [
    { label: 'Total Rooms',       value: stats.total,       icon: Building2,    iconBg: '#EFF6FF', iconColor: '#2563EB', border: '#BFDBFE' },
    { label: 'Occupied Rooms',    value: stats.occupied,    icon: Users,        iconBg: '#FEF2F2', iconColor: '#DC2626', border: '#FECACA' },
    { label: 'Available Rooms',   value: stats.available,   icon: CheckCircle2, iconBg: G.mint,    iconColor: G.forest,  border: '#a7f3d0' },
    { label: 'Maintenance Rooms', value: stats.maintenance, icon: Wrench,       iconBg: '#FFF7ED', iconColor: '#EA580C', border: '#FED7AA' },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 size={24} style={{ color: G.forest }} /> Rooms Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage room allocation, occupancy, and hostel facilities.</p>
        </div>
        <Btn onClick={openAdd} size="lg">
          <Plus size={16} /> Add Room
        </Btn>
      </div>

      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map(({ label, value, icon: Icon, iconBg, iconColor, border }) => (
          <div key={label} className="bg-white rounded-2xl border p-5 shadow-sm flex items-center gap-4" style={{ borderColor: border }}>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
              <Icon size={22} style={{ color: iconColor }} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{label}</p>
              <p className="text-3xl font-extrabold text-slate-800">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Search & Filters ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search room number..."
              className="w-full pl-10 pr-4 py-2.5 text-[13px] border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-300"
            />
          </div>

          {/* Block filter */}
          {[
            { label: 'Block', value: fBlock, set: setFBlock, opts: BLOCKS },
            { label: 'Floor', value: fFloor, set: setFFloor, opts: FLOORS },
            { label: 'Status',value: fStatus,set: setFStatus,opts: STATUSES },
          ].map(({ label, value, set, opts }) => (
            <div key={label} className="relative min-w-[130px]">
              <Filter size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                value={value}
                onChange={e => set(e.target.value)}
                className="w-full pl-8 pr-8 py-2.5 text-[13px] border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-100 appearance-none"
              >
                {opts.map(o => <option key={o} value={o}>{o === 'All' ? `All ${label}s` : (label === 'Floor' ? `Floor ${o}` : o)}</option>)}
              </select>
              <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          ))}

          {/* Reset */}
          {isFiltered && (
            <Btn onClick={resetFilters} variant="ghost" size="md">
              <RotateCcw size={13} /> Reset
            </Btn>
          )}
        </div>

        {isFiltered && (
          <p className="text-[12px] text-slate-400 mt-2 ml-1">
            Showing <strong className="text-slate-600">{filtered.length}</strong> of {rooms.length} rooms
          </p>
        )}
      </div>

      {/* ── Room Directory Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between" style={{ background: G.warm }}>
          <h2 className="text-[14px] font-bold text-slate-800 flex items-center gap-2">
            <BedDouble size={16} style={{ color: G.forest }} /> Room Directory
          </h2>
          <span className="text-[12px] text-slate-400 font-medium">{filtered.length} rooms</span>
        </div>

        {/* Desktop table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-slate-100" style={{ background: G.warm }}>
                {['Room No.','Block','Floor','Type','Total Beds','Occupied','Available','Occupancy','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-16 text-slate-400">
                    <Building2 size={36} className="mx-auto mb-3 opacity-30" />
                    <p className="text-[14px] font-medium">No rooms match your filters.</p>
                    <button onClick={resetFilters} className="mt-2 text-[12px] underline" style={{ color: G.forest }}>Reset filters</button>
                  </td>
                </tr>
              )}
              {filtered.map((room) => {
                const avail = room.beds - room.occupied;
                const pct   = room.beds ? Math.round((room.occupied / room.beds) * 100) : 0;
                return (
                  <tr key={room.id} className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-bold text-slate-800 text-[13px]">{room.number}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-lg text-[12px] font-bold" style={{ backgroundColor: G.mint, color: G.teal }}>
                        Block {room.block}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-[13px]">Floor {room.floor}</td>
                    <td className="px-4 py-3 text-slate-600 text-[13px] font-medium">{room.type}</td>
                    <td className="px-4 py-3 text-center text-slate-700 font-semibold text-[13px]">{room.beds}</td>
                    <td className="px-4 py-3 text-center text-slate-700 font-semibold text-[13px]">{room.occupied}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={clsx('font-semibold text-[13px]', avail > 0 ? 'text-emerald-600' : 'text-slate-400')}>{avail}</span>
                    </td>
                    <td className="px-4 py-3 min-w-[100px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: pct === 100 ? '#EF4444' : pct > 50 ? '#F59E0B' : G.forest
                            }}
                          />
                        </div>
                        <span className="text-[11px] text-slate-400 w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={clsx('inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border whitespace-nowrap', statusBadge(room.status))}>
                        {statusIcon(room.status)} {room.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openView(room)}
                          title="View Details"
                          className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-700 transition-colors"
                        ><Eye size={15} /></button>
                        <button
                          onClick={() => openEdit(room)}
                          title="Edit Room"
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors"
                        ><Edit2 size={15} /></button>
                        <button
                          onClick={() => openAlloc(room)}
                          title="Manage Allocation"
                          className="p-1.5 rounded-lg hover:bg-purple-50 text-slate-400 hover:text-purple-600 transition-colors"
                        ><Users size={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modals ── */}
      {modal === 'add' && (
        <Modal title="Add New Room" onClose={closeModal}>
          <RoomForm onSave={handleAddSave} onClose={closeModal} isEdit={false} />
        </Modal>
      )}

      {modal === 'edit' && selected && (
        <Modal title={`Edit Room — ${selected.number}`} onClose={closeModal}>
          <RoomForm
            initial={{
              number: selected.number, block: selected.block, floor: String(selected.floor),
              type: selected.type, beds: String(selected.beds), facilities: selected.facilities,
              status: selected.status,
            }}
            onSave={handleEditSave}
            onClose={closeModal}
            isEdit
          />
        </Modal>
      )}

      {modal === 'view' && selected && (
        <ViewDetails room={selected} onClose={closeModal} onEdit={openEdit} />
      )}

      {modal === 'allocate' && selected && (
        <AllocateModal room={selected} onClose={closeModal} onSave={handleAllocSave} />
      )}
    </div>
  );
}
