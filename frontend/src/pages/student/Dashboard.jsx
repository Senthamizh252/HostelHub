import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Home, MessageSquare, Calendar, Bell, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Good Morning, <span style={{ color: 'var(--color-primary)' }}>{user?.name || 'Student'}</span>
          </h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your hostel stay.</p>
        </div>
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors"
          >
            New Leave Request
          </button>
          <button 
            className="px-4 py-2 text-white rounded-lg shadow-sm font-medium transition-colors shadow-primary/20 hover:shadow-primary/40"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            File Complaint
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Room Details" 
          value="A-102" 
          description="North Block" 
          icon={Home} 
        />
        <StatCard 
          title="Active Complaints" 
          value="1" 
          description="Plumbing issue" 
          icon={MessageSquare} 
        />
        <StatCard 
          title="Approved Leaves" 
          value="2" 
          description="This semester" 
          icon={Calendar} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Activity</CardTitle>
              <button style={{ color: 'var(--color-primary)' }} className="text-sm font-medium hover:underline">View all</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: 'Complaint resolved: Wi-Fi issue', time: '2 hours ago', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-100' },
                { title: 'Leave request approved', time: '1 day ago', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100' },
                { title: 'Notice: Fire drill tomorrow', time: '2 days ago', icon: Bell, color: 'text-amber-600', bg: 'bg-amber-100' },
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-full ${item.bg} ${item.color}`}>
                    <item.icon size={16} />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Link to="/student/complaints" className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group bg-slate-50">
              <MessageSquare size={24} className="text-slate-400 group-hover:text-primary mb-2 transition-colors" style={{ '--tw-text-opacity': 1 }} />
              <span className="text-sm font-medium text-slate-700">Complaints</span>
            </Link>
            <Link to="/student/leaves" className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group bg-slate-50">
              <Calendar size={24} className="text-slate-400 group-hover:text-primary mb-2 transition-colors" />
              <span className="text-sm font-medium text-slate-700">Leave Requests</span>
            </Link>
            <Link to="/student/fees" className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group bg-slate-50">
              <Bell size={24} className="text-slate-400 group-hover:text-primary mb-2 transition-colors" />
              <span className="text-sm font-medium text-slate-700">Fee Payment</span>
            </Link>
            <Link to="/student/rules" className="flex flex-col items-center justify-center p-6 border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group bg-slate-50">
              <Home size={24} className="text-slate-400 group-hover:text-primary mb-2 transition-colors" />
              <span className="text-sm font-medium text-slate-700">Hostel Rules</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default StudentDashboard;
