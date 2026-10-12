import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, Check, Clock, ChevronRight, Megaphone, CheckCircle2, Wrench, 
  Utensils, Calendar, AlertOctagon, Info, UtensilsCrossed, Zap, Settings, 
  MessageSquare, CalendarPlus
} from 'lucide-react';

const initialNotifications = [
  {
    id: 1,
    title: 'New Announcement',
    message: 'Hostel Day Celebration is scheduled on 8th October 2025. Don\'t miss the games, music and cultural events!',
    time: '2 hours ago',
    read: false,
    type: 'Announcements',
    iconType: 'announcement',
    iconBg: 'bg-[#ffebe8]',
    iconColor: 'text-[#f05252]',
  },
  {
    id: 2,
    title: 'Leave Request Approved',
    message: 'Your leave request from 10th Oct 2025 to 12th Oct 2025 has been approved by the warden.',
    time: '5 hours ago',
    read: false,
    type: 'Leave',
    iconType: 'leave',
    iconBg: 'bg-[#e6f8f0]',
    iconColor: 'text-[#10b981]',
  },
  {
    id: 3,
    title: 'Complaint Update',
    message: 'Your complaint #CMP-012 (Water leakage in North Block) has been resolved.',
    time: '1 day ago',
    read: false,
    type: 'Complaint',
    iconType: 'complaint',
    iconBg: 'bg-[#fff8e6]',
    iconColor: 'text-[#f59e0b]',
  },
  {
    id: 4,
    title: 'Mess Menu Update',
    message: 'Special dinner menu will be served this Friday. Check the mess menu for details.',
    time: '1 day ago',
    read: true,
    type: 'Mess',
    iconType: 'mess',
    iconBg: 'bg-[#ebf4ff]',
    iconColor: 'text-[#2563eb]',
  },
  {
    id: 5,
    title: 'Event Reminder',
    message: 'Inter-Hostel Sports will be held on 12th October 2025 at College Ground. Register now!',
    time: '2 days ago',
    read: true,
    type: 'Announcements',
    iconType: 'event',
    iconBg: 'bg-[#f4ecfc]',
    iconColor: 'text-[#9333ea]',
  },
  {
    id: 6,
    title: 'Emergency Notice',
    message: 'Power shutdown will be carried out in Block B from 10:00 AM to 12:00 PM on 6th October 2025.',
    time: '2 days ago',
    read: true,
    type: 'Emergency',
    iconType: 'emergency',
    iconBg: 'bg-[#fee2e2]',
    iconColor: 'text-[#ef4444]',
  },
  {
    id: 7,
    title: 'System Update',
    message: 'The hostel management system will be under maintenance on 30th September 2025 from 10 PM to 12 AM.',
    time: '3 days ago',
    read: true,
    type: 'System',
    iconType: 'system',
    iconBg: 'bg-[#ebf4ff]',
    iconColor: 'text-[#2563eb]',
  },
  {
    id: 8,
    title: 'Mess Committee',
    message: 'Feedback form for mess quality is now available. Please share your suggestions.',
    time: '3 days ago',
    read: true,
    type: 'Mess',
    iconType: 'committee',
    iconBg: 'bg-[#ecfdf5]',
    iconColor: 'text-[#10b981]',
  }
];

const StudentNotifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = notifications.filter(n => n.read).length;
  const totalCount = notifications.length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const toggleReadStatus = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === 'Unread') return !n.read;
    if (activeTab === 'Read') return n.read;
    return true;
  });

  const renderIcon = (type) => {
    switch (type) {
      case 'announcement':
        return <Megaphone size={20} className="stroke-[2.2]" />;
      case 'leave':
        return <CheckCircle2 size={20} className="stroke-[2.2]" />;
      case 'complaint':
        return <Wrench size={20} className="stroke-[2.2]" />;
      case 'mess':
        return <Utensils size={20} className="stroke-[2.2]" />;
      case 'event':
        return <Calendar size={20} className="stroke-[2.2]" />;
      case 'emergency':
        return <AlertOctagon size={20} className="stroke-[2.2]" />;
      case 'system':
        return <Info size={20} className="stroke-[2.2]" />;
      case 'committee':
        return <UtensilsCrossed size={20} className="stroke-[2.2]" />;
      default:
        return <Bell size={20} className="stroke-[2.2]" />;
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-5 min-w-0">
        
        {/* Banner Header */}
        <div className="bg-[#edf4ff] rounded-[22px] px-7 py-6 relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-blue-100/70 shadow-sm">
          {/* Left Title & Icon */}
          <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
            <div className="w-14 h-14 rounded-full bg-[#1a6cf0] flex items-center justify-center text-white shadow-md shadow-blue-500/25 shrink-0">
              <Bell size={26} className="fill-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Notifications</h1>
              <p className="text-slate-500 text-[13px] mt-0.5">Stay updated with your latest activities and important updates.</p>
            </div>
          </div>

          {/* Right Illustration & Hand-Lettered Text */}
          <div className="relative z-10 hidden md:flex items-center gap-4 mt-4 md:mt-0 select-none">
            {/* Tilted Callout Text */}
            <div className="transform -rotate-6 text-right leading-tight pr-1">
              <span className="block text-[#1a6cf0] font-bold text-sm tracking-tight">Stay</span>
              <span className="block text-[#1a6cf0] font-bold text-sm tracking-tight">Informed,</span>
              <span className="block text-[#1a6cf0] font-bold text-sm tracking-tight whitespace-nowrap">
                Stay Ahead! <span className="text-xs">♥</span>
              </span>
            </div>

            {/* Illustration Graphic */}
            <div className="w-44 h-28 relative flex items-center justify-center">
              <svg viewBox="0 0 180 120" className="w-full h-full overflow-visible">
                {/* Botanical leaves / background shapes */}
                <path d="M10,95 C-5,65 20,40 38,65 C48,78 30,105 10,95 Z" fill="#93c5fd" opacity="0.75" />
                <path d="M25,110 C15,80 45,65 55,90 C60,105 40,118 25,110 Z" fill="#60a5fa" opacity="0.65" />
                <path d="M140,55 C160,35 175,65 160,85 C148,100 130,75 140,55 Z" fill="#93c5fd" opacity="0.8" />
                <path d="M152,75 C175,70 178,105 158,110 C145,112 140,90 152,75 Z" fill="#60a5fa" opacity="0.7" />
                <path d="M130,95 C145,85 160,105 145,118 C135,125 125,105 130,95 Z" fill="#bfdbfe" opacity="0.8" />
                
                {/* Floating Ringing Bell 1 */}
                <g transform="translate(48, 18) rotate(-15)">
                  <path d="M12,4 C7,4 6,10 6,14 L4,17 L20,17 L18,14 C18,10 17,4 12,4 Z" fill="#1a6cf0" />
                  <circle cx="12" cy="19" r="2" fill="#1a6cf0" />
                  <path d="M12,1 C11,1 10,2 10,3 L14,3 C14,2 13,1 12,1 Z" fill="#1a6cf0" />
                  {/* Motion waves */}
                  <path d="M0,10 C-2,13 -2,17 0,20" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <path d="M24,10 C26,13 26,17 24,20" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </g>

                {/* Floating Ringing Bell 2 (smaller) */}
                <g transform="translate(132, 12) rotate(12)">
                  <path d="M9,3 C5,3 4,7 4,11 L3,13 L15,13 L14,11 C14,7 13,3 9,3 Z" fill="#3b82f6" opacity="0.85" />
                  <circle cx="9" cy="15" r="1.5" fill="#3b82f6" />
                </g>

                {/* Girl Illustration */}
                <g transform="translate(85, 22)">
                  {/* Long dark hair behind */}
                  <path d="M12,24 C8,38 4,55 9,68 C16,70 24,70 28,68 C34,55 30,38 26,24 Z" fill="#1e293b" />
                  
                  {/* Body / Royal blue dress */}
                  <path d="M-2,66 C5,58 32,58 38,66 L42,100 L-6,100 Z" fill="#1a6cf0" />

                  {/* Neck */}
                  <rect x="14" y="32" width="8" height="12" fill="#fbcfe8" rx="2" />

                  {/* Face */}
                  <ellipse cx="18" cy="24" rx="10" ry="12" fill="#fbcfe8" />
                  
                  {/* Front Hair / Bangs */}
                  <path d="M8,22 C11,12 25,12 28,22 C24,17 18,17 14,21 Z" fill="#0f172a" />
                  <path d="M8,20 C6,27 6,34 9,38 C9,30 11,25 11,22 Z" fill="#0f172a" />
                  <path d="M28,20 C30,27 30,34 27,38 C27,30 25,25 25,22 Z" fill="#0f172a" />

                  {/* Smile & Eyes */}
                  <circle cx="14" cy="23" r="1" fill="#0f172a" />
                  <circle cx="22" cy="23" r="1" fill="#0f172a" />
                  <path d="M16,27 Q18,30 20,27" stroke="#0f172a" strokeWidth="0.8" fill="none" strokeLinecap="round" />

                  {/* Arms holding smartphone */}
                  {/* Left arm */}
                  <path d="M4,66 C-1,72 -2,82 6,86" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" fill="none" />
                  {/* Right arm */}
                  <path d="M32,66 C36,72 37,82 28,86" stroke="#fbcfe8" strokeWidth="4" strokeLinecap="round" fill="none" />

                  {/* Smartphone */}
                  <rect x="10" y="70" width="16" height="25" rx="3" fill="#1e40af" stroke="#93c5fd" strokeWidth="1" />
                  <rect x="12" y="73" width="12" height="18" rx="1.5" fill="#60a5fa" />
                  {/* Hands holding phone */}
                  <circle cx="9" cy="83" r="3" fill="#fbcfe8" />
                  <circle cx="27" cy="83" r="3" fill="#fbcfe8" />
                </g>
              </svg>
            </div>
          </div>

          {/* Background subtle radial gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-gradient-to-l from-blue-200/25 to-transparent pointer-events-none rounded-r-[22px]"></div>
        </div>

        {/* Filters and Mark all as read */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            {/* Filter: All */}
            <button
              onClick={() => setActiveTab('All')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'All'
                  ? 'bg-[#1a6cf0] text-white shadow-sm shadow-blue-300'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
              }`}
            >
              All
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'All' ? 'bg-[#0f54c9] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {totalCount}
              </span>
            </button>

            {/* Filter: Unread */}
            <button
              onClick={() => setActiveTab('Unread')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'Unread'
                  ? 'bg-[#1a6cf0] text-white shadow-sm shadow-blue-300'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
              }`}
            >
              Unread
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'Unread' ? 'bg-[#0f54c9] text-white' : 'bg-[#e8f1ff] text-[#1a6cf0]'
              }`}>
                {unreadCount}
              </span>
            </button>

            {/* Filter: Read */}
            <button
              onClick={() => setActiveTab('Read')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeTab === 'Read'
                  ? 'bg-[#1a6cf0] text-white shadow-sm shadow-blue-300'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/90'
              }`}
            >
              Read
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'Read' ? 'bg-[#0f54c9] text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {readCount}
              </span>
            </button>
          </div>

          {/* Mark all as read Button */}
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-[#1a6cf0] hover:text-blue-700 font-semibold text-sm transition-colors cursor-pointer select-none"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>Mark all as read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 pt-1">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => toggleReadStatus(notif.id)}
              className="bg-white rounded-[18px] border border-slate-100 hover:border-blue-200 hover:shadow-md p-4 sm:px-5 sm:py-4.5 flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer group shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
            >
              {/* Left Circle Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${notif.iconBg} ${notif.iconColor} group-hover:scale-105 transition-transform`}>
                {renderIcon(notif.iconType)}
              </div>

              {/* Middle Text Details */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-slate-800 leading-snug">
                  {notif.title}
                </h3>
                <p className="text-[13px] text-slate-500 mt-1 leading-relaxed line-clamp-2 font-normal">
                  {notif.message}
                </p>
                <div className="flex items-center gap-1.5 text-[12px] text-slate-400 mt-2 font-medium">
                  <Clock size={13} className="text-slate-400" />
                  <span>{notif.time}</span>
                </div>
              </div>

              {/* Right Status Pill & Arrow */}
              <div className="flex items-center gap-3 shrink-0">
                {!notif.read ? (
                  <span className="bg-[#e8f1ff] text-[#1a6cf0] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1a6cf0]"></span>
                    Unread
                  </span>
                ) : (
                  <span className="bg-[#f1f5f9] text-[#64748b] text-xs font-semibold px-3 py-1 rounded-full">
                    Read
                  </span>
                )}
                <ChevronRight size={18} className="text-blue-500/70 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400">
              <Bell size={36} className="mx-auto mb-3 text-slate-300" />
              <p className="font-semibold text-slate-600">No notifications found</p>
              <p className="text-xs text-slate-400 mt-1">There are no notifications in this category.</p>
            </div>
          )}
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-[310px] space-y-5 shrink-0">
        
        {/* Card 1: Notification Summary */}
        <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-[#1a6cf0] fill-[#1a6cf0]" />
            <h3 className="font-bold text-slate-800 text-[15px]">Notification Summary</h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Unread */}
            <div className="bg-[#f8fafd] rounded-xl p-3.5 border border-slate-100/90 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a6cf0]"></span>
                <span className="text-xl font-bold text-slate-800">{unreadCount}</span>
              </div>
              <span className="text-[12px] text-slate-400 font-medium mt-1">Unread</span>
            </div>

            {/* Read */}
            <div className="bg-[#f8fafd] rounded-xl p-3.5 border border-slate-100/90 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                </span>
                <span className="text-xl font-bold text-slate-800">{readCount}</span>
              </div>
              <span className="text-[12px] text-slate-400 font-medium mt-1">Read</span>
            </div>

            {/* Announcements */}
            <div className="bg-[#f8fafd] rounded-xl p-3.5 border border-slate-100/90 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <Megaphone size={16} className="text-[#1a6cf0]" />
                <span className="text-xl font-bold text-slate-800">4</span>
              </div>
              <span className="text-[12px] text-slate-400 font-medium mt-1">Announcements</span>
            </div>

            {/* System Updates */}
            <div className="bg-[#f8fafd] rounded-xl p-3.5 border border-slate-100/90 flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <Settings size={16} className="text-[#1a6cf0]" />
                <span className="text-xl font-bold text-slate-800">2</span>
              </div>
              <span className="text-[12px] text-slate-400 font-medium mt-1">System Updates</span>
            </div>
          </div>
        </div>

        {/* Card 2: Quick Actions */}
        <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2 mb-4">
            <Zap size={18} className="text-[#1a6cf0] fill-[#1a6cf0]" />
            <h3 className="font-bold text-slate-800 text-[15px]">Quick Actions</h3>
          </div>

          <div className="space-y-2.5">
            {/* Action 1 */}
            <Link
              to="/student/announcements"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ebf4ff] flex items-center justify-center text-[#1a6cf0] shrink-0 group-hover:scale-105 transition-transform">
                  <Megaphone size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-[#1a6cf0] transition-colors leading-tight">
                    View All Announcements
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Check latest hostel updates</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-blue-500/70 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            {/* Action 2 */}
            <Link
              to="/student/complaints"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ebf4ff] flex items-center justify-center text-[#1a6cf0] shrink-0 group-hover:scale-105 transition-transform">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-[#1a6cf0] transition-colors leading-tight">
                    Report a Complaint
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Log a new complaint</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-blue-500/70 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            {/* Action 3 */}
            <Link
              to="/student/leaves"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ebf4ff] flex items-center justify-center text-[#1a6cf0] shrink-0 group-hover:scale-105 transition-transform">
                  <CalendarPlus size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-[#1a6cf0] transition-colors leading-tight">
                    Apply for Leave
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Submit a leave request</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-blue-500/70 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>

            {/* Action 4 */}
            <Link
              to="/student/menu"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 border border-transparent hover:border-blue-100 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ebf4ff] flex items-center justify-center text-[#1a6cf0] shrink-0 group-hover:scale-105 transition-transform">
                  <Utensils size={18} />
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-slate-800 group-hover:text-[#1a6cf0] transition-colors leading-tight">
                    View Mess Menu
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Check today's menu</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-blue-500/70 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </Link>
          </div>
        </div>

        {/* Card 3: "Every Notification Matters! ♥" Decorative Card */}
        <div className="bg-gradient-to-r from-[#eff6ff] via-[#edf5ff] to-[#e8f2ff] rounded-[20px] p-5 border border-blue-100/70 relative overflow-hidden flex items-center justify-between select-none shadow-sm min-h-[96px]">
          {/* Ringing Bell Graphic */}
          <div className="relative z-10 shrink-0 transform -rotate-12">
            <div className="relative">
              <Bell size={34} className="text-[#1a6cf0] fill-[#1a6cf0]" />
              {/* Sound sparkle waves */}
              <span className="absolute -top-1 -left-2 text-[#60a5fa] font-bold text-xs select-none">~</span>
              <span className="absolute top-2 -left-2.5 text-[#93c5fd] font-bold text-xs select-none">~</span>
              <span className="absolute -bottom-0.5 -right-2 text-[#60a5fa] font-bold text-xs select-none">~</span>
            </div>
          </div>

          {/* Whimsical Text */}
          <div className="relative z-10 text-center px-2 flex-1">
            <span className="block text-[#1a6cf0] font-bold text-[13px] tracking-tight leading-tight">
              Every
            </span>
            <span className="block text-[#1a6cf0] font-bold text-[13px] tracking-tight leading-tight">
              Notification
            </span>
            <span className="block text-[#1a6cf0] font-bold text-[13px] tracking-tight leading-tight">
              Matters! <span className="text-[11px]">♥</span>
            </span>
          </div>

          {/* Decorative Leaves / Botanical Artwork */}
          <div className="relative z-10 shrink-0 w-12 h-14">
            <svg viewBox="0 0 60 70" className="w-full h-full">
              <path d="M10,60 C20,40 35,25 55,20 C50,35 40,55 20,65 Z" fill="#60a5fa" opacity="0.8" />
              <path d="M25,65 C35,50 45,40 58,40 C52,52 45,62 30,68 Z" fill="#93c5fd" opacity="0.9" />
              <circle cx="15" cy="20" r="3" fill="#bfdbfe" />
              <circle cx="48" cy="12" r="2" fill="#60a5fa" />
            </svg>
          </div>

          {/* Soft background glow */}
          <div className="absolute inset-0 bg-white/20 pointer-events-none"></div>
        </div>

      </div>

    </div>
  );
};

export default StudentNotifications;
