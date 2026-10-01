export type CategoryType = 
  | 'All'
  | 'Academics & Registrar'
  | 'Financial Aid & Billing'
  | 'Housing & Residence'
  | 'Dining & Meal Plans'
  | 'Health & Counseling'
  | 'Transit & Parking'
  | 'Library & Tech'
  | 'Student Life & Clubs';

export interface DepartmentInfo {
  name: string;
  location: string;
  hours: string;
  phone: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
  department?: DepartmentInfo;
  isBookmarked?: boolean;
  category?: CategoryType;
  source?: 'gemini' | 'knowledge-base';
}

export interface FAQItem {
  id: string;
  category: CategoryType;
  question: string;
  answer: string;
  keyTakeaways: string[];
  department: DepartmentInfo;
  popular?: boolean;
  tags: string[];
}

export interface CampusDepartment {
  id: string;
  name: string;
  category: CategoryType;
  building: string;
  room: string;
  phone: string;
  email: string;
  hours: string;
  emergencyContact?: string;
  description: string;
  keyServices: string[];
  mapCoords: { x: number; y: number }; // percentage coordinates for campus map visual
}

export interface CollegePreset {
  id: string;
  name: string;
  shortName: string;
  type: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  studentBody: string;
  semesterType: string;
  currentTerm: string;
  tagline: string;
}

export interface CampusDeadline {
  id: string;
  title: string;
  category: CategoryType;
  dateStr: string;
  relativeTime: string;
  urgent: boolean;
  description: string;
  actionUrlTitle?: string;
}
