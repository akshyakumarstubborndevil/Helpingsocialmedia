import { useState } from 'react';
import { GitBranch, Clock } from 'lucide-react';
import { seedRootCauses, getPostById } from '@/data/derived';
import { PostCard } from '@/components/PostCard';

export function RootCausePage() {
  const [selected, setSelected] = useState(seedRootCauses[0].topic);
  const rootCause = seedRootCauses.find((r) => r.topic === selected)!;

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">Select an emerging issue to see its root-cause analysis, contributing factors, and evidence timeline.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seedRootCauses.map((r) => (
            <button
              key={r.topic}
              onClick={() => setSelected(r.topic)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selected === r.topic ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              #{r.topic}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 fade-in-up">
        <h2 className="text-base font-semibold text-slate-100 mb-1">Root-Cause Analysis: #{rootCause.topic}</h2>
        <p className="text-sm text-slate-400 leading-relaxed mb-4">{rootCause.whyGrowing}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <Stat label="Sentiment Change" value={`${rootCause.sentimentChange > 0 ? '+' : ''}${rootCause.sentimentChange}`} accent="rose" />
          <Stat label="Confidence" value={`${rootCause.confidence}%`} accent="cyan" />
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">Contributing Topics</p>
            <div className="flex flex-wrap gap-1.5">
              {rootCause.contributingTopics.map((t) => (
                <span key={t} className="chip bg-navy-700/60 text-cyan-200 border border-cyan-500/20">#{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">Complaint Categories</p>
            <div className="flex flex-wrap gap-1.5">
              {rootCause.complaintCategories.map((c) => (
                <span key={c} className="chip bg-amber-500/15 text-amber-300 border border-amber-500/30">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">Keywords</p>
            <div className="flex flex-wrap gap-1.5">
              {rootCause.keywords.map((k) => (
                <span key={k} className="chip bg-navy-700/60 text-slate-300 border border-navy-600">{k}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Issue Timeline</h4>
          <div className="space-y-2">
            {rootCause.timeline.map((e, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <span className={`h-2.5 w-2.5 rounded-full ${i === rootCause.timeline.length - 1 ? 'bg-rose-400' : 'bg-cyan-400'}`} />
                  {i < rootCause.timeline.length - 1 && <span className="w-px h-6 bg-navy-600" />}
                </div>
                <div className="pb-2">
                  <p className="text-sm text-slate-200">{e.label}</p>
                  <p className="text-xs text-slate-500">{new Date(e.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-wider text-slate-400 mb-2">Supporting Evidence</h4>
          <div className="space-y-3">
            {rootCause.evidence.map((e) => {
              const p = getPostById(e.postId);
              return (
                <div key={e.postId}>
                  {p && <PostCard post={p} />}
                  <p className="text-xs text-cyan-300 mt-1 pl-1">↳ {e.reason}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent = 'cyan' }: { label: string; value: string; accent?: string }) {
  const colors: Record<string, string> = { cyan: 'text-cyan-300', rose: 'text-rose-300' };
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-lg font-semibold ${colors[accent]}`}>{value}</p>
    </div>
  );
}
