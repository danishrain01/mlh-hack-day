import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with required User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// System instruction for the College FAQ Bot
const getSystemInstruction = (collegeName?: string, collegeType?: string) => `
You are CampusPulse AI, an intelligent, empathetic, and comprehensive collegiate student services and campus life assistant for ${collegeName || 'Apex State University'} (${collegeType || 'Comprehensive University'}).
Your mission is to guide undergraduate and graduate students through common questions regarding:
1. Academic Services & Registrar (Course registration, add/drop deadlines, grade forgiveness, academic transcripts, degree audits, advising).
2. Financial Aid & Billing (FAFSA verification, scholarships, Federal Work-Study, payment installment plans, tuition deadlines, 1098-T).
3. Student Housing & Residence Life (Dorm move-in/out, RA on-call assistance, room change requests, maintenance tickets, quiet hours).
4. Dining & Meal Plans (Dining hall hours, meal swipe vs dining dollars rollover rules, dietary accommodations for Halal/Kosher/Vegan/allergies).
5. Health, Counseling & Wellness (Student health clinic walk-ins, CAPS mental health therapy, 24/7 crisis support, recreation center classes).
6. Campus Transportation & Parking (Commuter permits, night shuttle routes, SafeWalk security escorts, bike sharing).
7. Library, Technology & Study Spaces (24-hour study rooms, laptop loans, free student printing quota, Wi-Fi eduroam setup, software licenses).
8. Student Life, Clubs & Campus Activities (Involvement fair, how to start a student club, Greek life, campus traditions, volunteering).

Tone and Guidelines:
- Be warm, encouraging, practical, and direct. Break down confusing bureaucratic college jargon into clear, actionable bullet points or step-by-step instructions.
- Provide the exact office name to visit or contact (e.g. "Office of the Registrar", "One-Stop Student Services", "Financial Aid Center").
- When relevant, mention key deadlines, documentation needed, or links/portals (e.g. Student Portal, Canvas/Blackboard, DegreeWorks, Handshake).
- Avoid generic filler. Be specific and tailored to the college context.
- Always provide 3 helpful, natural follow-up questions students might want to ask next.
`;

// Chat API Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history, college, category } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const collegeName = college?.name || 'Apex State University';
    const collegeType = college?.type || 'Public Research University';

    // If Gemini API is available, generate dynamic response
    if (ai) {
      try {
        const systemInstruction = getSystemInstruction(collegeName, collegeType);

        // Build conversation turns - Ensure it begins with user and alternates properly
        const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
        
        if (Array.isArray(history)) {
          // Filter to only include history after the first user message
          let firstUserFound = false;
          for (const item of history.slice(-6)) {
            if (item.sender === 'user') {
              firstUserFound = true;
              contents.push({ role: 'user', parts: [{ text: item.text }] });
            } else if (item.sender === 'bot' && firstUserFound) {
              // Ensure we don't put two consecutive model turns
              if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
                contents.push({ role: 'model', parts: [{ text: item.text }] });
              }
            }
          }
        }

        // Add current user prompt
        const promptContext = category && category !== 'All' 
          ? `[Context Category: ${category}] ${message}` 
          : message;
          
        contents.push({
          role: 'user',
          parts: [{ text: promptContext }],
        });

        // Call Gemini with timeout protection
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Gemini API call timed out')), 12000)
        );

        const geminiPromise = ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.95,
          },
        });

        const response = await Promise.race([geminiPromise, timeoutPromise]);

        const replyText = response.text || 'I am here to help with your college questions! Please ask about registrar, financial aid, housing, dining, or campus activities.';

        // Generate suggested follow-ups
        const followUps = generateSmartFollowUps(message, category);
        const relevantDepartment = determineRelevantDepartment(message, category);

        return res.json({
          reply: replyText,
          suggestedFollowUps: followUps,
          relevantDepartment,
          source: 'gemini',
        });
      } catch (geminiError: any) {
        console.error('Gemini API call failed, using knowledge fallback:', geminiError?.message || geminiError);
        // Fall back gracefully to structured knowledge response
        const fallback = getKnowledgeFallback(message, category, collegeName);
        return res.json(fallback);
      }
    } else {
      // Fallback when no API key is set
      const fallback = getKnowledgeFallback(message, category, collegeName);
      return res.json(fallback);
    }
  } catch (error: any) {
    console.error('Error handling chat:', error);
    return res.status(500).json({ 
      error: 'An error occurred while generating a response. Please try again.',
      details: error.message 
    });
  }
});

// Helper for contextual follow-up questions
function generateSmartFollowUps(query: string, category?: string): string[] {
  const lower = query.toLowerCase();
  
  if (lower.includes('aid') || lower.includes('fafsa') || lower.includes('scholarship') || lower.includes('tuition')) {
    return [
      'What are the priority deadlines for FAFSA and scholarships?',
      'How do I apply for campus Federal Work-Study jobs?',
      'Can I set up a monthly tuition payment plan?',
    ];
  }
  if (lower.includes('drop') || lower.includes('add') || lower.includes('transcript') || lower.includes('advis')) {
    return [
      'What is the deadline to drop a class without a W on my transcript?',
      'How do I schedule an appointment with my academic advisor?',
      'Where can I download my official and unofficial transcripts?',
    ];
  }
  if (lower.includes('dorm') || lower.includes('hous') || lower.includes('room') || lower.includes('ra')) {
    return [
      'What is the procedure for requesting a room change or roommate swap?',
      'What appliances and items are prohibited in the residence halls?',
      'Who do I call if I am locked out of my dorm room after hours?',
    ];
  }
  if (lower.includes('meal') || lower.includes('food') || lower.includes('din') || lower.includes('swipe')) {
    return [
      'Do unused meal swipes or dining dollars roll over to next semester?',
      'What dining halls cater to vegan, Halal, or allergen-free diets?',
      'Can I change my meal plan after the semester starts?',
    ];
  }
  if (lower.includes('health') || lower.includes('counsel') || lower.includes('therapy') || lower.includes('caps') || lower.includes('doctor')) {
    return [
      'Is mental health counseling (CAPS) free for enrolled students?',
      'How do I book a same-day walk-in appointment at the Health Center?',
      'What emergency crisis resources are available 24/7 on campus?',
    ];
  }
  if (lower.includes('park') || lower.includes('shuttle') || lower.includes('bus') || lower.includes('car')) {
    return [
      'How much does a student commuter parking permit cost?',
      'Where can I track the live campus shuttle bus routes?',
      'Is there a free night escort service (SafeWalk) after dark?',
    ];
  }
  if (lower.includes('club') || lower.includes('activit') || lower.includes('involve') || lower.includes('gym') || lower.includes('rec')) {
    return [
      'How do I start a new registered student organization (RSO)?',
      'When is the Student Involvement & Organization Fair?',
      'What group fitness classes and intramural sports are offered?',
    ];
  }

  return [
    'What are the most critical academic dates this semester?',
    'Where is the One-Stop Student Services Center located?',
    'How do I access free printing on campus?',
  ];
}

// Helper to determine the best contact department
function determineRelevantDepartment(query: string, category?: string) {
  const lower = (query + ' ' + (category || '')).toLowerCase();

  if (lower.includes('aid') || lower.includes('fafsa') || lower.includes('scholarship') || lower.includes('bursar') || lower.includes('tuition')) {
    return {
      name: 'Office of Financial Aid & Scholarships',
      location: 'Student Services Hall, Room 102',
      hours: 'Mon-Fri 8:30 AM - 5:00 PM',
      phone: '(555) 839-2040',
      email: 'finaid@campus.edu',
    };
  }
  if (lower.includes('drop') || lower.includes('add') || lower.includes('transcript') || lower.includes('register') || lower.includes('grade')) {
    return {
      name: 'Office of the University Registrar',
      location: 'Student Services Hall, Room 210',
      hours: 'Mon-Fri 8:00 AM - 4:30 PM',
      phone: '(555) 839-2010',
      email: 'registrar@campus.edu',
    };
  }
  if (lower.includes('dorm') || lower.includes('housing') || lower.includes('room') || lower.includes('resident')) {
    return {
      name: 'Housing & Residence Life Central',
      location: 'Beacon Commons, Suite 100',
      hours: 'Mon-Fri 8:00 AM - 6:00 PM (RA On-Call 24/7)',
      phone: '(555) 839-3300',
      email: 'housing@campus.edu',
    };
  }
  if (lower.includes('meal') || lower.includes('food') || lower.includes('dining')) {
    return {
      name: 'Campus Dining Services & ID Card Office',
      location: 'Student Union, Ground Floor',
      hours: 'Mon-Fri 8:00 AM - 5:00 PM',
      phone: '(555) 839-4450',
      email: 'dining@campus.edu',
    };
  }
  if (lower.includes('health') || lower.includes('doctor') || lower.includes('counsel') || lower.includes('therapy')) {
    return {
      name: 'Student Health & Wellness Pavilion (CAPS)',
      location: 'Health Sciences Wing B',
      hours: 'Mon-Fri 8:00 AM - 5:00 PM (Nurse Advice 24/7)',
      phone: '(555) 839-CARE (2273)',
      email: 'healthcenter@campus.edu',
    };
  }
  if (lower.includes('police') || lower.includes('safe') || lower.includes('emergency') || lower.includes('escort')) {
    return {
      name: 'Campus Police & Public Safety (24/7)',
      location: 'Public Safety Building, 100 Campus Way',
      hours: 'Open 24/7/365',
      phone: 'Emergency: 911 | Non-Emergency: (555) 839-SAFE (7233)',
      email: 'publicsafety@campus.edu',
    };
  }
  if (lower.includes('library') || lower.includes('study') || lower.includes('print') || lower.includes('laptop')) {
    return {
      name: 'University Memorial Library & Tech Hub',
      location: 'Central Quadrangle',
      hours: 'Sun 10 AM - Fri 10 PM (24/5 quiet floors)',
      phone: '(555) 839-5500',
      email: 'library@campus.edu',
    };
  }

  return {
    name: 'One-Stop Student Central',
    location: 'Student Services Building, Atrium',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM',
    phone: '(555) 839-2000',
    email: 'studenthelp@campus.edu',
  };
}

// Fallback response generator if Gemini API is temporarily unreachable or offline
function getKnowledgeFallback(query: string, category: string, collegeName: string) {
  const lower = query.toLowerCase();
  let reply = '';

  if (lower.includes('add') || lower.includes('drop') || lower.includes('withdraw')) {
    reply = `**Course Add/Drop & Withdrawal Policy at ${collegeName}**\n\n` +
      `• **Add/Drop Period**: You can add, swap, or drop classes with full tuition refund and no notation on your academic transcript through the **first 10 business days** of the semester via your Student Portal.\n` +
      `• **Course Withdrawal ('W' Grade)**: After the add/drop window until Week 10, dropping a course results in a 'W' grade. A 'W' does not affect your GPA, but does count toward attempted credit hours for Financial Aid Satisfactory Academic Progress (SAP).\n` +
      `• **Need Instructor Permission?**: If a course is full or has prerequisites, request an Electronic Override via the Registrar's portal.\n\n` +
      `💡 *Action Step*: Log into the Student Portal under *Academics > Registration > Register / Drop Classes*.`;
  } else if (lower.includes('aid') || lower.includes('fafsa') || lower.includes('grant') || lower.includes('scholarship')) {
    reply = `**Financial Aid & FAFSA Guidance at ${collegeName}**\n\n` +
      `• **FAFSA Priority Deadline**: Submit your Free Application for Federal Student Aid (FAFSA) by **March 1** each year using our School Code **#001234** to maximize institutional grants and state awards.\n` +
      `• **Verification Items**: If selected for federal verification, check your Student Portal *Financial Aid To-Do List* for tax transcript requests or household verification forms.\n` +
      `• **Work-Study**: Federal Work-Study awardees can apply directly to open student employment positions on Handshake.\n` +
      `• **Emergency Relief**: If unexpected medical or housing hardship occurs, apply for the Student Emergency Relief Grant via the Dean of Students Office.`;
  } else if (lower.includes('room') || lower.includes('dorm') || lower.includes('lockout') || lower.includes('housing')) {
    reply = `**Residence Life & Dorm Living Guide**\n\n` +
      `• **Locked Out?**: Contact your Hall RA On-Call desk. First 2 lockouts per semester are free; subsequent lockouts incur a $15 administrative fee.\n` +
      `• **Maintenance / Fix-It**: Submit room maintenance work orders (heating, plumbing, lighting) through the *Campus FixIt Portal*.\n` +
      `• **Room Change Request**: The formal Room Swap & Transfer period opens during the 3rd week of each term through the Housing Portal.\n` +
      `• **Quiet Hours**: Courtesy hours are 24/7. Mandatory quiet hours are 10:00 PM – 8:00 AM on weekdays, and 12:00 AM – 10:00 AM on weekends.`;
  } else if (lower.includes('meal') || lower.includes('dining') || lower.includes('food')) {
    reply = `**Campus Dining & Meal Plan Information**\n\n` +
      `• **Meal Swipes**: Use at all-you-care-to-eat residential dining halls (North Dining Commons & South Vista) and for Meal Exchange combos at select retail cafes.\n` +
      `• **Dining Dollars**: Tax-free declining balance dollars accepted at Starbucks, Chick-fil-A, Subway, and campus convenience stores.\n` +
      `• **Rollover Rules**: Unused Dining Dollars roll over from Fall to Spring semester, but expire at the end of the academic year in May. Unused weekly meal swipes reset every Sunday at midnight.\n` +
      `• **Dietary Support**: Both main dining halls feature certified allergen-free "Pure Zone" stations (free of top 9 allergens) plus dedicated Halal, Kosher, and Vegan hot bars.`;
  } else if (lower.includes('health') || lower.includes('doctor') || lower.includes('therapy') || lower.includes('counseling') || lower.includes('mental')) {
    reply = `**Student Health, Counseling & Wellness Services**\n\n` +
      `• **Student Health Clinic**: Basic visits (cold/flu, minor injuries, preventative wellness, STI testing, immunizations) are covered by the mandatory student health fee. Walk-ins welcome or book on the Patient Portal.\n` +
      `• **Counseling and Psychological Services (CAPS)**: Provides **up to 12 free individual therapy sessions** per academic year, plus ongoing group therapy and mindfulness workshops.\n` +
      `• **24/7 Crisis Support**: Call our dedicated 24-hour mental health crisis line at **(555) 839-TALK (8255)** or text 'HOME' to 741741.`;
  } else if (lower.includes('club') || lower.includes('involve') || lower.includes('greek') || lower.includes('sport')) {
    reply = `**Student Life & Getting Involved at ${collegeName}**\n\n` +
      `• **Student Involvement Fair**: Held the first Wednesday of Fall & Spring semesters on the Central Quad with over 200 student clubs and Greek organizations.\n` +
      `• **Start Your Own Club**: You only need 5 active student members, a faculty/staff advisor, and a club constitution. Register through the Student Activities Board (SAB).\n` +
      `• **Recreation & Intramurals**: Free access to the Student Recreation Center (Olympic pool, climbing wall, indoor track, free weights, group spin classes).`;
  } else {
    reply = `Welcome to **CampusPulse FAQ**! I can answer questions across all aspects of ${collegeName}:\n\n` +
      `• **Academics & Registration**: Add/drop deadlines, transcripts, degree audits.\n` +
      `• **Financial Aid & Bursar**: FAFSA, scholarship deadlines, payment plans, work-study.\n` +
      `• **Housing & Dining**: Dorm policies, room swap requests, meal swipe rollovers.\n` +
      `• **Wellness & Safety**: Free CAPS counseling, 24/7 SafeWalk escorts, health clinic.\n` +
      `• **Campus Facilities**: Library 24-hour study rooms, free printing credits, parking permits.\n\n` +
      `What specific question or service can I help you navigate today?`;
  }

  return {
    reply,
    suggestedFollowUps: generateSmartFollowUps(query, category),
    relevantDepartment: determineRelevantDepartment(query, category),
    source: 'knowledge-base',
  };
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    geminiConfigured: !!ai,
    timestamp: new Date().toISOString(),
  });
});

// Setup Vite or static serving based on environment
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (Production: ${isProd})`);
  });
}

startServer();
