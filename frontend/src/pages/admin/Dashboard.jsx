import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Building2, Users2, DollarSign, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const AdminDashboard = () => {
  const occupancyData = [
    { name: 'Jan', occupancy: 85, target: 90 },
    { name: 'Feb', occupancy: 88, target: 90 },
    { name: 'Mar', occupancy: 92, target: 90 },
    { name: 'Apr', occupancy: 94, target: 90 },
    { name: 'May', occupancy: 95, target: 90 },
    { name: 'Jun', occupancy: 80, target: 90 }, // Summer break
    { name: 'Jul', occupancy: 75, target: 90 },
  ];

  const complaintsData = [
    { name: 'Week 1', plumbing: 12, electrical: 5, wifi: 8 },
    { name: 'Week 2', plumbing: 8, electrical: 7, wifi: 15 },
    { name: 'Week 3', plumbing: 15, electrical: 4, wifi: 5 },
    { name: 'Week 4', plumbing: 6, electrical: 9, wifi: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 mt-1">Global analytics and administrative controls.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 font-medium transition-colors">
            Download Report
          </button>
          <button 
            className="px-4 py-2 text-white rounded-lg shadow-sm font-medium transition-colors shadow-primary/20 hover:shadow-primary/40"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Manage Users
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Capacity" value="1,250" description="Across 4 hostels" icon={Building2} />
        <StatCard title="Active Users" value="1,180" description="Students & Staff" icon={Users2} trend="up" />
        <StatCard title="Revenue (MTD)" value="$45.2k" description="Fee collections" icon={DollarSign} trend="up" />
        <StatCard title="System Health" value="99.9%" description="Uptime" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={occupancyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="occupancy" 
                    stroke="var(--color-primary)" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorOccupancy)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaints Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={complaintsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="plumbing" stackId="a" fill="#0f172a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="electrical" stackId="a" fill="#14b8a6" />
                  <Bar dataKey="wifi" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default AdminDashboard;
