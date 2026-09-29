import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Users, Settings, LogOut, Menu } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const navItems = [
    { label: 'Dashboard', icon: Home, path: `/${user.role}/dashboard` },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-blue-600">HostelHub</h2>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
        <nav className="p-4 space-y-2 flex-1 flex flex-col">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center space-x-3 text-gray-700 p-2 rounded hover:bg-blue-50 hover:text-blue-600"
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center space-x-3 text-red-600 p-2 rounded hover:bg-red-50 w-full mt-auto"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
