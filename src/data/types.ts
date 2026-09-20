export type Platform = 'X' | 'Telegram' | 'Reddit' | 'YouTube';
export type Language = 'English' | 'Telugu' | 'Hindi' | 'Tenglish' | 'Hinglish';
export type Sentiment = 'positive' | 'neutral' | 'negative';
export type Emotion =
  | 'joy'
  | 'trust'
  | 'fear'
  | 'surprise'
  | 'sadness'
  | 'disgust'
  | 'anger'
  | 'anticipation';
export type Intent = 'inform' | 'complain' | 'praise' | 'question' | 'warn' | 'organize';

export interface SocialPost {
  id: string;
  platform: Platform;
  timestamp: string; // ISO
  text: string;
  language: Language;
  sentiment: Sentiment;
  emotion: Emotion;
  intent: Intent;
  topics: string[];
  keywords: string[];
  author: string;
  reach: number;
  engagement: { likes: number; shares: number; comments: number };
  location?: string;
  ageGroup?: AgeGroup;
  region?: string;
}

export type AgeGroup = '18-24' | '25-34' | '35-44' | '45-54' | '55+';

export type AlertSeverity = 'critical' | 'high' | 'medium' | 'low';
export type AlertType =
  | 'activity_spike'
  | 'negative_sentiment_surge'
  | 'rapid_topic_growth'
  | 'complaint_spike'
  | 'unusual_activity';

export interface EarlyAlert {
  id: string;
  title: string;
  severity: AlertSeverity;
  type: AlertType;
  affectedTopic: string;
  reason: string;
  timestamp: string;
  confidence: number; // 0-100
  postIds: string[];
  metrics: {
    volume: number;
    growthRate: number; // % per hour
    sentimentShift: number; // -100..100
  };
}

export type RumorStatus =
  | 'Unverified'
  | 'Needs Verification'
  | 'Evidence Supports'
  | 'Evidence Contradicts';

export interface RumorTimelineEvent {
  timestamp: string;
  label: string;
  type: 'claim' | 'spread' | 'evidence-for' | 'evidence-against' | 'verification';
}

export interface RumorClaim {
  id: string;
  claim: string;
  topic: string;
  status: RumorStatus;
  firstSeen: string;
  lastSeen: string;
  posts: number;
  platforms: Platform[];
  evidenceFor: string[];
  evidenceAgainst: string[];
  relatedPostIds: string[];
  timeline: RumorTimelineEvent[];
}

export interface CoordinationSignal {
  id: string;
  label: string;
  topic: string;
  platforms: Platform[];
  accounts: number;
  signalTypes: string[];
  similarity: number; // 0-100
  firstSeen: string;
  sampleText: string;
  relatedPostIds: string[];
}

export interface Complaint {
  id: string;
  text: string;
  category: string;
  location: string;
  urgency: 'low' | 'medium' | 'high';
  frequency: number;
  sentiment: Sentiment;
  suggestedAction: string;
  postIds: string[];
  timestamp: string;
}

export interface TrendTopic {
  topic: string;
  posts: number;
  growthRate: number;
  sentiment: number; // -100..100 avg
  sentimentChange: number;
  emerging: boolean;
  platforms: Platform[];
  languages: Language[];
  velocity: number; // posts per hour
}

export interface ForecastPoint {
  t: string; // hour label
  baseline: number;
  estimated: number;
  lower: number;
  upper: number;
}

export interface ForecastResult {
  topic: string;
  generatedAt: string;
  windowHours: number;
  currentVolume: number;
  growthRate: number;
  points: ForecastPoint[];
  scenarios: {
    current: ForecastPoint[];
    increased: ForecastPoint[];
    reduced: ForecastPoint[];
  };
  note: string;
}

export interface RootCause {
  topic: string;
  whyGrowing: string;
  contributingTopics: string[];
  complaintCategories: string[];
  sentimentChange: number;
  keywords: string[];
  evidence: { postId: string; reason: string }[];
  timeline: { timestamp: string; label: string }[];
  confidence: number;
}

export interface ExplainPanel {
  alertId: string;
  whatHappened: string;
  whyDetected: string;
  supportingPosts: string[];
  keywords: string[];
  sentimentChange: number;
  topicGrowth: number;
  timestamp: string;
  confidence: number;
  limitations: string;
  clusterInfo: string;
}

export interface DemographicSummary {
  ageDistribution: { group: AgeGroup; count: number; pct: number }[];
  regionDistribution: { region: string; count: number; pct: number }[];
  languageDistribution: { language: Language; count: number; pct: number }[];
  interestCategories: { category: string; count: number }[];
}

export interface NetworkCluster {
  id: string;
  label: string;
  topic: string;
  nodes: { id: string; label: string; type: 'account' | 'topic' | 'hashtag'; influence: number }[];
  edges: { source: string; target: string; weight: number }[];
  spread: number; // 0-100
  propagationPaths: string[];
  interactionPatterns: string[];
  insufficientData: boolean;
}

export interface WhatChangedResult {
  previousPeriod: { label: string; volume: number; negativePct: number; positivePct: number; neutralPct: number; topTopics: { topic: string; posts: number }[]; topKeywords: string[]; complaints: number; platforms: Platform[] };
  currentPeriod: { label: string; volume: number; negativePct: number; positivePct: number; neutralPct: number; topTopics: { topic: string; posts: number }[]; topKeywords: string[]; complaints: number; platforms: Platform[] };
  changes: {
    volumeChange: number;
    sentimentChange: number;
    newTopics: string[];
    decliningTopics: string[];
    newKeywords: string[];
    complaintChange: number;
    newPlatforms: Platform[];
    emergingIssues: string[];
    newWarningSignals: string[];
  };
  summary: string;
}
