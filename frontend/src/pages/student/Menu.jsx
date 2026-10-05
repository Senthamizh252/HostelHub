import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, Star, Sun, Moon, Coffee, Calendar, Clock, ClipboardList,
  MessageSquare, BarChart2, Zap, Phone, ChevronDown, Check, Heart, User,
  Leaf, ArrowUp
} from 'lucide-react';

const weeklyMenu = [
  { day: 'Monday', date: '29 Sep', breakfast: 'Idli • Sambar • Chutney', lunch: 'Rice • Sambar • Poriyal • Curd', snacks: 'Tea • Biscuit', dinner: 'Chapathi • Paneer Kurma' },
  { day: 'Tuesday', date: '30 Sep', breakfast: 'Pongal • Chutney', lunch: 'Rice • Rasam • Beans Poriyal • Curd', snacks: 'Tea • Banana', dinner: 'Chapathi • Potato Curry' },
  { day: 'Wednesday', date: '01 Oct', breakfast: 'Idli • Sambar • Chutney', lunch: 'Rice • Sambar • Cauliflower Poriyal • Curd', snacks: 'Tea • Biscuit', dinner: 'Chapathi • Mixed Veg Curry' },
  { day: 'Thursday', date: '02 Oct', breakfast: 'Dosa • Chutney', lunch: 'Rice • Rasam • Cabbage Poriyal • Curd', snacks: 'Tea • Banana', dinner: 'Chapathi • Dal Fry' },
  { day: 'Friday', date: '03 Oct', breakfast: 'Pongal • Chutney', lunch: 'Rice • Sambar • Beans Poriyal • Curd', snacks: 'Tea • Biscuit', dinner: 'Chapathi • Paneer Kurma' },
  { day: 'Saturday', date: '04 Oct', breakfast: 'Idli • Sambar • Chutney', lunch: 'Rice • Rasam • Potato Poriyal • Curd', snacks: 'Tea • Banana', dinner: 'Chapathi • Mixed Veg Curry' },
  { day: 'Sunday', date: '05 Oct', breakfast: 'Dosa • Chutney', lunch: 'Rice • Sambar • Cauliflower Poriyal • Curd', snacks: 'Tea • Biscuit', dinner: 'Chapathi • Dal Fry' },
];

const StudentMenu = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
              <Utensils size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Mess Menu</h1>
              <p className="text-slate-500 text-sm">Your weekly meals at a glance.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
            <div className="text-blue-500 font-medium text-sm italic transform -rotate-12 mr-12 text-center leading-tight">
              Good Food<br/>Good Mood! <Heart size={12} className="inline fill-current text-blue-500" />
            </div>
            
            {/* Simple Plate Illustration via CSS/SVG */}
            <div className="relative w-48 h-24 flex items-center justify-center">
               <svg viewBox="0 0 200 100" className="w-full h-full opacity-90">
                 {/* Plant in background */}
                 <path d="M40 70 C30 40 50 30 50 70 Z" fill="#93c5fd" />
                 <path d="M50 70 C60 40 40 30 40 70 Z" fill="#60a5fa" />
                 <path d="M30 65 C20 45 40 40 40 65 Z" fill="#93c5fd" />
                 <rect x="42" y="65" width="16" height="20" fill="#3b82f6" rx="2" />
                 
                 {/* Cutlery */}
                 <line x1="160" y1="20" x2="155" y2="70" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                 <ellipse cx="160" cy="25" rx="5" ry="8" fill="#94a3b8" />
                 
                 <line x1="175" y1="20" x2="170" y2="70" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
                 <path d="M170 20 L180 20 L178 35 L172 35 Z" fill="#94a3b8" />
                 <line x1="172" y1="20" x2="172" y2="30" stroke="#cbd5e1" strokeWidth="1" />
                 <line x1="175" y1="20" x2="175" y2="30" stroke="#cbd5e1" strokeWidth="1" />
                 <line x1="178" y1="20" x2="178" y2="30" stroke="#cbd5e1" strokeWidth="1" />
                 
                 {/* Glass */}
                 <path d="M185 30 L195 30 L192 70 L188 70 Z" fill="#bfdbfe" opacity="0.8" />
                 <path d="M186 40 L194 40 L192 70 L188 70 Z" fill="#3b82f6" opacity="0.3" />
                 
                 {/* Plate */}
                 <ellipse cx="105" cy="55" rx="45" ry="30" fill="#e2e8f0" />
                 <ellipse cx="105" cy="55" rx="40" ry="25" fill="#f8fafc" />
                 
                 {/* Food - Rice */}
                 <ellipse cx="90" cy="50" rx="15" ry="10" fill="#ffffff" />
                 <ellipse cx="100" cy="45" rx="12" ry="8" fill="#ffffff" />
                 <ellipse cx="85" cy="55" rx="12" ry="8" fill="#ffffff" />
                 
                 {/* Food - Curries */}
                 <ellipse cx="125" cy="45" rx="12" ry="8" fill="#f59e0b" />
                 <ellipse cx="115" cy="65" rx="15" ry="10" fill="#16a34a" />
                 <circle cx="110" cy="62" r="3" fill="#15803d" />
                 <circle cx="115" cy="65" r="3" fill="#15803d" />
                 <circle cx="120" cy="68" r="3" fill="#15803d" />
                 
                 <circle cx="128" cy="43" r="2" fill="#d97706" />
               </svg>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10 pointer-events-none"></div>
        </div>

        {/* Today's Meals */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 text-white p-1.5 rounded-lg"><Star size={14} /></div>
              <div>
                 <h2 className="font-bold text-slate-800 leading-tight">Today's Meals</h2>
                 <p className="text-[10px] text-slate-500 font-medium">Monday, 29 Sep 2025</p>
              </div>
            </div>
            <span className="bg-green-50 border border-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
               <Leaf size={12} /> Veg Menu
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
             {/* Breakfast */}
             <div className="bg-orange-50/40 border border-orange-100/50 rounded-xl p-4 flex flex-col relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2">
                   <Sun size={16} className="text-orange-500" />
                   <div>
                     <h4 className="font-bold text-slate-800 text-sm leading-tight">Breakfast</h4>
                     <p className="text-[10px] text-slate-500">7:30 AM - 9:00 AM</p>
                   </div>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-4 flex-1">Idli • Sambar • Chutney</p>
                <div className="relative h-20 w-full rounded-lg overflow-hidden shadow-sm mt-auto">
                   <img src="https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=300&q=80" alt="Breakfast" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-green-600">Veg</div>
                </div>
             </div>

             {/* Lunch */}
             <div className="bg-blue-50/40 border border-blue-100/50 rounded-xl p-4 flex flex-col relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2">
                   <Sun size={16} className="text-blue-500" />
                   <div>
                     <h4 className="font-bold text-slate-800 text-sm leading-tight">Lunch</h4>
                     <p className="text-[10px] text-slate-500">12:30 PM - 2:00 PM</p>
                   </div>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-4 flex-1">Rice • Sambar • Poriyal • Curd</p>
                <div className="relative h-20 w-full rounded-lg overflow-hidden shadow-sm mt-auto">
                   <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80" alt="Lunch" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-green-600">Veg</div>
                </div>
             </div>

             {/* Snacks */}
             <div className="bg-purple-50/40 border border-purple-100/50 rounded-xl p-4 flex flex-col relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2">
                   <Coffee size={16} className="text-purple-500" />
                   <div>
                     <h4 className="font-bold text-slate-800 text-sm leading-tight">Snacks</h4>
                     <p className="text-[10px] text-slate-500">4:30 PM - 5:30 PM</p>
                   </div>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-4 flex-1">Tea • Biscuit</p>
                <div className="relative h-20 w-full rounded-lg overflow-hidden shadow-sm mt-auto">
                   <img src="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=300&q=80" alt="Snacks" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-green-600">Veg</div>
                </div>
             </div>

             {/* Dinner */}
             <div className="bg-green-50/40 border border-green-100/50 rounded-xl p-4 flex flex-col relative overflow-hidden group">
                <div className="flex items-center gap-2 mb-2">
                   <Moon size={16} className="text-green-500" />
                   <div>
                     <h4 className="font-bold text-slate-800 text-sm leading-tight">Dinner</h4>
                     <p className="text-[10px] text-slate-500">7:30 PM - 9:00 PM</p>
                   </div>
                </div>
                <p className="text-xs text-slate-700 font-medium mb-4 flex-1">Chapathi • Paneer Kurma</p>
                <div className="relative h-20 w-full rounded-lg overflow-hidden shadow-sm mt-auto">
                   <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=300&q=80" alt="Dinner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-green-600">Veg</div>
                </div>
             </div>
          </div>
        </div>

        {/* Weekly Menu Table */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg"><Calendar size={16} /></div>
            <div>
               <h2 className="font-bold text-slate-800 leading-tight">Weekly Menu</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium ml-2">29 Sep - 05 Oct 2025</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-slate-800 font-bold bg-slate-50 border-y border-slate-100 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Day</th>
                  <th className="px-4 py-3">Breakfast</th>
                  <th className="px-4 py-3">Lunch</th>
                  <th className="px-4 py-3">Snacks</th>
                  <th className="px-4 py-3">Dinner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {weeklyMenu.map((dayItem, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                    <td className="px-4 py-4 w-28">
                       <p className="font-bold text-slate-800 text-xs">{dayItem.day}</p>
                       <p className="text-[10px] text-slate-400">{dayItem.date}</p>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-start gap-1">
                          <span className="text-slate-300 font-bold">•</span>
                          <span className="text-xs text-slate-600 font-medium">{dayItem.breakfast}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-start gap-1">
                          <span className="text-slate-300 font-bold">•</span>
                          <span className="text-xs text-slate-600 font-medium">{dayItem.lunch}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-start gap-1">
                          <span className="text-slate-300 font-bold">•</span>
                          <span className="text-xs text-slate-600 font-medium">{dayItem.snacks}</span>
                       </div>
                    </td>
                    <td className="px-4 py-4">
                       <div className="flex items-start gap-1">
                          <span className="text-slate-300 font-bold">•</span>
                          <span className="text-xs text-slate-600 font-medium">{dayItem.dinner}</span>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Row: Mess Timing & Rules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Mess Timing */}
           <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
             <div className="flex items-center gap-2 mb-5">
               <div className="bg-blue-600 text-white p-1 rounded-full"><Clock size={12} /></div>
               <h3 className="font-bold text-slate-800 text-sm">Mess Timing</h3>
             </div>
             <div className="grid grid-cols-4 gap-2 flex-1 items-center">
                <div className="text-center">
                  <Sun size={16} className="text-orange-500 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold text-slate-800">Breakfast</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">7:30 AM - 9:00 AM</p>
                </div>
                <div className="text-center">
                  <Sun size={16} className="text-blue-500 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold text-slate-800">Lunch</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">12:30 PM - 2:00 PM</p>
                </div>
                <div className="text-center">
                  <Coffee size={16} className="text-purple-500 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold text-slate-800">Snacks</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">4:30 PM - 5:30 PM</p>
                </div>
                <div className="text-center">
                  <Moon size={16} className="text-green-500 mx-auto mb-1.5" />
                  <p className="text-[10px] font-bold text-slate-800">Dinner</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">7:30 PM - 9:00 PM</p>
                </div>
             </div>
           </div>

           {/* Mess Rules */}
           <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden flex flex-col">
             <div className="flex items-center gap-2 mb-4 relative z-10">
               <div className="bg-blue-100 text-blue-600 p-1 rounded"><ClipboardList size={14} /></div>
               <h3 className="font-bold text-slate-800 text-sm">Mess Rules</h3>
             </div>
             <ul className="space-y-2 relative z-10">
                <li className="flex gap-2 items-start">
                  <div className="text-blue-500 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <p className="text-[10px] text-slate-600 font-medium">Maintain cleanliness and hygiene.</p>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="text-blue-500 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <p className="text-[10px] text-slate-600 font-medium">No food wastage.</p>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="text-blue-500 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <p className="text-[10px] text-slate-600 font-medium">Follow the queue and be patient.</p>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="text-blue-500 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <p className="text-[10px] text-slate-600 font-medium">Do not take food outside the mess area.</p>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="text-blue-500 shrink-0 mt-0.5"><Check size={12} strokeWidth={3} /></div>
                  <p className="text-[10px] text-slate-600 font-medium">Use plates and utensils properly.</p>
                </li>
             </ul>
             
             {/* Simple outline plate on the right */}
             <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
                <svg viewBox="0 0 100 100" className="w-32 h-32 text-blue-600" fill="none" stroke="currentColor" strokeWidth="4">
                   <circle cx="50" cy="50" r="40" />
                   <circle cx="50" cy="50" r="30" />
                   <line x1="15" y1="20" x2="15" y2="80" strokeLinecap="round" />
                   <line x1="85" y1="20" x2="85" y2="80" strokeLinecap="round" />
                   <path d="M10 30 Q15 40 20 30" />
                </svg>
             </div>
           </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-80 space-y-6 shrink-0">
        
        {/* Rating Widget */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center">
           <div className="w-full flex items-center gap-2 mb-4">
             <div className="text-blue-600"><Star size={16} /></div>
             <h3 className="font-bold text-slate-800 text-sm">How was today's food?</h3>
           </div>
           
           <div className="flex items-center gap-4 mb-2">
              <div className="flex gap-1 text-blue-600">
                 <Star size={24} className="fill-current" />
                 <Star size={24} className="fill-current" />
                 <Star size={24} className="fill-current" />
                 <Star size={24} className="fill-current" />
                 <Star size={24} className="text-blue-200" />
              </div>
              <div className="text-center">
                 <span className="text-xl font-black text-slate-800 leading-none">4.2 <span className="text-xs text-slate-400 font-medium">/ 5</span></span>
              </div>
           </div>
           <p className="text-[10px] text-slate-400 font-medium mb-6 self-end">Based on 86 ratings</p>
           
           <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm shadow-blue-200">
             <Star size={14} className="fill-white" /> Submit Rating
           </button>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-5">
             <div className="flex items-center gap-2">
               <div className="bg-blue-600 text-white p-1 rounded-full"><MessageSquare size={12} /></div>
               <h3 className="font-bold text-slate-800 text-sm">Recent Feedback</h3>
             </div>
             <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700">View All</button>
           </div>

           <div className="space-y-4">
              <div className="pb-4 border-b border-slate-50">
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={14} /></div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-tight">Anonymous Student</p>
                          <p className="text-[9px] text-slate-400">29 Sep 2025</p>
                       </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-50 text-green-600">Positive</span>
                 </div>
                 <p className="text-xs text-slate-600 italic">"Today's lunch was really good!"</p>
              </div>
              
              <div className="pb-4 border-b border-slate-50">
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={14} /></div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-tight">Anonymous Student</p>
                          <p className="text-[9px] text-slate-400">28 Sep 2025</p>
                       </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-50 text-amber-600">Neutral</span>
                 </div>
                 <p className="text-xs text-slate-600 italic">"Please reduce the spice level."</p>
              </div>

              <div>
                 <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                       <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User size={14} /></div>
                       <div>
                          <p className="text-[11px] font-bold text-slate-800 leading-tight">Anonymous Student</p>
                          <p className="text-[9px] text-slate-400">27 Sep 2025</p>
                       </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-50 text-green-600">Positive</span>
                 </div>
                 <p className="text-xs text-slate-600 italic">"Breakfast was amazing!"</p>
              </div>
           </div>
        </div>

        {/* Mess Insights */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-5">
             <div className="flex items-center gap-2">
               <div className="text-blue-600"><BarChart2 size={16} /></div>
               <h3 className="font-bold text-slate-800 text-sm">Mess Insights</h3>
             </div>
             <div className="flex items-center gap-1 text-[10px] text-blue-600 font-medium cursor-pointer">
               This Week <ChevronDown size={12} />
             </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                 <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Star size={14} className="fill-current" />
                 </div>
                 <h4 className="text-lg font-black text-slate-800 leading-none mb-1">4.2</h4>
                 <p className="text-[9px] text-slate-500 font-medium mb-1">Average Rating</p>
                 <p className="text-[8px] text-green-600 font-bold flex items-center gap-0.5"><ArrowUp size={8} /> 0.3 from last week</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                 <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Utensils size={14} />
                    <span className="text-[11px] font-bold text-slate-800">Dinner</span>
                 </div>
                 <p className="text-[9px] text-slate-500 font-medium mb-0.5">Most Popular Meal</p>
                 <p className="text-[8px] text-slate-400 font-medium">(32% of votes)</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                 <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <MessageSquare size={14} />
                 </div>
                 <h4 className="text-lg font-black text-slate-800 leading-none mb-1">86</h4>
                 <p className="text-[9px] text-slate-500 font-medium mb-1">Total Feedback</p>
                 <p className="text-[8px] text-green-600 font-bold flex items-center gap-0.5"><ArrowUp size={8} /> 12% from last week</p>
              </div>

              <div className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                 <div className="flex items-center gap-2 mb-2 text-blue-600">
                    <Calendar size={14} />
                    <span className="text-[11px] font-bold text-slate-800">Wednesday</span>
                 </div>
                 <p className="text-[9px] text-slate-500 font-medium mb-0.5">Best Rated Day</p>
                 <p className="text-[8px] text-slate-400 font-medium flex items-center gap-0.5">(4.6 <Star size={8} className="fill-current text-amber-400" />)</p>
              </div>
           </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="text-blue-600"><Zap size={16} /></div>
             <h3 className="font-bold text-slate-800 text-sm">Quick Actions</h3>
           </div>
           
           <div className="flex flex-wrap gap-3">
              <button className="flex-1 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-sm shadow-blue-200">
                <MessageSquare size={12} /> Give Feedback
              </button>
              <Link to="/student/complaints" className="flex-1 border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-bold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors">
                <ClipboardList size={12} /> View Complaints
              </Link>
              <button className="w-full border border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 font-bold text-[11px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors mt-1">
                <Phone size={12} /> Contact Warden
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StudentMenu;
