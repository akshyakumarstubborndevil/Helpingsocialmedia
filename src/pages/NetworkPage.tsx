import { useState } from 'react';
import { Network, AlertCircle, Share2, Zap } from 'lucide-react';
import { seedNetworkClusters } from '@/data/derived';

const nodeColors: Record<string, string> = {
  account: '#38bdf8',
  topic: '#a855f7',
  hashtag: '#22d3ee',
};

export function NetworkPage() {
  const [selected, setSelected] = useState(seedNetworkClusters[0].id);
  const cluster = seedNetworkClusters.find((c) => c.id === selected)!;

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Network className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">Network analysis shows communities, influential nodes, and propagation paths from demo data. No real-user relationships are invented.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seedNetworkClusters.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selected === c.id ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {cluster.insufficientData ? (
        <div className="glass-card p-10 text-center">
          <AlertCircle className="h-8 w-8 text-amber-300 mx-auto mb-3" />
          <p className="text-slate-300">Insufficient data for reliable network analysis.</p>
        </div>
      ) : (
        <>
          <div className="glass-card p-5 fade-in-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-slate-100">{cluster.label}</h2>
              <span className="chip bg-purple-500/15 text-purple-300 border border-purple-500/30">
                <Share2 className="h-3 w-3" /> {cluster.spread}% spread
              </span>
            </div>

            <NetworkGraph cluster={cluster} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-300" /> Influential Nodes</h3>
              <div className="space-y-2">
                {[...cluster.nodes].sort((a, b) => b.influence - a.influence).slice(0, 6).map((n) => (
                  <div key={n.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-navy-800/40 border border-navy-700/50">
                    <span className="h-3 w-3 rounded-full shrink-0" style={{ background: nodeColors[n.type] }} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-200 truncate">{n.label}</p>
                      <p className="text-xs text-slate-500 capitalize">{n.type}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="w-20 h-1.5 rounded-full bg-navy-700 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${n.influence}%`, background: nodeColors[n.type] }} />
                      </div>
                      <span className="text-xs text-slate-500 mt-0.5">{n.influence}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-1.5"><Share2 className="h-4 w-4 text-cyan-300" /> Propagation Paths</h3>
              <div className="space-y-2">
                {cluster.propagationPaths.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-navy-800/40 border border-navy-700/50">
                    <span className="text-cyan-400 text-sm shrink-0">{i + 1}.</span>
                    <p className="text-sm text-slate-300">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold text-slate-200 mb-3">Interaction Patterns</h3>
            <div className="flex flex-wrap gap-2">
              {cluster.interactionPatterns.map((p) => (
                <span key={p} className="chip bg-navy-700/60 text-slate-300 border border-navy-600">{p}</span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NetworkGraph({ cluster }: { cluster: typeof seedNetworkClusters[0] }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;

  const nodes = cluster.nodes.map((n, i) => {
    if (i === 0) return { ...n, x: cx, y: cy };
    const angle = ((i - 1) / (cluster.nodes.length - 1)) * Math.PI * 2;
    return { ...n, x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius };
  });

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full" style={{ maxWidth: size, margin: '0 auto', display: 'block' }}>
      {cluster.edges.map((e, i) => {
        const s = nodeMap.get(e.source);
        const t = nodeMap.get(e.target);
        if (!s || !t) return null;
        return (
          <line
            key={i}
            x1={s.x} y1={s.y} x2={t.x} y2={t.y}
            stroke="#1e2a5e" strokeWidth={e.weight}
            opacity={0.6}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            cx={n.x} cy={n.y}
            r={4 + n.influence / 15}
            fill={nodeColors[n.type]}
            opacity={0.85}
          />
          <text
            x={n.x} y={n.y - 10 - n.influence / 15}
            textAnchor="middle"
            className="fill-slate-400"
            style={{ fontSize: 8 }}
          >
            {n.label.length > 18 ? n.label.slice(0, 16) + '…' : n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
