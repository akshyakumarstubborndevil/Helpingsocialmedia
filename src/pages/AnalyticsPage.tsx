import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { PostCard } from '@/components/PostCard';
import { seedPosts } from '@/data/seedPosts';
import type { Platform, Language, Sentiment } from '@/data/types';

export function AnalyticsPage() {
  const [query, setQuery] = useState('');
  const [platform, setPlatform] = useState<Platform | 'all'>('all');
  const [language, setLanguage] = useState<Language | 'all'>('all');
  const [sentiment, setSentiment] = useState<Sentiment | 'all'>('all');

  const filtered = useMemo(() => {
    return seedPosts.filter((p) => {
      if (platform !== 'all' && p.platform !== platform) return false;
      if (language !== 'all' && p.language !== language) return false;
      if (sentiment !== 'all' && p.sentiment !== sentiment) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!p.text.toLowerCase().includes(q) && !p.keywords.some((k) => k.includes(q)) && !p.topics.some((t) => t.includes(q))) return false;
      }
      return true;
    });
  }, [query, platform, language, sentiment]);

  const platforms: (Platform | 'all')[] = ['all', 'X', 'Telegram', 'Reddit', 'YouTube'];
  const languages: (Language | 'all')[] = ['all', 'English', 'Telugu', 'Hindi', 'Tenglish', 'Hinglish'];
  const sentiments: (Sentiment | 'all')[] = ['all', 'positive', 'neutral', 'negative'];

  return (
    <div className="space-y-5">
      <div className="glass-card p-4">
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts, keywords, topics..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-navy-800/60 border border-navy-700/60 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterGroup label="Platform" options={platforms} value={platform} onChange={(v) => setPlatform(v as Platform | 'all')} />
            <FilterGroup label="Language" options={languages} value={language} onChange={(v) => setLanguage(v as Language | 'all')} />
            <FilterGroup label="Sentiment" options={sentiments} value={sentiment} onChange={(v) => setSentiment(v as Sentiment | 'all')} />
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1.5">
          <Filter className="h-3 w-3" /> Showing {filtered.length} of {seedPosts.length} posts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="glass-card p-10 text-center text-slate-500">No posts match your filters.</div>
      )}
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs text-slate-500 hidden sm:inline">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-2.5 py-2 rounded-lg bg-navy-800/60 border border-navy-700/60 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-navy-900">{o === 'all' ? 'All' : o}</option>
        ))}
      </select>
    </div>
  );
}
