import type { Sentiment, AlertSeverity, RumorStatus, Platform, Language } from '@/data/types';

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const map: Record<Sentiment, string> = {
    positive: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    neutral: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    negative: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };
  return <span className={`chip border ${map[sentiment]}`}>{sentiment}</span>;
}

export function SeverityBadge({ severity }: { severity: AlertSeverity }) {
  const map: Record<AlertSeverity, string> = {
    critical: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    high: 'bg-orange-500/15 text-orange-300 border-orange-500/40',
    medium: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    low: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
  };
  return <span className={`chip border ${map[severity]}`}>{severity}</span>;
}

export function RumorStatusBadge({ status }: { status: RumorStatus }) {
  const map: Record<RumorStatus, string> = {
    Unverified: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    'Needs Verification': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Evidence Supports': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Evidence Contradicts': 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };
  return <span className={`chip border ${map[status]}`}>{status}</span>;
}

export function PlatformBadge({ platform }: { platform: Platform }) {
  const map: Record<Platform, string> = {
    X: 'bg-slate-500/15 text-slate-200 border-slate-500/30',
    Telegram: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    Reddit: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
    YouTube: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };
  return <span className={`chip border ${map[platform]}`}>{platform}</span>;
}

export function LanguageBadge({ language }: { language: Language }) {
  const map: Record<Language, string> = {
    English: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    Telugu: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Hindi: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Tenglish: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    Hinglish: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  };
  return <span className={`chip border ${map[language]}`}>{language}</span>;
}

export function TopicChip({ topic }: { topic: string }) {
  return (
    <span className="chip bg-navy-700/60 text-cyan-200 border border-cyan-500/20">
      #{topic}
    </span>
  );
}
