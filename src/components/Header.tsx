import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldAlert, 
  Bookmark, 
  Sparkles, 
  ChevronDown,
  Building2,
  Calendar,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { CollegePreset } from '../types';
import { COLLEGE_PRESETS } from '../data/colleges';

interface HeaderProps {
  currentCollege: CollegePreset;
  onSelectCollege: (college: CollegePreset) => void;
  activeTab: 'chat' | 'faq' | 'directory' | 'deadlines';
  setActiveTab: (tab: 'chat' | 'faq' | 'directory' | 'deadlines') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCollege,
  onSelectCollege,
  activeTab,
  setActiveTab,
  savedCount,
  onOpenSaved,
  onOpenEmergency,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Campus Services Online
          </span>
          <span className="hidden sm:inline text-slate-500">|</span>
          <span className="hidden sm:inline text-slate-400 font-sans">
            {currentCollege.currentTerm} · {currentCollege.semesterType}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-amber-300 hover:text-white bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors font-medium"
            title="24/7 Campus Police, SafeWalk, and Crisis Support"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Campus Safety & Crisis</span>
          </button>

          <button
            onClick={onOpenSaved}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            title="View saved answers"
          >
            <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
            <span>Saved Notebook</span>
            {savedCount > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & College Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5 font-sans">
                  <span>CampusPulse</span>
                  <span className="text-xs font-normal text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-1.5 py-0.5 hidden sm:inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-indigo-500" /> AI FAQ Bot
                  </span>
                </h1>
              </div>

              {/* College Switcher Dropdown */}
              <div className="relative mt-0.5">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  <span className="text-slate-900 font-semibold">{currentCollege.name}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-transform" />
                </button>

                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
                      Select University Profile
                    </div>
                    <div className="space-y-1">
                      {COLLEGE_PRESETS.map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            onSelectCollege(preset);
                            setDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col ${
                            currentCollege.id === preset.id
                              ? 'bg-indigo-50 text-indigo-900 font-medium border border-indigo-200/60'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span className="font-semibold text-slate-900">{preset.name}</span>
                          <span className="text-[11px] text-slate-500 mt-0.5">{preset.type}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 px-2 text-[11px] text-slate-500">
                      Mascot: <span className="font-medium text-slate-700">{currentCollege.mascot}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>AI Chatbot</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Verified FAQs</span>
            </button>

            <button
              onClick={() => setActiveTab('directory')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'directory'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Campus Directory</span>
              <span className="sm:hidden">Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('deadlines')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'deadlines'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Deadlines</span>
              <span className="sm:hidden">Dates</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
