import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Home, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

const ROLES = [
  {
    id: 'student',
    label: 'Student',
    emoji: '🎓',
    hint: 'student@college.edu',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    activeColor: 'bg-blue-600 text-white border-blue-600',
  },
  {
    id: 'warden',
    label: 'Warden',
    emoji: '🏫',
    hint: 'warden@college.edu',
    color: 'bg-teal-50 border-teal-200 text-teal-700',
    activeColor: 'bg-teal-600 text-white border-teal-600',
  },
  {
    id: 'admin',
    label: 'Admin',
    emoji: '⚙️',
    hint: 'admin@college.edu',
    color: 'bg-slate-50 border-slate-200 text-slate-700',
    activeColor: 'bg-slate-800 text-white border-slate-800',
  },
];

const THEME = {
  student: { primary: '#2563EB', bg: 'from-blue-600 to-blue-800', ring: 'focus:ring-blue-300', btn: 'bg-blue-600 hover:bg-blue-700', shadow: 'shadow-blue-200' },
  warden:  { primary: '#0F7A6B', bg: 'from-teal-600 to-teal-800',  ring: 'focus:ring-teal-300',  btn: 'bg-teal-600 hover:bg-teal-700',  shadow: 'shadow-teal-200'  },
  admin:   { primary: '#0F172A', bg: 'from-slate-700 to-slate-900', ring: 'focus:ring-slate-300', btn: 'bg-slate-800 hover:bg-slate-900', shadow: 'shadow-slate-200' },
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const theme = THEME[selectedRole];
  const roleInfo = ROLES.find(r => r.id === selectedRole);

  const handleRoleSwitch = (roleId) => {
    setSelectedRole(roleId);
    setError('');
    const r = ROLES.find(r => r.id === roleId);
    setEmail(r.hint);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }

    setLoading(true);

    // Mock users — no backend needed
    const mockUsers = {
      student: {
        id: 1, role: 'student', name: 'Sushmitha S',
        email: 'student@college.edu',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      },
      warden: {
        id: 2, role: 'warden', name: 'Dr. Priya Sharma',
        email: 'warden@college.edu',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
      },
      admin: {
        id: 3, role: 'admin', name: 'Admin',
        email: 'admin@college.edu',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300',
      },
    };

    // Simulate a short delay for UX
    setTimeout(() => {
      const user = mockUsers[selectedRole];
      login(user, 'mock-token');
      navigate(`/${selectedRole}/dashboard`);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex font-sans">

      {/* ── Left Panel (decorative) ── */}
      <div className={`hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-gradient-to-br ${theme.bg} relative overflow-hidden transition-all duration-500`}>
        {/* Background blobs */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-white" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white/20 rounded-2xl flex items-center justify-center">
              <Home size={22} className="text-white fill-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl leading-tight">HostelHub</h1>
              <p className="text-white/60 text-[11px]">Smart Hostel Management System</p>
            </div>
          </div>
        </div>

        {/* Centre Illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 py-16">
          {/* Building SVG */}
          <svg viewBox="0 0 280 220" className="w-72 opacity-90 drop-shadow-2xl mb-8">
            {/* Sky / Moon */}
            <circle cx="220" cy="35" r="22" fill="white" opacity="0.15" />
            <circle cx="228" cy="30" r="17" fill="white" opacity="0.12" />
            {/* Stars */}
            {[[40,20],[70,10],[160,15],[250,50],[30,55]].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="white" opacity="0.5" />
            ))}
            {/* Ground */}
            <rect x="0" y="185" width="280" height="35" rx="4" fill="white" opacity="0.08" />
            {/* Building 1 (tall centre) */}
            <rect x="90" y="60" width="100" height="130" rx="4" fill="white" opacity="0.18" />
            <rect x="100" y="50" width="80" height="140" rx="4" fill="white" opacity="0.22" />
            {/* Windows on centre */}
            {[0,1,2,3,4].map(row => [0,1,2].map(col => (
              <rect key={`${row}-${col}`} x={115 + col * 22} y={70 + row * 22} width="12" height="12" rx="2" fill="white" opacity={Math.random() > 0.4 ? 0.6 : 0.15} />
            )))}
            {/* Building 2 (left) */}
            <rect x="20" y="105" width="65" height="85" rx="4" fill="white" opacity="0.15" />
            {[0,1,2].map(row => [0,1].map(col => (
              <rect key={`l${row}-${col}`} x={32 + col * 20} y={118 + row * 22} width="10" height="10" rx="2" fill="white" opacity={Math.random() > 0.5 ? 0.55 : 0.12} />
            )))}
            {/* Building 3 (right) */}
            <rect x="195" y="115" width="65" height="75" rx="4" fill="white" opacity="0.15" />
            {[0,1,2].map(row => [0,1].map(col => (
              <rect key={`r${row}-${col}`} x={207 + col * 20} y={126 + row * 20} width="10" height="10" rx="2" fill="white" opacity={Math.random() > 0.5 ? 0.55 : 0.12} />
            )))}
            {/* Trees */}
            <ellipse cx="50" cy="184" rx="18" ry="12" fill="white" opacity="0.15" />
            <rect x="47" y="184" width="6" height="10" rx="2" fill="white" opacity="0.1" />
            <ellipse cx="230" cy="184" rx="16" ry="11" fill="white" opacity="0.15" />
            <rect x="227" y="184" width="6" height="10" rx="2" fill="white" opacity="0.1" />
            {/* Path */}
            <rect x="125" y="182" width="30" height="8" rx="2" fill="white" opacity="0.12" />
          </svg>

          <h2 className="text-white text-2xl font-extrabold text-center leading-snug">
            Welcome to HostelHub
          </h2>
          <p className="text-white/70 text-sm mt-2 text-center max-w-xs leading-relaxed">
            Your all-in-one platform for hostel management — rooms, complaints, leaves & more.
          </p>
        </div>

        {/* Bottom tagline */}
        <div className="relative z-10 text-white/50 text-xs font-medium text-center">
          Better Hostels · Brighter Futures
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-slate-50">

        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${theme.btn}`}>
            <Home size={18} className="text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">HostelHub</span>
        </div>

        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Sign in</h2>
            <p className="text-slate-500 mt-1.5 text-sm">Choose your role and enter your credentials to continue.</p>
          </div>

          {/* Role Selector */}
          <div className="flex gap-2 mb-7">
            {ROLES.map(role => {
              const isActive = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => handleRoleSwitch(role.id)}
                  className={`flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-2xl border-2 transition-all duration-200 font-semibold text-[13px] ${
                    isActive ? role.activeColor : role.color + ' hover:border-opacity-60'
                  }`}
                >
                  <span className="text-xl">{role.emoji}</span>
                  {role.label}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Banner */}
            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={16} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder={roleInfo.hint}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${theme.ring} transition-shadow`}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[13px] font-semibold text-slate-700">Password</label>
                <button type="button" className="text-[12px] font-semibold text-slate-400 hover:text-slate-600 transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-12 py-3 rounded-xl border border-slate-200 bg-white text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${theme.ring} transition-shadow`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-[15px] shadow-lg ${theme.shadow} ${theme.btn} transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-2`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                `Sign in as ${roleInfo.label}`
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Demo Credentials</p>
            <div className="space-y-1.5 text-[12px] text-slate-500">
              <div className="flex justify-between">
                <span>🎓 Student</span><span className="font-mono text-slate-600">student@college.edu / any</span>
              </div>
              <div className="flex justify-between">
                <span>🏫 Warden</span><span className="font-mono text-slate-600">warden@college.edu / any</span>
              </div>
              <div className="flex justify-between">
                <span>⚙️ Admin</span><span className="font-mono text-slate-600">admin@college.edu / any</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
