interface Props {
  data: { label: string; value: number; color: string }[];
  height?: number;
  max?: number;
}

export function BarChart({ data, height = 180, max }: Props) {
  const maxVal = max ?? Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-3 h-full" style={{ minHeight: height }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
          <div className="w-full flex-1 flex items-end">
            <div
              className="w-full rounded-t-md transition-all duration-500"
              style={{
                height: `${(d.value / maxVal) * 100}%`,
                background: d.color,
                minHeight: d.value > 0 ? '4px' : '0',
              }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-[10px] text-slate-400 truncate w-full text-center">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

interface LinePoint { x: string; y: number; y2?: number }

export function LineChart({ points, height = 180 }: { points: LinePoint[]; height?: number }) {
  const w = 560;
  const h = height;
  const pad = 28;
  const max = Math.max(...points.map((p) => Math.max(p.y, p.y2 ?? 0)), 1) + 1;
  const min = 0;
  const xStep = (w - pad * 2) / Math.max(points.length - 1, 1);
  const y = (v: number) => h - pad - ((v - min) / (max - min)) * (h - pad * 2);
  const x = (i: number) => pad + i * xStep;

  const line = (key: 'y' | 'y2', color: string) =>
    points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(p[key] ?? 0)}`)
      .join(' ');

  const areaPath =
    `M ${x(0)} ${h - pad} ` +
    points.map((p, i) => `L ${x(i)} ${y(p.y)}`).join(' ') +
    ` L ${x(points.length - 1)} ${h - pad} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={pad} x2={w - pad} y1={pad + g * (h - pad * 2)} y2={pad + g * (h - pad * 2)} stroke="#1e2a5e" strokeWidth="1" />
      ))}
      <path d={areaPath} fill="url(#lineFill)" />
      <path d={line('y', '#22d3ee')} fill="none" stroke="#22d3ee" strokeWidth="2" />
      {points.some((p) => p.y2 !== undefined) && (
        <path d={line('y2', '#f43f5e')} fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
      )}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={x(i)} cy={y(p.y)} r="3" fill="#22d3ee" />
          <text x={x(i)} y={h - 8} textAnchor="middle" className="fill-slate-400" style={{ fontSize: 10 }}>
            {p.x}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function DonutChart({ data, size = 140 }: { data: { label: string; value: number; color: string }[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const r = size / 2 - 12;
  const cx = size / 2;
  const cy = size / 2;
  let offset = 0;
  const circumference = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#162047" strokeWidth="14" />
        {data.map((d) => {
          const len = (d.value / total) * circumference;
          const seg = (
            <circle
              key={d.label}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={d.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${circumference - len}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${cx} ${cy})`}
              strokeLinecap="butt"
            />
          );
          offset += len;
          return seg;
        })}
        <text x={cx} y={cy + 4} textAnchor="middle" className="fill-slate-200" style={{ fontSize: 18, fontWeight: 600 }}>
          {total}
        </text>
      </svg>
      <div className="space-y-1.5">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
            <span className="text-slate-300">{d.label}</span>
            <span className="text-slate-500 ml-auto">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Sparkline({ values, color = '#22d3ee', width = 80, height = 24 }: { values: number[]; color?: string; width?: number; height?: number }) {
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const range = max - min || 1;
  const step = width / Math.max(values.length - 1, 1);
  const pts = values.map((v, i) => `${i * step},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
