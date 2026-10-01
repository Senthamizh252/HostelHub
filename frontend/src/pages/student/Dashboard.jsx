import { useAuth } from '../../context/AuthContext';
import { 
  BedDouble, CloudSun, Wrench, FileText, Utensils, Bell, 
  ArrowRight, Heart, Calendar as CalendarIcon, Sunrise, 
  Sun, Coffee, Moon, CheckCircle2, Megaphone, Search, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const { user } = useAuth();
  
  const name = user?.name || 'Sushmitha';

  return (
    <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto pb-10 font-sans">
      
      {/* LEFT MAIN CONTENT */}
      <div className="flex-1 space-y-8">
        
        {/* Header Section */}
        <div className="relative">
          <div className="absolute top-0 right-10 opacity-60 flex flex-col items-end hidden sm:flex">
            <div className="text-blue-500 font-medium text-lg italic transform -rotate-6">Make today</div>
            <div className="text-blue-500 font-medium text-lg italic transform -rotate-6 mb-1">count! <Heart size={14} className="inline fill-current text-blue-500" /></div>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            Good Morning, {name} <span className="text-2xl">👋</span>
          </h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your hostel stay.</p>
        </div>

        {/* Top 2 Cards: Room & Weather */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-full">
                <BedDouble size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Room A-204</h3>
                <p className="text-slate-500 text-sm mt-0.5">Block A &bull; 3/4 Occupied</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold tracking-wide">Occupied</span>
              <ChevronRight className="text-slate-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-md transition-all">
            <div className="bg-blue-50 text-blue-500 p-3 rounded-full">
              <CloudSun size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">28°C</h3>
              <p className="text-slate-500 text-xs mt-0.5">Partly Cloudy<br/>Salem</p>
            </div>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="bg-red-50/70 rounded-2xl p-5 border border-red-100/50 hover:shadow-sm transition-all flex flex-col justify-between h-40">
            <div className="bg-red-100 text-red-500 p-2.5 rounded-full w-max">
              <Wrench size={20} />
            </div>
            <div>
              <p className="text-slate-700 font-semibold text-sm mb-1">Active Complaints</p>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">2</h3>
              <Link to="/student/complaints" className="text-red-500 text-xs font-semibold flex items-center gap-1 hover:text-red-600">View all <ArrowRight size={12}/></Link>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-orange-50/70 rounded-2xl p-5 border border-orange-100/50 hover:shadow-sm transition-all flex flex-col justify-between h-40">
            <div className="bg-orange-100 text-orange-500 p-2.5 rounded-full w-max">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-slate-700 font-semibold text-sm mb-1">Pending Leaves</p>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">1</h3>
              <Link to="/student/leaves" className="text-orange-500 text-xs font-semibold flex items-center gap-1 hover:text-orange-600">View all <ArrowRight size={12}/></Link>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-green-50/70 rounded-2xl p-5 border border-green-100/50 hover:shadow-sm transition-all flex flex-col justify-between h-40">
            <div className="bg-green-100 text-green-600 p-2.5 rounded-full w-max">
              <Utensils size={20} />
            </div>
            <div>
              <p className="text-slate-700 font-semibold text-sm mb-1">Today's Meal</p>
              <h3 className="text-sm font-bold text-slate-800 mb-2 line-clamp-2 leading-tight h-8">Lunch: Rice + Sambar</h3>
              <Link to="/student/menu" className="text-green-600 text-xs font-semibold flex items-center gap-1 hover:text-green-700">View Menu <ArrowRight size={12}/></Link>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-purple-50/70 rounded-2xl p-5 border border-purple-100/50 hover:shadow-sm transition-all flex flex-col justify-between h-40">
            <div className="bg-purple-100 text-purple-600 p-2.5 rounded-full w-max">
              <Bell size={20} />
            </div>
            <div>
              <p className="text-slate-700 font-semibold text-sm mb-1">New Notifications</p>
              <h3 className="text-3xl font-bold text-slate-800 mb-2">3</h3>
              <Link to="/student/notifications" className="text-purple-600 text-xs font-semibold flex items-center gap-1 hover:text-purple-700">View all <ArrowRight size={12}/></Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
            <p className="text-slate-500 text-sm">Get things done, quickly.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/student/complaints/new" className="bg-[#2563EB] rounded-2xl p-4 text-white hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 flex flex-col justify-between h-28 group">
              <Wrench size={22} className="mb-2 text-blue-100" />
              <div className="flex items-end justify-between">
                <span className="font-semibold text-sm leading-tight">Submit<br/>Complaint</span>
                <ArrowRight size={16} className="text-blue-200 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link to="/student/leaves/new" className="bg-[#8B5CF6] rounded-2xl p-4 text-white hover:bg-purple-600 transition-colors shadow-sm shadow-purple-200 flex flex-col justify-between h-28 group">
              <FileText size={22} className="mb-2 text-purple-100" />
              <div className="flex items-end justify-between">
                <span className="font-semibold text-sm leading-tight">Apply<br/>Leave</span>
                <ArrowRight size={16} className="text-purple-200 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link to="/student/menu" className="bg-[#10B981] rounded-2xl p-4 text-white hover:bg-emerald-600 transition-colors shadow-sm shadow-emerald-200 flex flex-col justify-between h-28 group">
              <Utensils size={22} className="mb-2 text-emerald-100" />
              <div className="flex items-end justify-between">
                <span className="font-semibold text-sm leading-tight">View<br/>Mess Menu</span>
                <ArrowRight size={16} className="text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
            <Link to="/student/lost-found/new" className="bg-[#3B82F6] rounded-2xl p-4 text-white hover:bg-blue-500 transition-colors shadow-sm shadow-blue-200 flex flex-col justify-between h-28 group">
              <Search size={22} className="mb-2 text-blue-100" />
              <div className="flex items-end justify-between">
                <span className="font-semibold text-sm leading-tight">Report<br/>Lost Item</span>
                <ArrowRight size={16} className="text-blue-200 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
            <button className="text-sm text-blue-600 font-semibold flex items-center gap-1 hover:underline">View all <ArrowRight size={14}/></button>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 bg-blue-100 text-blue-600 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <Bell size={14} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-800">New announcement posted</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-4">2 hours ago</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Water supply maintenance on Block A</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-green-100 text-green-600 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <CheckCircle2 size={14} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-800">Your complaint has been updated</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-4">5 hours ago</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Complaint #C-102 is now In Progress</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-purple-100 text-purple-600 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <FileText size={14} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-800">Leave request approved</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-4">1 day ago</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Your leave request (02 Oct - 04 Oct) has been approved</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 bg-orange-100 text-orange-600 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0">
                <Utensils size={14} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold text-slate-800">Mess feedback submitted</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-4">1 day ago</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">You rated today's lunch 4/5</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* RIGHT SIDEBAR / PANEL */}
      <div className="w-full xl:w-80 space-y-6">
        
        {/* Mess Menu */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-blue-600" />
              <h2 className="text-base font-bold text-slate-800">Mess Menu</h2>
            </div>
            <button className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">View Full Menu <ArrowRight size={12}/></button>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-5 font-medium">
            <CalendarIcon size={12} /> Today, 29 Sep 2026
          </div>

          <div className="space-y-3">
            {/* Timeline item */}
            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-500 shrink-0">
                <Sunrise size={16} />
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center relative overflow-hidden">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Breakfast</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Idli + Sambar</p>
                </div>
                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Done</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 shrink-0">
                <Utensils size={16} />
              </div>
              <div className="flex-1 p-3 rounded-xl border border-blue-100 shadow-sm bg-blue-50/30 flex justify-between items-center relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Lunch</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Rice + Sambar + Poriyal</p>
                </div>
                <span className="text-[10px] font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Upcoming</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-600 shrink-0">
                <Coffee size={16} />
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Snacks</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Tea + Biscuit</p>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Upcoming</span>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 shrink-0">
                <Moon size={16} />
              </div>
              <div className="flex-1 p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Dinner</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Chapathi + Kurma</p>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">Upcoming</span>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Megaphone size={18} className="text-blue-600" />
              <h2 className="text-base font-bold text-slate-800">Latest Announcements</h2>
            </div>
            <button className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">View all <ArrowRight size={12}/></button>
          </div>
          
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex gap-2 mb-2">
                <Megaphone size={16} className="text-red-500 mt-0.5 shrink-0" />
                <h4 className="font-semibold text-slate-800 text-sm leading-tight">Water supply maintenance on Block A</h4>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Emergency</span>
                <span className="text-xs text-slate-400">Today, 2:00 PM</span>
              </div>
            </div>
            
            <div className="border-b border-slate-100 pb-4">
              <div className="flex gap-2 mb-2">
                <Bell size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <h4 className="font-semibold text-slate-800 text-sm leading-tight">Mess menu changed for tomorrow</h4>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">General</span>
                <span className="text-xs text-slate-400">Today, 10:00 AM</span>
              </div>
            </div>

            <div>
              <div className="flex gap-2 mb-2">
                <CalendarIcon size={16} className="text-purple-500 mt-0.5 shrink-0" />
                <h4 className="font-semibold text-slate-800 text-sm leading-tight">College fest registration open</h4>
              </div>
              <div className="flex items-center gap-2 ml-6">
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Events</span>
                <span className="text-xs text-slate-400">Yesterday, 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Small Steps Graphic */}
        <div className="bg-[#f4f7fe] rounded-2xl p-6 border border-blue-50/50 relative overflow-hidden mt-6 flex justify-between items-center h-32">
          {/* Plant Illustration */}
          <div className="relative z-10 flex items-end h-full w-12">
            <div className="w-8 h-6 bg-blue-400 rounded-b-lg rounded-t-sm absolute bottom-0 left-2"></div>
            <div className="w-1 h-12 bg-blue-500 absolute bottom-6 left-[22px]"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full absolute bottom-12 left-2 rounded-tr-none transform -rotate-45"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full absolute bottom-8 left-6 rounded-tl-none transform rotate-45"></div>
            <div className="w-1.5 h-1.5 bg-blue-300 rounded-full absolute bottom-16 left-6"></div>
            <div className="w-2 h-2 bg-blue-300 rounded-full absolute bottom-4 left-0"></div>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center -rotate-6 z-10">
            <p className="text-blue-700 font-semibold text-sm leading-tight text-center">
              Small steps<br/>towards a better<br/>tomorrow!
            </p>
          </div>
          
          <div className="text-blue-600 font-bold text-lg -rotate-12 z-10 mr-2">
            ;)
          </div>

          {/* Decorative lines */}
          <div className="absolute -bottom-2 -right-2 w-16 h-16 border-t border-l border-blue-300 rounded-tl-full opacity-50"></div>
          <div className="absolute bottom-2 right-4 w-24 h-24 border-t border-blue-300 rounded-tl-full opacity-30 transform rotate-12"></div>
        </div>

      </div>
    </div>
  );
};
export default StudentDashboard;
