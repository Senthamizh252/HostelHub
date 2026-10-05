import React, { useState } from 'react';
import { 
  Search, ChevronRight, Grid, Smartphone, IdCard, Book, Shirt, 
  Briefcase, MoreHorizontal, Tag, FolderHeart, ShieldCheck, HelpCircle,
  Phone, MapPin, Calendar, User, X, Building, ShieldAlert,
  ChevronDown, SearchIcon, CheckCircle2, AlertCircle, Info
} from 'lucide-react';

const lostFoundItems = [
  {
    id: 1,
    status: 'Lost',
    title: 'Water Bottle',
    category: 'Accessories',
    location: 'North Block - Canteen',
    date: '29 Sep 2025',
    description: 'Black Milton water bottle with blue cap. Lost near the canteen.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=300&q=80',
    reporter: 'Sushmitha S (Student)'
  },
  {
    id: 2,
    status: 'Found',
    title: 'Earbuds',
    category: 'Electronics',
    location: 'North Block - Room A-102',
    date: '28 Sep 2025',
    description: 'White wireless earbuds found in the study room.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=300&q=80',
    reporter: 'Admin'
  },
  {
    id: 3,
    status: 'Lost',
    title: 'Student ID Card',
    category: 'ID Cards',
    location: 'Main Gate',
    date: '27 Sep 2025',
    description: 'Lost my college ID card. It has my photo and CSE department.',
    image: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=300&q=80',
    reporter: 'Priya D'
  },
  {
    id: 4,
    status: 'Found',
    title: 'Sweatshirt',
    category: 'Clothing',
    location: 'Mess Hall',
    date: '26 Sep 2025',
    description: 'Blue sweatshirt found near the mess hall. Size - M.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80',
    reporter: 'Warden'
  },
  {
    id: 5,
    status: 'Lost',
    title: 'Calculator',
    category: 'Electronics',
    location: 'Library',
    date: '25 Sep 2025',
    description: 'Casio scientific calculator lost in the library. Black color.',
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=300&q=80',
    reporter: 'Rahul M'
  },
  {
    id: 6,
    status: 'Found',
    title: 'Bracelet',
    category: 'Accessories',
    location: 'Girls Hostel - Common Room',
    date: '24 Sep 2025',
    description: 'Silver bracelet found in the common room. Please claim.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=300&q=80',
    reporter: 'Admin'
  }
];

const categories = [
  { name: 'All', icon: <Grid size={16} /> },
  { name: 'Electronics', icon: <Smartphone size={16} /> },
  { name: 'ID Cards', icon: <IdCard size={16} /> },
  { name: 'Books', icon: <Book size={16} /> },
  { name: 'Clothing', icon: <Shirt size={16} /> },
  { name: 'Accessories', icon: <Briefcase size={16} /> },
  { name: 'Other', icon: <MoreHorizontal size={16} /> }
];

const StudentLostFound = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);

  const getStatusPill = (status) => {
    if (status === 'Lost') {
      return <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">Lost</span>;
    }
    return <span className="bg-green-50 text-green-600 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide">Found</span>;
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans relative">
      
      {/* Item Details Modal Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-2xl flex flex-col md:flex-row gap-6 relative animate-in fade-in zoom-in-95 duration-200">
             
             <button 
               onClick={() => setSelectedItem(null)}
               className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors"
             >
               <X size={16} />
             </button>

             <div className="w-full md:w-64 h-64 rounded-xl overflow-hidden shrink-0 border border-slate-100 shadow-sm">
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" />
             </div>
             
             <div className="flex-1 flex flex-col justify-between">
                <div>
                   <div className="flex items-center gap-3 mb-2">
                     <h2 className="text-xl font-bold text-slate-800">{selectedItem.title}</h2>
                     {getStatusPill(selectedItem.status)}
                   </div>
                   
                   <div className="grid grid-cols-1 gap-y-3 gap-x-4 mb-4">
                      <div className="flex items-start gap-2 text-sm">
                         <Briefcase size={16} className="text-blue-500 mt-0.5" />
                         <div>
                            <p className="text-[10px] text-slate-500 font-medium">Category</p>
                            <p className="font-semibold text-slate-700">{selectedItem.category}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <MapPin size={16} className="text-blue-500 mt-0.5" />
                         <div>
                            <p className="text-[10px] text-slate-500 font-medium">Location</p>
                            <p className="font-semibold text-slate-700">{selectedItem.location}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <Calendar size={16} className="text-blue-500 mt-0.5" />
                         <div>
                            <p className="text-[10px] text-slate-500 font-medium">Date</p>
                            <p className="font-semibold text-slate-700">{selectedItem.date}</p>
                         </div>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                         <Info size={16} className="text-blue-500 mt-0.5" />
                         <div>
                            <p className="text-[10px] text-slate-500 font-medium">Description</p>
                            <p className="text-sm text-slate-700">{selectedItem.description}</p>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <User size={14} className="text-slate-400" />
                      <p className="text-xs text-slate-500 font-medium">Reported by <span className="font-bold text-slate-700">{selectedItem.reporter}</span></p>
                   </div>
                </div>

                <div className="flex gap-3 mt-6">
                   {selectedItem.status === 'Lost' ? (
                     <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
                        I Found This
                     </button>
                   ) : (
                     <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-2">
                        This is Mine
                     </button>
                   )}
                   <button className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2.5 rounded-xl transition-colors text-sm flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} /> Mark as Resolved
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* Header */}
        <div className="bg-[#eff4ff] rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100/50">
          <div className="flex items-center gap-4 relative z-10">
            <div className="bg-[#2563EB] text-white p-4 rounded-full shadow-sm">
              <Search size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Lost & Found</h1>
              <p className="text-slate-500 text-sm">Lost something? Found something? Help reunite it with its owner.</p>
            </div>
          </div>
          
          {/* Header Graphic */}
          <div className="relative z-10 flex items-center pr-4 hidden sm:flex">
            {/* Backpack Illustration via SVG */}
            <div className="relative w-48 h-24 flex items-center justify-center -rotate-6">
               <svg viewBox="0 0 160 100" className="w-full h-full opacity-90">
                 {/* Leaves/Decor */}
                 <path d="M20 70 C10 40 30 30 40 70 Z" fill="#93c5fd" />
                 <path d="M30 80 C20 50 40 40 50 80 Z" fill="#60a5fa" />
                 <path d="M140 30 C150 50 130 60 120 30 Z" fill="#93c5fd" />
                 <path d="M130 20 C140 40 120 50 110 20 Z" fill="#60a5fa" />
                 
                 {/* Backpack Body */}
                 <path d="M60 90 L100 90 C110 90 115 80 110 60 C105 30 80 20 80 20 C80 20 55 30 50 60 C45 80 50 90 60 90 Z" fill="#2563eb" />
                 {/* Backpack Pocket */}
                 <path d="M55 70 L105 70 C110 70 110 90 105 90 L55 90 C50 90 50 70 55 70 Z" fill="#1d4ed8" />
                 <path d="M65 75 L95 75" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                 {/* Straps */}
                 <path d="M65 25 C50 15 40 35 45 50" fill="none" stroke="#1e40af" strokeWidth="6" strokeLinecap="round" />
                 <path d="M95 25 C110 15 120 35 115 50" fill="none" stroke="#1e40af" strokeWidth="6" strokeLinecap="round" />
                 {/* Top Handle */}
                 <path d="M75 22 C75 10 85 10 85 22" fill="none" stroke="#1e40af" strokeWidth="4" strokeLinecap="round" />
                 
                 {/* Badge/Tag */}
                 <rect x="115" y="60" width="40" height="25" fill="#ffffff" rx="4" transform="rotate(-15 115 60)" />
                 <text x="120" y="73" fontSize="8" fontWeight="bold" fill="#2563eb" transform="rotate(-15 115 60)">Lost</text>
                 <text x="120" y="81" fontSize="8" fontWeight="bold" fill="#2563eb" transform="rotate(-15 115 60)">Found</text>
                 <text x="120" y="89" fontSize="8" fontWeight="bold" fill="#2563eb" transform="rotate(-15 115 60)">Reunited</text>
               </svg>
            </div>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-80 h-full bg-blue-100/30 -skew-x-12 translate-x-10 pointer-events-none"></div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Report Lost Item */}
           <div className="bg-red-50/50 border border-red-100 hover:border-red-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer group transition-all">
              <div className="flex items-center gap-4">
                 <div className="bg-white text-red-500 p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <SearchIcon size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold text-red-600">Report Lost Item</h3>
                    <p className="text-[10px] text-red-500/80 font-medium">Did you lose something? Let us help!</p>
                 </div>
              </div>
              <ChevronRight size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
           </div>

           {/* Report Found Item */}
           <div className="bg-green-50/50 border border-green-100 hover:border-green-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer group transition-all">
              <div className="flex items-center gap-4">
                 <div className="bg-white text-green-500 p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={20} />
                 </div>
                 <div>
                    <h3 className="font-bold text-green-600">Report Found Item</h3>
                    <p className="text-[10px] text-green-500/80 font-medium">Found something? Return it to its owner!</p>
                 </div>
              </div>
              <ChevronRight size={18} className="text-green-400 group-hover:text-green-600 transition-colors" />
           </div>
        </div>

        {/* Search & Filters Row */}
        <div className="flex flex-col md:flex-row gap-3">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search items.." 
                className="pl-9 pr-4 py-2.5 w-full bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 shadow-sm"
              />
           </div>
           
           <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap font-medium shadow-sm justify-between min-w-[130px]">
                All Items <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap font-medium shadow-sm justify-between min-w-[140px]">
                All Categories <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 whitespace-nowrap font-medium shadow-sm justify-between min-w-[140px]">
                All Locations <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-blue-600 hover:bg-slate-50 whitespace-nowrap font-bold shadow-sm justify-between ml-auto">
                <SearchIcon size={14} /> Newest First <ChevronDown size={14} />
              </button>
           </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
           {categories.map(cat => (
             <button 
               key={cat.name}
               onClick={() => setActiveCategory(cat.name)}
               className={`flex flex-col items-center justify-center gap-1.5 w-20 h-20 shrink-0 rounded-2xl border transition-all ${
                 activeCategory === cat.name 
                 ? 'bg-[#2563EB] border-blue-600 text-white shadow-md shadow-blue-200' 
                 : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
               }`}
             >
               {cat.icon}
               <span className="text-[10px] font-bold">{cat.name}</span>
             </button>
           ))}
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {lostFoundItems.map(item => (
             <div key={item.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col group">
                <div className="p-4 flex items-start gap-4">
                   <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   
                   <div className="flex-1 min-w-0">
                      {getStatusPill(item.status)}
                      <h3 className="font-bold text-slate-800 mt-1.5 mb-1 truncate">{item.title}</h3>
                      <div className="flex flex-col gap-1 text-[9px] text-slate-500 font-medium">
                         <div className="flex items-center gap-1.5 truncate"><Briefcase size={10} className="text-slate-400 shrink-0" /> {item.category}</div>
                         <div className="flex items-center gap-1.5 truncate"><MapPin size={10} className="text-slate-400 shrink-0" /> {item.location}</div>
                         <div className="flex items-center gap-1.5 truncate"><Calendar size={10} className="text-slate-400 shrink-0" /> {item.date}</div>
                      </div>
                   </div>
                </div>
                
                <div className="px-4 pb-4 flex-1 flex flex-col justify-between">
                   <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed mb-4">
                     {item.description}
                   </p>
                   
                   <button 
                     onClick={() => setSelectedItem(item)}
                     className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg self-start"
                   >
                     View Details <ChevronRight size={12} />
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* Empty State / Bottom Indicator */}
        <div className="py-10 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-100 border-dashed">
           <div className="bg-slate-50 text-slate-300 p-4 rounded-full mb-3">
              <SearchIcon size={24} />
           </div>
           <h3 className="font-bold text-slate-700 text-sm mb-1">No more items to show</h3>
           <p className="text-[11px] text-slate-400 font-medium">Check back later for new updates.</p>
        </div>

      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-full xl:w-72 space-y-6 shrink-0">
        
        {/* Item Categories */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="text-blue-600"><Tag size={16} /></div>
             <h3 className="font-bold text-slate-800 text-sm">Item Categories</h3>
           </div>
           
           <div className="space-y-1">
              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg"><Smartphone size={14} /></div>
                    Electronics
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">12</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg"><IdCard size={14} /></div>
                    ID Cards
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">8</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg"><Book size={14} /></div>
                    Books
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">6</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg"><Shirt size={14} /></div>
                    Clothing
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">9</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-lg"><Briefcase size={14} /></div>
                    Accessories
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">5</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors border border-transparent hover:border-slate-100">
                 <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="bg-slate-100 text-slate-500 p-1.5 rounded-lg"><MoreHorizontal size={14} /></div>
                    Other
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">3</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />
                 </div>
              </div>
           </div>
        </div>

        {/* My Reports */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
           <div className="flex items-center gap-2 mb-5">
             <div className="text-blue-600"><FolderHeart size={16} /></div>
             <h3 className="font-bold text-slate-800 text-sm">My Reports</h3>
           </div>

           <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-red-200 hover:bg-red-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-red-50 text-red-500 p-1.5 rounded-full"><AlertCircle size={14} /></div>
                    <span className="text-[11px] font-bold text-slate-700">My Lost Items</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-[9px] font-bold">2</span>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-red-400" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-green-200 hover:bg-green-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-green-50 text-green-500 p-1.5 rounded-full"><ShieldCheck size={14} /></div>
                    <span className="text-[11px] font-bold text-slate-700">My Found Items</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[9px] font-bold">1</span>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-green-400" />
                 </div>
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/30 group cursor-pointer transition-colors">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-full"><CheckCircle2 size={14} /></div>
                    <span className="text-[11px] font-bold text-slate-700">Resolved</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[9px] font-bold">5</span>
                    <ChevronRight size={12} className="text-slate-300 group-hover:text-blue-400" />
                 </div>
              </div>
           </div>
        </div>

        {/* Need Help? */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative overflow-hidden">
           <div className="flex items-center gap-2 mb-3 relative z-10">
             <div className="text-blue-600"><HelpCircle size={16} /></div>
             <h3 className="font-bold text-slate-800 text-sm">Need Help?</h3>
           </div>
           
           <p className="text-[10px] text-slate-500 leading-relaxed mb-5 relative z-10">
             For urgent assistance, contact the warden or hostel office.
           </p>

           <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors bg-white/80 backdrop-blur-sm">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-full"><Phone size={14} /></div>
                    <div>
                       <h4 className="text-[11px] font-bold text-slate-800 leading-none mb-1">Warden</h4>
                       <p className="text-[9px] text-blue-600 font-bold">+91 98765 43210</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 group cursor-pointer transition-colors bg-white/80 backdrop-blur-sm">
                 <div className="flex items-center gap-3">
                    <div className="bg-blue-50 text-blue-500 p-1.5 rounded-full"><Building size={14} /></div>
                    <div>
                       <h4 className="text-[11px] font-bold text-slate-800 leading-none mb-1">Hostel Office</h4>
                       <p className="text-[9px] text-blue-600 font-bold">+91 98765 12345</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
              </div>

              <div className="flex items-center justify-between p-3 border border-red-100 rounded-xl bg-red-50/50 hover:bg-red-50 group cursor-pointer transition-colors backdrop-blur-sm">
                 <div className="flex items-center gap-3">
                    <div className="bg-red-100 text-red-500 p-1.5 rounded-full"><ShieldAlert size={14} /></div>
                    <div>
                       <h4 className="text-[11px] font-bold text-red-700 leading-none mb-1">Emergency</h4>
                       <p className="text-[9px] text-red-600 font-bold">+91 112</p>
                    </div>
                 </div>
                 <ChevronRight size={14} className="text-red-300 group-hover:text-red-500" />
              </div>
           </div>

           {/* Support Illustration */}
           <div className="absolute right-0 bottom-0 pointer-events-none opacity-40">
             <svg viewBox="0 0 100 100" className="w-32 h-32 transform translate-x-4 translate-y-8">
               <circle cx="50" cy="50" r="40" fill="#eff4ff" />
               <path d="M50 20 A 15 15 0 0 0 50 50 A 15 15 0 0 0 50 20 Z" fill="#60a5fa" />
               <path d="M25 80 Q 50 50 75 80" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" />
               <rect x="35" y="45" width="8" height="15" rx="2" fill="#2563eb" transform="rotate(-15 35 45)" />
             </svg>
           </div>
        </div>

      </div>
    </div>
  );
};

export default StudentLostFound;
