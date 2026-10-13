import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Building2, AlertTriangle, Calendar,
  ChevronRight, UserPlus, BedDouble, Megaphone,
  BarChart2, ClipboardCheck, Utensils, Zap,
  Clock, CheckCircle2, Circle
} from 'lucide-react';
import clsx from 'clsx';

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ title, value, icon: Icon, iconBg, iconColor, sub, trend, trendUp }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
      <div className={clsx('w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0', iconBg)}>
        <Icon size={26} className={iconColor} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-slate-800 leading-tight">{value}</p>
        <div className="flex items-center gap-1 mt-0.5">
          {trend && (
            <span className={clsx('text-xs font-semibold flex items-center gap-0.5', trendUp ? 'text-emerald-600' : 'text-rose-500')}>
              {trendUp ? '↑' : '↓'} {trend}
            </span>
          )}
          <span className="text-xs text-slate-400">{sub}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, iconColor, iconBg, title, linkLabel = 'View All', linkTo = '#' }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className={clsx('w-7 h-7 rounded-lg flex items-center justify-center', iconBg)}>
          <Icon size={15} className={iconColor} />
        </div>
        <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
      </div>
      <Link to={linkTo} className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-0.5">
        {linkLabel} <ChevronRight size={13} />
      </Link>
    </div>
  );
}

// ─── Needs Attention Item ─────────────────────────────────────────────────────
function AttentionItem({ icon: Icon, iconColor, iconBg, title, sub, badge, badgeColor }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-50 last:border-0 cursor-pointer group">
      <div className={clsx('w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0', iconBg)}>
        <Icon size={17} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">{title}</p>
        <p className="text-[11px] text-slate-400 truncate">{sub}</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className={clsx('text-xs font-bold px-2.5 py-1 rounded-full', badgeColor)}>{badge}</span>
        <ChevronRight size={14} className="text-slate-300" />
      </div>
    </div>
  );
}

// ─── Quick Action Button ──────────────────────────────────────────────────────
function QuickAction({ icon: Icon, iconBg, iconColor, label, to = '#' }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-all group"
    >
      <div className={clsx('w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0', iconBg)}>
        <Icon size={17} className={iconColor} />
      </div>
      <span className="text-[13px] font-semibold text-slate-700 group-hover:text-teal-700 flex-1">{label}</span>
      <ChevronRight size={14} className="text-slate-300 group-hover:text-teal-500" />
    </Link>
  );
}

// ─── Activity Item ────────────────────────────────────────────────────────────
function ActivityItem({ dotColor, title, sub, time }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      <span className={clsx('mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0', dotColor)} />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-slate-800">{title}</p>
        <p className="text-[11px] text-slate-400">{sub}</p>
      </div>
      <span className="text-[11px] text-slate-400 flex-shrink-0">{time}</span>
    </div>
  );
}

// ─── Meal Card ────────────────────────────────────────────────────────────────
function MealCard({ emoji, label, time, items, bg }) {
  return (
    <div className={clsx('rounded-xl p-3 flex-1 min-w-0', bg)}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{emoji}</span>
        <div>
          <p className="text-[12px] font-bold text-slate-800">{label}</p>
          <p className="text-[10px] text-slate-500">{time}</p>
        </div>
      </div>
      <p className="text-[11px] text-slate-600 leading-relaxed">{items}</p>
    </div>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const map = {
    High: 'bg-red-100 text-red-600',
    Medium: 'bg-orange-100 text-orange-600',
    Low: 'bg-green-100 text-green-700',
  };
  return (
    <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full', map[priority] || 'bg-slate-100 text-slate-600')}>
      {priority}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    Open: 'bg-red-100 text-red-600',
    'In Progress': 'bg-purple-100 text-purple-600',
    Resolved: 'bg-green-100 text-green-700',
    Pending: 'bg-orange-100 text-orange-600',
  };
  return (
    <span className={clsx('text-[11px] font-bold px-2.5 py-0.5 rounded-full', map[status] || 'bg-slate-100 text-slate-500')}>
      {status}
    </span>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const WardenDashboard = () => {
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });

  const complaints = [
    { avatar: 'SR', name: 'Sneha R', room: 'B-208', category: 'Electrical', priority: 'High', status: 'Open' },
    { avatar: 'AK', name: 'Arun K', room: 'A-104', category: 'Plumbing', priority: 'Medium', status: 'In Progress' },
    { avatar: 'PS', name: 'Priya S', room: 'C-312', category: 'Cleaning', priority: 'Low', status: 'Resolved' },
    { avatar: 'VT', name: 'Vikram T', room: 'B-110', category: 'WiFi', priority: 'Medium', status: 'Open' },
    { avatar: 'DM', name: 'Divya M', room: 'A-203', category: 'Furniture', priority: 'High', status: 'In Progress' },
  ];

  const avatarColors = ['bg-teal-100 text-teal-700', 'bg-blue-100 text-blue-700', 'bg-purple-100 text-purple-700', 'bg-orange-100 text-orange-700', 'bg-rose-100 text-rose-700'];

  return (
    <div className="space-y-5">
      {/* ── Header Banner ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5">
        {/* Building Icon */}
        <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Building2 size={34} className="text-teal-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-extrabold text-slate-900">Hostel Operations</h1>
          <p className="text-sm text-slate-500 mt-0.5">Here's what's happening in your hostel today.</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 flex-shrink-0">
          <Calendar size={15} className="text-slate-400" />
          <span className="font-medium">{today}</span>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="248"
          icon={Users}
          iconBg="bg-green-50"
          iconColor="text-green-500"
          trend="12%"
          trendUp={true}
          sub="from last month"
        />
        <StatCard
          title="Room Occupancy"
          value="92%"
          icon={BedDouble}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
          sub="221 / 240 rooms"
        />
        <StatCard
          title="Pending Complaints"
          value="8"
          icon={AlertTriangle}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
          trend="3%"
          trendUp={false}
          sub="from last week"
        />
        <StatCard
          title="Pending Leave Requests"
          value="6"
          icon={Calendar}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
          trend="40%"
          trendUp={false}
          sub="from last week"
        />
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* ── Left Column (2/3) ── */}
        <div className="xl:col-span-2 space-y-5">
          {/* Needs Attention */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <SectionHeader
              icon={Zap}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
              title="Needs Attention"
            />
            <AttentionItem
              icon={AlertTriangle}
              iconBg="bg-red-50"
              iconColor="text-red-500"
              title="High Priority Complaints"
              sub="Electrical issue - Block B (Room 208)"
              badge="3 High"
              badgeColor="bg-red-100 text-red-600"
            />
            <AttentionItem
              icon={Calendar}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
              title="Leave Requests Awaiting Approval"
              sub="2 Faculty, 2 Students"
              badge="4 Pending"
              badgeColor="bg-orange-100 text-orange-600"
            />
            <AttentionItem
              icon={Users}
              iconBg="bg-blue-50"
              iconColor="text-blue-500"
              title="Maintenance Issues"
              sub="Water supply (North Block), AC (Room 102)"
              badge="2 Open"
              badgeColor="bg-blue-100 text-blue-600"
            />
          </div>

          {/* Recent Complaints */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <SectionHeader
              icon={ClipboardCheck}
              iconBg="bg-teal-50"
              iconColor="text-teal-600"
              title="Recent Complaints"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Student', 'Room', 'Category', 'Priority', 'Status', 'Action'].map((h) => (
                      <th key={h} className="pb-2 text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 first:pl-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c, i) => (
                    <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors">
                      <td className="py-2.5 px-2 first:pl-0">
                        <div className="flex items-center gap-2.5">
                          <div className={clsx('w-8 h-8 rounded-full text-[11px] font-bold flex items-center justify-center flex-shrink-0', avatarColors[i])}>
                            {c.avatar}
                          </div>
                          <span className="font-semibold text-slate-800 text-[13px]">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-[13px] text-slate-500 font-medium">{c.room}</td>
                      <td className="py-2.5 px-2 text-[13px] text-slate-600">{c.category}</td>
                      <td className="py-2.5 px-2"><PriorityBadge priority={c.priority} /></td>
                      <td className="py-2.5 px-2"><StatusBadge status={c.status} /></td>
                      <td className="py-2.5 px-2">
                        <button className="text-[12px] font-bold text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 px-3 py-1 rounded-lg transition-colors">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mess Menu Today */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <SectionHeader
              icon={Utensils}
              iconBg="bg-yellow-50"
              iconColor="text-yellow-600"
              title="Mess Menu (Today)"
              linkLabel="View Full Menu →"
            />
            <div className="flex gap-3 overflow-x-auto pb-1">
              <MealCard
                emoji="🌿"
                label="Breakfast"
                time="7:00 AM – 8:30 AM"
                items="Idli, Sambar, Chutney, Milk"
                bg="bg-green-50"
              />
              <MealCard
                emoji="☀️"
                label="Lunch"
                time="12:30 PM – 2:00 PM"
                items="Rice, Sambar, Porival, Curd"
                bg="bg-yellow-50"
              />
              <MealCard
                emoji="🌅"
                label="Evening Snacks"
                time="4:00 PM – 5:00 PM"
                items="Tea, Biscuit, Banana"
                bg="bg-orange-50"
              />
              <MealCard
                emoji="🌙"
                label="Dinner"
                time="7:30 PM – 8:30 PM"
                items="Chapati, Gravy, Veg Curry, Salad"
                bg="bg-blue-50"
              />
            </div>
          </div>
        </div>

        {/* ── Right Column (1/3) ── */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-teal-50 rounded-lg flex items-center justify-center">
                <Zap size={15} className="text-teal-600" />
              </div>
              <h2 className="text-[15px] font-bold text-slate-800">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <QuickAction icon={UserPlus} iconBg="bg-green-50" iconColor="text-green-600" label="Add Student" to="/warden/students" />
              <QuickAction icon={BedDouble} iconBg="bg-purple-50" iconColor="text-purple-600" label="Manage Rooms" to="/warden/rooms" />
              <QuickAction icon={Megaphone} iconBg="bg-orange-50" iconColor="text-orange-500" label="Post Announcement" to="/warden/announcements" />
              <QuickAction icon={BarChart2} iconBg="bg-blue-50" iconColor="text-blue-600" label="View Reports" to="/warden/reports" />
              <QuickAction icon={ClipboardCheck} iconBg="bg-teal-50" iconColor="text-teal-600" label="Approve Leave Requests" to="/warden/leaves" />
              <QuickAction icon={Utensils} iconBg="bg-yellow-50" iconColor="text-yellow-600" label="Update Mess Menu" to="/warden/mess" />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-slate-100 rounded-lg flex items-center justify-center">
                <Clock size={15} className="text-slate-500" />
              </div>
              <h2 className="text-[15px] font-bold text-slate-800">Recent Activity</h2>
            </div>
            <ActivityItem
              dotColor="bg-green-400"
              title="Leave request approved"
              sub="Rahul M (B-101)"
              time="2 hrs ago"
            />
            <ActivityItem
              dotColor="bg-orange-400"
              title="New complaint submitted"
              sub="Sneha R (B-208)"
              time="3 hrs ago"
            />
            <ActivityItem
              dotColor="bg-blue-400"
              title="Mess menu updated"
              sub="Week 4 menu published"
              time="5 hrs ago"
            />
            <ActivityItem
              dotColor="bg-teal-400"
              title="Student checked in"
              sub="Kavya S (C-305)"
              time="6 hrs ago"
            />
            <ActivityItem
              dotColor="bg-purple-400"
              title="Announcement posted"
              sub="Maintenance work - North Block"
              time="7 hrs ago"
            />
          </div>

          {/* Tagline Card */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-5 flex items-center justify-center relative overflow-hidden min-h-[100px]">
            {/* Decorative leaf elements */}
            <div className="absolute left-3 bottom-3 text-teal-200 text-4xl select-none pointer-events-none opacity-60">🌿</div>
            <div className="absolute right-3 top-3 text-teal-200 text-3xl select-none pointer-events-none opacity-60">🍃</div>
            <p className="text-center text-[15px] font-extrabold text-teal-800 italic z-10 leading-snug">
              Together for<br />a Better Hostel Experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WardenDashboard;
