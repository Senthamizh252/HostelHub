import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, Bed, BedDouble, Building, Users, AlertTriangle, Phone, 
  ClipboardList, Settings, Fan, Plug, Wifi, Archive, Monitor, 
  Eye, ChevronRight, Plus, Heart, User, MapPin
} from 'lucide-react';

const StudentRoom = () => {
  return (
    <div className="max-w-7xl mx-auto pb-10 font-sans space-y-6">
      
      {/* Header */}
      <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
            <Home size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">My Room</h1>
            <p className="text-slate-500 text-sm">Everything about your hostel accommodation in one place.</p>
          </div>
        </div>
        
        {/* Header Graphic */}
        <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
          <div className="text-blue-500 font-medium text-sm italic transform -rotate-12 mr-8 text-center leading-tight">
            Your room,<br/>your space<br/>Make it count! <Heart size={12} className="inline fill-current text-blue-500" />
          </div>
          
          {/* Simple Room Illustration via CSS/SVG */}
          <div className="relative w-40 h-24 flex items-end">
             <svg viewBox="0 0 160 100" className="w-full h-full opacity-90">
               {/* Wall/Window */}
               <rect x="20" y="20" width="40" height="40" fill="#bfdbfe" rx="2" />
               <line x1="40" y1="20" x2="40" y2="60" stroke="#eff4ff" strokeWidth="2" />
               <line x1="20" y1="40" x2="60" y2="40" stroke="#eff4ff" strokeWidth="2" />
               {/* Plant */}
               <path d="M120 70 C110 50 130 40 130 70 Z" fill="#60a5fa" />
               <path d="M130 70 C140 50 120 40 120 70 Z" fill="#93c5fd" />
               <rect x="120" y="70" width="10" height="15" fill="#3b82f6" rx="1" />
               {/* Lamp */}
               <line x1="15" y1="85" x2="15" y2="45" stroke="#93c5fd" strokeWidth="2" />
               <polygon points="10,45 20,45 15,35" fill="#3b82f6" />
               <ellipse cx="15" cy="85" rx="5" ry="2" fill="#93c5fd" />
               {/* Bed */}
               <rect x="40" y="70" width="60" height="15" fill="#3b82f6" rx="2" />
               <rect x="95" y="60" width="10" height="25" fill="#2563eb" rx="2" />
               <rect x="45" y="65" width="20" height="10" fill="#bfdbfe" rx="2" />
               {/* Floor line */}
               <line x1="0" y1="85" x2="160" y2="85" stroke="#bfdbfe" strokeWidth="2" />
             </svg>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10"></div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* ROW 1 */}
        {/* Room Overview (Spans 2 cols) */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-blue-600"><BedDouble size={20} /></div>
            <h2 className="font-bold text-slate-800">Room Overview</h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 flex-1">
            {/* Image */}
            <div className="w-full sm:w-2/5 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80" 
                alt="Room" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Details */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">A-102</h3>
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-md">North Block</span>
                  <span className="px-2.5 py-1 bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider rounded-md ml-auto">Active</span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-5 gap-x-2">
                  <div className="flex items-start gap-2.5">
                    <div className="text-slate-400 mt-0.5"><Building size={16} /></div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Floor</p>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">2nd Floor</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="text-slate-400 mt-0.5"><BedDouble size={16} /></div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Room Type</p>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">4 Sharing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="text-blue-500 mt-0.5"><Bed size={16} /></div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Occupancy</p>
                      <p className="text-sm font-bold text-slate-800 leading-tight">3 / 4 Beds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="text-slate-400 mt-0.5"><User size={16} /></div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-medium">Available Beds</p>
                      <p className="text-sm font-semibold text-slate-800 leading-tight">1</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bed indicators */}
              <div className="flex items-center gap-4 mt-5 pt-4 border-t border-slate-100">
                 <Bed size={22} className="text-blue-600 fill-blue-600" />
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                 <Bed size={22} className="text-blue-600 fill-blue-600" />
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                 <Bed size={22} className="text-blue-600 fill-blue-600" />
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                 <Bed size={22} className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>

        {/* My Roommates (Spans 1 col) */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-blue-600"><Users size={20} /></div>
            <h2 className="font-bold text-slate-800">My Roommates</h2>
          </div>
          
          <div className="space-y-4 flex-1">
            {/* Roommate 1 */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=42" className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="Priya" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Priya Dharshini</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">B.Tech CSE • 3rd Year</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-bold text-green-600 tracking-wide uppercase">In Hostel</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
            
            {/* Roommate 2 */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=43" className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="Keerthana" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Keerthana R</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">B.Tech CSE • 3rd Year</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-bold text-green-600 tracking-wide uppercase">In Hostel</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>

            {/* Roommate 3 */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <img src="https://i.pravatar.cc/150?img=44" className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="Divya" />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">Divya S</h4>
                <p className="text-[10px] text-slate-500 mt-0.5">B.Tech CSE • 3rd Year</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-[9px] font-bold text-green-600 tracking-wide uppercase">In Hostel</span>
                </div>
              </div>
              <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>

          {/* Available Bed */}
          <div className="mt-4 bg-blue-50/50 rounded-xl p-3 flex items-center justify-between border border-blue-100/50 hover:bg-blue-50 transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                 <Plus size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-blue-800">Available Bed</h4>
                <p className="text-[10px] text-blue-600/70">1 bed available in your room</p>
              </div>
            </div>
            <ChevronRight size={14} className="text-blue-400 group-hover:text-blue-600" />
          </div>
        </div>

        {/* Quick Actions (Spans 1 col) */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-blue-600"><AlertTriangle size={20} className="transform rotate-180" /></div>
            <h2 className="font-bold text-slate-800">Quick Actions</h2>
          </div>
          
          <div className="space-y-3 flex-1 flex flex-col">
            <Link to="/student/complaints/new" className="bg-[#2563EB] hover:bg-blue-700 transition-colors rounded-xl p-4 flex items-center gap-3 group text-white shadow-sm shadow-blue-200">
               <div className="bg-white/20 p-2 rounded-lg shrink-0">
                 <AlertTriangle size={18} />
               </div>
               <div>
                 <h4 className="text-sm font-bold leading-tight">Report an Issue</h4>
                 <p className="text-[10px] text-blue-100 mt-0.5">Submit a complaint about your room</p>
               </div>
            </Link>
            
            <button className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 flex items-center gap-3 group border border-blue-100/50">
               <div className="bg-white text-blue-600 p-2 rounded-lg shrink-0 shadow-sm">
                 <Phone size={18} />
               </div>
               <div className="text-left">
                 <h4 className="text-sm font-bold text-blue-900 leading-tight">Contact Warden</h4>
                 <p className="text-[10px] text-blue-600/70 mt-0.5">Get in touch with your warden</p>
               </div>
            </button>

            <Link to="/student/complaints" className="bg-blue-50 hover:bg-blue-100 transition-colors rounded-xl p-4 flex items-center gap-3 group border border-blue-100/50">
               <div className="bg-white text-blue-600 p-2 rounded-lg shrink-0 shadow-sm">
                 <ClipboardList size={18} />
               </div>
               <div>
                 <h4 className="text-sm font-bold text-blue-900 leading-tight">View Complaints</h4>
                 <p className="text-[10px] text-blue-600/70 mt-0.5">Track your complaint status</p>
               </div>
            </Link>
          </div>
        </div>

        {/* ROW 2 */}
        {/* Hostel Information (Spans 1 col) */}
        <div className="xl:col-span-1 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-blue-600"><Building size={20} /></div>
            <h2 className="font-bold text-slate-800">Hostel Information</h2>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
               <div className="flex items-center gap-2 text-slate-500">
                  <Home size={14} />
                  <span className="text-xs font-medium">Hostel Name</span>
               </div>
               <span className="text-xs font-bold text-slate-800">North Block</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
               <div className="flex items-center gap-2 text-slate-500">
                  <MapPin size={14} />
                  <span className="text-xs font-medium">Block</span>
               </div>
               <span className="text-xs font-bold text-slate-800">A Block</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
               <div className="flex items-center gap-2 text-slate-500">
                  <Building size={14} />
                  <span className="text-xs font-medium">Floor</span>
               </div>
               <span className="text-xs font-bold text-slate-800">2nd Floor</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
               <div className="flex items-center gap-2 text-slate-500">
                  <BedDouble size={14} />
                  <span className="text-xs font-medium">Room Number</span>
               </div>
               <span className="text-xs font-bold text-slate-800">A-102</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
               <div className="flex items-center gap-2 text-slate-500">
                  <Users size={14} />
                  <span className="text-xs font-medium">Room Type</span>
               </div>
               <span className="text-xs font-bold text-slate-800">4 Sharing</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-50">
               <div className="flex items-center gap-2 text-slate-500">
                  <User size={14} />
                  <span className="text-xs font-medium">Warden Name</span>
               </div>
               <span className="text-xs font-bold text-slate-800">Dr. R. Meenakshi</span>
            </div>
            <div className="flex justify-between items-center py-2">
               <div className="flex items-center gap-2 text-slate-500">
                  <Phone size={14} />
                  <span className="text-xs font-medium">Warden Contact</span>
               </div>
               <span className="text-xs font-bold text-slate-800">+91 98765 43210</span>
            </div>
          </div>
          
          <button className="mt-4 w-full flex items-center justify-center gap-2 border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 py-2.5 rounded-xl text-xs font-bold transition-colors">
            <Phone size={14} /> Contact Warden
          </button>
        </div>

        {/* Room Facilities (Spans 2 cols) */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-5">
            <div className="text-blue-600"><Settings size={20} /></div>
            <h2 className="font-bold text-slate-800">Room Facilities</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 flex-1">
            <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 mb-2 bg-blue-100 p-2.5 rounded-full"><Bed size={20} /></div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Bed</h4>
              <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Available</span>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 mb-2 bg-blue-100 p-2.5 rounded-full"><Monitor size={20} /></div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Study Table</h4>
              <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Available</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 mb-2 bg-blue-100 p-2.5 rounded-full"><Archive size={20} /></div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Cupboard</h4>
              <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Available</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 mb-2 bg-blue-100 p-2.5 rounded-full"><Fan size={20} /></div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Fan</h4>
              <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Available</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 mb-2 bg-blue-100 p-2.5 rounded-full"><Plug size={20} /></div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Power Socket</h4>
              <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Available</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center text-center border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="text-blue-500 mb-2 bg-blue-100 p-2.5 rounded-full"><Wifi size={20} /></div>
              <h4 className="text-xs font-bold text-slate-800 mb-2">Wi-Fi</h4>
              <span className="bg-green-100 text-green-600 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Available</span>
            </div>
          </div>
        </div>

        {/* Room Guidelines (Spans 1 col, 2 rows) */}
        <div className="xl:col-span-1 xl:row-span-2 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <div className="text-blue-600"><ClipboardList size={20} /></div>
            <h2 className="font-bold text-slate-800">Room Guidelines</h2>
          </div>
          
          <ul className="space-y-5">
            <li className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
              <p className="text-xs text-slate-600 leading-snug pt-1">Keep the room clean and tidy.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
              <p className="text-xs text-slate-600 leading-snug pt-1">Switch off electrical appliances when leaving.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
              <p className="text-xs text-slate-600 leading-snug pt-1">Do not damage hostel property.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">4</div>
              <p className="text-xs text-slate-600 leading-snug pt-1">Follow hostel quiet hours (10 PM - 6 AM).</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">5</div>
              <p className="text-xs text-slate-600 leading-snug pt-1">Report maintenance issues immediately.</p>
            </li>
          </ul>
        </div>

        {/* ROW 3 */}
        {/* Recent Room Issues (Spans 3 cols) */}
        <div className="xl:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-blue-600"><AlertTriangle size={20} /></div>
              <h2 className="font-bold text-slate-800">Recent Room Issues</h2>
            </div>
            <Link to="/student/complaints" className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-slate-500 font-bold bg-white border-b border-slate-100 uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Issue</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-xs font-medium text-slate-500">26 Sep 2026</td>
                  <td className="px-5 py-4 text-xs text-slate-700">Wi-Fi not working</td>
                  <td className="px-5 py-4 text-xs text-slate-600">WiFi</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600">Medium</span></td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600">Resolved</span></td>
                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition-colors">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-xs font-medium text-slate-500">22 Sep 2026</td>
                  <td className="px-5 py-4 text-xs text-slate-700">Bathroom tap leaking</td>
                  <td className="px-5 py-4 text-xs text-slate-600">Plumbing</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-600">High</span></td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600">Pending</span></td>
                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition-colors">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4 text-xs font-medium text-slate-500">18 Sep 2026</td>
                  <td className="px-5 py-4 text-xs text-slate-700">Broken chair in study room</td>
                  <td className="px-5 py-4 text-xs text-slate-600">Furniture</td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600">Low</span></td>
                  <td className="px-5 py-4"><span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-600">Resolved</span></td>
                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg text-[11px] font-bold transition-colors">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentRoom;
