import { useState } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Users, Settings, LogOut, Menu, Bell, Search, X, MessageSquare, Calendar, Building, BarChart2 } from 'lucide-react';
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
          { label: 'Complaints', icon: MessageSquare, path: '/student/complaints' },
          { label: 'Leaves', icon: Calendar, path: '/student/leaves' },
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
        "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--color-primary)' }}>HostelHub</h2>
          <button className="lg:hidden text-slate-400 hover:text-slate-600" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={clsx(
                  "flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 group font-medium",
                  isActive 
                    ? "text-white shadow-md shadow-primary/20"
                    : "text-slate-600 hover:bg-slate-100/80"
                )}
                style={isActive ? { backgroundColor: 'var(--color-primary)' } : {}}
              >
                <Icon size={20} className={clsx("transition-transform duration-200", isActive ? "" : "group-hover:scale-110", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600")} style={isActive ? { color: 'white' } : {}} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={logout}
            className="flex items-center w-full space-x-3 text-red-600 p-3 rounded-xl hover:bg-red-50 transition-colors duration-200 font-medium group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm border-b border-slate-100 z-10 sticky top-0 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-4 text-slate-500 hover:text-slate-700"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden sm:flex relative items-center">
              <Search className="absolute left-3 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 w-64 bg-slate-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                style={{ '--tw-ring-color': 'var(--color-primary)' }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-50">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-primary)' }}></span>
            </button>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4 sm:pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-700">{user.name || 'User'}</p>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-primary)' }}>{user.role}</p>
              </div>
              <div 
                className="h-10 w-10 flex items-center justify-center text-white font-bold text-lg shadow-sm rounded-md"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                {(user.name || user.role || 'U').charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
