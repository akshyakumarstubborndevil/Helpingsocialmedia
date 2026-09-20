import type {
  EarlyAlert,
  RumorClaim,
  CoordinationSignal,
  Complaint,
  RootCause,
  ForecastResult,
  ForecastPoint,
  ExplainPanel,
  NetworkCluster,
} from './types';
import { seedPosts } from './seedPosts';

const now = new Date('2026-09-20T08:00:00Z').toISOString();
const ts = (h: number) => new Date(Date.parse(now) - h * 3600000).toISOString();

export const seedAlerts: EarlyAlert[] = [
  {
    id: 'a1',
    title: 'Sudden activity spike: power-outage in Kukatpally',
    severity: 'critical',
    type: 'activity_spike',
    affectedTopic: 'power-outage',
    reason: 'Post volume jumped 6x in the last hour with 88% negative sentiment and repeated complaints tagging @TSPDCL.',
    timestamp: now,
    confidence: 92,
    postIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p39', 'p40'],
    metrics: { volume: 8, growthRate: 220, sentimentShift: -70 },
  },
  {
    id: 'a2',
    title: 'Negative sentiment surge: hospital-overcrowding',
    severity: 'high',
    type: 'negative_sentiment_surge',
    affectedTopic: 'healthcare',
    reason: 'Average sentiment on healthcare dropped to -78 within 90 minutes across 3 platforms.',
    timestamp: now,
    confidence: 84,
    postIds: ['p30', 'p31', 'p32'],
    metrics: { volume: 3, growthRate: 140, sentimentShift: -78 },
  },
  {
    id: 'a3',
    title: 'Rapid topic growth: farmers-rally organizing',
    severity: 'medium',
    type: 'rapid_topic_growth',
    affectedTopic: 'farmers-rally',
    reason: 'Coordinated identical posts with #SupportLocalFarmers grew 5x in 4 minutes.',
    timestamp: now,
    confidence: 76,
    postIds: ['p20', 'p21', 'p22', 'p23'],
    metrics: { volume: 4, growthRate: 500, sentimentShift: 0 },
  },
  {
    id: 'a4',
    title: 'Complaint spike: metro-delay on red line',
    severity: 'high',
    type: 'complaint_spike',
    affectedTopic: 'metro-delay',
    reason: '3 complaints in 25 minutes about Miyapur station delays, 2 languages.',
    timestamp: now,
    confidence: 80,
    postIds: ['p11', 'p12', 'p13'],
    metrics: { volume: 3, growthRate: 130, sentimentShift: -65 },
  },
  {
    id: 'a5',
    title: 'Unusual activity: weather rain-warning surge',
    severity: 'low',
    type: 'unusual_activity',
    affectedTopic: 'weather',
    reason: 'Rain warning posts from IMD reached 5400+ accounts, unusual spread velocity for a weather alert.',
    timestamp: now,
    confidence: 68,
    postIds: ['p26', 'p27'],
    metrics: { volume: 2, growthRate: 85, sentimentShift: -10 },
  },
];

export const seedRumors: RumorClaim[] = [
  {
    id: 'r1',
    claim: 'Tap water in Banjara Hills is unsafe to drink and making people sick.',
    topic: 'water-quality',
    status: 'Evidence Contradicts',
    firstSeen: ts(2),
    lastSeen: now,
    posts: 4,
    platforms: ['X', 'Telegram', 'Reddit'],
    evidenceFor: ['2 users asking if the rumor is true'],
    evidenceAgainst: [
      'Water board statement: supply is treated and safe',
      'Independent lab test shows TDS within limits',
    ],
    relatedPostIds: ['p7', 'p8', 'p9', 'p10'],
    timeline: [
      { timestamp: ts(2), label: 'Claim first posted on X asking if water is unsafe', type: 'claim' },
      { timestamp: ts(1.8), label: 'Spread to Telegram in Hinglish', type: 'spread' },
      { timestamp: ts(1.5), label: 'Reddit user asked for confirmation', type: 'spread' },
      { timestamp: ts(1.3), label: 'Water board issued statement: supply is safe', type: 'evidence-against' },
      { timestamp: ts(1), label: 'Independent lab test confirmed TDS within limits', type: 'evidence-against' },
      { timestamp: ts(0.5), label: 'Status updated: Evidence Contradicts', type: 'verification' },
    ],
  },
  {
    id: 'r2',
    claim: 'A major earthquake is predicted to hit Hyderabad tonight.',
    topic: 'earthquake-rumor',
    status: 'Evidence Contradicts',
    firstSeen: ts(3),
    lastSeen: now,
    posts: 3,
    platforms: ['X', 'Telegram'],
    evidenceFor: ['WhatsApp forwarded message claiming a prediction'],
    evidenceAgainst: [
      'IMD has issued no such alert',
      'Earthquake prediction is not scientifically possible',
    ],
    relatedPostIds: ['p36', 'p37', 'p38'],
    timeline: [
      { timestamp: ts(3), label: 'Rumor posted on X citing a WhatsApp forward', type: 'claim' },
      { timestamp: ts(2.9), label: 'Spread to Telegram in Hinglish', type: 'spread' },
      { timestamp: ts(2.8), label: 'Fact-check account cited IMD: no alert issued', type: 'evidence-against' },
      { timestamp: ts(2.5), label: 'Scientific note: earthquake prediction is not possible', type: 'evidence-against' },
      { timestamp: ts(0.5), label: 'Status updated: Evidence Contradicts', type: 'verification' },
    ],
  },
  {
    id: 'r3',
    claim: 'Government is planning to shut metro services for 3 days next week.',
    topic: 'metro-delay',
    status: 'Unverified',
    firstSeen: ts(1),
    lastSeen: now,
    posts: 1,
    platforms: ['X'],
    evidenceFor: ['Single anonymous post, no official source'],
    evidenceAgainst: [],
    relatedPostIds: [],
    timeline: [
      { timestamp: ts(1), label: 'Anonymous post on X claimed metro shutdown', type: 'claim' },
      { timestamp: ts(0.8), label: 'No official source found', type: 'spread' },
      { timestamp: ts(0.5), label: 'Status remains Unverified — no evidence either way', type: 'verification' },
    ],
  },
  {
    id: 'r4',
    claim: 'New electric buses are catching fire due to battery defects.',
    topic: 'ev-buses',
    status: 'Needs Verification',
    firstSeen: ts(3.5),
    lastSeen: now,
    posts: 2,
    platforms: ['X'],
    evidenceFor: ['2 users claim they saw smoke from a bus'],
    evidenceAgainst: ['No official incident report, no photos or videos'],
    relatedPostIds: [],
    timeline: [
      { timestamp: ts(3.5), label: 'First claim of smoke from an electric bus', type: 'claim' },
      { timestamp: ts(3.2), label: 'Second user echoed the claim', type: 'spread' },
      { timestamp: ts(2), label: 'No photos, videos, or official reports found', type: 'evidence-against' },
      { timestamp: ts(0.5), label: 'Status: Needs Verification — claims unconfirmed', type: 'verification' },
    ],
  },
];

export const seedCoordination: CoordinationSignal[] = [
  {
    id: 'c1',
    label: 'Identical #SupportLocalFarmers rally posts',
    topic: 'farmers-rally',
    platforms: ['X', 'Telegram'],
    accounts: 4,
    signalTypes: ['similar text', 'repeated hashtags', 'synchronized timestamps', 'similar engagement patterns'],
    similarity: 96,
    firstSeen: ts(3),
    sampleText: '#SupportLocalFarmers rally at 6pm today. Spread the word.',
    relatedPostIds: ['p20', 'p21', 'p22', 'p23'],
  },
  {
    id: 'c2',
    label: 'Repeated power-outage complaint template',
    topic: 'power-outage',
    platforms: ['X'],
    accounts: 2,
    signalTypes: ['similar text', 'repeated posting patterns'],
    similarity: 100,
    firstSeen: ts(0.5),
    sampleText: 'No power Kukatpally since 4am. 5 hours and counting. @TSPDCL please respond.',
    relatedPostIds: ['p5', 'p6'],
  },
];

export const seedComplaints: Complaint[] = [
  {
    id: 'cm1',
    text: 'No power in Kukatpally since 4am. 5 hours and counting.',
    category: 'Electricity',
    location: 'Kukatpally, Hyderabad',
    urgency: 'high',
    frequency: 8,
    sentiment: 'negative',
    suggestedAction: 'Dispatch emergency repair crew to Kukatpally substation; publish ETA on TSPDCL channels.',
    postIds: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p39', 'p40'],
    timestamp: now,
  },
  {
    id: 'cm2',
    text: 'Metro red line delayed, 20 min wait at Miyapur.',
    category: 'Transport',
    location: 'Miyapur Station, Hyderabad',
    urgency: 'medium',
    frequency: 3,
    sentiment: 'negative',
    suggestedAction: 'Increase red line frequency during peak hours; display real-time ETA at stations.',
    postIds: ['p11', 'p12', 'p13'],
    timestamp: now,
  },
  {
    id: 'cm3',
    text: 'Government hospital overcrowded, 3 hour OPD wait.',
    category: 'Healthcare',
    location: 'Secunderabad, Hyderabad',
    urgency: 'high',
    frequency: 3,
    sentiment: 'negative',
    suggestedAction: 'Deploy additional OPD staff; open overflow clinic and announce wait times.',
    postIds: ['p30', 'p31', 'p32'],
    timestamp: now,
  },
  {
    id: 'cm4',
    text: 'Traffic jam at Hitech City junction, 45 min for 2km.',
    category: 'Roads',
    location: 'Hitech City Junction, Hyderabad',
    urgency: 'medium',
    frequency: 3,
    sentiment: 'negative',
    suggestedAction: 'Activate signal re-timing at Hitech City junction; deploy traffic marshals.',
    postIds: ['p17', 'p18', 'p19'],
    timestamp: now,
  },
];

export const seedRootCauses: RootCause[] = [
  {
    topic: 'power-outage',
    whyGrowing:
      'A sustained outage in Kukatpally with no official ETA triggered repeated complaints. Frustration compounded as wait time crossed 5 hours, and a cluster of near-identical posts amplified the signal.',
    contributingTopics: ['infrastructure', 'tspdcl-response'],
    complaintCategories: ['Electricity', 'Utility Response'],
    sentimentChange: -70,
    keywords: ['power', 'kukatpally', 'tspdcl', 'current', 'frustrated'],
    evidence: [
      { postId: 'p1', reason: 'First complaint tagging the utility, 5 hour wait' },
      { postId: 'p2', reason: 'Tenglish echo expanding language reach' },
      { postId: 'p5', reason: 'Near-identical duplicate indicating amplification' },
      { postId: 'p39', reason: 'Frustration escalation, sentiment worsening' },
    ],
    timeline: [
      { timestamp: ts(0.1), label: 'First complaint posted' },
      { timestamp: ts(0.2), label: 'Tenglish and Telugu echoes expand reach' },
      { timestamp: ts(0.4), label: 'Duplicate posts detected — possible amplification' },
      { timestamp: ts(0.7), label: 'Frustration escalates, sentiment worsens' },
      { timestamp: ts(0), label: 'Alert triggered: activity spike + complaint spike' },
    ],
    confidence: 90,
  },
  {
    topic: 'healthcare',
    whyGrowing:
      'Overcrowding at a government hospital with long wait times spread across English, Tenglish, and Telugu posts within 90 minutes, signaling a real-time service failure.',
    contributingTopics: ['hospital-overcrowding', 'staffing'],
    complaintCategories: ['Healthcare', 'Wait Times'],
    sentimentChange: -78,
    keywords: ['hospital', 'secunderabad', 'opd', 'wait', 'overcrowded'],
    evidence: [
      { postId: 'p30', reason: '3 hour OPD wait reported' },
      { postId: 'p32', reason: 'Telugu post reaching a different audience segment' },
    ],
    timeline: [
      { timestamp: ts(0.8), label: 'First complaint: 3-hour OPD wait' },
      { timestamp: ts(1), label: 'Tenglish echo posted' },
      { timestamp: ts(1.2), label: 'Telugu post reaches different audience' },
      { timestamp: ts(0), label: 'Alert triggered: negative sentiment surge' },
    ],
    confidence: 82,
  },
];

export const seedExplanations: Record<string, ExplainPanel> = {
  a1: {
    alertId: 'a1',
    whatHappened: 'A sudden spike in posts about a power outage in Kukatpally, growing 6x in one hour.',
    whyDetected: 'Volume crossed the activity-spike threshold (6x growth) while average sentiment dropped to -70, and a complaint spike was detected on the same topic.',
    supportingPosts: ['p1', 'p2', 'p5', 'p39'],
    keywords: ['power', 'kukatpally', 'tspdcl', 'current'],
    sentimentChange: -70,
    topicGrowth: 220,
    timestamp: now,
    confidence: 92,
    limitations: 'Based on demo data only. Real detection requires live API ingestion and tuned thresholds per region.',
    clusterInfo: 'Cluster of 8 posts, 2 near-identical duplicates detected, 3 languages, 3 platforms.',
  },
  a2: {
    alertId: 'a2',
    whatHappened: 'Negative sentiment on healthcare posts surged, averaging -78 within 90 minutes.',
    whyDetected: 'Sentiment dropped sharply on a small but growing post set across 3 platforms, crossing the negative-sentiment-surge threshold.',
    supportingPosts: ['p30', 'p31', 'p32'],
    keywords: ['hospital', 'secunderabad', 'opd'],
    sentimentChange: -78,
    topicGrowth: 140,
    timestamp: now,
    confidence: 84,
    limitations: 'Sample size is small; real systems should require a minimum post count before alerting.',
    clusterInfo: 'Cluster of 3 posts across X and Telegram, 3 languages, all complaints.',
  },
  a3: {
    alertId: 'a3',
    whatHappened: 'Coordinated identical posts with #SupportLocalFarmers grew 5x in 4 minutes.',
    whyDetected: 'Topic growth rate exceeded 500%/hr with 96% text similarity across 4 accounts on 2 platforms.',
    supportingPosts: ['p20', 'p21', 'p22', 'p23'],
    keywords: ['supportlocalfarmers', 'rally'],
    sentimentChange: 0,
    topicGrowth: 500,
    timestamp: now,
    confidence: 76,
    limitations: 'Coordination signals do not confirm bot activity — could be a legitimate organized campaign.',
    clusterInfo: '4 accounts, 2 platforms, timestamps within 3 minutes, 96% text similarity.',
  },
  a4: {
    alertId: 'a4',
    whatHappened: '3 complaints about metro delays at Miyapur posted within 25 minutes.',
    whyDetected: 'Complaint spike threshold crossed with 3 complaint-intent posts on the same topic in 2 languages.',
    supportingPosts: ['p11', 'p12', 'p13'],
    keywords: ['metro', 'miyapur', 'delay', 'frequency'],
    sentimentChange: -65,
    topicGrowth: 130,
    timestamp: now,
    confidence: 80,
    limitations: 'Small sample — could be a coincidental cluster rather than a systemic issue.',
    clusterInfo: '3 posts, 2 languages (English + Tenglish), X and Reddit, all complaint intent.',
  },
};

function buildScenarios(currentVolume: number, growthRate: number): { current: ForecastPoint[]; increased: ForecastPoint[]; reduced: ForecastPoint[] } {
  const make = (gr: number) => {
    const points: ForecastPoint[] = [];
    let v = currentVolume;
    for (let h = 1; h <= 3; h++) {
      const estimated = Math.round(v * (1 + gr / 100));
      const spread = Math.round(estimated * 0.15);
      points.push({ t: `+${h}h`, baseline: v, estimated, lower: Math.max(0, estimated - spread), upper: estimated + spread });
      v = estimated;
    }
    return points;
  };
  return {
    current: make(growthRate),
    increased: make(Math.round(growthRate * 1.5)),
    reduced: make(Math.round(growthRate * 0.5)),
  };
}

export function buildForecast(topic: string, currentVolume: number, growthRate: number): ForecastResult {
  const points = buildScenarios(currentVolume, growthRate).current;
  return {
    topic,
    generatedAt: now,
    windowHours: 3,
    currentVolume,
    growthRate,
    points,
    scenarios: buildScenarios(currentVolume, growthRate),
    note: 'Short-term estimate based on current demo trend growth. Not a guaranteed prediction.',
  };
}

export const seedForecasts: ForecastResult[] = [
  buildForecast('power-outage', 8, 35),
  buildForecast('healthcare', 3, 28),
  buildForecast('farmers-rally', 4, 50),
  buildForecast('metro-delay', 3, 22),
];

export const seedNetworkClusters: NetworkCluster[] = [
  {
    id: 'n1',
    label: '#SupportLocalFarmers coordination cluster',
    topic: 'farmers-rally',
    nodes: [
      { id: 'n1-t', label: '#SupportLocalFarmers', type: 'hashtag', influence: 95 },
      { id: 'n1-a1', label: '@org_account_1', type: 'account', influence: 60 },
      { id: 'n1-a2', label: '@org_account_2', type: 'account', influence: 58 },
      { id: 'n1-a3', label: 'tg_org_3', type: 'account', influence: 52 },
      { id: 'n1-a4', label: '@org_account_4', type: 'account', influence: 50 },
      { id: 'n1-tp', label: 'farmers-rally', type: 'topic', influence: 70 },
    ],
    edges: [
      { source: 'n1-a1', target: 'n1-t', weight: 8 },
      { source: 'n1-a2', target: 'n1-t', weight: 8 },
      { source: 'n1-a3', target: 'n1-t', weight: 6 },
      { source: 'n1-a4', target: 'n1-t', weight: 6 },
      { source: 'n1-t', target: 'n1-tp', weight: 7 },
    ],
    spread: 72,
    propagationPaths: ['@org_account_1 → #SupportLocalFarmers → @org_account_2 (1 min)', '#SupportLocalFarmers → Telegram (2 min)', 'Telegram → @org_account_4 (3 min)'],
    interactionPatterns: ['Synchronized posting within 3 minutes', 'Identical hashtag usage', 'Cross-platform amplification'],
    insufficientData: false,
  },
  {
    id: 'n2',
    label: 'Power-outage complaint cluster',
    topic: 'power-outage',
    nodes: [
      { id: 'n2-t', label: '#power-outage', type: 'topic', influence: 88 },
      { id: 'n2-a1', label: '@hyd_resident', type: 'account', influence: 75 },
      { id: 'n2-a2', label: '@hyd_teen', type: 'account', influence: 60 },
      { id: 'n2-a3', label: 'tg_user_441', type: 'account', influence: 40 },
      { id: 'n2-a4', label: 'u/hyd_redditor', type: 'account', influence: 55 },
      { id: 'n2-a5', label: '@bot_like_1', type: 'account', influence: 20 },
      { id: 'n2-a6', label: '@bot_like_2', type: 'account', influence: 18 },
    ],
    edges: [
      { source: 'n2-a1', target: 'n2-t', weight: 9 },
      { source: 'n2-a2', target: 'n2-t', weight: 7 },
      { source: 'n2-a3', target: 'n2-t', weight: 5 },
      { source: 'n2-a4', target: 'n2-t', weight: 6 },
      { source: 'n2-a5', target: 'n2-t', weight: 3 },
      { source: 'n2-a6', target: 'n2-t', weight: 3 },
    ],
    spread: 65,
    propagationPaths: ['@hyd_resident → #power-outage → @hyd_teen (7 min)', '#power-outage → Telegram (20 min)', '#power-outage → Reddit (30 min)'],
    interactionPatterns: ['Complaint cascade across languages', 'Duplicate text from 2 accounts', 'Cross-platform spread within 1 hour'],
    insufficientData: false,
  },
  {
    id: 'n3',
    label: 'Earthquake rumor network',
    topic: 'earthquake-rumor',
    nodes: [
      { id: 'n3-t', label: '#earthquake-rumor', type: 'topic', influence: 70 },
      { id: 'n3-a1', label: '@worried_hyd', type: 'account', influence: 65 },
      { id: 'n3-a2', label: 'tg_user_77', type: 'account', influence: 35 },
      { id: 'n3-a3', label: '@fact_check_hyd', type: 'account', influence: 80 },
    ],
    edges: [
      { source: 'n3-a1', target: 'n3-t', weight: 7 },
      { source: 'n3-a2', target: 'n3-t', weight: 4 },
      { source: 'n3-a3', target: 'n3-t', weight: 8 },
    ],
    spread: 45,
    propagationPaths: ['@worried_hyd → #earthquake-rumor → Telegram (5 min)', '@fact_check_hyd countered rumor (15 min)'],
    interactionPatterns: ['Rumor spread followed by fact-check correction', 'WhatsApp-originated cross-platform spread'],
    insufficientData: false,
  },
];

export function getPostById(id: string) {
  return seedPosts.find((p) => p.id === id);
}
