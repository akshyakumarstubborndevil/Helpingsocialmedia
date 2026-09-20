import { useState } from 'react';
import { LineChart as LineChartIcon, TrendingUp, Info } from 'lucide-react';
import { seedForecasts } from '@/data/derived';
import { LineChart } from '@/components/Charts';

export function ForecastPage() {
  const [selected, setSelected] = useState(seedForecasts[0].topic);
  const forecast = seedForecasts.find((f) => f.topic === selected)!;

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-amber-300" />
          <p className="text-sm text-slate-300">
            Short-term estimates for the next 2–3 hours based on current demo trend growth. Not guaranteed predictions.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {seedForecasts.map((f) => (
            <button
              key={f.topic}
              onClick={() => setSelected(f.topic)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                selected === f.topic ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              #{f.topic}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card p-5 fade-in-up">
        <div className="flex items-center gap-2 mb-1">
          <LineChartIcon className="h-5 w-5 text-cyan-300" />
          <h2 className="text-base font-semibold text-slate-100">Forecast: #{forecast.topic}</h2>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Generated {new Date(forecast.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} UTC ·
          Window: {forecast.windowHours} hours · Growth rate: {forecast.growthRate}%/hr
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <Stat label="Current Volume" value={forecast.currentVolume} />
          <Stat label="Est. in 1h" value={forecast.points[0].estimated} accent="cyan" />
          <Stat label="Est. in 3h" value={forecast.points[2].estimated} accent="purple" />
        </div>

        <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-wider text-slate-400">Projected Volume</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-300"><span className="h-2 w-2 rounded-full bg-cyan-400" />Estimated</span>
              <span className="flex items-center gap-1.5 text-slate-400"><span className="h-2 w-2 rounded-full bg-slate-500" />Baseline</span>
            </div>
          </div>
          <LineChart
            points={[
              { x: 'now', y: forecast.currentVolume },
              ...forecast.points.map((p) => ({ x: p.t, y: p.estimated })),
            ]}
          />
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-slate-500 border-b border-navy-700/50">
                <th className="py-2 pr-4">Hour</th>
                <th className="py-2 pr-4">Baseline</th>
                <th className="py-2 pr-4">Estimated</th>
                <th className="py-2 pr-4">Lower Bound</th>
                <th className="py-2">Upper Bound</th>
              </tr>
            </thead>
            <tbody>
              {forecast.points.map((p) => (
                <tr key={p.t} className="border-b border-navy-800/50 text-slate-300">
                  <td className="py-2.5 pr-4 font-medium text-slate-200">{p.t}</td>
                  <td className="py-2.5 pr-4 text-slate-400">{p.baseline}</td>
                  <td className="py-2.5 pr-4 text-cyan-300 font-semibold">{p.estimated}</td>
                  <td className="py-2.5 pr-4 text-slate-500">{p.lower}</td>
                  <td className="py-2.5 text-slate-500">{p.upper}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-500/5 border border-amber-500/20 p-3">
          <TrendingUp className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400">{forecast.note}</p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, accent = 'slate' }: { label: string; value: number; accent?: string }) {
  const colors: Record<string, string> = {
    cyan: 'text-cyan-300',
    purple: 'text-purple-300',
    slate: 'text-slate-200',
  };
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-xl font-semibold ${colors[accent]}`}>{value}</p>
    </div>
  );
}
