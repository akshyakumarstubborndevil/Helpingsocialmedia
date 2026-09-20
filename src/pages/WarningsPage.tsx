import { useState } from 'react';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { seedAlerts, seedExplanations } from '@/data/derived';
import { SeverityBadge } from '@/components/Badges';
import { PostCard } from '@/components/PostCard';
import { getPostById } from '@/data/derived';
import type { AlertType } from '@/data/types';

const typeLabels: Record<AlertType, string> = {
  activity_spike: 'Activity Spike',
  negative_sentiment_surge: 'Negative Sentiment Surge',
  rapid_topic_growth: 'Rapid Topic Growth',
  complaint_spike: 'Complaint Spike',
};

export function WarningsPage() {
  const [expanded, setExpanded] = useState<string | null>('a1');

  return (
    <div className="space-y-4">
      {seedAlerts.map((a) => {
        const isOpen = expanded === a.id;
        const explanation = seedExplanations[a.id];
        return (
          <div key={a.id} className="glass-card overflow-hidden fade-in-up">
            <button
              onClick={() => setExpanded(isOpen ? null : a.id)}
              className="w-full flex items-start gap-3 p-4 text-left hover:bg-navy-700/30 transition-colors"
            >
              <span className={`shrink-0 grid place-items-center h-10 w-10 rounded-lg border ${
                a.severity === 'critical' ? 'bg-rose-500/10 border-rose-500/30' : 'bg-amber-500/10 border-amber-500/30'
              }`}>
                <AlertTriangle className={`h-5 w-5 ${a.severity === 'critical' ? 'text-rose-300' : 'text-amber-300'}`} />
                {a.severity === 'critical' && <span className="absolute h-10 w-10 rounded-lg pulse-ring" />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <SeverityBadge severity={a.severity} />
                  <span className="chip bg-navy-700/60 text-slate-300 border border-navy-600">{typeLabels[a.type]}</span>
                  <span className="text-xs text-slate-500">#{a.affectedTopic}</span>
                </div>
                <p className="text-sm font-medium text-slate-100">{a.title}</p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.reason}</p>
              </div>
              {isOpen ? <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />}
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-4 border-t border-navy-700/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                  <Stat label="Volume" value={a.metrics.volume} />
                  <Stat label="Growth Rate" value={`${a.metrics.growthRate}%/hr`} />
                  <Stat label="Sentiment Shift" value={`${a.metrics.sentimentShift}`} />
                  <Stat label="Confidence" value={`${a.confidence}%`} />
                </div>

                {explanation && (
                  <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-4">
                    <h4 className="text-xs uppercase tracking-wider text-cyan-300 mb-2">Explainable WHY</h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <Row label="What happened" value={explanation.whatHappened} />
                      <Row label="Why detected" value={explanation.whyDetected} />
                      <Row label="Keywords" value={explanation.keywords.join(', ')} />
                      <Row label="Limitations" value={explanation.limitations} />
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Supporting Posts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {a.postIds.map((id) => {
                      const p = getPostById(id);
                      return p ? <PostCard key={id} post={p} /> : null;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-slate-100">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-slate-500">{label}: </span>
      {value}
    </div>
  );
}
