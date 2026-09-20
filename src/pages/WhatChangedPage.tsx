import { GitCompare, ArrowRight, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { computeWhatChanged } from '@/data/analytics';

export function WhatChangedPage() {
  const result = computeWhatChanged();
  const c = result.changes;

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-1">
          <GitCompare className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">Comparing the previous period (3–6 hours ago) vs the current period (last 3 hours).</p>
        </div>
      </div>

      <div className="glass-card p-5 fade-in-up">
        <h2 className="text-base font-semibold text-slate-100 mb-3">Summary</h2>
        <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <PeriodCard label={result.previousPeriod.label} data={result.previousPeriod} />
        <PeriodCard label={result.currentPeriod.label} data={result.currentPeriod} highlight />
      </div>

      <div className="glass-card p-5">
        <h2 className="text-base font-semibold text-slate-100 mb-4">What Changed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ChangeCard
            icon={c.volumeChange >= 0 ? TrendingUp : TrendingDown}
            label="Post Volume"
            value={`${c.volumeChange >= 0 ? '+' : ''}${c.volumeChange}`}
            sub={`${result.previousPeriod.volume} → ${result.currentPeriod.volume}`}
            positive={c.volumeChange < 0}
          />
          <ChangeCard
            icon={c.sentimentChange >= 0 ? TrendingUp : TrendingDown}
            label="Negative Sentiment"
            value={`${c.sentimentChange >= 0 ? '+' : ''}${c.sentimentChange}%`}
            sub={`${result.previousPeriod.negativePct}% → ${result.currentPeriod.negativePct}%`}
            positive={c.sentimentChange < 0}
          />
          <ChangeCard
            icon={c.complaintChange >= 0 ? TrendingUp : TrendingDown}
            label="Complaints"
            value={`${c.complaintChange >= 0 ? '+' : ''}${c.complaintChange}`}
            sub={`${result.previousPeriod.complaints} → ${result.currentPeriod.complaints}`}
            positive={c.complaintChange < 0}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          <div>
            <h4 className="text-xs uppercase tracking-wider text-emerald-300 mb-2">New Topics</h4>
            {c.newTopics.length ? (
              <div className="flex flex-wrap gap-1.5">
                {c.newTopics.map((t) => (
                  <span key={t} className="chip bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">#{t}</span>
                ))}
              </div>
            ) : <p className="text-xs text-slate-500">No new topics.</p>}
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-wider text-rose-300 mb-2">Declining Topics</h4>
            {c.decliningTopics.length ? (
              <div className="flex flex-wrap gap-1.5">
                {c.decliningTopics.map((t) => (
                  <span key={t} className="chip bg-rose-500/15 text-rose-300 border border-rose-500/30">#{t}</span>
                ))}
              </div>
            ) : <p className="text-xs text-slate-500">No declining topics.</p>}
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">New Keywords</h4>
          {c.newKeywords.length ? (
            <div className="flex flex-wrap gap-1.5">
              {c.newKeywords.map((k) => (
                <span key={k} className="chip bg-navy-700/60 text-slate-300 border border-navy-600">{k}</span>
              ))}
            </div>
          ) : <p className="text-xs text-slate-500">No new keywords.</p>}
        </div>

        {c.emergingIssues.length > 0 && (
          <div className="mt-4 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> Emerging Issues</h4>
            <div className="flex flex-wrap gap-1.5">
              {c.emergingIssues.map((t) => (
                <span key={t} className="chip bg-amber-500/15 text-amber-300 border border-amber-500/30">#{t}</span>
              ))}
            </div>
          </div>
        )}

        {c.newWarningSignals.length > 0 && (
          <div className="mt-4 rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
            <h4 className="text-xs uppercase tracking-wider text-rose-300 mb-2 flex items-center gap-1.5"><AlertTriangle className="h-3.5 w-3.5" /> New Warning Signals</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              {c.newWarningSignals.map((s, i) => <li key={i} className="flex gap-2"><span className="text-rose-500">·</span>{s}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

interface PeriodData {
  label: string;
  volume: number;
  negativePct: number;
  positivePct: number;
  neutralPct: number;
  topTopics: { topic: string; posts: number }[];
  topKeywords: string[];
  complaints: number;
  platforms: string[];
}

function PeriodCard({ label, data, highlight }: { label: string; data: PeriodData; highlight?: boolean }) {
  return (
    <div className={`glass-card p-5 ${highlight ? 'border-cyan-500/30' : ''}`}>
      <div className="flex items-center gap-2 mb-4">
        {highlight && <ArrowRight className="h-4 w-4 text-cyan-300" />}
        <h3 className="text-sm font-semibold text-slate-100">{label}</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Stat label="Volume" value={data.volume} />
        <Stat label="Complaints" value={data.complaints} accent="rose" />
        <Stat label="Negative" value={`${data.negativePct}%`} accent="rose" />
        <Stat label="Positive" value={`${data.positivePct}%`} accent="emerald" />
      </div>
      <div className="mb-3">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">Top Topics</p>
        <div className="flex flex-wrap gap-1.5">
          {data.topTopics.map((t) => (
            <span key={t.topic} className="chip bg-navy-700/60 text-cyan-200 border border-cyan-500/20">#{t.topic} ({t.posts})</span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">Top Keywords</p>
        <div className="flex flex-wrap gap-1.5">
          {data.topKeywords.map((k) => (
            <span key={k} className="chip bg-navy-700/60 text-slate-300 border border-navy-600">{k}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangeCard({ icon: Icon, label, value, sub, positive }: { icon: typeof TrendingUp; label: string; value: string; sub: string; positive: boolean }) {
  const isGood = positive;
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`h-4 w-4 ${isGood ? 'text-emerald-300' : 'text-rose-300'}`} />
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      </div>
      <p className={`text-xl font-semibold ${isGood ? 'text-emerald-300' : 'text-rose-300'}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
    </div>
  );
}

function Stat({ label, value, accent = 'cyan' }: { label: string; value: string | number; accent?: string }) {
  const colors: Record<string, string> = {
    cyan: 'text-slate-100',
    rose: 'text-rose-300',
    emerald: 'text-emerald-300',
  };
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-lg font-semibold ${colors[accent]}`}>{value}</p>
    </div>
  );
}
