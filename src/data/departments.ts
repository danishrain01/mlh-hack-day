import { CampusDepartment } from '../types';

export const CAMPUS_DEPARTMENTS: CampusDepartment[] = [
  {
    id: 'dept-reg',
    name: 'Office of the University Registrar',
    category: 'Academics & Registrar',
    building: 'Student Services Hall',
    room: 'Room 210',
    phone: '(555) 839-2010',
    email: 'registrar@campus.edu',
    hours: 'Mon-Fri 8:00 AM - 4:30 PM',
    description: 'Handles class registration, official transcripts, graduation degree audits, diplomas, residency status, and enrollment verifications.',
    keyServices: [
      'Course Registration & Add/Drop',
      'Official Transcript Requests',
      'Graduation Application & Degree Audits',
      'Enrollment & Good Standing Verifications',
      'Name & Major Change Petitions'
    ],
    mapCoords: { x: 42, y: 35 }
  },
  {
    id: 'dept-finaid',
    name: 'Financial Aid & Scholarships Office',
    category: 'Financial Aid & Billing',
    building: 'Student Services Hall',
    room: 'Room 102',
    phone: '(555) 839-2040',
    email: 'finaid@campus.edu',
    hours: 'Mon-Fri 8:30 AM - 5:00 PM',
    description: 'Administers federal and state student financial aid, FAFSA verification, institutional merit scholarships, grants, and Federal Work-Study.',
    keyServices: [
      'FAFSA Processing & Verification',
      'Federal Direct Student Loans',
      'Merit & Need-Based Scholarships',
      'Satisfactory Academic Progress (SAP) Appeals',
      'Emergency Hardship Grants'
    ],
    mapCoords: { x: 42, y: 40 }
  },
  {
    id: 'dept-bursar',
    name: 'Office of the Bursar (Cashier)',
    category: 'Financial Aid & Billing',
    building: 'Student Services Hall',
    room: 'Room 105',
    phone: '(555) 839-2050',
    email: 'bursar@campus.edu',
    hours: 'Mon-Fri 8:30 AM - 4:30 PM',
    description: 'Manages student tuition billing statements, installment payment plans, 1098-T tax documents, and refund disbursements via direct deposit.',
    keyServices: [
      'Tuition Statements & Bill Payments',
      '5-Month Monthly Payment Plans',
      'Financial Aid Refund Disbursements',
      '1098-T Tax Forms',
      'Tuition Waiver Processing'
    ],
    mapCoords: { x: 44, y: 38 }
  },
  {
    id: 'dept-housing',
    name: 'Housing & Residence Life Central',
    category: 'Housing & Residence',
    building: 'Beacon Commons',
    room: 'Suite 100',
    phone: '(555) 839-3300',
    email: 'housing@campus.edu',
    hours: 'Mon-Fri 8:00 AM - 6:00 PM (RA 24/7)',
    emergencyContact: 'RA On-Call Duty Phone: (555) 839-3399',
    description: 'Oversees 14 residence halls, room assignments, roommate mediation, move-in/move-out logistics, and residential educational programming.',
    keyServices: [
      'Room Selection & Assignments',
      'Roommate Mediation & Transfer Requests',
      'Lockout Assistance & Key Replacement',
      'Work Order / Maintenance Dispatch',
      'Summer Housing Applications'
    ],
    mapCoords: { x: 25, y: 65 }
  },
  {
    id: 'dept-dining',
    name: 'Campus Dining Services & ID Card Center',
    category: 'Dining & Meal Plans',
    building: 'Student Union',
    room: 'Ground Floor',
    phone: '(555) 839-4450',
    email: 'dining@campus.edu',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    description: 'Manages meal plans, dining dollars, retail food venues, dietary allergen consultations, and official student ID card production.',
    keyServices: [
      'Student ID Card Issuance & Mobile ID',
      'Meal Plan Enrollment & Changes',
      'Dietary & Allergen Accommodations',
      'Campus Food Pantry Donations',
      'GET Mobile Dining Dollar Top-ups'
    ],
    mapCoords: { x: 55, y: 50 }
  },
  {
    id: 'dept-health',
    name: 'Student Health & Wellness Pavilion',
    category: 'Health & Counseling',
    building: 'Health Sciences Wing B',
    room: '1st Floor',
    phone: '(555) 839-CARE (2273)',
    email: 'healthcenter@campus.edu',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM, Sat 9:00 AM - 1:00 PM',
    emergencyContact: 'Nurse Advice Line (24/7): (555) 839-2274',
    description: 'Comprehensive student medical clinic providing primary outpatient care, urgent illness treatment, vaccinations, gynecology, and lab tests.',
    keyServices: [
      'Routine & Urgent Sick Visits',
      'Flu & COVID Vaccines, Routine Immunizations',
      'STI Testing & Sexual Health Services',
      'On-site Discounted Pharmacy',
      'Travel Medicine & Allergy Shots'
    ],
    mapCoords: { x: 75, y: 40 }
  },
  {
    id: 'dept-caps',
    name: 'Counseling & Psychological Services (CAPS)',
    category: 'Health & Counseling',
    building: 'Health Sciences Wing B',
    room: '3rd Floor',
    phone: '(555) 839-CARE (2273)',
    email: 'caps@campus.edu',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    emergencyContact: '24/7 Mental Health Crisis Line: (555) 839-TALK (8255)',
    description: 'Offers free, confidential short-term individual therapy, support groups, stress management workshops, and 24-hour crisis intervention.',
    keyServices: [
      '12 Free Individual Therapy Sessions / Year',
      'Daily Walk-In Triage Consultations',
      'Anxiety & Depression Support Groups',
      'Mindfulness & Stress Management',
      '24/7 Suicide Prevention Crisis Line'
    ],
    mapCoords: { x: 75, y: 35 }
  },
  {
    id: 'dept-police',
    name: 'Campus Police & Public Safety HQ',
    category: 'Transit & Parking',
    building: 'Public Safety Building',
    room: 'Main Desk',
    phone: 'Emergency: 911 | Non-Emergency: (555) 839-SAFE (7233)',
    email: 'publicsafety@campus.edu',
    hours: 'Open 24 Hours / 365 Days',
    emergencyContact: '911 (Direct to Campus Dispatch) or (555) 839-7233',
    description: 'Sworn law enforcement officers providing 24/7 campus patrolling, emergency response, SafeWalk night escorts, and crime prevention.',
    keyServices: [
      '24/7 Emergency Dispatch & Patrol',
      'SafeWalk Night Security Escorts',
      'Blue Light Call Box Monitoring',
      'Campus Lost & Found Central',
      'Bicycle & Electronics Registration'
    ],
    mapCoords: { x: 15, y: 25 }
  },
  {
    id: 'dept-library',
    name: 'William Knox Memorial Library & IT Hub',
    category: 'Library & Tech',
    building: 'Central Quadrangle',
    room: '1st Floor Atrium',
    phone: '(555) 839-5500',
    email: 'library@campus.edu',
    hours: '24/5 (Mon 7 AM - Fri 10 PM), Sat 9 AM-9 PM, Sun 10 AM-Open',
    description: 'Main academic research library featuring 5 floors of quiet study, reservable group collaboration rooms, 3D printing makerspace, and IT help.',
    keyServices: [
      'Private Group Study Room Bookings',
      'Semester $25 Free Wireless Printing',
      'Loaner Laptops & Equipment Checkout',
      'Research Subject Librarian Consultations',
      '24-Hour Card-Swipe Study Commons'
    ],
    mapCoords: { x: 50, y: 30 }
  },
  {
    id: 'dept-sab',
    name: 'Student Activities & Leadership Center',
    category: 'Student Life & Clubs',
    building: 'Student Union',
    room: 'Suite 210',
    phone: '(555) 839-LIFE (5433)',
    email: 'studentactivities@campus.edu',
    hours: 'Mon-Fri 8:30 AM - 5:00 PM',
    description: 'Hub for 250+ student organizations, Greek life, campus event programming (Homecoming, Springfest), and student government (SGA).',
    keyServices: [
      'New Student Organization Registration',
      'Student Involvement Fair',
      'Annual Club Funding Allocations',
      'Fraternity & Sorority Life (Greek Life)',
      'Leadership Retreats & Community Service'
    ],
    mapCoords: { x: 55, y: 55 }
  }
];
