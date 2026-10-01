import { FAQItem } from '../types';

export const FAQ_DATA: FAQItem[] = [
  // 1. Academics & Registrar
  {
    id: 'faq-acad-1',
    category: 'Academics & Registrar',
    question: 'How do I drop a class without receiving a "W" (Withdrawal) on my transcript?',
    answer: 'You can add, drop, or swap courses with zero academic penalty and 100% tuition adjustment during the official Add/Drop period, which runs through 11:59 PM on the 10th business day of the semester. After this deadline, dropping a course requires an academic withdrawal, which places a non-punitive "W" on your transcript and does not refund tuition.',
    keyTakeaways: [
      'Add/Drop deadline: 10th business day of term',
      'No record appears on official transcript if dropped before deadline',
      'Process completely online via Student Portal > Registration',
      'Maintain at least 12 credits to preserve full-time financial aid'
    ],
    department: {
      name: 'Office of the University Registrar',
      location: 'Student Services Hall, Room 210',
      hours: 'Mon-Fri 8:00 AM - 4:30 PM',
      phone: '(555) 839-2010',
      email: 'registrar@campus.edu'
    },
    popular: true,
    tags: ['drop class', 'withdrawal', 'w grade', 'registration', 'deadline', 'transcript']
  },
  {
    id: 'faq-acad-2',
    category: 'Academics & Registrar',
    question: 'How do I order official electronic or printed transcripts?',
    answer: 'Official transcripts can be ordered 24/7 online via the National Student Clearinghouse or Parchment integrated in your Student Portal. Certified electronic PDFs are typically delivered to recipient institutions within 15–30 minutes for a $5 processing fee. Paper hard copies with the university registrar seal can be mailed or picked up in person.',
    keyTakeaways: [
      'Order 24/7 through Student Portal > Transcripts & Records',
      'Electronic PDFs deliver within 30 minutes ($5 fee)',
      'Unofficial transcripts are free to view and print anytime in portal',
      'Ensure you have no outstanding financial or library holds before ordering'
    ],
    department: {
      name: 'Office of the University Registrar',
      location: 'Student Services Hall, Room 210',
      hours: 'Mon-Fri 8:00 AM - 4:30 PM',
      phone: '(555) 839-2010',
      email: 'transcripts@campus.edu'
    },
    popular: false,
    tags: ['transcripts', 'official record', 'parchment', 'grades', 'clearinghouse']
  },
  {
    id: 'faq-acad-3',
    category: 'Academics & Registrar',
    question: 'How does grade forgiveness and repeating a failed class work?',
    answer: 'Undergraduate students may repeat up to three courses (maximum 12 semester credits) where a grade of D, F, or NC was initially earned. Once repeated, the higher grade is calculated into your cumulative GPA, though the original attempt and grade will still remain visible on the official transcript with an "R" (Repeat) notation.',
    keyTakeaways: [
      'Maximum 3 courses (up to 12 credit hours) eligible for forgiveness',
      'The new grade replaces the prior grade in cumulative GPA calculation',
      'Both course attempts remain visible on official transcripts',
      'Must file a Course Repeat Petition with your academic advisor'
    ],
    department: {
      name: 'Academic Advising & Success Center',
      location: 'William Knox Hall, 2nd Floor',
      hours: 'Mon-Fri 9:00 AM - 5:00 PM',
      phone: '(555) 839-2022',
      email: 'advising@campus.edu'
    },
    popular: true,
    tags: ['grade forgiveness', 'retake class', 'repeat course', 'gpa', 'academic probation']
  },

  // 2. Financial Aid & Billing
  {
    id: 'faq-finaid-1',
    category: 'Financial Aid & Billing',
    question: 'When is the FAFSA deadline and what is our federal school code?',
    answer: 'The FAFSA (Free Application for Federal Student Aid) opens annually in the Fall. Our university institutional priority filing deadline is March 1st for the upcoming academic year. Submitting by March 1st ensures maximum eligibility for university grants and state assistance. Our Federal School Code is 001234.',
    keyTakeaways: [
      'Federal School Code: 001234',
      'Institutional Priority Deadline: March 1st',
      'Check your Student Portal "To-Do List" for verification forms',
      'Renewal is required every academic year'
    ],
    department: {
      name: 'Office of Financial Aid & Scholarships',
      location: 'Student Services Hall, Room 102',
      hours: 'Mon-Fri 8:30 AM - 5:00 PM',
      phone: '(555) 839-2040',
      email: 'finaid@campus.edu'
    },
    popular: true,
    tags: ['fafsa', 'school code', 'financial aid', 'grants', 'scholarships', 'deadline']
  },
  {
    id: 'faq-finaid-2',
    category: 'Financial Aid & Billing',
    question: 'Can I set up a monthly payment plan for tuition and fees?',
    answer: 'Yes! The Bursar Office offers an interest-free Semester Payment Plan. You can spread your remaining tuition and housing balance across 5 equal monthly installments in Fall (July-Nov) and Spring (Dec-April). There is a one-time $35 enrollment fee per semester, with automatic ACH bank draft or debit/credit card scheduling.',
    keyTakeaways: [
      'Interest-free 5-month or 4-month installment options',
      'Enrolls through CashNet / Touchnet portal via Student Portal',
      'Low $35 setup fee per term; avoids late payment holds',
      'Payments auto-deducted on the 1st or 15th of each month'
    ],
    department: {
      name: 'Office of the Bursar / Cashier',
      location: 'Student Services Hall, Room 105',
      hours: 'Mon-Fri 8:30 AM - 4:30 PM',
      phone: '(555) 839-2050',
      email: 'bursar@campus.edu'
    },
    popular: true,
    tags: ['payment plan', 'tuition', 'bursar', 'installments', 'billing', 'cashier']
  },
  {
    id: 'faq-finaid-3',
    category: 'Financial Aid & Billing',
    question: 'How do Federal Work-Study (FWS) jobs work and how do I get hired?',
    answer: 'Federal Work-Study is awarded as part of your financial aid package based on financial need. If awarded, you earn this money through a bi-weekly paycheck by working an on-campus or approved community service job (typically 10-15 hours per week). FWS funds are NOT directly deducted from your tuition bill.',
    keyTakeaways: [
      'Earnings are paid directly to you bi-weekly via direct deposit',
      'Search and apply for student jobs on the Handshake career portal',
      'Typical wage: $15.50 - $18.00 per hour; max 20 hours/week during classes',
      'FWS earnings are excluded from income calculations on future FAFSA forms'
    ],
    department: {
      name: 'Student Employment & Career Center',
      location: 'Student Union, Room 320',
      hours: 'Mon-Fri 9:00 AM - 5:00 PM',
      phone: '(555) 839-2080',
      email: 'studentjobs@campus.edu'
    },
    popular: false,
    tags: ['work study', 'fws', 'campus jobs', 'handshake', 'student employment']
  },

  // 3. Housing & Residence Life
  {
    id: 'faq-house-1',
    category: 'Housing & Residence',
    question: 'What do I do if I am locked out of my dorm room after hours?',
    answer: 'If you are locked out between 8:00 AM and 5:00 PM on weekdays, visit your hall front desk. After 5:00 PM, on weekends, or holidays, call your Residence Hall RA On-Call duty phone (posted on every floor bulletin board and entrance door). Every student receives 2 complimentary lockouts per term; subsequent lockouts incur a $15 fee billed to your student account.',
    keyTakeaways: [
      'Call the posted RA On-Call number for your specific building',
      'First 2 lockouts each semester are free; $15 fee thereafter',
      'Must present university student ID or government photo ID for entry',
      'Lost keys must be reported immediately ($75 core change fee for security)'
    ],
    department: {
      name: 'Housing & Residence Life Operations',
      location: 'Beacon Commons, Suite 100',
      hours: 'Mon-Fri 8:00 AM - 6:00 PM (RA Duty 24/7)',
      phone: '(555) 839-3300',
      email: 'housing@campus.edu'
    },
    popular: true,
    tags: ['lockout', 'dorm keys', 'lost key', 'ra on call', 'residence life']
  },
  {
    id: 'faq-house-2',
    category: 'Housing & Residence',
    question: 'What items and appliances are prohibited in residence hall dorm rooms?',
    answer: 'For fire safety regulations, prohibited items include: hot plates, portable air conditioners, space heaters, halogen lamps, candles or incense, deep fryers, toaster ovens with open heating elements, and hoverboards/e-scooters inside dorms. Permitted items include: UL-approved microwave (under 1000W), mini-fridge (under 4.5 cubic ft), Keurig/sealed coffee makers with auto-shutoff, and surge protectors.',
    keyTakeaways: [
      'Prohibited: Open flames, candles, incense, space heaters, toaster ovens',
      'Permitted: Mini-fridges (<4.5 cu ft), microwaves (<1000W), auto-off coffee makers',
      'MicroFridge rental packages available for delivery prior to move-in',
      'Surge-protected power strips required (no simple extension cords)'
    ],
    department: {
      name: 'Housing & Residence Life Operations',
      location: 'Beacon Commons, Suite 100',
      hours: 'Mon-Fri 8:00 AM - 6:00 PM',
      phone: '(555) 839-3300',
      email: 'housing@campus.edu'
    },
    popular: true,
    tags: ['dorm rules', 'prohibited items', 'appliances', 'microwave', 'fire safety']
  },
  {
    id: 'faq-house-3',
    category: 'Housing & Residence',
    question: 'How do I request a dorm room change or roommate swap?',
    answer: 'The official Room Change Request period opens at 9:00 AM on the third Monday of each semester (after census enrollment stabilizes). Students first participate in a facilitated mediation meeting with their Resident Advisor (RA). If a room swap is warranted, submit a Room Transfer Request through the Housing Portal, where open vacancies and mutual swap options will be displayed.',
    keyTakeaways: [
      'Room change window opens week 3 of each semester',
      'Initial discussion with Resident Advisor (RA) is required first',
      'Direct mutual swaps between willing students are processed fastest',
      'No room change fee is charged during the official 2-week transfer window'
    ],
    department: {
      name: 'Housing Assignment Office',
      location: 'Beacon Commons, Suite 100',
      hours: 'Mon-Fri 8:30 AM - 5:00 PM',
      phone: '(555) 839-3310',
      email: 'roomchange@campus.edu'
    },
    popular: false,
    tags: ['room change', 'roommate', 'dorm transfer', 'swap rooms', 'housing portal']
  },

  // 4. Dining & Meal Plans
  {
    id: 'faq-din-1',
    category: 'Dining & Meal Plans',
    question: 'Do unused meal swipes or dining dollars roll over to the next semester?',
    answer: 'Dining Dollars roll over from Fall semester to Spring semester provided you remain enrolled and maintain an active Spring meal plan. However, all Dining Dollars expire at the end of the Spring academic year in May. Weekly Meal Swipes reset every Sunday at 11:59 PM and do not roll over from week to week.',
    keyTakeaways: [
      'Dining Dollars roll over from Fall to Spring (expire in May)',
      'Weekly Meal Swipes reset every Sunday at midnight (no rollover)',
      'Unused swipes at semester end can be donated to the Campus Food Pantry',
      'Check current balances anytime on the GET Mobile app or Campus ID portal'
    ],
    department: {
      name: 'Campus Dining Services & ID Center',
      location: 'Student Union, Ground Floor',
      hours: 'Mon-Fri 8:00 AM - 5:00 PM',
      phone: '(555) 839-4450',
      email: 'dining@campus.edu'
    },
    popular: true,
    tags: ['meal swipes', 'dining dollars', 'rollover', 'meal plan', 'food pantry']
  },
  {
    id: 'faq-din-2',
    category: 'Dining & Meal Plans',
    question: 'What options exist for students with Halal, Kosher, Vegan, or severe food allergies?',
    answer: 'Both main residential dining halls feature dedicated "Pure Zone" stations free of the top 9 food allergens and gluten. In addition, North Dining Commons houses a certified Halal hot kitchen serving lunch and dinner daily, and Kosher Grab-and-Go meals are prepared daily in partnership with the campus Hillel Center. Registered dietitians are available for free 1-on-1 consultations.',
    keyTakeaways: [
      'Pure Zone station in every dining hall (allergen & gluten-free)',
      'Daily Halal hot entrees at North Dining Commons',
      'Daily Kosher certified selections at Student Union and North Dining',
      'Free 1-on-1 student consultations with the Campus Registered Dietitian'
    ],
    department: {
      name: 'Dining Nutrition & Dietary Accommodations',
      location: 'Student Union, Room 112',
      hours: 'Mon-Fri 9:00 AM - 4:00 PM',
      phone: '(555) 839-4460',
      email: 'nutritionist@campus.edu'
    },
    popular: false,
    tags: ['halal', 'kosher', 'vegan', 'allergies', 'gluten free', 'dietitian']
  },

  // 5. Health & Counseling
  {
    id: 'faq-hlth-1',
    category: 'Health & Counseling',
    question: 'Is mental health counseling (CAPS) free, and how do I schedule an appointment?',
    answer: 'Yes! All registered undergraduate and graduate students are entitled to up to 12 free individual counseling sessions per academic year through CAPS (Counseling and Psychological Services), funded by your student health fee. Same-day triage consultations are available Monday through Friday from 9:00 AM to 4:00 PM for urgent needs.',
    keyTakeaways: [
      '12 free individual therapy sessions per year for all students',
      'Free unlimited group therapy, workshops, and mindfulness sessions',
      'Walk-in triage hours: Mon-Fri 9:00 AM - 4:00 PM',
      '24/7 Crisis Hotline: (555) 839-TALK (8255) or text HOME to 741741'
    ],
    department: {
      name: 'Counseling and Psychological Services (CAPS)',
      location: 'Health Sciences Wing B, 3rd Floor',
      hours: 'Mon-Fri 8:00 AM - 5:00 PM (24/7 Crisis Line)',
      phone: '(555) 839-CARE (2273)',
      email: 'caps@campus.edu'
    },
    popular: true,
    tags: ['counseling', 'caps', 'therapy', 'mental health', 'stress', 'crisis hotline']
  },
  {
    id: 'faq-hlth-2',
    category: 'Health & Counseling',
    question: 'How do I visit the Student Health Clinic for sickness, prescriptions, or immunizations?',
    answer: 'The Student Health Center provides primary outpatient medical care, sick visits, STI testing, lab work, routine vaccinations, and prescription refills. Office visits with medical doctors and nurse practitioners have zero copay for students. Appointments can be scheduled online via the Patient Portal or by phone.',
    keyTakeaways: [
      'No visit copay for enrolled students; minor charges for meds and lab panels',
      'Book online via Patient Portal or call (555) 839-CARE',
      'On-site pharmacy with discounted over-the-counter and prescription meds',
      'Annual flu shots and COVID boosters provided free during campus clinics'
    ],
    department: {
      name: 'Student Health & Wellness Pavilion',
      location: 'Health Sciences Wing B, 1st Floor',
      hours: 'Mon-Fri 8:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM',
      phone: '(555) 839-CARE (2273)',
      email: 'healthcenter@campus.edu'
    },
    popular: true,
    tags: ['health center', 'doctor', 'sick visit', 'flu shot', 'prescriptions', 'pharmacy']
  },

  // 6. Transit & Parking
  {
    id: 'faq-tran-1',
    category: 'Transit & Parking',
    question: 'Can freshmen have cars on campus, and how do commuter parking permits work?',
    answer: 'First-year residential students living in on-campus dorms are generally restricted from purchasing parking permits, except in cases of verified off-campus employment or recurring medical appointments. Commuter students may purchase semester or annual permits online via the Parking Portal starting August 1st.',
    keyTakeaways: [
      'Freshman residential parking restricted (exceptions for work/medical)',
      'Commuter permits: $180/semester for General Commuter Surface Lots',
      'Daily park-and-pay mobile app (ParkMobile) available in visitor garages',
      'Free evening parking in designated faculty/staff lots after 5:00 PM'
    ],
    department: {
      name: 'Parking & Transportation Services',
      location: 'Public Safety Building, 1st Floor',
      hours: 'Mon-Fri 7:30 AM - 5:00 PM',
      phone: '(555) 839-PARK (7275)',
      email: 'parking@campus.edu'
    },
    popular: true,
    tags: ['parking permit', 'commuter', 'freshman car', 'parking tickets', 'parkmobile']
  },
  {
    id: 'faq-tran-2',
    category: 'Transit & Parking',
    question: 'Where can I track campus shuttles and how do I request a SafeWalk escort at night?',
    answer: 'Campus shuttles run continuous loops connecting residential halls, commuter lots, and academic quads every 8–12 minutes from 7:00 AM to 11:00 PM. Track buses in real-time on the TransLoc mobile app. Between 8:00 PM and 3:00 AM, the free SafeWalk security escort service will walk or drive you safely to any building or parked car on campus.',
    keyTakeaways: [
      'Track buses live on TransLoc / RideSystems mobile app',
      'Day shuttles run every 8-12 minutes across 3 main campus routes',
      'SafeWalk escorts available 8:00 PM - 3:00 AM daily',
      'Call (555) 839-SAFE or press the blue button on any Blue Light call box'
    ],
    department: {
      name: 'Campus Police & Public Safety SafeWalk',
      location: 'Public Safety Building',
      hours: 'SafeWalk: Daily 8:00 PM - 3:00 AM',
      phone: '(555) 839-SAFE (7233)',
      email: 'safewalk@campus.edu'
    },
    popular: true,
    tags: ['shuttle', 'bus tracker', 'safewalk', 'night escort', 'safety', 'blue light']
  },

  // 7. Library & Tech
  {
    id: 'faq-lib-1',
    category: 'Library & Tech',
    question: 'How do I reserve private group study rooms and access 24-hour study spaces?',
    answer: 'Students can reserve private study rooms equipped with 4K display monitors and whiteboards up to 7 days in advance via the Library Space Reservation Portal for 2-hour blocks. The 1st and 2nd floors of the William Knox Memorial Library are open 24 hours Monday through Friday with student card swipe access after 10:00 PM.',
    keyTakeaways: [
      'Reserve rooms up to 7 days ahead via online library booking portal',
      'Max 2 hours per session; extendable if no subsequent reservations',
      '24-hour study spaces on Floors 1 & 2 (swipe student ID card after 10 PM)',
      'Laptops, phone chargers, and dry-erase markers available for loan at desk'
    ],
    department: {
      name: 'University Memorial Library',
      location: 'Central Quadrangle',
      hours: 'Open 24/5 (Mon 7 AM - Fri 10 PM), Sat 9 AM-9 PM, Sun 10 AM-Open',
      phone: '(555) 839-5500',
      email: 'library@campus.edu'
    },
    popular: true,
    tags: ['library', 'study room', 'reservation', '24 hours', 'whiteboard', 'quiet floor']
  },
  {
    id: 'faq-lib-2',
    category: 'Library & Tech',
    question: 'How much free student printing do I get and how do I print from my laptop?',
    answer: 'Every registered student receives a complimentary $25 printing balance (equivalent to 500 black-and-white pages or 100 color pages) loaded onto their student account each semester. You can print wirelessly from your personal phone or laptop via the WebPrint portal (print.campus.edu) and release your job at any of the 45 Pharos print stations on campus.',
    keyTakeaways: [
      '$25 free credit (500 B&W pages) granted automatically each term',
      'Upload PDFs wirelessly via print.campus.edu WebPrint portal',
      'Tap your student ID card at any campus printer to release print jobs',
      'Unused quota does not carry over to summer sessions'
    ],
    department: {
      name: 'Campus Information Technology (IT Help Desk)',
      location: 'William Knox Library, Room 110',
      hours: 'Mon-Thu 7:30 AM - 9:00 PM, Fri 7:30 AM - 5:00 PM',
      phone: '(555) 839-HELP (4357)',
      email: 'ithelpdesk@campus.edu'
    },
    popular: true,
    tags: ['printing', 'webprint', 'free prints', 'quota', 'it help desk', 'wireless printing']
  },

  // 8. Student Life & Clubs
  {
    id: 'faq-life-1',
    category: 'Student Life & Clubs',
    question: 'How do I start a new registered student organization (RSO) or club?',
    answer: 'Starting a new student club is simple! You only need: 1) A minimum of 5 enrolled student members, 2) One full-time faculty or staff advisor, and 3) A draft constitution outlining club purpose and officer duties. New organization applications are submitted via CampusGroups during the Fall or Spring registration windows.',
    keyTakeaways: [
      'Minimum requirement: 5 active student members + 1 faculty advisor',
      'Submit constitution and charter application via CampusGroups',
      'Registered clubs receive access to annual SAB activity grant funding ($500-$3,000)',
      'Free room reservations in the Student Union and tabling on the Quad'
    ],
    department: {
      name: 'Student Activities & Leadership Center',
      location: 'Student Union, Suite 210',
      hours: 'Mon-Fri 8:30 AM - 5:00 PM',
      phone: '(555) 839-LIFE (5433)',
      email: 'studentactivities@campus.edu'
    },
    popular: true,
    tags: ['clubs', 'rso', 'start a club', 'student organizations', 'campus life', 'funding']
  },
  {
    id: 'faq-life-2',
    category: 'Student Life & Clubs',
    question: 'What are the recreation center hours and are fitness classes free?',
    answer: 'The Apex Recreation & Aquatic Center is open daily from 6:00 AM to 11:00 PM (8:00 AM to 9:00 PM on weekends). Entry is completely free with your active student ID card. All group fitness classes (including Yoga, HIIT, Spin, Pilates, and Zumba) are free to enrolled students with prior online reservation.',
    keyTakeaways: [
      'Hours: Mon-Fri 6:00 AM - 11:00 PM, Weekends 8:00 AM - 9:00 PM',
      'Access included automatically with student athletic fee',
      'Free group fitness classes (Yoga, Spin, HIIT) bookable on the Rec App',
      'Features indoor 200m track, 40-foot rock climbing wall, and Olympic pool'
    ],
    department: {
      name: 'Campus Recreation & Wellness Center',
      location: 'Recreation Complex, North Campus',
      hours: 'Mon-Fri 6:00 AM - 11:00 PM, Sat-Sun 8:00 AM - 9:00 PM',
      phone: '(555) 839-FITT (3488)',
      email: 'recreation@campus.edu'
    },
    popular: false,
    tags: ['gym', 'recreation', 'rec center', 'fitness classes', 'rock wall', 'pool']
  }
];
