import { Activity, AlertTriangle, TrendingUp, Frown, Languages, Monitor, Hash, Megaphone } from 'lucide-react';
import { StatCard } from '@/components/StatCard';
import { LineChart, DonutChart, BarChart } from '@/components/Charts';
import { SeverityBadge, PlatformBadge } from '@/components/Badges';
import { PostCard } from '@/components/PostCard';
import {
  totalPosts,
  activeAlertsCount,
  emergingIssuesCount,
  negativeSentimentPct,
  platformDistribution,
  postsByHour,
  computeTrends,
  trendingTopicsCount,
  platformsAnalyzedCount,
  languagesDetectedCount,
  languageDistribution,
  complaintCategoryDistribution,
  alertSeverityDistribution,
} from '@/data/analytics';
import { seedAlerts, seedComplaints, seedRumors, seedCoordination } from '@/data/derived';
import { seedPosts } from '@/data/seedPosts';
import type { PageId } from '@/components/Layout';

const platformColors: Record<string, string> = {
  X: '#94a3b8',
  Telegram: '#38bdf8',
  Reddit: '#fb923c',
  YouTube: '#fb7185',
};

const langColors: Record<string, string> = {
  English: '#3b82f6',
  Telugu: '#22d3ee',
  Hindi: '#f59e0b',
  Tenglish: '#a855f7',
  Hinglish: '#fb7185',
};

const severityColors: Record<string, string> = {
  critical: '#f43f5e',
  high: '#fb923c',
  medium: '#f59e0b',
  low: '#38bdf8',
};

export function DashboardPage({ onNavigate }: { onNavigate: (p: PageId) => void }) {
  const trends = computeTrends();
  const hours = postsByHour();
  const dist = platformDistribution();
  const langs = languageDistribution();
  const complaints = complaintCategoryDistribution();
  const severities = alertSeverityDistribution();
  const recentPosts = [...seedPosts].sort((a, b) => b.timestamp.localeCompare(a.timestamp)).slice(0, 6);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard icon={Activity} label="Total Posts" value={totalPosts()} sub="4 platforms" accent="cyan" />
        <StatCard icon={AlertTriangle} label="Active Alerts" value={activeAlertsCount()} sub="1 critical" accent="rose" />
        <StatCard icon={TrendingUp} label="Emerging Issues" value={emergingIssuesCount()} sub="last 6h" accent="amber" />
        <StatCard icon={Frown} label="Negative Sentiment" value={`${negativeSentimentPct()}%`} sub="of posts" accent="purple" />
        <StatCard icon={Hash} label="Trending Topics" value={trendingTopicsCount()} sub="tracked" accent="cyan" />
        <StatCard icon={Monitor} label="Platforms" value={platformsAnalyzedCount()} sub="analyzed" accent="blue" />
        <StatCard icon={Languages} label="Languages" value={languagesDetectedCount()} sub="detected" accent="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">Sentiment Over Time</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-cyan-300"><span className="h-2 w-2 rounded-full bg-cyan-400" />Volume</span>
              <span className="flex items-center gap-1.5 text-rose-300"><span className="h-2 w-2 rounded-full bg-rose-400" />Negative</span>
            </div>
          </div>
          <LineChart points={hours.map((h) => ({ x: h.hour, y: h.count, y2: h.negative }))} />
        </div>

        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Platform Distribution</h2>
          <DonutChart
            data={dist.map((d) => ({ label: d.platform, value: d.count, color: platformColors[d.platform] }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Language Distribution</h2>
          <DonutChart
            data={langs.map((l) => ({ label: l.language, value: l.count, color: langColors[l.language] }))}
            size={130}
          />
        </div>
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Complaint Categories</h2>
          <BarChart
            data={complaints.map((c) => ({
              label: c.category.length > 10 ? c.category.slice(0, 9) + '…' : c.category,
              value: c.count,
              color: '#fb923c',
            }))}
            height={140}
          />
        </div>
        <div className="glass-card p-5">
          <h2 className="text-sm font-semibold text-slate-200 mb-4">Alert Severity</h2>
          <BarChart
            data={severities.map((s) => ({
              label: s.severity,
              value: s.count,
              color: severityColors[s.severity] || '#38bdf8',
            }))}
            height={140}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">Active Alerts</h2>
            <button onClick={() => onNavigate('warnings')} className="text-xs text-cyan-300 hover:text-cyan-200">View all</button>
          </div>
          <div className="space-y-3">
            {seedAlerts.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg bg-navy-800/40 border border-navy-700/50">
                <div className="shrink-0 mt-0.5">
                  <span className="grid place-items-center h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/30">
                    <AlertTriangle className="h-4 w-4 text-rose-300" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <SeverityBadge severity={a.severity} />
                    <span className="text-xs text-slate-500">#{a.affectedTopic}</span>
                  </div>
                  <p className="text-sm text-slate-200 truncate">{a.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{a.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">Emerging Issues</h2>
            <button onClick={() => onNavigate('trends')} className="text-xs text-cyan-300 hover:text-cyan-200">View all</button>
          </div>
          <div className="space-y-2">
            {trends.filter((t) => t.emerging).slice(0, 5).map((t) => (
              <div key={t.topic} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-navy-700/40 transition-colors">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-200 truncate">#{t.topic}</p>
                  <p className="text-xs text-slate-500">{t.posts} posts · {t.growthRate}% growth · {t.velocity}/hr velocity</p>
                </div>
                <span className="chip bg-amber-500/15 text-amber-300 border border-amber-500/30">emerging</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">Recent Complaints</h2>
            <button onClick={() => onNavigate('complaints')} className="text-xs text-cyan-300 hover:text-cyan-200">View all</button>
          </div>
          <div className="space-y-2">
            {seedComplaints.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-navy-800/40 border border-navy-700/50">
                <Megaphone className="h-4 w-4 text-amber-300 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-200 truncate">{c.category}</p>
                  <p className="text-xs text-slate-500 truncate">{c.location} · {c.frequency} reports</p>
                </div>
                <span className={`chip border ${c.urgency === 'high' ? 'bg-rose-500/15 text-rose-300 border-rose-500/30' : 'bg-amber-500/15 text-amber-300 border-amber-500/30'}`}>
                  {c.urgency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-200">Rumor & Coordination Signals</h2>
          </div>
          <div className="space-y-2">
            {seedRumors.slice(0, 3).map((r) => (
              <div key={r.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-navy-800/40 border border-navy-700/50">
                <span className={`h-2 w-2 rounded-full shrink-0 ${r.status === 'Evidence Contradicts' ? 'bg-rose-400' : r.status === 'Unverified' ? 'bg-slate-400' : 'bg-amber-400'}`} />
                <p className="text-sm text-slate-200 truncate flex-1">{r.claim}</p>
                <span className="text-xs text-slate-500 shrink-0">{r.posts} posts</span>
              </div>
            ))}
            {seedCoordination.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-purple-500/5 border border-purple-500/20">
                <span className="h-2 w-2 rounded-full bg-purple-400 shrink-0" />
                <p className="text-sm text-slate-200 truncate flex-1">{c.label}</p>
                <span className="text-xs text-purple-300 shrink-0">{c.similarity}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-200">Trending Topics</h2>
          <button onClick={() => onNavigate('trends')} className="text-xs text-cyan-300 hover:text-cyan-200">View all</button>
        </div>
        <div className="space-y-2">
          {trends.slice(0, 6).map((t) => (
            <div key={t.topic} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-navy-700/40 transition-colors">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-slate-200 truncate">#{t.topic}</p>
                <p className="text-xs text-slate-500">{t.posts} posts · {t.growthRate}% growth</p>
              </div>
              {t.emerging && (
                <span className="chip bg-amber-500/15 text-amber-300 border border-amber-500/30">emerging</span>
              )}
              <span className={`text-xs font-semibold ${t.sentiment < -20 ? 'text-rose-300' : t.sentiment > 20 ? 'text-emerald-300' : 'text-slate-400'}`}>
                {t.sentiment > 0 ? '+' : ''}{t.sentiment}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-200">Latest Analyzed Posts</h2>
          <button onClick={() => onNavigate('analytics')} className="text-xs text-cyan-300 hover:text-cyan-200">View all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {recentPosts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
