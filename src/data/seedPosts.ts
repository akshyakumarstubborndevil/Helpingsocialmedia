import type { SocialPost } from './types';

// Reference time: 2026-09-20. Posts span the last ~6 hours.
const T = (h: number, m = 0) => {
  const base = new Date('2026-09-20T08:00:00Z').getTime();
  return new Date(base - h * 3600000 - m * 60000).toISOString();
};

export const seedPosts: SocialPost[] = [
  // ===== Power outage cluster (emerging issue, complaint spike) =====
  {
    id: 'p1', platform: 'X', timestamp: T(0, 5), language: 'English',
    text: 'No power in Kukatpally since 4am. 5 hours and counting. @TSPDCL please respond.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['power-outage', 'infrastructure'], keywords: ['power', 'kukatpally', 'tspdcl'],
    author: '@hyd_resident', reach: 1200, engagement: { likes: 85, shares: 22, comments: 14 },
    location: 'Kukatpally, Hyderabad', ageGroup: '35-44', region: 'Kukatpally',
  },
  {
    id: 'p2', platform: 'X', timestamp: T(0, 12), language: 'Tenglish',
    text: 'Current ledu ikkada, 5 hours ayyindi. Inthaku minchi power ravatledu. Kukatpally area.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['power-outage'], keywords: ['current', 'power', 'kukatpally'],
    author: '@hyd_teen', reach: 840, engagement: { likes: 54, shares: 12, comments: 8 },
    location: 'Kukatpally, Hyderabad', ageGroup: '18-24', region: 'Kukatpally',
  },
  {
    id: 'p3', platform: 'Telegram', timestamp: T(0, 20), language: 'Telugu',
    text: 'కుకట్‌పల్లిలో కరెంట్ లేదు. 5 గంటల నుండి. ఎవరైనా చూడండి.',
    sentiment: 'negative', emotion: 'sadness', intent: 'complain',
    topics: ['power-outage'], keywords: ['కరెంట్', 'కుకట్‌పల్లి'],
    author: 'tg_user_441', reach: 320, engagement: { likes: 18, shares: 5, comments: 3 },
    location: 'Kukatpally, Hyderabad', ageGroup: '45-54', region: 'Kukatpally',
  },
  {
    id: 'p4', platform: 'Reddit', timestamp: T(0, 30), language: 'English',
    text: 'Power outage in Kukatpally - anyone else affected? This is the 3rd time this month.',
    sentiment: 'negative', emotion: 'disgust', intent: 'complain',
    topics: ['power-outage', 'infrastructure'], keywords: ['power', 'outage', 'kukatpally'],
    author: 'u/hyd_redditor', reach: 560, engagement: { likes: 42, shares: 0, comments: 19 },
    location: 'Kukatpally, Hyderabad', ageGroup: '25-34', region: 'Kukatpally',
  },
  {
    id: 'p5', platform: 'X', timestamp: T(0, 40), language: 'English',
    text: 'No power Kukatpally since 4am. 5 hours and counting. @TSPDCL please respond.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['power-outage'], keywords: ['power', 'kukatpally', 'tspdcl'],
    author: '@bot_like_1', reach: 90, engagement: { likes: 3, shares: 1, comments: 0 },
    location: 'Kukatpally, Hyderabad', ageGroup: '25-34', region: 'Kukatpally',
  },
  {
    id: 'p6', platform: 'X', timestamp: T(0, 42), language: 'English',
    text: 'No power Kukatpally since 4am. 5 hours and counting. @TSPDCL please respond.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['power-outage'], keywords: ['power', 'kukatpally', 'tspdcl'],
    author: '@bot_like_2', reach: 88, engagement: { likes: 2, shares: 1, comments: 0 },
    location: 'Kukatpally, Hyderabad', ageGroup: '25-34', region: 'Kukatpally',
  },

  // ===== Water contamination rumor =====
  {
    id: 'p7', platform: 'X', timestamp: T(1, 10), language: 'English',
    text: 'Heard the tap water in Banjara Hills is unsafe to drink. Is this true?',
    sentiment: 'neutral', emotion: 'fear', intent: 'question',
    topics: ['water-quality', 'rumor'], keywords: ['water', 'banjara-hills', 'unsafe'],
    author: '@hyd_mom', reach: 2100, engagement: { likes: 120, shares: 35, comments: 28 },
    location: 'Banjara Hills, Hyderabad', ageGroup: '35-44', region: 'Banjara Hills',
  },
  {
    id: 'p8', platform: 'Telegram', timestamp: T(1, 25), language: 'Hinglish',
    text: 'Banjara Hills ka paani peene se beemar padh rahe log? Koi confirm karo.',
    sentiment: 'neutral', emotion: 'fear', intent: 'question',
    topics: ['water-quality', 'rumor'], keywords: ['paani', 'banjara-hills'],
    author: 'tg_user_88', reach: 410, engagement: { likes: 24, shares: 8, comments: 5 },
    location: 'Banjara Hills, Hyderabad', ageGroup: '25-34', region: 'Banjara Hills',
  },
  {
    id: 'p9', platform: 'Reddit', timestamp: T(1, 40), language: 'English',
    text: 'Water board issued a statement that Banjara Hills supply is treated and safe. Stop spreading rumors.',
    sentiment: 'positive', emotion: 'trust', intent: 'inform',
    topics: ['water-quality', 'rumor'], keywords: ['water-board', 'safe', 'banjara-hills'],
    author: 'u/facts_only', reach: 780, engagement: { likes: 65, shares: 0, comments: 12 },
    location: 'Banjara Hills, Hyderabad', ageGroup: '35-44', region: 'Banjara Hills',
  },
  {
    id: 'p10', platform: 'X', timestamp: T(1, 55), language: 'English',
    text: 'Lab test from a friend shows TDS within limits for Banjara Hills. The unsafe rumor seems false.',
    sentiment: 'positive', emotion: 'trust', intent: 'inform',
    topics: ['water-quality', 'rumor'], keywords: ['lab-test', 'tds', 'safe'],
    author: '@hyd_scientist', reach: 1500, engagement: { likes: 95, shares: 40, comments: 15 },
    location: 'Banjara Hills, Hyderabad', ageGroup: '25-34', region: 'Banjara Hills',
  },

  // ===== Metro delay complaints =====
  {
    id: 'p11', platform: 'X', timestamp: T(1, 5), language: 'English',
    text: 'Metro red line delayed again. 20 min wait at Miyapur. Fix the frequency please.',
    sentiment: 'negative', emotion: 'disgust', intent: 'complain',
    topics: ['metro-delay', 'transit'], keywords: ['metro', 'miyapur', 'delay'],
    author: '@commuter_hyd', reach: 980, engagement: { likes: 62, shares: 18, comments: 11 },
    location: 'Miyapur, Hyderabad', ageGroup: '25-34', region: 'Miyapur',
  },
  {
    id: 'p12', platform: 'X', timestamp: T(1, 18), language: 'Tenglish',
    text: 'Metro delay ayipoyindi, 20 mins wait. Miyapur station lo. Frequency penchandi.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['metro-delay', 'transit'], keywords: ['metro', 'miyapur', 'delay'],
    author: '@hyd_teen', reach: 720, engagement: { likes: 38, shares: 9, comments: 6 },
    location: 'Miyapur, Hyderabad', ageGroup: '18-24', region: 'Miyapur',
  },
  {
    id: 'p13', platform: 'Reddit', timestamp: T(1, 30), language: 'English',
    text: 'Hyderabad metro really needs better frequency during peak hours. This is daily now.',
    sentiment: 'negative', emotion: 'disgust', intent: 'complain',
    topics: ['metro-delay', 'transit'], keywords: ['metro', 'frequency', 'peak'],
    author: 'u/transit_nerd', reach: 430, engagement: { likes: 31, shares: 0, comments: 14 },
    location: 'Miyapur, Hyderabad', ageGroup: '25-34', region: 'Miyapur',
  },

  // ===== Festival positivity =====
  {
    id: 'p14', platform: 'X', timestamp: T(2, 0), language: 'Telugu',
    text: 'బతుకమ్మ పండుగ శుభాకాంక్షలు! హైదరాబాద్ అందంగా ఉంది.',
    sentiment: 'positive', emotion: 'joy', intent: 'praise',
    topics: ['festival', 'bathukamma'], keywords: ['బతుకమ్మ', 'పండుగ'],
    author: '@telugu_pride', reach: 3400, engagement: { likes: 280, shares: 95, comments: 32 },
    location: 'Tank Bund, Hyderabad', ageGroup: '35-44', region: 'Tank Bund',
  },
  {
    id: 'p15', platform: 'X', timestamp: T(2, 10), language: 'English',
    text: 'Bathukamma celebrations at Tank Bund were beautiful today. Proud of our culture.',
    sentiment: 'positive', emotion: 'joy', intent: 'praise',
    topics: ['festival', 'bathukamma'], keywords: ['bathukamma', 'tank-bund', 'culture'],
    author: '@hyd_culture', reach: 2100, engagement: { likes: 175, shares: 60, comments: 22 },
    location: 'Tank Bund, Hyderabad', ageGroup: '25-34', region: 'Tank Bund',
  },
  {
    id: 'p16', platform: 'YouTube', timestamp: T(2, 20), language: 'Telugu',
    text: 'Bathukamma 2026 live visuals from Tank Bund. Amazing crowd and colors!',
    sentiment: 'positive', emotion: 'joy', intent: 'inform',
    topics: ['festival', 'bathukamma'], keywords: ['bathukamma', 'live', 'tank-bund'],
    author: 'yt_hyd_live', reach: 12000, engagement: { likes: 950, shares: 210, comments: 88 },
    location: 'Tank Bund, Hyderabad', ageGroup: '25-34', region: 'Tank Bund',
  },

  // ===== Traffic / road issue =====
  {
    id: 'p17', platform: 'X', timestamp: T(2, 30), language: 'English',
    text: 'Massive traffic jam at Hitech City junction. Took 45 min for 2km. Road design is broken.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['traffic', 'infrastructure'], keywords: ['traffic', 'hitech-city', 'jam'],
    author: '@hyd_commuter', reach: 1800, engagement: { likes: 110, shares: 28, comments: 19 },
    location: 'Hitech City, Hyderabad', ageGroup: '25-34', region: 'Hitech City',
  },
  {
    id: 'p18', platform: 'X', timestamp: T(2, 35), language: 'Hinglish',
    text: 'Hitech City junction pe traffic zindabad. 45 min lag gaye 2km ke liye. Sadak kharab.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['traffic', 'infrastructure'], keywords: ['traffic', 'hitech-city'],
    author: '@hindi_hyd', reach: 640, engagement: { likes: 34, shares: 7, comments: 5 },
    location: 'Hitech City, Hyderabad', ageGroup: '35-44', region: 'Hitech City',
  },
  {
    id: 'p19', platform: 'Telegram', timestamp: T(2, 45), language: 'Telugu',
    text: 'హైటెక్ సిటీ జంక్ భయంకరంగా ఉంది. 45 నిమిషాలు 2 కి.మీ.',
    sentiment: 'negative', emotion: 'disgust', intent: 'complain',
    topics: ['traffic', 'infrastructure'], keywords: ['హైటెక్', 'జంక్'],
    author: 'tg_user_201', reach: 280, engagement: { likes: 15, shares: 3, comments: 2 },
    location: 'Hitech City, Hyderabad', ageGroup: '45-54', region: 'Hitech City',
  },

  // ===== Coordinated political hashtag campaign =====
  {
    id: 'p20', platform: 'X', timestamp: T(3, 0), language: 'English',
    text: '#SupportLocalFarmers rally at 6pm today. Spread the word. #SupportLocalFarmers',
    sentiment: 'neutral', emotion: 'anticipation', intent: 'organize',
    topics: ['farmers-rally', 'politics'], keywords: ['supportlocalfarmers', 'rally'],
    author: '@org_account_1', reach: 500, engagement: { likes: 22, shares: 15, comments: 3 },
    ageGroup: '35-44', region: 'Central Hyderabad',
  },
  {
    id: 'p21', platform: 'X', timestamp: T(3, 1), language: 'English',
    text: '#SupportLocalFarmers rally at 6pm today. Spread the word. #SupportLocalFarmers',
    sentiment: 'neutral', emotion: 'anticipation', intent: 'organize',
    topics: ['farmers-rally', 'politics'], keywords: ['supportlocalfarmers', 'rally'],
    author: '@org_account_2', reach: 510, engagement: { likes: 24, shares: 16, comments: 2 },
    ageGroup: '35-44', region: 'Central Hyderabad',
  },
  {
    id: 'p22', platform: 'Telegram', timestamp: T(3, 2), language: 'English',
    text: '#SupportLocalFarmers rally at 6pm today. Spread the word.',
    sentiment: 'neutral', emotion: 'anticipation', intent: 'organize',
    topics: ['farmers-rally', 'politics'], keywords: ['supportlocalfarmers', 'rally'],
    author: 'tg_org_3', reach: 480, engagement: { likes: 18, shares: 12, comments: 1 },
    ageGroup: '45-54', region: 'Central Hyderabad',
  },
  {
    id: 'p23', platform: 'X', timestamp: T(3, 3), language: 'Hinglish',
    text: '#SupportLocalFarmers rally aaj 6pm. Sab forward karo.',
    sentiment: 'neutral', emotion: 'anticipation', intent: 'organize',
    topics: ['farmers-rally', 'politics'], keywords: ['supportlocalfarmers', 'rally'],
    author: '@org_account_4', reach: 490, engagement: { likes: 20, shares: 14, comments: 2 },
    ageGroup: '25-34', region: 'Central Hyderabad',
  },

  // ===== Product launch praise =====
  {
    id: 'p24', platform: 'YouTube', timestamp: T(3, 30), language: 'English',
    text: 'New electric bus fleet launched in Hyderabad. Clean and quiet. Great move!',
    sentiment: 'positive', emotion: 'joy', intent: 'praise',
    topics: ['ev-buses', 'transport'], keywords: ['electric-bus', 'hyderabad', 'launch'],
    author: 'yt_green_hyd', reach: 8500, engagement: { likes: 620, shares: 150, comments: 55 },
    ageGroup: '25-34', region: 'Citywide',
  },
  {
    id: 'p25', platform: 'X', timestamp: T(3, 40), language: 'English',
    text: 'Electric buses on city routes is a huge win. Less noise, less pollution.',
    sentiment: 'positive', emotion: 'trust', intent: 'praise',
    topics: ['ev-buses', 'transport'], keywords: ['electric-bus', 'pollution'],
    author: '@eco_hyd', reach: 1300, engagement: { likes: 88, shares: 25, comments: 10 },
    ageGroup: '35-44', region: 'Citywide',
  },

  // ===== Weather warning =====
  {
    id: 'p26', platform: 'X', timestamp: T(4, 0), language: 'English',
    text: 'Heavy rain warning for Hyderabad till midnight. IMD red alert. Stay safe everyone.',
    sentiment: 'neutral', emotion: 'fear', intent: 'warn',
    topics: ['weather', 'rain-warning'], keywords: ['rain', 'imd', 'red-alert'],
    author: '@hyd_weather', reach: 5400, engagement: { likes: 420, shares: 380, comments: 45 },
    ageGroup: '35-44', region: 'Citywide',
  },
  {
    id: 'p27', platform: 'Telegram', timestamp: T(4, 10), language: 'Telugu',
    text: 'హైదరాబాద్‌లో భారీ వర్షం హెచ్చరిక. రాత్రి వరకు జాగ్రత్త.',
    sentiment: 'neutral', emotion: 'fear', intent: 'warn',
    topics: ['weather', 'rain-warning'], keywords: ['వర్షం', 'హెచ్చరిక'],
    author: 'tg_weather', reach: 2100, engagement: { likes: 145, shares: 120, comments: 18 },
    ageGroup: '45-54', region: 'Citywide',
  },

  // ===== Generic neutral / info =====
  {
    id: 'p28', platform: 'Reddit', timestamp: T(4, 20), language: 'English',
    text: 'Best biryani spots in Hyderabad 2026 - ranked. Discussion thread.',
    sentiment: 'neutral', emotion: 'anticipation', intent: 'inform',
    topics: ['food', 'biryani'], keywords: ['biryani', 'hyderabad', 'food'],
    author: 'u/foodie_hyd', reach: 920, engagement: { likes: 68, shares: 0, comments: 42 },
    ageGroup: '25-34', region: 'Citywide',
  },
  {
    id: 'p29', platform: 'YouTube', timestamp: T(4, 30), language: 'Hindi',
    text: 'Hyderabad ki best biryani review. 5 jagah. Dekhiye.',
    sentiment: 'neutral', emotion: 'anticipation', intent: 'inform',
    topics: ['food', 'biryani'], keywords: ['biryani', 'review', 'hyderabad'],
    author: 'yt_food_vlogs', reach: 6200, engagement: { likes: 480, shares: 90, comments: 65 },
    ageGroup: '18-24', region: 'Citywide',
  },

  // ===== Hospital overcrowding emerging =====
  {
    id: 'p30', platform: 'X', timestamp: T(0, 50), language: 'English',
    text: 'Government hospital in Secunderabad overcrowded, 3 hour wait for OPD. Terrible state.',
    sentiment: 'negative', emotion: 'sadness', intent: 'complain',
    topics: ['healthcare', 'hospital-overcrowding'], keywords: ['hospital', 'secunderabad', 'opd'],
    author: '@hyd_patient', reach: 1100, engagement: { likes: 72, shares: 20, comments: 16 },
    location: 'Secunderabad, Hyderabad', ageGroup: '35-44', region: 'Secunderabad',
  },
  {
    id: 'p31', platform: 'X', timestamp: T(1, 0), language: 'Tenglish',
    text: 'Hospital lo 3 hours wait. Secunderabad government hospital. Elanti situation.',
    sentiment: 'negative', emotion: 'sadness', intent: 'complain',
    topics: ['healthcare', 'hospital-overcrowding'], keywords: ['hospital', 'secunderabad'],
    author: '@hyd_teen', reach: 760, engagement: { likes: 40, shares: 10, comments: 7 },
    location: 'Secunderabad, Hyderabad', ageGroup: '18-24', region: 'Secunderabad',
  },
  {
    id: 'p32', platform: 'Telegram', timestamp: T(1, 10), language: 'Telugu',
    text: 'సికింద్రాబాద్ ప్రభుత్వ ఆసుపత్రి రద్దీ. 3 గంటల వేచి ఉండాలి.',
    sentiment: 'negative', emotion: 'sadness', intent: 'complain',
    topics: ['healthcare', 'hospital-overcrowding'], keywords: ['ఆసుపత్రి', 'సికింద్రాబాద్'],
    author: 'tg_user_55', reach: 240, engagement: { likes: 12, shares: 3, comments: 2 },
    location: 'Secunderabad, Hyderabad', ageGroup: '45-54', region: 'Secunderabad',
  },

  // ===== Education / exam stress =====
  {
    id: 'p33', platform: 'Reddit', timestamp: T(5, 0), language: 'English',
    text: 'How do you manage exam stress? Board exams in 2 months and I am overwhelmed.',
    sentiment: 'negative', emotion: 'fear', intent: 'question',
    topics: ['education', 'exam-stress'], keywords: ['exams', 'stress', 'boards'],
    author: 'u/student_2026', reach: 340, engagement: { likes: 25, shares: 0, comments: 18 },
    ageGroup: '18-24', region: 'Citywide',
  },
  {
    id: 'p34', platform: 'X', timestamp: T(5, 10), language: 'Hindi',
    text: 'Board exams 2 mahine mein hain. Bahut tension hai. Koi tips do.',
    sentiment: 'negative', emotion: 'fear', intent: 'question',
    topics: ['education', 'exam-stress'], keywords: ['exams', 'tension', 'tips'],
    author: '@student_hyd', reach: 410, engagement: { likes: 28, shares: 5, comments: 9 },
    ageGroup: '18-24', region: 'Citywide',
  },

  // ===== Positive civic =====
  {
    id: 'p35', platform: 'X', timestamp: T(5, 30), language: 'English',
    text: 'New flyover at BHEL opened. Commute time cut by half. Good work GHMC.',
    sentiment: 'positive', emotion: 'trust', intent: 'praise',
    topics: ['infrastructure', 'flyover'], keywords: ['flyover', 'bhel', 'ghmc'],
    author: '@hyd_driver', reach: 1600, engagement: { likes: 105, shares: 30, comments: 12 },
    location: 'BHEL, Hyderabad', ageGroup: '35-44', region: 'BHEL',
  },

  // ===== Rumor: false earthquake =====
  {
    id: 'p36', platform: 'X', timestamp: T(2, 50), language: 'English',
    text: 'Rumor: big earthquake predicted for Hyderabad tonight. Is this real??',
    sentiment: 'neutral', emotion: 'fear', intent: 'question',
    topics: ['earthquake-rumor', 'rumor'], keywords: ['earthquake', 'hyderabad', 'prediction'],
    author: '@worried_hyd', reach: 2800, engagement: { likes: 180, shares: 95, comments: 40 },
    ageGroup: '25-34', region: 'Citywide',
  },
  {
    id: 'p37', platform: 'Telegram', timestamp: T(2, 55), language: 'Hinglish',
    text: 'Hyderabad mein aaj raat bhu-kamp aayega? WhatsApp pe aaya message.',
    sentiment: 'neutral', emotion: 'fear', intent: 'question',
    topics: ['earthquake-rumor', 'rumor'], keywords: ['bhu-kamp', 'whatsapp'],
    author: 'tg_user_77', reach: 600, engagement: { likes: 35, shares: 18, comments: 8 },
    ageGroup: '35-44', region: 'Citywide',
  },
  {
    id: 'p38', platform: 'X', timestamp: T(3, 5), language: 'English',
    text: 'No scientific basis for earthquake prediction. IMD has not issued any such alert. Ignore rumors.',
    sentiment: 'positive', emotion: 'trust', intent: 'inform',
    topics: ['earthquake-rumor', 'rumor'], keywords: ['imd', 'no-basis', 'ignore'],
    author: '@fact_check_hyd', reach: 3100, engagement: { likes: 240, shares: 180, comments: 35 },
    ageGroup: '35-44', region: 'Citywide',
  },

  // ===== More volume for trending =====
  {
    id: 'p39', platform: 'X', timestamp: T(0, 15), language: 'English',
    text: 'Power still not back in Kukatpally. Getting frustrated now.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['power-outage'], keywords: ['power', 'kukatpally'],
    author: '@local_1', reach: 200, engagement: { likes: 12, shares: 3, comments: 2 },
    location: 'Kukatpally, Hyderabad', ageGroup: '35-44', region: 'Kukatpally',
  },
  {
    id: 'p40', platform: 'X', timestamp: T(0, 25), language: 'Tenglish',
    text: 'Kukatpally power ledu. Frustration peaks. Tspdcl respond cheyandi.',
    sentiment: 'negative', emotion: 'anger', intent: 'complain',
    topics: ['power-outage'], keywords: ['power', 'kukatpally', 'tspdcl'],
    author: '@local_2', reach: 180, engagement: { likes: 10, shares: 2, comments: 1 },
    location: 'Kukatpally, Hyderabad', ageGroup: '25-34', region: 'Kukatpally',
  },
];
