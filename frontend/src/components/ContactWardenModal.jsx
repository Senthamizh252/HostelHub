import React, { useState, useEffect } from 'react';
import { 
  X, Phone, Mail, MessageSquare, Clock, MapPin, 
  Shield, Check, Copy, Send, AlertCircle, ExternalLink, 
  User, CheckCircle2, PhoneCall
} from 'lucide-react';

export default function ContactWardenModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Urgent Concern');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const wardenInfo = {
    name: 'Dr. R. Meenakshi',
    role: 'Chief Hostel Warden',
    block: 'North Block & A Block',
    phone: '+91 98765 43210',
    email: 'warden@hostelhub.com',
    office: 'Room W-101, Ground Floor, North Block',
    timings: 'Mon - Sat: 9:00 AM - 6:00 PM (Emergency: 24/7)'
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(wardenInfo.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false);
        setMessage('');
        setSubject('');
        onClose();
      }, 2500);
    }, 600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <PhoneCall size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 leading-tight">Contact Warden</h2>
              <p className="text-xs text-slate-500 mt-0.5">North Block & A Block Management</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 bg-white hover:bg-slate-100 border border-slate-200/60 p-2 rounded-xl transition-colors shadow-2xs shrink-0 cursor-pointer"
            title="Close (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Warden Profile Card */}
          <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center text-blue-700 font-bold text-lg">
                  RM
                </div>
                <div className="w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full absolute bottom-0 right-0" title="On Duty"></div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-800 text-base">{wardenInfo.name}</h3>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Available</span>
                </div>
                <p className="text-xs font-medium text-blue-600">{wardenInfo.role}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                  <MapPin size={12} className="text-slate-400 shrink-0" />
                  <span>{wardenInfo.office}</span>
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
              <a 
                href={`tel:${wardenInfo.phone}`}
                className="flex-1 sm:flex-initial px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-200"
              >
                <Phone size={13} /> Call Direct
              </a>
              <button 
                onClick={handleCopyPhone}
                className="flex-1 sm:flex-initial px-3 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {copied ? <Check size={13} className="text-green-600" /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy No.'}</span>
              </button>
            </div>
          </div>

          {/* Direct Quick Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Phone */}
            <a 
              href={`tel:${wardenInfo.phone}`}
              className="p-3.5 bg-white hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-200 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Phone size={16} />
                </div>
                <ExternalLink size={13} className="text-slate-300 group-hover:text-blue-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phone Call</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{wardenInfo.phone}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a 
              href={`https://wa.me/919876543210?text=Hello%20Dr.%20Meenakshi,%20I%20am%20a%20hostel%20student%20from%20Room%20A-102.`}
              target="_blank" 
              rel="noreferrer"
              className="p-3.5 bg-white hover:bg-emerald-50/50 border border-slate-200/80 hover:border-emerald-200 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <MessageSquare size={16} />
                </div>
                <ExternalLink size={13} className="text-slate-300 group-hover:text-emerald-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">WhatsApp</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">Quick Chat</p>
              </div>
            </a>

            {/* Email */}
            <a 
              href={`mailto:${wardenInfo.email}?subject=Student%20Query%20-%20Room%20A-102`}
              className="p-3.5 bg-white hover:bg-indigo-50/50 border border-slate-200/80 hover:border-indigo-200 rounded-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail size={16} />
                </div>
                <ExternalLink size={13} className="text-slate-300 group-hover:text-indigo-500" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Official Email</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">{wardenInfo.email}</p>
              </div>
            </a>
          </div>

          {/* Quick Message to Warden */}
          <div className="pt-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Send size={13} className="text-blue-500" /> Send Instant Note to Warden Desk
            </h4>

            {isSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1 animate-in zoom-in-95 duration-200">
                <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-1">
                  <CheckCircle2 size={20} />
                </div>
                <h5 className="font-bold text-emerald-800 text-sm">Message Sent Successfully!</h5>
                <p className="text-xs text-emerald-600">
                  Dr. R. Meenakshi has been notified. You will receive updates in your notifications.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Issue Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-700 font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="Urgent Concern">Urgent Concern</option>
                      <option value="Room Issue">Room Maintenance</option>
                      <option value="Leave Query">Leave & Attendance Query</option>
                      <option value="Mess Feedback">Mess / Food Issue</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Your Room</label>
                    <input 
                      type="text" 
                      value="Room A-102 (North Block)" 
                      readOnly 
                      className="w-full text-xs bg-slate-100 border border-slate-200 rounded-lg p-2.5 text-slate-500 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Your Message</label>
                  <textarea 
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly state your concern or message for the warden..."
                    required
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-700 font-normal focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm shadow-blue-200 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send size={13} /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Emergency Helplines Footer Box */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-800">
              <Shield size={14} className="text-amber-600" /> 24/7 Hostel Emergency Desk
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-amber-800/80 pt-0.5">
              <div>Main Security Gate: <strong>+91 98765 43211</strong></div>
              <div>Medical Center / Ambulance: <strong>108 / +91 98765 43212</strong></div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
            <Clock size={12} className="text-slate-400" />
            <span>{wardenInfo.timings}</span>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
