import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Users, Settings, LogOut, Menu, Bell, Search, X, MessageSquare, 
  Calendar, Building, BarChart2, BedDouble, Wrench, FileText, Utensils, 
  Megaphone, User, ChevronDown 
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const getNavItems = (role) => {
    switch (role) {
      case 'student':
        return [
          { label: 'Dashboard', icon: Home, path: '/student/dashboard' },
          { label: 'My Room', icon: BedDouble, path: '/student/room' },
          { label: 'My Complaints', icon: Wrench, path: '/student/complaints' },
          { label: 'Leave Requests', icon: FileText, path: '/student/leaves' },
          { label: 'Mess Menu', icon: Utensils, path: '/student/menu' },
          { label: 'Announcements', icon: Megaphone, path: '/student/announcements' },
          { label: 'Lost & Found', icon: Search, path: '/student/lost-found' },
          { label: 'Notifications', icon: Bell, path: '/student/notifications', badge: '3' },
          { label: 'Profile', icon: User, path: '/student/profile' },
        ];
      case 'warden':
        return [
          { label: 'Dashboard', icon: Home, path: '/warden/dashboard' },
          { label: 'Students', icon: Users, path: '/warden/students' },
          { label: 'Rooms', icon: Building, path: '/warden/rooms' },
          { label: 'Complaints', icon: MessageSquare, path: '/warden/complaints' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', icon: Home, path: '/admin/dashboard' },
          { label: 'Users', icon: Users, path: '/admin/users' },
          { label: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
          { label: 'Settings', icon: Settings, path: '/admin/settings' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems(user.role);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden text-slate-900" data-theme={user.role?.toLowerCase() || 'student'}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={twMerge(
        "fixed inset-y-0 left-0 z-50 w-[260px] shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )} style={{ backgroundColor: 'var(--color-primary)' }}>
        
        {/* Logo Section */}
        <div className="pt-6 pb-2 px-6 flex flex-col justify-center relative overflow-hidden shrink-0">
          <h2 className="text-2xl font-bold tracking-tight text-white relative z-10 flex items-center gap-2">
            <Home className="text-white fill-white" size={24} />
            HostelHub
          </h2>
          <p className="text-white/80 text-[11px] mt-0.5 ml-8 relative z-10 font-medium">Better Stays. Happier Days.</p>
          <button className="lg:hidden absolute right-4 top-6 text-white/70 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* User Profile Section (Sidebar) */}
        {user.role === 'student' && (
          <div className="flex flex-col items-center py-5 border-b border-white/10 shrink-0 mx-6">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
              alt="User" 
              className="w-16 h-16 rounded-full border-2 border-white/30 shadow-sm mb-3 object-cover" 
            />
            <h3 className="text-white font-semibold text-sm">{user.name || 'Sushmitha S'}</h3>
            <span className="bg-white/20 text-white text-[10px] font-semibold tracking-wider px-3 py-1 rounded-full mt-1.5 uppercase border border-white/10">
              Student
            </span>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto scrollbar-hide mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path) || (item.path === '/student/dashboard' && location.pathname === '/student');
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={clsx(
                  "flex items-center justify-between p-3 rounded-xl transition-all duration-200 group font-medium",
                  isActive 
                    ? "text-white bg-white/20 shadow-sm"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={clsx("transition-transform duration-200", isActive ? "" : "group-hover:scale-110", "text-white", (isActive && item.icon === Home) ? "fill-white" : "")} />
                  <span className="text-[13px]">{item.label}</span>
                </div>
                {item.dot && (
                  <div className="w-2 h-2 rounded-full bg-red-400 mr-2 opacity-80 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></div>
                )}
                {item.badge && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full mr-1 flex items-center justify-center min-w-[20px]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Graphic for Student */}
        {user.role === 'student' && (
          <div className="p-6 mt-auto shrink-0 flex flex-col items-center relative">
            <div className="absolute bottom-0 left-0 right-0 h-32 opacity-25 pointer-events-none overflow-hidden flex items-end justify-center">
              <svg viewBox="0 0 240 120" className="w-full h-full text-white fill-current">
                <rect x="20" y="55" width="30" height="65" rx="2" fill="currentColor" opacity="0.6"/>
                <rect x="55" y="35" width="40" height="85" rx="2" fill="currentColor" opacity="0.8"/>
                <rect x="100" y="60" width="32" height="60" rx="2" fill="currentColor" opacity="0.6"/>
                <rect x="136" y="45" width="38" height="75" rx="2" fill="currentColor" opacity="0.8"/>
                <rect x="180" y="65" width="35" height="55" rx="2" fill="currentColor" opacity="0.5"/>
                <circle cx="32" cy="70" r="2" fill="#93c5fd" />
                <circle cx="40" cy="70" r="2" fill="#93c5fd" />
                <circle cx="32" cy="85" r="2" fill="#93c5fd" />
                <circle cx="40" cy="85" r="2" fill="#93c5fd" />
                <circle cx="68" cy="50" r="2" fill="#93c5fd" />
                <circle cx="78" cy="50" r="2" fill="#93c5fd" />
                <circle cx="68" cy="65" r="2" fill="#93c5fd" />
                <circle cx="78" cy="65" r="2" fill="#93c5fd" />
                <circle cx="68" cy="80" r="2" fill="#93c5fd" />
                <circle cx="78" cy="80" r="2" fill="#93c5fd" />
                <circle cx="148" cy="60" r="2" fill="#93c5fd" />
                <circle cx="158" cy="60" r="2" fill="#93c5fd" />
                <circle cx="148" cy="75" r="2" fill="#93c5fd" />
                <circle cx="158" cy="75" r="2" fill="#93c5fd" />
                <circle cx="15" cy="95" r="14" fill="currentColor" opacity="0.4" />
                <circle cx="98" cy="92" r="12" fill="currentColor" opacity="0.4" />
                <circle cx="178" cy="94" r="14" fill="currentColor" opacity="0.4" />
              </svg>
            </div>
            <p className="text-white/80 text-[11px] font-semibold text-center mt-8 relative z-10">Your Hostel at a Glance</p>
            <div className="w-8 h-1 bg-blue-300/80 rounded-full mt-2 relative z-10"></div>
          </div>
        )}
        
        {/* Logout (hidden for student to match UI, shown for others) */}
        {user.role !== 'student' && (
          <div className="p-4">
            <button
              onClick={logout}
              className="flex items-center w-full space-x-3 text-white/70 p-3 rounded-xl hover:bg-white/10 hover:text-white transition-colors duration-200 font-medium group text-sm"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white z-10 sticky top-0 h-[72px] flex items-center justify-between px-4 sm:px-8 border-b border-slate-100">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-slate-500 hover:text-slate-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden sm:flex relative items-center">
              <Search className="absolute left-4 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="pl-11 pr-4 py-2.5 w-[320px] bg-slate-50 border-none rounded-full text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow text-slate-700 font-medium placeholder:text-slate-400 placeholder:font-normal"
                style={{ '--tw-ring-color': 'var(--color-primary)' }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-5">
            {/* Notifications */}
            <button className="relative p-2.5 text-blue-500 bg-blue-50 hover:bg-blue-100 transition-colors rounded-full">
              <Bell size={20} className="fill-blue-500/20" />
              <span className="absolute top-0 right-0 w-[18px] h-[18px] rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                3
              </span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-2 cursor-pointer group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                alt="User" 
                className="w-9 h-9 rounded-full object-cover border border-slate-200" 
              />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">{user.name || 'Sushmitha S'}</p>
                  <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                </div>
                <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-0.5">Student</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto scrollbar-hide bg-slate-50/50">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
