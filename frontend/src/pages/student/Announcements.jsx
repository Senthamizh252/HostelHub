import React, { useState } from 'react';
import { 
  Megaphone, Calendar, ChevronRight, Droplet, 
  Wrench, Utensils, PartyPopper, Trophy, GraduationCap, 
  Phone, User, Building, ShieldAlert, Heart, ArrowRight
} from 'lucide-react';

const Announcements = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'General', 'Maintenance', 'Events', 'Food', 'Emergency'];

  const announcementsList = [
    {
      id: 1,
      icon: <Droplet size={20} />,
      iconBg: 'bg-blue-100 text-blue-600',
      title: 'Water Supply Maintenance',
      description: 'Maintenance work will be carried out in North Block from 2 PM – 4 PM. Kindly store required water before the time.',
      date: '29 Sep 2025',
      timeAgo: '2 hours ago',
      category: 'Maintenance',
      categoryBg: 'bg-blue-50 text-blue-600',
      priority: 'Medium',
      priorityBg: 'bg-amber-50 text-amber-600'
    },
    {
      id: 2,
      icon: <Calendar size={20} />,
      iconBg: 'bg-purple-100 text-purple-600',
      title: 'Hostel Day Celebration',
      description: 'Join us for the Hostel Day celebration on 12th October 2025. Various cultural events and games will be conducted.',
      date: '28 Sep 2025',
      timeAgo: '1 day ago',
      category: 'Events',
      categoryBg: 'bg-purple-50 text-purple-600',
      priority: 'Low',
      priorityBg: 'bg-green-50 text-green-600'
    },
    {
      id: 3,
      icon: <Utensils size={20} />,
      iconBg: 'bg-green-100 text-green-600',
      title: 'Mess Menu Change',
      description: 'The mess menu will be updated from 30th September 2025. New items will be added to the dinner menu.',
      date: '27 Sep 2025',
      timeAgo: '2 days ago',
      category: 'Food',
      categoryBg: 'bg-green-50 text-green-600',
      priority: 'Low',
      priorityBg: 'bg-green-50 text-green-600'
    },
    {
      id: 4,
      icon: <Wrench size={20} />,
      iconBg: 'bg-blue-100 text-blue-600',
      title: 'AC Maintenance in North Block',
      description: 'Air conditioner maintenance will be done in all rooms of North Block from 1st October 2025. There may be slight inconvenience.',
      date: '26 Sep 2025',
      timeAgo: '3 days ago',
      category: 'Maintenance',
      categoryBg: 'bg-blue-50 text-blue-600',
      priority: 'Medium',
      priorityBg: 'bg-amber-50 text-amber-600'
    }
  ];

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
              <Megaphone size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Announcements</h1>
              <p className="text-slate-500 text-sm">Stay updated with everything happening in your hostel.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
            <div className="text-blue-500 font-medium text-sm italic transform -rotate-12 mr-12 text-center leading-tight">
              Important<br/>Notices<br/>Just for You! <Heart size={12} className="inline fill-current text-blue-500" />
            </div>
            
            {/* Megaphone Illustration via SVG */}
            <div className="relative w-40 h-24 flex items-center justify-center">
               <svg viewBox="0 0 160 100" className="w-full h-full opacity-90 transform -rotate-12">
                 {/* Background Leaves */}
                 <path d="M110 80 C90 70 120 50 130 80 Z" fill="#93c5fd" />
                 <path d="M120 80 C100 70 130 50 140 80 Z" fill="#60a5fa" />
                 
                 {/* Sound Waves */}
                 <path d="M120 20 Q130 35 120 50" fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />
                 <path d="M130 15 Q145 35 130 55" fill="none" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" />
                 <path d="M140 10 Q160 35 140 60" fill="none" stroke="#bfdbfe" strokeWidth="3" strokeLinecap="round" />

                 {/* Megaphone Body */}
                 <path d="M30 40 L90 20 L100 60 L30 50 Z" fill="#3b82f6" />
                 <path d="M90 20 L110 15 L115 65 L100 60 Z" fill="#2563eb" />
                 <ellipse cx="112" cy="40" rx="10" ry="25" fill="#1d4ed8" />
                 <ellipse cx="112" cy="40" rx="6" ry="20" fill="#60a5fa" />
                 
                 {/* Megaphone Handle & Mouthpiece */}
                 <rect x="50" y="45" width="8" height="25" fill="#1e40af" rx="2" transform="rotate(-10 50 45)" />
                 <rect x="25" y="38" width="10" height="15" fill="#60a5fa" rx="2" />
               </svg>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10 pointer-events-none"></div>
        </div>

        {/* Highlighted Important Announcement */}
        <div className="bg-[#fffdf7] border border-orange-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col sm:flex-row gap-6 relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-300 via-red-400 to-orange-300"></div>

          {/* Icon/Illustration */}
          <div className="shrink-0 flex items-center justify-center">
             <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center relative border border-orange-100/50">
               <svg viewBox="0 0 100 100" className="w-20 h-20">
                 {/* Extinguisher Body */}
                 <rect x="35" y="30" width="30" height="50" fill="#ef4444" rx="5" />
                 {/* Details */}
                 <rect x="35" y="45" width="30" height="15" fill="#fca5a5" />
                 <rect x="42" y="20" width="16" height="10" fill="#cbd5e1" rx="1" />
                 <rect x="47" y="15" width="6" height="5" fill="#94a3b8" />
                 <path d="M47 15 L35 15 L35 25" fill="none" stroke="#64748b" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                 {/* Flame */}
                 <path d="M70 65 C70 65 60 75 75 80 C85 85 85 70 80 65 C75 60 70 65 70 65 Z" fill="#f97316" />
                 <path d="M73 68 C73 68 68 75 75 78 C80 80 80 72 78 68 C75 65 73 68 73 68 Z" fill="#facc15" />
               </svg>
             </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
             <div className="flex items-center justify-between mb-2">
                <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase flex items-center gap-1">
                  🔥 Important
                </span>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
             </div>
             <h2 className="text-lg font-bold text-slate-800 mb-2 leading-tight">Fire Safety Drill – Tomorrow</h2>
             <p className="text-sm text-slate-600 leading-relaxed mb-4">All students are requested to participate in the fire safety drill at 10:00 AM. Please gather at the hostel ground.</p>
             <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                   <Calendar size={14} /> 29 Sep 2025
                </div>
                <span className="bg-red-50 text-red-600 px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wide">Emergency</span>
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
           {filters.map(filter => (
             <button 
               key={filter}
               onClick={() => setActiveFilter(filter)}
               className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                 activeFilter === filter 
                 ? 'bg-[#2563EB] text-white shadow-sm' 
                 : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
               }`}
             >
               {filter}
             </button>
           ))}
        </div>

        {/* Announcement List */}
        <div className="space-y-4">
           {announcementsList.map(announcement => (
             <div key={announcement.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-start gap-4 group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${announcement.iconBg}`}>
                   {announcement.icon}
                </div>
                
                <div className="flex-1">
                   <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-slate-800">{announcement.title}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${announcement.priorityBg} uppercase tracking-wider shrink-0`}>
                         {announcement.priority}
                      </span>
                   </div>
                   
                   <p className="text-xs text-slate-600 leading-relaxed mb-4">{announcement.description}</p>
                   
                   <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-50">
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                         <div className="flex items-center gap-1.5"><Calendar size={12} /> {announcement.date}</div>
                         <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                         <span>{announcement.timeAgo}</span>
                         <span className={`px-2 py-0.5 rounded font-bold ${announcement.categoryBg}`}>
                            {announcement.category}
                         </span>
                      </div>
                      
                      <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                         Read More <ArrowRight size={12} />
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-80 space-y-6 shrink-0">
        
        {/* Upcoming Events */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-5">
             <div className="flex items-center gap-2">
               <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg"><Calendar size={16} /></div>
               <h3 className="font-bold text-slate-800 text-sm">Upcoming Events</h3>
             </div>
             <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-0.5">
               View All <ChevronRight size={10} />
             </button>
           </div>

           <div className="space-y-4">
              {/* Event 1 */}
              <div className="pb-4 border-b border-slate-50 group cursor-pointer flex items-center justify-between">
                 <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                       <PartyPopper size={18} />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Hostel Day</h4>
                       <p className="text-[10px] text-slate-500 mb-1">Cultural events, games & more</p>
                       <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                         <Calendar size={10} /> 12 October 2025
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Event 2 */}
              <div className="pb-4 border-b border-slate-50 group cursor-pointer flex items-center justify-between">
                 <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                       <Trophy size={18} />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Inter-Hostel Sports</h4>
                       <p className="text-[10px] text-slate-500 mb-1">Football, Badminton, Chess & more</p>
                       <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                         <Calendar size={10} /> 18 October 2025
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Event 3 */}
              <div className="group cursor-pointer flex items-center justify-between">
                 <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                       <GraduationCap size={18} />
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Career Talk</h4>
                       <p className="text-[10px] text-slate-500 mb-1">Guidance for your future</p>
                       <div className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
                         <Calendar size={10} /> 22 October 2025
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
           </div>
        </div>

        {/* Important Contacts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg"><Phone size={16} /></div>
             <h3 className="font-bold text-slate-800 text-sm">Important Contacts</h3>
           </div>

           <div className="space-y-4">
              {/* Contact 1 */}
              <div className="pb-4 border-b border-slate-50 flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                       <User size={18} />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-bold text-slate-800 leading-tight">Warden</h4>
                       <p className="text-[9px] text-slate-500 mb-1">Dr. Meenakshi</p>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                         <Phone size={10} /> +91 98765 43210
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Contact 2 */}
              <div className="pb-4 border-b border-slate-50 flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                       <Building size={18} />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-bold text-slate-800 leading-tight">Hostel Office</h4>
                       <p className="text-[9px] text-slate-500 mb-1">North Block, Ground Floor</p>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                         <Phone size={10} /> +91 98765 12345
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Contact 3 */}
              <div className="pb-4 border-b border-slate-50 flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-100 transition-colors">
                       <ShieldAlert size={18} />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-bold text-slate-800 leading-tight">Emergency</h4>
                       <p className="text-[9px] text-slate-500 mb-1">24x7 Helpline</p>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                         <Phone size={10} /> +91 112
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              {/* Contact 4 */}
              <div className="flex items-center justify-between group cursor-pointer">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                       <Wrench size={18} />
                    </div>
                    <div>
                       <h4 className="text-[11px] font-bold text-slate-800 leading-tight">Maintenance</h4>
                       <p className="text-[9px] text-slate-500 mb-1">Room & Facility Issues</p>
                       <div className="flex items-center gap-1 text-[10px] font-bold text-blue-600">
                         <Phone size={10} /> +91 98765 67890
                       </div>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
           </div>
        </div>

        {/* Bottom Graphic Banner */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 border border-blue-100/50 relative overflow-hidden flex items-center h-28">
           <div className="relative z-10 w-16 h-full flex items-center justify-center">
              <Megaphone size={40} className="text-blue-400 transform -rotate-12 opacity-50" />
           </div>
           
           <div className="flex-1 -rotate-6 z-10 pl-2">
             <p className="text-blue-700 font-semibold text-sm leading-tight italic">
               Stay Informed.<br/>Stay Connected!
             </p>
           </div>
           
           {/* Background decorations */}
           <div className="absolute right-0 bottom-0 opacity-40">
             <svg viewBox="0 0 100 100" className="w-20 h-20">
                <path d="M50 100 C40 70 80 50 100 100 Z" fill="#60a5fa" />
                <path d="M70 100 C60 80 90 70 100 100 Z" fill="#3b82f6" />
             </svg>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Announcements;
