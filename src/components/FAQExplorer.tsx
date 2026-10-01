import React, { useState, useMemo } from 'react';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Building, 
  Phone, 
  Mail, 
  MessageSquareShare, 
  Sparkles,
  Bookmark,
  Share2,
  Check
} from 'lucide-react';
import { CategoryType, FAQItem } from '../types';
import { FAQ_DATA } from '../data/faqs';

interface FAQExplorerProps {
  onAskBot: (question: string, category: CategoryType) => void;
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

const CATEGORIES: CategoryType[] = [
  'All',
  'Academics & Registrar',
  'Financial Aid & Billing',
  'Housing & Residence',
  'Dining & Meal Plans',
  'Health & Counseling',
  'Transit & Parking',
  'Library & Tech',
  'Student Life & Clubs',
];

export const FAQExplorer: React.FC<FAQExplorerProps> = ({
  onAskBot,
  selectedCategory,
  onSelectCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-acad-1');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter FAQs based on search and selected category
  const filteredFAQs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch = 
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.tags.some(t => t.toLowerCase().includes(query)) ||
        item.department.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handleCopyLink = (item: FAQItem) => {
    navigator.clipboard.writeText(`${item.question}\n\n${item.answer}`);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Title & Search Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              Verified Student FAQ Knowledge Hub
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Curated official policies and instant answers for college services, updated for the current academic term.
            </p>
          </div>

          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-3 py-1.5 rounded-lg shrink-0 self-start sm:self-auto">
            {filteredFAQs.length} {filteredFAQs.length === 1 ? 'Topic' : 'Topics'} Found
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords (e.g. FAFSA, drop class, quiet hours, meal rollover, parking, safe walk)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:border-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFAQs.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-500 space-y-3">
            <HelpCircle className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="font-semibold text-slate-800">No matching FAQs found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Try searching with different terms or ask the AI Assistant directly for a personalized answer!
            </p>
            <button
              onClick={() => onAskBot(searchQuery, selectedCategory)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Chatbot: "{searchQuery || 'My Question'}"</span>
            </button>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-xl border transition-all overflow-hidden ${
                  isExpanded 
                    ? 'border-indigo-300 shadow-md ring-1 ring-indigo-200/50' 
                    : 'border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Accordion Question Header */}
                <button
                  type="button"
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {faq.category}
                      </span>
                      {faq.popular && (
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.2 rounded-full">
                          Frequent
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors text-[15px] sm:text-base leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="shrink-0 text-slate-400 group-hover:text-slate-600 mt-1">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Expanded Answer Body */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 bg-slate-50/30">
                    <p className="text-sm leading-relaxed text-slate-700 pt-2">
                      {faq.answer}
                    </p>

                    {/* Key Takeaways Checklist */}
                    {faq.keyTakeaways && faq.keyTakeaways.length > 0 && (
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 space-y-2">
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Key Student Takeaways
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                          {faq.keyTakeaways.map((takeaway, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{takeaway}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Official Department & Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="font-medium text-slate-800">{faq.department.name}</span>
                        <span className="text-slate-400">·</span>
                        <span>{faq.department.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyLink(faq)}
                          className="px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 flex items-center gap-1 transition-colors"
                          title="Copy answer"
                        >
                          {copiedId === faq.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => onAskBot(faq.question, faq.category)}
                          className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <MessageSquareShare className="w-3.5 h-3.5" />
                          <span>Ask AI Follow-up</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
