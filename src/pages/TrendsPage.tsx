import { useState, useMemo } from 'react';
import { TrendingUp, Flame, Filter } from 'lucide-react';
import { computeTrends, filterPosts } from '@/data/analytics';
import { PlatformBadge, LanguageBadge } from '@/components/Badges';
import { Sparkline, LineChart } from '@/components/Charts';
import { seedPosts } from '@/data/seedPosts';
import { topicTimeSeries } from '@/data/analytics';
import type { Platform, Language, Sentiment } from '@/data/types';

export function TrendsPage() {
  const [showEmerging, setShowEmerging] = useState(false);
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [language, setLanguage] = useState<Language | 'all'>('all');
  const [sentiment, setSentiment] = useState<Sentiment | 'all'>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const filteredPosts = useMemo(
    () => filterPosts({ platform, language, sentiment }),
    [platform, language, sentiment]
  );

  const topicMap: Record<string, typeof filteredPosts> = {};
  filteredPosts.forEach((p) => {
    p.topics.forEach((t) => {
      if (!topicMap[t]) topicMap[t] = [];
      topicMap[t].push(p);
    });
  });

  const trends = computeTrends().filter((t) => topicMap[t.topic]);
  const visible = showEmerging ? trends.filter((t) => t.emerging) : trends;

  const platforms: (Platform | 'all')[] = ['all', 'X', 'Telegram', 'Reddit', 'YouTube'];
  const languages: (Language | 'all')[] = ['all', 'English', 'Telugu', 'Hindi', 'Tenglish', 'Hinglish'];
  const sentiments: (Sentiment | 'all')[] = ['all', 'positive', 'neutral', 'negative'];

  const timeSeries = selectedTopic ? topicTimeSeries(selectedTopic) : [];

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEmerging(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                !showEmerging ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              All Trends
            </button>
            <button
              onClick={() => setShowEmerging(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                showEmerging ? 'bg-amber-500/15 text-amber-200 border-amber-500/30' : 'text-slate-400 border-navy-700 hover:text-slate-200'
              }`}
            >
              Emerging Only
            </button>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto">
            <FilterSelect label="Platform" options={platforms} value={platform} onChange={(v) => setPlatform(v as Platform | 'all')} />
            <FilterSelect label="Language" options={languages} value={language} onChange={(v) => setLanguage(v as Language | 'all')} />
            <FilterSelect label="Sentiment" options={sentiments} value={sentiment} onChange={(v) => setSentiment(v as Sentiment | 'all')} />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
          <Filter className="h-3 w-3" /> Showing {visible.length} trends from {filteredPosts.length} filtered posts
        </p>
      </div>

      {selectedTopic && timeSeries.length > 0 && (
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">Topic Growth: #{selectedTopic}</h2>
            <button onClick={() => setSelectedTopic(null)} className="text-xs text-cyan-300 hover:text-cyan-200">Close</button>
          </div>
          <LineChart points={timeSeries.map((p) => ({ x: p.hour, y: p.count }))} height={160} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visible.map((t) => {
          const topicPosts = (topicMap[t.topic] || seedPosts.filter((p) => p.topics.includes(t.topic))).slice(0, 8);
          const spark = topicPosts.map((p) => p.reach);
          return (
            <div key={t.topic} className="glass-card glass-card-hover p-5 fade-in-up">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-semibold text-slate-100">#{t.topic}</h3>
                    {t.emerging && (
                      <span className="chip bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        <Flame className="h-3 w-3" /> emerging
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">{t.posts} posts · {t.growthRate}% growth/hr · {t.velocity}/hr velocity</p>
                </div>
                <Sparkline values={spark.length ? spark : [0, 1]} color={t.sentiment < -20 ? '#fb7185' : '#22d3ee'} />
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <Metric label="Posts" value={t.posts} />
                <Metric label="Growth" value={`${t.growthRate}%`} accent={t.growthRate > 60 ? 'amber' : 'cyan'} />
                <Metric
                  label="Sentiment"
                  value={`${t.sentiment > 0 ? '+' : ''}${t.sentiment}`}
                  accent={t.sentiment < -20 ? 'rose' : t.sentiment > 20 ? 'emerald' : 'slate'}
                />
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {t.platforms.map((p) => (
                  <PlatformBadge key={p} platform={p} />
                ))}
                {t.languages.map((l) => (
                  <LanguageBadge key={l} language={l} />
                ))}
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-navy-700/50">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3" />
                  Sentiment change: {t.sentimentChange > 0 ? '+' : ''}{t.sentimentChange} pts
                </span>
                <button
                  onClick={() => setSelectedTopic(selectedTopic === t.topic ? null : t.topic)}
                  className="text-xs text-cyan-300 hover:text-cyan-200"
                >
                  {selectedTopic === t.topic ? 'Hide chart' : 'View growth'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {visible.length === 0 && (
        <div className="glass-card p-10 text-center text-slate-500">No trends match your filters.</div>
      )}
    </div>
  );
}

function FilterSelect({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500 hidden sm:inline">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2.5 py-1.5 rounded-lg bg-navy-800/60 border border-navy-700/60 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-900">{o === 'all' ? 'All' : o}</option>
        ))}
      </select>
    </div>
  );
}

function Metric({ label, value, accent = 'cyan' }: { label: string; value: string | number; accent?: string }) {
  const colors: Record<string, string> = {
    cyan: 'text-cyan-300',
    amber: 'text-amber-300',
    rose: 'text-rose-300',
    emerald: 'text-emerald-300',
    slate: 'text-slate-300',
  };
  return (
    <div className="rounded-lg bg-navy-800/40 border border-navy-700/50 p-2.5">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`text-lg font-semibold ${colors[accent]}`}>{value}</p>
    </div>
  );
}
