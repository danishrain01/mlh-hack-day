import React from 'react';
import { Calendar, Clock, AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { CampusDeadline, CategoryType } from '../types';
import { CAMPUS_DEADLINES } from '../data/colleges';

interface DeadlinesWidgetProps {
  onAskAboutDeadline: (title: string, category: CategoryType) => void;
}

export const DeadlinesWidget: React.FC<DeadlinesWidgetProps> = ({ onAskAboutDeadline }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Academic Calendar & Critical Campus Deadlines
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Stay on track with add/drop periods, tuition payment schedules, housing renewals, and financial aid deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200/80 px-3 py-1.5 rounded-xl text-xs text-amber-800 shrink-0 self-start sm:self-auto font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Fall 2026 Registration Active</span>
        </div>
      </div>

      {/* Deadlines List */}
      <div className="space-y-3">
        {CAMPUS_DEADLINES.map((dl) => (
          <div
            key={dl.id}
            className={`bg-white rounded-xl border p-5 transition-all shadow-xs ${
              dl.urgent 
                ? 'border-amber-300 ring-1 ring-amber-200/60 bg-gradient-to-r from-amber-50/20 to-white' 
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {dl.category}
                  </span>
                  {dl.urgent && (
                    <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.2 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3 text-rose-600" />
                      Urgent · {dl.relativeTime}
                    </span>
                  )}
                  {!dl.urgent && (
                    <span className="text-[11px] text-slate-500 font-medium">
                      {dl.relativeTime}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-slate-900 text-base">
                  {dl.title}
                </h3>

                <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
                  {dl.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0">
                <span className="text-xs font-bold text-slate-800 sm:text-right">
                  {dl.dateStr}
                </span>

                <button
                  onClick={() => onAskAboutDeadline(dl.title, dl.category)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask AI Guidance</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
