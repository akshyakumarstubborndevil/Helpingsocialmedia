import type { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sub?: string;
  accent?: 'cyan' | 'blue' | 'purple' | 'rose' | 'amber' | 'emerald';
}

const accents: Record<string, string> = {
  cyan: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30',
  blue: 'text-blue-300 bg-blue-500/10 border-blue-500/30',
  purple: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
  rose: 'text-rose-300 bg-rose-500/10 border-rose-500/30',
  amber: 'text-amber-300 bg-amber-500/10 border-amber-500/30',
  emerald: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30',
};

export function StatCard({ icon: Icon, label, value, sub, accent = 'cyan' }: Props) {
  return (
    <div className="glass-card glass-card-hover p-4 flex items-start gap-3 fade-in-up">
      <div className={`shrink-0 grid place-items-center h-10 w-10 rounded-lg border ${accents[accent]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-2xl font-semibold text-slate-100 mt-0.5">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5 truncate">{sub}</p>}
      </div>
    </div>
  );
}
