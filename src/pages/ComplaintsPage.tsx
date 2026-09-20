import { Megaphone, MapPin, Clock } from 'lucide-react';
import { seedComplaints } from '@/data/derived';
import { SentimentBadge } from '@/components/Badges';

const urgencyStyle: Record<string, string> = {
  high: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  medium: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  low: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
};

export function ComplaintsPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {seedComplaints.map((c) => (
        <div key={c.id} className="glass-card glass-card-hover p-5 fade-in-up">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`chip border ${urgencyStyle[c.urgency]}`}>{c.urgency} urgency</span>
                <SentimentBadge sentiment={c.sentiment} />
              </div>
              <h3 className="text-base font-semibold text-slate-100">{c.category}</h3>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-bold text-cyan-300">{c.frequency}</p>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">reports</p>
            </div>
          </div>

          <p className="text-sm text-slate-300 mb-3 italic">"{c.text}"</p>

          <div className="space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" /> {c.location}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-cyan-400" /> {new Date(c.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-cyan-500/5 border border-cyan-500/20 p-3">
            <p className="text-xs font-semibold text-cyan-300 mb-1 flex items-center gap-1.5">
              <Megaphone className="h-3.5 w-3.5" /> Suggested Action
            </p>
            <p className="text-sm text-slate-300">{c.suggestedAction}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
