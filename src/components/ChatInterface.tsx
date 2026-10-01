import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Mic, 
  MicOff, 
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Building
} from 'lucide-react';
import { CategoryType, ChatMessage, CollegePreset, DepartmentInfo } from '../types';

interface ChatInterfaceProps {
  college: CollegePreset;
  messages: ChatMessage[];
  onSendMessage: (text: string, category?: CategoryType) => void;
  isLoading: boolean;
  onBookmark: (message: ChatMessage) => void;
  onClearChat: () => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (cat: CategoryType) => void;
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

const QUICK_PROMPTS = [
  { text: 'How do I drop a class without getting a "W" grade?', cat: 'Academics & Registrar' as CategoryType },
  { text: 'When is the priority FAFSA deadline and what is our school code?', cat: 'Financial Aid & Billing' as CategoryType },
  { text: 'What do I do if I am locked out of my dorm room after hours?', cat: 'Housing & Residence' as CategoryType },
  { text: 'Do unused meal swipes or dining dollars roll over to next term?', cat: 'Dining & Meal Plans' as CategoryType },
  { text: 'Is CAPS mental health counseling free for students?', cat: 'Health & Counseling' as CategoryType },
  { text: 'How do I track campus shuttles and call SafeWalk at night?', cat: 'Transit & Parking' as CategoryType },
];

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  college,
  messages,
  onSendMessage,
  isLoading,
  onBookmark,
  onClearChat,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle SpeechSynthesis
  const handleToggleSpeech = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
    } else {
      window.speechSynthesis.cancel();
      // Clean markdown characters for clean pronunciation
      const cleaned = text.replace(/[*#_`]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.0;
      utterance.onend = () => setSpeakingId(null);
      utterance.onerror = () => setSpeakingId(null);
      setSpeakingId(msgId);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle Copy
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Handle Speech Recognition for voice input
  const handleToggleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim(), selectedCategory);
    setInput('');
  };

  // Formatter for markdown-like text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-2 text-sm leading-relaxed text-slate-800">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Bullet points
          if (trimmed.startsWith('•') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const cleanContent = trimmed.replace(/^[•\-\*]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-indigo-600 font-bold select-none">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineStyles(cleanContent) }} />
              </div>
            );
          }

          // Numbered lists
          const matchNum = trimmed.match(/^(\d+[\.\)])\s*(.*)/);
          if (matchNum) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1">
                <span className="text-indigo-600 font-semibold select-none min-w-[1.25rem]">
                  {matchNum[1]}
                </span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineStyles(matchNum[2]) }} />
              </div>
            );
          }

          // Bold title/header line
          if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2, -2).includes('**')) {
            return (
              <h4 key={idx} className="font-semibold text-slate-900 pt-1 text-[15px]">
                {trimmed.slice(2, -2)}
              </h4>
            );
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineStyles(trimmed) }} />
          );
        })}
      </div>
    );
  };

  const formatInlineStyles = (str: string) => {
    // Bold
    let formatted = str.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
    // Italics
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-slate-700">$1</em>');
    // Code/Pills
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 bg-slate-100 rounded text-indigo-700 font-mono text-xs">$1</code>');
    return formatted;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] min-h-[550px] max-w-5xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Category Filter Bar */}
      <div className="bg-slate-50/80 px-4 py-2.5 border-b border-slate-200 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1">
          Service Category:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/30">
        {/* Welcome Empty State */}
        {messages.length === 0 && (
          <div className="py-8 max-w-2xl mx-auto text-center space-y-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
              <Bot className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Ask CampusPulse about {college.name}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                Instant answers regarding registration, scholarships, dorm policies, meal plans, health services, and student life.
              </p>
            </div>

            {/* Quick Prompt Cards */}
            <div className="text-left space-y-2 pt-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
                Frequently Asked by Students:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {QUICK_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCategory(prompt.cat);
                      onSendMessage(prompt.text, prompt.cat);
                    }}
                    className="p-3 bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 rounded-xl text-left transition-all text-xs text-slate-800 flex items-start justify-between group shadow-xs"
                  >
                    <span className="font-medium group-hover:text-indigo-900 leading-snug">
                      {prompt.text}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 shrink-0 ml-2 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Message List */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 sm:gap-4 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {/* Bot Avatar */}
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] sm:max-w-2xl rounded-2xl p-4 transition-all shadow-xs ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-white border border-slate-200/90 rounded-tl-none'
              }`}
            >
              {/* Message Header */}
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 gap-4">
                <span className={`font-semibold ${msg.sender === 'user' ? 'text-indigo-100' : 'text-slate-900'}`}>
                  {msg.sender === 'user' ? 'You' : `${college.shortName} Assistant`}
                </span>
                <span className={msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'}>
                  {msg.timestamp}
                </span>
              </div>

              {/* Message Content */}
              {msg.sender === 'user' ? (
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              ) : (
                <div className="space-y-4">
                  {renderFormattedText(msg.text)}

                  {/* Connected Campus Department Card */}
                  {msg.department && (
                    <div className="mt-4 pt-3 border-t border-slate-100 bg-slate-50/70 -mx-4 -mb-4 p-3.5 rounded-b-2xl">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <Building className="w-3.5 h-3.5 text-indigo-600" />
                          Official Campus Contact
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 text-xs text-slate-700">
                        <div className="font-semibold text-slate-900 text-sm">
                          {msg.department.name}
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-slate-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {msg.department.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {msg.department.hours}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-y-1 gap-x-4 pt-1">
                          <a
                            href={`tel:${msg.department.phone.replace(/[^0-9]/g, '')}`}
                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            {msg.department.phone}
                          </a>
                          <a
                            href={`mailto:${msg.department.email}`}
                            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            {msg.department.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Suggested Follow-Ups */}
                  {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <HelpCircle className="w-3 h-3 text-indigo-500" />
                        Suggested Next Questions:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.suggestedFollowUps.map((question, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => onSendMessage(question, msg.category)}
                            className="text-xs px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors text-left font-medium border border-indigo-100"
                          >
                            {question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar for Bot Message */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-400 text-xs">
                    <span className="text-[11px] text-slate-400">
                      {msg.source === 'gemini' ? 'Generated by AI Assistant' : 'University Knowledge Base'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleSpeech(msg.id, msg.text)}
                        className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                          speakingId === msg.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'
                        }`}
                        title={speakingId === msg.id ? 'Stop audio' : 'Listen to answer'}
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        onClick={() => onBookmark(msg)}
                        className={`p-1.5 rounded-md hover:bg-slate-100 transition-colors ${
                          msg.isBookmarked ? 'text-indigo-600 bg-indigo-50' : 'text-slate-500'
                        }`}
                        title={msg.isBookmarked ? 'Saved to Notebook' : 'Save to Notebook'}
                      >
                        {msg.isBookmarked ? (
                          <BookmarkCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar */}
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 items-center text-slate-500 text-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-xs text-slate-500 ml-1">Consulting {college.shortName} services...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearChat}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask a question about ${selectedCategory === 'All' ? 'any campus service' : selectedCategory}...`}
              className="w-full bg-slate-100 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 pr-10 transition-colors"
              disabled={isLoading}
            />

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleToggleVoiceInput}
              className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${
                isListening ? 'text-rose-600 bg-rose-50 animate-pulse' : 'text-slate-400 hover:text-slate-700'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Speak question'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-medium text-sm flex items-center gap-1.5 transition-all shadow-sm shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
          <span>CampusPulse AI · Grounded in official college policies</span>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
