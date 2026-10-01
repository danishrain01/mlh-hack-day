import { CollegePreset, CampusDeadline } from '../types';

export const COLLEGE_PRESETS: CollegePreset[] = [
  {
    id: 'apex-state',
    name: 'Apex State University',
    shortName: 'Apex State',
    type: 'Comprehensive Public Research University',
    mascot: 'Summit the Mountain Hawk',
    colors: {
      primary: '#1e3a8a', // Deep navy
      secondary: '#0284c7', // Sky blue
      accent: '#f59e0b', // Gold amber
    },
    studentBody: '28,500 Undergraduates & Graduates',
    semesterType: '15-Week Semester System',
    currentTerm: 'Fall 2026 Semester',
    tagline: 'Leading discovery, community, and academic excellence.',
  },
  {
    id: 'metro-tech',
    name: 'Metropolitan Polytechnic Institute',
    shortName: 'Metro Tech',
    type: 'Urban STEM & Engineering Institute',
    mascot: 'Byte the Cyber Lynx',
    colors: {
      primary: '#0f172a', // Slate obsidian
      secondary: '#059669', // Emerald tech
      accent: '#38bdf8', // Neon cyan
    },
    studentBody: '12,200 Students',
    semesterType: 'Trimester & Co-op Rotation',
    currentTerm: 'Fall 2026 Term',
    tagline: 'Engineering the next frontier of applied innovation.',
  },
  {
    id: 'fairview-college',
    name: 'Fairview Liberal Arts College',
    shortName: 'Fairview',
    type: 'Private Residential Liberal Arts College',
    mascot: 'Barnaby the Owl',
    colors: {
      primary: '#312e81', // Indigo plum
      secondary: '#9333ea', // Royal violet
      accent: '#e11d48', // Crimson rose
    },
    studentBody: '2,800 Undergraduates',
    semesterType: '4-1-4 Calendar with January Term',
    currentTerm: 'Fall 2026 Semester',
    tagline: 'Cultivating critical thinkers, artists, and global leaders.',
  }
];

export const CAMPUS_DEADLINES: CampusDeadline[] = [
  {
    id: 'dl-add-drop',
    title: 'Final Day for Course Add/Drop without "W"',
    category: 'Academics & Registrar',
    dateStr: 'September 11, 2026',
    relativeTime: 'In 3 business days',
    urgent: true,
    description: 'Last chance to adjust your schedule with 100% tuition refund. Minimum 12 credits required for full-time status.',
    actionUrlTitle: 'Go to Course Registration Portal'
  },
  {
    id: 'dl-payment-plan',
    title: 'Fall Semester Tuition Payment Plan Installment #2',
    category: 'Financial Aid & Billing',
    dateStr: 'September 15, 2026',
    relativeTime: 'Next week',
    urgent: true,
    description: 'Second scheduled installment for students enrolled in the 5-month payment plan to prevent course registration holds.',
    actionUrlTitle: 'View Bursar Statement'
  },
  {
    id: 'dl-room-change',
    title: 'Residence Hall Room Swap Window Opens',
    category: 'Housing & Residence',
    dateStr: 'September 21, 2026',
    relativeTime: 'Week 3 of Semester',
    urgent: false,
    description: 'Formal room change and mutual roommate transfer request period opens via Housing Portal.',
    actionUrlTitle: 'Open Housing Portal'
  },
  {
    id: 'dl-involvement',
    title: 'Annual Student Involvement & Club Fair',
    category: 'Student Life & Clubs',
    dateStr: 'September 23, 2026',
    relativeTime: 'Central Quad 11 AM - 3 PM',
    urgent: false,
    description: 'Explore 250+ student organizations, Greek chapters, athletic clubs, and community volunteer opportunities.',
    actionUrlTitle: 'Browse Club Directory'
  },
  {
    id: 'dl-midterm-withdraw',
    title: 'Course Withdrawal ("W" Grade) Final Deadline',
    category: 'Academics & Registrar',
    dateStr: 'October 30, 2026',
    relativeTime: 'End of 10th Week',
    urgent: false,
    description: 'Last day to withdraw from individual undergraduate courses with a non-punitive "W" grade.',
    actionUrlTitle: 'Registrar Policies'
  },
  {
    id: 'dl-fafsa-priority',
    title: 'Priority FAFSA & Institutional Scholarship Application',
    category: 'Financial Aid & Billing',
    dateStr: 'March 1, 2027',
    relativeTime: 'Next Academic Year',
    urgent: false,
    description: 'Submit your 2027-2028 FAFSA using Federal School Code #001234 to maximize institutional grant eligibility.',
    actionUrlTitle: 'FAFSA Portal'
  }
];
