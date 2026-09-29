import { Outlet } from 'react-router-dom';
import { Building2 } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 selection:bg-primary selection:text-white">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500"></div>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">HostelHub</h1>
          <p className="text-slate-400 mt-2 text-sm">Smart hostel management system</p>
        </div>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
