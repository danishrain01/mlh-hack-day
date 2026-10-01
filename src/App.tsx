import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { FAQExplorer } from './components/FAQExplorer';
import { CampusDirectory } from './components/CampusDirectory';
import { DeadlinesWidget } from './components/DeadlinesWidget';
import { EmergencyModal } from './components/EmergencyModal';
import { SavedDrawer } from './components/SavedDrawer';
import { CategoryType, ChatMessage, CollegePreset } from './types';
import { COLLEGE_PRESETS } from './data/colleges';

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'bot',
  text: `Hello and welcome to **CampusPulse**! 🎓\n\nI am your 24/7 college student services assistant. Whether you have questions about **dropping a course**, understanding your **financial aid package**, **residence hall lockouts**, **meal swipe rollover rules**, or finding **free campus mental health counseling (CAPS)**, I am here to help.\n\nType your question below or click one of the suggested prompts to get started!`,
  timestamp: 'Just now',
  suggestedFollowUps: [
    'How do I drop a class without a W on my transcript?',
    'When is the priority FAFSA application deadline?',
    'How do meal swipes and dining dollars work?',
    'Where is the free walk-in student health clinic?'
  ],
  category: 'All',
  source: 'knowledge-base',
};

export default function App() {
  const [currentCollege, setCurrentCollege] = useState<CollegePreset>(COLLEGE_PRESETS[0]);
  const [activeTab, setActiveTab] = useState<'chat' | 'faq' | 'directory' | 'deadlines'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [savedMessages, setSavedMessages] = useState<ChatMessage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isSavedOpen, setIsSavedOpen] = useState<boolean>(false);

  // Load saved bookmarks from localStorage on startup
  useEffect(() => {
    try {
      const stored = localStorage.getItem('campuspulse_saved_notes');
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved notes:', e);
    }
  }, []);

  // Save bookmarks to localStorage
  const updateSavedMessages = (newSaved: ChatMessage[]) => {
    setSavedMessages(newSaved);
    try {
      localStorage.setItem('campuspulse_saved_notes', JSON.stringify(newSaved));
    } catch (e) {
      console.error('Failed to persist saved notes:', e);
    }
  };

  // Toggle bookmark on a message
  const handleBookmarkToggle = (msg: ChatMessage) => {
    const isAlreadySaved = savedMessages.some(m => m.id === msg.id);
    let updatedSaved: ChatMessage[];

    if (isAlreadySaved) {
      updatedSaved = savedMessages.filter(m => m.id !== msg.id);
    } else {
      updatedSaved = [...savedMessages, { ...msg, isBookmarked: true }];
    }

    updateSavedMessages(updatedSaved);

    // Update message state in current conversation
    setMessages(prev => prev.map(m => {
      if (m.id === msg.id) {
        return { ...m, isBookmarked: !isAlreadySaved };
      }
      return m;
    }));
  };

  const handleRemoveBookmark = (id: string) => {
    const updated = savedMessages.filter(m => m.id !== id);
    updateSavedMessages(updated);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, isBookmarked: false } : m));
  };

  const handleClearAllSaved = () => {
    updateSavedMessages([]);
    setMessages(prev => prev.map(m => ({ ...m, isBookmarked: false })));
  };

  // Send message to server backend API
  const handleSendMessage = async (text: string, categoryOverride?: CategoryType) => {
    const activeCategory = categoryOverride || selectedCategory;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      category: activeCategory,
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-6),
          college: currentCollege,
          category: activeCategory,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Here is the relevant campus guidance.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: data.suggestedFollowUps || [],
        department: data.relevantDepartment,
        category: activeCategory,
        source: data.source || 'gemini',
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      // Fallback response for resilience
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: `**Guidance for ${currentCollege.name}**\n\nFor official inquiries regarding this topic, please visit the **One-Stop Student Services Center** in the Student Services Building or call **(555) 839-2000** during business hours (Mon-Fri 8:00 AM - 5:00 PM).\n\nYou can also browse the **Verified FAQs** tab in the navigation bar for detailed policy sheets.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'What are the Registrar office hours?',
          'How do I contact Financial Aid?',
          'What are the campus emergency phone numbers?'
        ],
        department: {
          name: 'One-Stop Student Central',
          location: 'Student Services Building, Atrium',
          hours: 'Mon-Fri 8:00 AM - 5:00 PM',
          phone: '(555) 839-2000',
          email: 'studenthelp@campus.edu'
        },
        category: activeCategory,
        source: 'knowledge-base',
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigation helpers to switch to Chat with specific inquiry
  const handleAskQuestionInChat = (questionText: string, category: CategoryType) => {
    setSelectedCategory(category);
    setActiveTab('chat');
    handleSendMessage(questionText, category);
  };

  const handleClearChat = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/60 font-sans text-slate-900">
      {/* Top Main Navigation Header */}
      <Header
        currentCollege={currentCollege}
        onSelectCollege={(college) => {
          setCurrentCollege(college);
          setMessages([
            {
              ...INITIAL_WELCOME_MESSAGE,
              text: `Switched campus profile to **${college.name}**! 🎓\n\nHow can I help you with courses, financial aid, housing, or activities at ${college.shortName}?`,
            }
          ]);
        }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedMessages.length}
        onOpenSaved={() => setIsSavedOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'chat' && (
          <ChatInterface
            college={currentCollege}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onBookmark={handleBookmarkToggle}
            onClearChat={handleClearChat}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'faq' && (
          <FAQExplorer
            onAskBot={handleAskQuestionInChat}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}

        {activeTab === 'directory' && (
          <CampusDirectory
            onAskAboutDept={(deptName, category) => 
              handleAskQuestionInChat(`What services and office hours are available at the ${deptName}?`, category)
            }
          />
        )}

        {activeTab === 'deadlines' && (
          <DeadlinesWidget
            onAskAboutDeadline={(title, category) =>
              handleAskQuestionInChat(`What do I need to know about the upcoming deadline: "${title}"?`, category)
            }
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div>
            <strong className="text-slate-700">CampusPulse FAQ Bot</strong> · Official Student Services & Academic Affairs Assistant
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Gemini 3.8 Flash</span>
            <span>·</span>
            <span>24/7 Student Support</span>
          </div>
        </div>
      </footer>

      {/* Emergency & Crisis Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        college={currentCollege}
      />

      {/* Saved Answers Notebook Drawer */}
      <SavedDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedMessages={savedMessages}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllSaved}
        onJumpToChat={(prompt) => handleAskQuestionInChat(`Tell me more about: ${prompt}`, selectedCategory)}
      />
    </div>
  );
}
