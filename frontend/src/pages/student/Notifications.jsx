import React, { useState } from 'react';
import { 
  Bell, Check, Calendar, FileText, Megaphone, Utensils, AlertCircle, Info, 
  CheckCircle2, ChevronRight, Send, MessageSquare, Briefcase
} from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    title: 'Fire Safety Drill - Tomorrow',
    message: 'All students are requested to participate in the fire safety drill at 10:00 AM.',
    date: '6 Oct 2026',
    time: '10:00 AM',
    type: 'Announcements',
    tag: 'Emergency',
    read: false,
    icon: <Megaphone size={18} />,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    tagColor: 'text-red-600 bg-red-50'
  },
  {
    id: 2,
    title: 'Water Supply Maintenance',
    message: 'Water supply will be temporarily unavailable in North Block from 2 PM - 4 PM.',
    date: '5 Oct 2026',
    time: '2:00 PM',
    type: 'Complaints',
    tag: 'Maintenance',
    read: false,
    icon: <FileText size={18} />,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    tagColor: 'text-blue-600 bg-blue-50'
  },
  {
    id: 3,
    title: 'Hostel Day Celebration',
    message: 'Join us for the Hostel Day celebrations with games, music and cultural activities.',
    date: '8 Oct 2026',
    time: '10:00 AM',
    type: 'Announcements',
    tag: 'Events',
    read: false,
    icon: <Calendar size={18} />,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
    tagColor: 'text-purple-600 bg-purple-50'
  },
  {
    id: 4,
    title: 'Mess Menu Update',
    message: 'Special dinner menu will be served this Friday.',
    date: '7 Oct 2026',
    time: '7:00 PM',
    type: 'Mess',
    tag: 'Food',
    read: false,
    icon: <Utensils size={18} />,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
    tagColor: 'text-green-600 bg-green-50'
  },
  {
    id: 5,
    title: 'AC Maintenance in North Block',
    message: 'AC maintenance will be done in all rooms of North Block from 1st October 2025.',
    date: '1 Oct 2026',
    time: '11:00 AM',
    type: 'Complaints',
    tag: 'Maintenance',
    read: true,
    icon: <AlertCircle size={18} />,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    tagColor: 'text-blue-600 bg-blue-50'
  },
  {
    id: 6,
    title: 'System Update',
    message: 'HostelHub app will be under maintenance on 30th September 2025 from 10 PM - 12 AM.',
    date: '30 Sep 2026',
    time: '10:00 PM',
    type: 'System',
    tag: 'System',
    read: true,
    icon: <Info size={18} />,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    tagColor: 'text-slate-600 bg-slate-100'
  },
  {
    id: 7,
    title: 'Inter-Hostel Sports',
    message: 'Registration for inter-hostel sports is now open. Last date: 10th October 2025.',
    date: '28 Sep 2026',
    time: '4:00 PM',
    type: 'Announcements',
    tag: 'Events',
    read: true,
    icon: <Calendar size={18} />,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50',
    tagColor: 'text-purple-600 bg-purple-50'
  },
  {
    id: 8,
    title: 'Leave Request Approved',
    message: 'Your leave request for weekend trip has been approved by the warden.',
    date: '25 Sep 2026',
    time: '10:30 AM',
    type: 'Leave Requests',
    tag: 'Approved',
    read: true,
    icon: <CheckCircle2 size={18} />,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
    tagColor: 'text-green-600 bg-green-50'
  }
];

const categories = [
  { id: 'All', label: 'All', count: 8 },
  { id: 'Announcements', label: 'Announcements', count: 3 },
  { id: 'Complaints', label: 'Complaints', count: 2 },
  { id: 'Leave Requests', label: 'Leave Requests', count: 1 },
  { id: 'Mess', label: 'Mess', count: 1 },
  { id: 'System', label: 'System', count: 1 },
];

const StudentNotifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(
    n => activeTab === 'All' || n.type === activeTab
  );

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans relative">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
              <Bell size={28} className="fill-current" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Notifications</h1>
              <p className="text-slate-500 text-sm">Stay updated with your latest activities and important updates.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
             {/* Small Updates Text */}
             <div className="mr-6 transform -rotate-12">
               <p className="text-blue-600 font-bold text-sm tracking-tight leading-tight">Small</p>
               <p className="text-blue-600 font-bold text-sm tracking-tight leading-tight">updates make</p>
               <p className="text-blue-600 font-bold text-sm tracking-tight leading-tight flex items-center gap-1">a big difference! <span className="text-blue-500 text-xs">♥</span></p>
             </div>

            {/* Illustration via SVG */}
            <div className="relative w-40 h-28 flex items-center justify-center">
               <svg viewBox="0 0 160 120" className="w-full h-full">
                 {/* Leaves Background */}
                 <path d="M10 80 C0 60 20 50 30 70 Z" fill="#93c5fd" />
                 <path d="M20 90 C10 70 30 60 40 80 Z" fill="#60a5fa" />
                 <path d="M140 50 C150 70 130 80 120 60 Z" fill="#93c5fd" />
                 <path d="M130 40 C140 60 120 70 110 50 Z" fill="#60a5fa" />
                 <path d="M120 90 C140 100 150 80 130 70 Z" fill="#bfdbfe" />
                 <path d="M140 110 C160 120 170 100 150 90 Z" fill="#93c5fd" />
                 
                 {/* Floating Bells */}
                 <path d="M40 30 C35 30 35 40 40 40 L45 40 C50 40 50 30 45 30 Z" fill="#93c5fd" transform="rotate(-15 42 35)" />
                 <circle cx="42" cy="42" r="2" fill="#93c5fd" />
                 
                 <path d="M110 20 C105 20 105 30 110 30 L115 30 C120 30 120 20 115 20 Z" fill="#2563eb" transform="rotate(15 112 25)" />
                 <circle cx="112" cy="32" r="2" fill="#2563eb" />

                 {/* Person/Girl */}
                 <path d="M65 120 C65 90 95 90 95 120 Z" fill="#3b82f6" />
                 {/* Hair back */}
                 <path d="M70 55 C65 70 65 90 75 90 C85 90 95 70 90 55 Z" fill="#1e3a8a" />
                 {/* Face */}
                 <circle cx="80" cy="55" r="12" fill="#fbcfe8" />
                 {/* Hair front */}
                 <path d="M70 55 C70 45 90 45 90 55 C90 48 70 48 70 55 Z" fill="#1e3a8a" />
                 {/* Phone */}
                 <rect x="68" y="75" width="8" height="14" rx="2" fill="#60a5fa" transform="rotate(-15 72 82)" />
                 {/* Arm */}
                 <path d="M85 85 C75 90 70 85 70 80" fill="none" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" />
               </svg>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10 pointer-events-none"></div>
        </div>

        {/* Filters and Mark all read */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
             {categories.map((cat) => (
               <button
                 key={cat.id}
                 onClick={() => setActiveTab(cat.id)}
                 className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap border ${
                   activeTab === cat.id
                     ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200'
                     : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                 }`}
               >
                 {cat.label}
                 <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                   activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                 }`}>
                   {cat.count}
                 </span>
               </button>
             ))}
          </div>

          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-bold text-sm shrink-0 transition-colors"
          >
            <Check size={16} /> Mark all as read
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filteredNotifications.map((notif) => (
            <div 
              key={notif.id} 
              className={`bg-white rounded-2xl border ${notif.read ? 'border-slate-100' : 'border-blue-100 shadow-sm'} p-4 flex gap-4 cursor-pointer hover:border-blue-200 transition-colors group`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg} ${notif.iconColor}`}>
                {notif.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                 <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-bold truncate text-sm ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>
                      {notif.title}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${notif.tagColor}`}>
                      {notif.tag}
                    </span>
                 </div>
                 <p className="text-xs text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                   {notif.message}
                 </p>
                 <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5"><Calendar size={12} /> {notif.date}</div>
                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                    <div>{notif.time}</div>
                 </div>
              </div>

              {/* Status Dot & Chevron */}
              <div className="flex flex-col items-center justify-center gap-2 pl-2">
                 <div className={`w-2.5 h-2.5 rounded-full ${notif.read ? 'bg-slate-200' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.5)]'}`}></div>
                 <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
             <div className="py-12 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-100 border-dashed">
                <div className="bg-slate-50 text-slate-300 p-4 rounded-full mb-3">
                   <Bell size={24} />
                </div>
                <h3 className="font-bold text-slate-700 text-sm mb-1">No matching notifications</h3>
                <p className="text-[11px] text-slate-400 font-medium">Try changing your filters.</p>
             </div>
          )}
        </div>

        {/* All Caught Up Indicator */}
        {filteredNotifications.length > 0 && (
          <div className="py-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
             <div className="relative mb-3">
                <div className="bg-blue-50 text-blue-500 p-3 rounded-full">
                   <Bell size={20} />
                </div>
                <div className="absolute -top-1 -right-1 text-blue-300"><SparklesIcon /></div>
                <div className="absolute bottom-0 -left-2 text-blue-300"><SparklesIcon size={12} /></div>
             </div>
             <h3 className="font-bold text-blue-600 text-sm mb-1">You're all caught up!</h3>
             <p className="text-[11px] text-slate-500 font-medium">No more notifications at the moment.</p>
          </div>
        )}

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-80 space-y-6 shrink-0">
        
        {/* Notification Summary */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="text-blue-600"><Bell size={16} className="fill-current" /></div>
             <h3 className="font-bold text-slate-800 text-sm">Notification Summary</h3>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-md"><Bell size={14} className="fill-current" /></div>
                    <span className="text-xl font-bold text-slate-800">8</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-medium leading-tight mt-1">Total<br/>Notifications</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center"><div className="w-2 h-2 rounded-full bg-blue-600"></div></div>
                    <span className="text-xl font-bold text-slate-800">3</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-medium leading-tight mt-1">Unread</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="bg-green-100 text-green-600 p-1 rounded-full"><Check size={14} strokeWidth={3} /></div>
                    <span className="text-xl font-bold text-slate-800">5</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-medium leading-tight mt-1">Read</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100">
                 <div className="flex items-center gap-2 mb-1">
                    <div className="bg-blue-100 text-blue-600 p-1 rounded-md"><Calendar size={14} /></div>
                    <span className="text-xl font-bold text-slate-800">2</span>
                 </div>
                 <p className="text-[10px] text-slate-500 font-medium leading-tight mt-1">Today</p>
              </div>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="text-blue-600"><ZapIcon /></div>
             <h3 className="font-bold text-slate-800 text-sm">Quick Actions</h3>
           </div>

           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><FileText size={16} /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">View All Announcements</h4>
                      <p className="text-[10px] text-slate-500">Check latest hostel updates</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><MessageSquare size={16} /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Report a Complaint</h4>
                      <p className="text-[10px] text-slate-500">Log a new complaint</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><Briefcase size={16} /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">Apply for Leave</h4>
                      <p className="text-[10px] text-slate-500">Submit a leave request</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-2 rounded-lg"><Utensils size={16} /></div>
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-700 group-hover:text-blue-700 transition-colors">View Mess Menu</h4>
                      <p className="text-[10px] text-slate-500">Check today's menu</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>
           </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#eff4ff] rounded-2xl p-5 border border-blue-100 relative overflow-hidden flex items-center justify-center min-h-[100px]">
           <div className="relative z-10 flex items-center gap-3">
              <div className="text-blue-500 transform -rotate-12">
                 <Send size={24} className="fill-current" />
              </div>
              <div className="text-center transform -rotate-6">
                 <p className="text-blue-600 font-bold text-sm">Stay informed,</p>
                 <p className="text-blue-600 font-bold text-sm">stay connected!</p>
              </div>
           </div>
           
           {/* Background Leaves */}
           <div className="absolute top-0 right-0 w-16 h-16 opacity-50 transform translate-x-4 -translate-y-4">
              <svg viewBox="0 0 100 100" fill="#93c5fd">
                 <path d="M50 50 C20 20 80 0 100 0 C100 20 80 80 50 50 Z" />
                 <path d="M50 50 C80 80 100 20 100 0 C80 0 20 20 50 50 Z" fill="#60a5fa" />
              </svg>
           </div>
           <div className="absolute bottom-0 right-0 w-12 h-12 opacity-50 transform translate-x-2 translate-y-2">
              <svg viewBox="0 0 100 100" fill="#bfdbfe">
                 <path d="M0 100 C20 70 80 80 100 100 Z" />
                 <path d="M100 100 C70 80 80 20 100 0 Z" fill="#93c5fd" />
              </svg>
           </div>
        </div>

      </div>
    </div>
  );
};

// Helper components for missing lucide icons if they don't have exactly what we want
const SparklesIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const ZapIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export default StudentNotifications;
