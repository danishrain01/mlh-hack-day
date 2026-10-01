import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Search, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  AlertCircle,
  Navigation
} from 'lucide-react';
import { CampusDepartment, CategoryType } from '../types';
import { CAMPUS_DEPARTMENTS } from '../data/departments';

interface CampusDirectoryProps {
  onAskAboutDept: (deptName: string, category: CategoryType) => void;
}

export const CampusDirectory: React.FC<CampusDirectoryProps> = ({ onAskAboutDept }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState<string>('dept-reg');

  const filteredDepts = CAMPUS_DEPARTMENTS.filter(d => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.building.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.keyServices.some(s => s.toLowerCase().includes(q))
    );
  });

  const activeDepartment = CAMPUS_DEPARTMENTS.find(d => d.id === selectedDeptId) || CAMPUS_DEPARTMENTS[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Description & Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Campus Services Directory & Locator
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Direct contacts, physical office rooms, and operational hours for key university student service centers.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search departments or services..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-indigo-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Map + Directory Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Department List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
          {filteredDepts.map((dept) => {
            const isSelected = dept.id === activeDepartment.id;
            return (
              <div
                key={dept.id}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-indigo-50/70 border-indigo-300 ring-1 ring-indigo-200 shadow-xs'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-100/60 px-2 py-0.5 rounded">
                    {dept.category}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Open Regular Hours
                  </span>
                </div>

                <h3 className="font-semibold text-slate-900 text-sm">{dept.name}</h3>

                <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {dept.building}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {dept.room}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Department Detail & Campus Map Card */}
        <div className="lg:col-span-7 space-y-5">
          {/* Detailed Department Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                  {activeDepartment.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {activeDepartment.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {activeDepartment.description}
                </p>
              </div>

              <button
                onClick={() => onAskAboutDept(activeDepartment.name, activeDepartment.category)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-xs transition-colors shrink-0 self-start"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI About This Office</span>
              </button>
            </div>

            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-medium">Physical Location</div>
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-indigo-600" />
                  {activeDepartment.building}, {activeDepartment.room}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-medium">Standard Hours</div>
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  {activeDepartment.hours}
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-medium">Phone Support</div>
                <a
                  href={`tel:${activeDepartment.phone.replace(/[^0-9]/g, '')}`}
                  className="font-semibold text-indigo-600 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4" />
                  {activeDepartment.phone}
                </a>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="text-slate-400 font-medium">Email Inquiries</div>
                <a
                  href={`mailto:${activeDepartment.email}`}
                  className="font-semibold text-indigo-600 hover:underline flex items-center gap-1.5"
                >
                  <Mail className="w-4 h-4" />
                  {activeDepartment.email}
                </a>
              </div>
            </div>

            {/* Key Services Offered */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Services Handled by this Office
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeDepartment.keyServices.map((service, sIdx) => (
                  <div key={sIdx} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Schematic / Pin Visualizer */}
            <div className="pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Navigation className="w-3.5 h-3.5 text-indigo-600" />
                  Campus Quad Positioning Map
                </span>
                <span>Click building pins to explore</span>
              </div>

              <div className="relative w-full h-56 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-inner flex items-center justify-center p-4">
                {/* Stylized Quad Map Canvas */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Campus Zones */}
                <div className="absolute top-4 left-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                  North Campus Residential Quad
                </div>
                <div className="absolute bottom-4 right-6 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
                  South Campus Student Commons
                </div>

                {/* Road / Walkway lines */}
                <div className="absolute w-[80%] h-0.5 bg-slate-800/80 top-1/2 left-[10%]"></div>
                <div className="absolute h-[80%] w-0.5 bg-slate-800/80 left-1/2 top-[10%]"></div>

                {/* Building Markers */}
                {CAMPUS_DEPARTMENTS.map((dept) => {
                  const isCurrent = dept.id === activeDepartment.id;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDeptId(dept.id)}
                      style={{
                        left: `${dept.mapCoords.x}%`,
                        top: `${dept.mapCoords.y}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 z-10 group ${
                        isCurrent ? 'scale-125 z-20' : 'hover:scale-110'
                      }`}
                      title={dept.name}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md transition-colors ${
                          isCurrent
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 ring-offset-2 ring-offset-slate-900'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500'
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5" />
                      </div>
                      
                      {/* Hover Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block bg-slate-800 text-white text-[10px] font-medium py-1 px-2 rounded whitespace-nowrap shadow-lg z-30 pointer-events-none border border-slate-700">
                        {dept.building}
                      </div>
                    </button>
                  );
                })}

                {/* Active Pin Callout */}
                <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  <span>Pinned: <strong className="text-white font-medium">{activeDepartment.building}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
