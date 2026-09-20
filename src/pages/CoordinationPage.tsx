import { useState } from 'react';
import { Network, ChevronDown, ChevronUp } from 'lucide-react';
import { seedCoordination, getPostById } from '@/data/derived';
import { PlatformBadge } from '@/components/Badges';
import { PostCard } from '@/components/PostCard';

export function CoordinationPage() {
  const [expanded, setExpanded] = useState<string | null>('c1');

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2">
          <Network className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">
            These signals indicate <span className="text-cyan-200 font-medium">Potential Coordinated Activity</span>. They are not definitive bot accusations.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {seedCoordination.map((c) => {
          const isOpen = expanded === c.id;
          return (
            <div key={c.id} className="glass-card overflow-hidden fade-in-up">
              <button
                onClick={() => setExpanded(isOpen ? null : c.id)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-navy-700/30 transition-colors"
              >
                <span className="shrink-0 grid place-items-center h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Network className="h-5 w-5 text-purple-300" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="chip bg-purple-500/15 text-purple-300 border border-purple-500/30">{c.similarity}% similar</span>
                    <span className="text-xs text-slate-500">{c.accounts} accounts</span>
                    <span className="text-xs text-slate-500">#{c.topic}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-100">{c.label}</p>
                  <p className="text-xs text-slate-500 mt-1 italic truncate">"{c.sampleText}"</p>
                </div>
                {isOpen ? <ChevronUp className="h-5 w-5 text-slate-400 shrink-0" /> : <ChevronDown className="h-5 w-5 text-slate-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 space-y-4 border-t border-navy-700/50">
                  <div className="pt-4">
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Signal Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {c.signalTypes.map((s) => (
                        <span key={s} className="chip bg-navy-700/60 text-slate-300 border border-navy-600">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.platforms.map((p) => (
                      <PlatformBadge key={p} platform={p} />
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Sample Posts</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {c.relatedPostIds.map((id) => {
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
    </div>
  );
}
