import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Users, Building, MessageSquare, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { clsx } from 'clsx';

const WardenDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Good Morning, <span style={{ color: 'var(--color-primary)' }}>Warden</span>
          </h1>
          <p className="text-slate-500 mt-1">Overview of hostel operations and student activities.</p>
        </div>
        <button 
          className="px-4 py-2 text-white rounded-lg shadow-sm font-medium transition-colors shadow-primary/20 hover:shadow-primary/40"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Broadcast Notice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Students" value="450" icon={Users} trend="up" />
        <StatCard title="Occupancy" value="92%" icon={Building} trend="up" />
        <StatCard title="Pending Complaints" value="12" icon={MessageSquare} trend="down" />
        <StatCard title="On Leave" value="28" icon={AlertTriangle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-lg">Student</th>
                    <th className="px-4 py-3">Room</th>
                    <th className="px-4 py-3">Issue</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 rounded-tr-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'John Doe', room: 'A-102', issue: 'Plumbing leak', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
                    { name: 'Alice Smith', room: 'B-205', issue: 'Wi-Fi down', status: 'In Progress', statusColor: 'bg-blue-100 text-blue-700' },
                    { name: 'Bob Johnson', room: 'C-110', issue: 'Broken fan', status: 'Resolved', statusColor: 'bg-emerald-100 text-emerald-700' },
                    { name: 'Eve Davis', room: 'A-304', issue: 'Noise complaint', status: 'Pending', statusColor: 'bg-amber-100 text-amber-700' },
                  ].map((complaint, i) => (
                    <tr key={i} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-900">{complaint.name}</td>
                      <td className="px-4 py-3 text-slate-600">{complaint.room}</td>
                      <td className="px-4 py-3">{complaint.issue}</td>
                      <td className="px-4 py-3">
                        <span className={clsx("px-2.5 py-1 text-xs font-semibold rounded-full", complaint.statusColor)}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button style={{ color: 'var(--color-primary)' }} className="font-medium hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Needs Attention</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-rose-100 bg-rose-50 flex items-start space-x-3">
                <AlertTriangle className="text-rose-600 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-rose-900">Overdue Fees</h4>
                  <p className="text-xs text-rose-700 mt-1">15 students have pending fee payments past the deadline.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-amber-100 bg-amber-50 flex items-start space-x-3">
                <Clock className="text-amber-600 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-amber-900">Late Entries</h4>
                  <p className="text-xs text-amber-700 mt-1">4 students recorded late entry last night.</p>
                </div>
              </div>
              <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 flex items-start space-x-3">
                <CheckCircle2 className="text-blue-600 shrink-0" size={20} />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900">Maintenance</h4>
                  <p className="text-xs text-blue-700 mt-1">Water tank cleaning scheduled for tomorrow 10 AM.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default WardenDashboard;
