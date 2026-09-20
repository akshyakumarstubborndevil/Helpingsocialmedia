import { useState } from 'react';
import { ShieldQuestion, ChevronDown, ChevronUp, Check, X } from 'lucide-react';
import { seedRumors, getPostById } from '@/data/derived';
import { RumorStatusBadge, PlatformBadge } from '@/components/Badges';
import { PostCard } from '@/components/PostCard';
import type { RumorStatus } from '@/data/types';

const statusOrder: RumorStatus[] = ['Unverified', 'Needs Verification', 'Evidence Supports', 'Evidence Contradicts'];

export function RumorsPage() {
  const [expanded, setExpanded] = useState<string | null>('r1');
  const [filter, setFilter] = useState<RumorStatus | 'all'>('all');

  const rumors = filter === 'all' ? seedRumors : seedRumors.filter((r) => r.status === filter);

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-1">
          <ShieldQuestion className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">Claims are never automatically labeled as fake news. Evidence is shown for both sides.</p>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <FilterChip label="All" active={filter === 'all'} onClick={() => setFilter('all')} />
          {statusOrder.map((s) => (
            <FilterChip key={s} label={s} active={filter === s} onClick={() => setFilter(s)} />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {rumors.map((r) => {
          const isOpen = expanded === r.id;
          return (
            <div key={r.id} className="glass-card overflow-hidden fade-in-up">
              <button
                onClick={() => setExpanded(isOpen ? null : r.id)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-navy-700/30 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <RumorStatusBadge status={r.status} />
                    <span className="text-xs text-slate-500">#{r.topic}</span>
                    <span className="text-xs text-slate-500">{r.posts} posts</span>
                  </div>
                  <p className="text-sm font-medium text-slate-100">{r.claim}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {r.platforms.map((p) => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-navy-700/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4">
                    <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-3">
                      <p className="text-xs font-semibold text-emerald-300 mb-2 flex items-center gap-1.5"><Check className="h-3.5 w-3.5" /> Evidence For</p>
                      {r.evidenceFor.length ? (
                        <ul className="space-y-1 text-sm text-slate-300">
                          {r.evidenceFor.map((e, i) => <li key={i} className="flex gap-2"><span className="text-emerald-500">·</span>{e}</li>)}
                        </ul>
                      ) : <p className="text-xs text-slate-500">None found.</p>}
                    </div>
                    <div className="rounded-lg bg-rose-500/5 border border-rose-500/20 p-3">
                      <p className="text-xs font-semibold text-rose-300 mb-2 flex items-center gap-1.5"><X className="h-3.5 w-3.5" /> Evidence Against</p>
                      {r.evidenceAgainst.length ? (
                        <ul className="space-y-1 text-sm text-slate-300">
                          {r.evidenceAgainst.map((e, i) => <li key={i} className="flex gap-2"><span className="text-rose-500">·</span>{e}</li>)}
                        </ul>
                      ) : <p className="text-xs text-slate-500">None found.</p>}
                    </div>
                  </div>

                  {r.relatedPostIds.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Related Posts</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {r.relatedPostIds.map((id) => {
                          const p = getPostById(id);
                          return p ? <PostCard key={id} post={p} /> : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
        active ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
      }`}
    >
      {label}
    </button>
  );
}
