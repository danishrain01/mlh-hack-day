import React from 'react';
import { 
  X, 
  ShieldAlert, 
  Phone, 
  HeartHandshake, 
  MapPin, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { CollegePreset } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  college: CollegePreset;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose, college }) => {
  const [copiedNumber, setCopiedNumber] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  const EMERGENCY_CONTACTS = [
    {
      title: 'Campus Police Dispatch (Emergency)',
      phone: '911 or (555) 839-9111',
      rawPhone: '5558399111',
      desc: 'Immediate emergency response for crime, medical emergencies, or active threats on campus.',
      location: 'Public Safety Building (24/7/365)',
      urgent: true,
    },
    {
      title: 'CAPS 24/7 Mental Health Crisis Hotline',
      phone: '(555) 839-TALK (8255)',
      rawPhone: '5558398255',
      desc: 'Free, confidential mental health counselors available anytime day or night for emotional distress or panic.',
      location: 'Available 24/7 (or text HOME to 741741)',
      urgent: true,
    },
    {
      title: 'SafeWalk Campus Night Security Escort',
      phone: '(555) 839-SAFE (7233)',
      rawPhone: '5558397233',
      desc: 'Free escort service walking students safely to any dorm, library, or parked vehicle between 8 PM and 3 AM.',
      location: 'Dispatched to any campus location',
      urgent: false,
    },
    {
      title: 'Student Health After-Hours Nurse Advice',
      phone: '(555) 839-2274',
      rawPhone: '5558392274',
      desc: 'Registered nurses providing telephone medical advice when the student health clinic is closed.',
      location: 'Available evenings and weekends',
      urgent: false,
    },
    {
      title: 'Residence Life Duty RA On-Call',
      phone: '(555) 839-3399',
      rawPhone: '5558393399',
      desc: 'Contact for dorm lockouts, facility emergencies, or immediate residence hall urgent concerns.',
      location: 'Dispatches hall duty staff',
      urgent: false,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-rose-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-800/80 flex items-center justify-center text-rose-200">
              <ShieldAlert className="w-6 h-6 text-rose-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Campus Safety & Emergency Directory
              </h2>
              <p className="text-xs text-rose-200">
                24/7 Immediate Help & Crisis Support for {college.name}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-200 hover:text-white hover:bg-rose-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              If you are in immediate physical danger or witnessing a life-threatening medical emergency, call <strong>911</strong> immediately or activate the nearest campus <strong>Blue Light Phone</strong>.
            </span>
          </div>

          <div className="space-y-2.5">
            {EMERGENCY_CONTACTS.map((contact, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  contact.urgent
                    ? 'border-rose-200 bg-rose-50/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {contact.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                    {contact.desc}
                  </p>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{contact.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                  <button
                    onClick={() => handleCopy(contact.phone)}
                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs flex items-center gap-1 transition-colors"
                    title="Copy number"
                  >
                    {copiedNumber === contact.phone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <a
                    href={`tel:${contact.rawPhone}`}
                    className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs ${
                      contact.urgent
                        ? 'bg-rose-600 hover:bg-rose-700 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
          >
            Close Emergency Directory
          </button>
        </div>
      </div>
    </div>
  );
};
