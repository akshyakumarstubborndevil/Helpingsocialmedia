import type {
  SocialPost,
  TrendTopic,
  Platform,
  Language,
  Sentiment,
  AgeGroup,
  DemographicSummary,
  WhatChangedResult,
} from './types';
import { seedPosts } from './seedPosts';

const REFERENCE = Date.parse('2026-09-20T08:00:00Z');
const PERIOD_SPLIT = Date.parse('2026-09-20T05:00:00Z'); // last 3h = current, before = previous

export const sentimentScore = (s: Sentiment) => (s === 'positive' ? 1 : s === 'negative' ? -1 : 0);

export function totalPosts(): number {
  return seedPosts.length;
}

export function activeAlertsCount(): number {
  return 4;
}

export function languagesDetectedCount(): number {
  return new Set(seedPosts.map((p) => p.language)).size;
}

export function platformsAnalyzedCount(): number {
  return new Set(seedPosts.map((p) => p.platform)).size;
}

export function trendingTopicsCount(): number {
  return computeTrends().length;
}

export function negativeSentimentPct(): number {
  const neg = seedPosts.filter((p) => p.sentiment === 'negative').length;
  return Math.round((neg / seedPosts.length) * 100);
}

export function emergingIssuesCount(): number {
  return computeTrends().filter((t) => t.emerging).length;
}

export function platformDistribution(): { platform: Platform; count: number; pct: number }[] {
  const counts: Record<string, number> = {};
  seedPosts.forEach((p) => {
    counts[p.platform] = (counts[p.platform] || 0) + 1;
  });
  const total = seedPosts.length;
  return (Object.keys(counts) as Platform[]).map((platform) => ({
    platform,
    count: counts[platform],
    pct: Math.round((counts[platform] / total) * 100),
  }));
}

export function languageDistribution(): { language: Language; count: number; pct: number }[] {
  const counts: Record<string, number> = {};
  seedPosts.forEach((p) => {
    counts[p.language] = (counts[p.language] || 0) + 1;
  });
  const total = seedPosts.length;
  return (Object.keys(counts) as Language[]).map((language) => ({
    language,
    count: counts[language],
    pct: Math.round((counts[language] / total) * 100),
  }));
}

export function sentimentDistribution(): { sentiment: Sentiment; count: number }[] {
  const counts: Record<Sentiment, number> = { positive: 0, neutral: 0, negative: 0 };
  seedPosts.forEach((p) => {
    counts[p.sentiment]++;
  });
  return (['positive', 'neutral', 'negative'] as Sentiment[]).map((sentiment) => ({
    sentiment,
    count: counts[sentiment],
  }));
}

export function complaintCategoryDistribution(): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  seedPosts.filter((p) => p.intent === 'complain').forEach((p) => {
    const cat = p.topics[0] || 'other';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function alertSeverityDistribution(): { severity: string; count: number }[] {
  return [
    { severity: 'critical', count: 1 },
    { severity: 'high', count: 2 },
    { severity: 'medium', count: 1 },
    { severity: 'low', count: 0 },
  ].filter((s) => s.count > 0);
}

export function computeTrends(): TrendTopic[] {
  const topicMap: Record<string, SocialPost[]> = {};
  seedPosts.forEach((p) => {
    p.topics.forEach((t) => {
      if (!topicMap[t]) topicMap[t] = [];
      topicMap[t].push(p);
    });
  });

  const trends: TrendTopic[] = Object.entries(topicMap).map(([topic, posts]) => {
    const avgSent = posts.reduce((s, p) => s + sentimentScore(p.sentiment), 0) / posts.length;
    const recent = posts.filter((p) => new Date(p.timestamp).getTime() > PERIOD_SPLIT).length;
    const growthRate = posts.length > 0 ? Math.round((recent / posts.length) * 200) : 0;
    const sentimentChange = avgSent * 60;
    const velocity = Math.round((recent / 3) * 10) / 10;
    return {
      topic,
      posts: posts.length,
      growthRate,
      sentiment: Math.round(avgSent * 100),
      sentimentChange: Math.round(sentimentChange),
      emerging: growthRate > 60 && posts.length >= 3,
      platforms: Array.from(new Set(posts.map((p) => p.platform))) as Platform[],
      languages: Array.from(new Set(posts.map((p) => p.language))) as Language[],
      velocity,
    };
  });

  return trends.sort((a, b) => b.posts - a.posts);
}

export function postsByHour(): { hour: string; count: number; negative: number }[] {
  const buckets: Record<string, { count: number; negative: number }> = {};
  seedPosts.forEach((p) => {
    const d = new Date(p.timestamp);
    const label = `${String(d.getUTCHours()).padStart(2, '0')}:00`;
    if (!buckets[label]) buckets[label] = { count: 0, negative: 0 };
    buckets[label].count++;
    if (p.sentiment === 'negative') buckets[label].negative++;
  });
  return Object.entries(buckets)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([hour, v]) => ({ hour, ...v }));
}

export function topicTimeSeries(topic: string): { hour: string; count: number }[] {
  const posts = seedPosts.filter((p) => p.topics.includes(topic));
  const buckets: Record<string, number> = {};
  posts.forEach((p) => {
    const d = new Date(p.timestamp);
    const label = `${String(d.getUTCHours()).padStart(2, '0')}:00`;
    buckets[label] = (buckets[label] || 0) + 1;
  });
  return Object.entries(buckets)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([hour, count]) => ({ hour, count }));
}

export function demographicSummary(): DemographicSummary {
  const ageCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};
  const langCounts: Record<string, number> = {};
  const interestCounts: Record<string, number> = {};

  seedPosts.forEach((p) => {
    if (p.ageGroup) ageCounts[p.ageGroup] = (ageCounts[p.ageGroup] || 0) + 1;
    if (p.region) regionCounts[p.region] = (regionCounts[p.region] || 0) + 1;
    langCounts[p.language] = (langCounts[p.language] || 0) + 1;
    p.topics.forEach((t) => {
      interestCounts[t] = (interestCounts[t] || 0) + 1;
    });
  });

  const total = seedPosts.length;
  const ageGroups: AgeGroup[] = ['18-24', '25-34', '35-44', '45-54', '55+'];

  return {
    ageDistribution: ageGroups
      .filter((g) => ageCounts[g])
      .map((group) => ({
        group,
        count: ageCounts[group] || 0,
        pct: Math.round(((ageCounts[group] || 0) / total) * 100),
      })),
    regionDistribution: Object.entries(regionCounts)
      .map(([region, count]) => ({ region, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count),
    languageDistribution: Object.entries(langCounts)
      .map(([language, count]) => ({ language: language as Language, count, pct: Math.round((count / total) * 100) }))
      .sort((a, b) => b.count - a.count),
    interestCategories: Object.entries(interestCounts)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
  };
}

export function computeWhatChanged(): WhatChangedResult {
  const previous = seedPosts.filter((p) => new Date(p.timestamp).getTime() <= PERIOD_SPLIT);
  const current = seedPosts.filter((p) => new Date(p.timestamp).getTime() > PERIOD_SPLIT);

  const calc = (posts: SocialPost[]) => {
    const total = posts.length || 1;
    const neg = posts.filter((p) => p.sentiment === 'negative').length;
    const pos = posts.filter((p) => p.sentiment === 'positive').length;
    const neu = posts.filter((p) => p.sentiment === 'neutral').length;
    const complaints = posts.filter((p) => p.intent === 'complain').length;

    const topicCounts: Record<string, number> = {};
    posts.forEach((p) => p.topics.forEach((t) => { topicCounts[t] = (topicCounts[t] || 0) + 1; }));
    const topTopics = Object.entries(topicCounts)
      .map(([topic, posts]) => ({ topic, posts }))
      .sort((a, b) => b.posts - a.posts)
      .slice(0, 5);

    const kwCounts: Record<string, number> = {};
    posts.forEach((p) => p.keywords.forEach((k) => { kwCounts[k] = (kwCounts[k] || 0) + 1; }));
    const topKeywords = Object.entries(kwCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([k]) => k);

    const platforms = Array.from(new Set(posts.map((p) => p.platform))) as Platform[];

    return {
      volume: posts.length,
      negativePct: Math.round((neg / total) * 100),
      positivePct: Math.round((pos / total) * 100),
      neutralPct: Math.round((neu / total) * 100),
      topTopics,
      topKeywords,
      complaints,
      platforms,
    };
  };

  const prev = calc(previous);
  const curr = calc(current);

  const prevTopics = new Set(prev.topTopics.map((t) => t.topic));
  const currTopics = new Set(curr.topTopics.map((t) => t.topic));
  const newTopics = [...currTopics].filter((t) => !prevTopics.has(t));
  const decliningTopics = [...prevTopics].filter((t) => !currTopics.has(t));

  const prevKw = new Set(prev.topKeywords);
  const newKeywords = curr.topKeywords.filter((k) => !prevKw.has(k));

  const prevPlatforms = new Set(prev.platforms);
  const newPlatforms = curr.platforms.filter((p) => !prevPlatforms.has(p));

  const emergingIssues = newTopics.filter((t) => {
    const trend = computeTrends().find((tr) => tr.topic === t);
    return trend?.emerging;
  });

  const newWarningSignals = [
    ...(curr.negativePct > prev.negativePct + 5 ? ['Negative sentiment increased significantly'] : []),
    ...(curr.complaints > prev.complaints ? ['Complaint volume increased'] : []),
    ...(newTopics.length > 0 ? [`${newTopics.length} new topics emerged`] : []),
  ];

  const volumeChange = curr.volume - prev.volume;
  const sentimentChange = curr.negativePct - prev.negativePct;

  const summary = `Post volume ${volumeChange >= 0 ? 'increased' : 'decreased'} by ${Math.abs(volumeChange)} (${volumeChange >= 0 ? '+' : ''}${volumeChange}). Negative sentiment ${sentimentChange >= 0 ? 'rose' : 'fell'} from ${prev.negativePct}% to ${curr.negativePct}%${sentimentChange >= 0 ? ' — a concerning shift' : ''}. ${newTopics.length ? newTopics.length + ' new topics emerged: ' + newTopics.map((t) => '#' + t).join(', ') + '.' : 'No new topics emerged.'} ${curr.complaints !== prev.complaints ? `Complaints ${curr.complaints > prev.complaints ? 'rose' : 'fell'} from ${prev.complaints} to ${curr.complaints}.` : 'Complaint volume stable.'}`;

  return {
    previousPeriod: { label: 'Previous (3–6h ago)', ...prev },
    currentPeriod: { label: 'Current (last 3h)', ...curr },
    changes: {
      volumeChange,
      sentimentChange,
      newTopics,
      decliningTopics,
      newKeywords,
      complaintChange: curr.complaints - prev.complaints,
      newPlatforms,
      emergingIssues,
      newWarningSignals,
    },
    summary,
  };
}

export function filterPosts(filters: {
  platform?: Platform | 'all';
  language?: Language | 'all';
  sentiment?: Sentiment | 'all';
  query?: string;
}): SocialPost[] {
  return seedPosts.filter((p) => {
    if (filters.platform && filters.platform !== 'all' && p.platform !== filters.platform) return false;
    if (filters.language && filters.language !== 'all' && p.language !== filters.language) return false;
    if (filters.sentiment && filters.sentiment !== 'all' && p.sentiment !== filters.sentiment) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      if (!p.text.toLowerCase().includes(q) && !p.keywords.some((k) => k.includes(q)) && !p.topics.some((t) => t.includes(q))) return false;
    }
    return true;
  });
}

export { REFERENCE };
