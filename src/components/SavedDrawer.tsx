import React from 'react';
import { X, Bookmark, Trash2, Copy, Printer, Check, ArrowRight } from 'lucide-react';
import { ChatMessage } from '../types';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedMessages: ChatMessage[];
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
  onJumpToChat: (text: string) => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedMessages,
  onRemoveBookmark,
  onClearAll,
  onJumpToChat,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Student Saved Notebook
              </h2>
              <p className="text-xs text-slate-500">
                {savedMessages.length} {savedMessages.length === 1 ? 'answer' : 'answers'} bookmarked for advising & reference
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {savedMessages.length === 0 ? (
            <div className="py-16 text-center text-slate-400 space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-slate-300" />
              <p className="text-sm font-medium text-slate-700">No saved answers yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Click the bookmark icon on any bot response to save it here for fast reference during your advisor meetings or semester planning.
              </p>
            </div>
          ) : (
            savedMessages.map((msg) => (
              <div
                key={msg.id}
                className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2.5 text-xs relative group"
              >
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                    {msg.category || 'General Advice'}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>

                <div className="text-slate-800 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {msg.text}
                </div>

                {msg.department && (
                  <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                    <strong className="text-slate-800">{msg.department.name}</strong> · {msg.department.phone}
                  </div>
                )}

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => {
                      onJumpToChat(msg.text.slice(0, 60));
                      onClose();
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    <span>Ask follow-up in Chat</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                      title="Copy text"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      onClick={() => onRemoveBookmark(msg.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {savedMessages.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-rose-600 hover:text-rose-800 font-medium"
            >
              Clear All Notes
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Advising Sheet</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
