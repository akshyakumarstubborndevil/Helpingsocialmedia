import { Users, MapPin, Languages, Heart } from 'lucide-react';
import { demographicSummary } from '@/data/analytics';
import { BarChart, DonutChart } from '@/components/Charts';

const ageColors: Record<string, string> = {
  '18-24': '#22d3ee',
  '25-34': '#3b82f6',
  '35-44': '#a855f7',
  '45-54': '#f59e0b',
  '55+': '#fb7185',
};

const langColors: Record<string, string> = {
  English: '#3b82f6',
  Telugu: '#22d3ee',
  Hindi: '#f59e0b',
  Tenglish: '#a855f7',
  Hinglish: '#fb7185',
};

export function DemographicsPage() {
  const demo = demographicSummary();

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-cyan-300" />
          <p className="text-sm text-slate-300">Privacy-safe aggregate insights only. No personally identifiable information is exposed.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-1.5"><Users className="h-4 w-4 text-cyan-300" /> Age Distribution</h2>
          <BarChart
            data={demo.ageDistribution.map((a) => ({
              label: a.group,
              value: a.count,
              color: ageColors[a.group] || '#3b82f6',
            }))}
          />
          <div className="mt-3 space-y-1.5">
            {demo.ageDistribution.map((a) => (
              <div key={a.group} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: ageColors[a.group] }} />
                <span className="text-slate-300">{a.group}</span>
                <span className="text-slate-500 ml-auto">{a.count} posts · {a.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-1.5"><MapPin className="h-4 w-4 text-cyan-300" /> Region Distribution</h2>
          <BarChart
            data={demo.regionDistribution.slice(0, 8).map((r) => ({
              label: r.region.length > 10 ? r.region.slice(0, 9) + '…' : r.region,
              value: r.count,
              color: '#3b82f6',
            }))}
          />
          <div className="mt-3 space-y-1.5">
            {demo.regionDistribution.map((r) => (
              <div key={r.region} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                <span className="text-slate-300">{r.region}</span>
                <span className="text-slate-500 ml-auto">{r.count} · {r.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-1.5"><Languages className="h-4 w-4 text-cyan-300" /> Language Distribution</h2>
          <DonutChart
            data={demo.languageDistribution.map((l) => ({
              label: l.language,
              value: l.count,
              color: langColors[l.language] || '#3b82f6',
            }))}
          />
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-1.5"><Heart className="h-4 w-4 text-cyan-300" /> Interest Categories</h2>
          <div className="space-y-2">
            {demo.interestCategories.map((c, i) => {
              const max = demo.interestCategories[0].count;
              return (
                <div key={c.category} className="flex items-center gap-3">
                  <span className="text-xs text-slate-300 w-32 truncate">#{c.category}</span>
                  <div className="flex-1 h-2 rounded-full bg-navy-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: `${(c.count / max) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 w-8 text-right">{c.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
