import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { seedAlerts, seedExplanations, getPostById } from '@/data/derived';
import { PostCard } from '@/components/PostCard';
import { SeverityBadge } from '@/components/Badges';

export function EvidencePage() {
  const [selected, setSelected] = useState(seedAlerts[0].id);
  const alert = seedAlerts.find((a) => a.id === selected)!;
  const explanation = seedExplanations[selected];

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <HelpCircle className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">Click an alert to inspect its full explainable evidence panel — what happened, why it was detected, and the supporting posts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seedAlerts.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selected === a.id ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              {a.title.length > 40 ? a.title.slice(0, 38) + '…' : a.title}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <SeverityBadge severity={alert.severity} />
          <h2 className="text-base font-semibold text-slate-100">{alert.title}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <Stat label="Volume" value={alert.metrics.volume} />
          <Stat label="Growth Rate" value={`${alert.metrics.growthRate}%/hr`} />
          <Stat label="Sentiment Shift" value={`${alert.metrics.sentimentShift}`} />
          <Stat label="Confidence" value={`${alert.confidence}%`} accent="cyan" />
        </div>

        {explanation ? (
          <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-4 mb-5">
            <h3 className="text-xs uppercase tracking-wider text-cyan-300 mb-3">Explainable WHY Panel</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <Row label="What happened" value={explanation.whatHappened} />
              <Row label="Why detected" value={explanation.whyDetected} />
              <Row label="Cluster info" value={explanation.clusterInfo} />
              <Row label="Keywords" value={explanation.keywords.join(', ')} />
              <Row label="Sentiment change" value={`${explanation.sentimentChange} pts`} />
              <Row label="Topic growth" value={`${explanation.topicGrowth}%/hr`} />
              <Row label="Confidence" value={`${explanation.confidence}%`} />
              <Row label="Limitations" value={explanation.limitations} />
            </div>
          </div>
        ) : (
          <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-4 mb-5">
            <p className="text-sm text-slate-500">No detailed explanation panel available for this alert.</p>
          </div>
        )}

        <div>
          <h3 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Supporting Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {alert.postIds.map((id) => {
              const p = getPostById(id);
              return p ? <PostCard key={id} post={p} /> : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent = 'slate' }: { label: string; value: string | number; accent?: string }) {
  const colors: Record<string, string> = { cyan: 'text-cyan-300', slate: 'text-slate-100' };
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-lg font-semibold ${colors[accent]}`}>{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-slate-500 shrink-0 w-36">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
