import type { SocialPost } from '@/data/types';
import { SentimentBadge, PlatformBadge, LanguageBadge, TopicChip } from './Badges';
import { Clock } from 'lucide-react';

function timeAgo(iso: string) {
  const diff = Date.parse('2026-09-20T08:00:00Z') - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const h = Math.floor(mins / 60);
  return `${h}h ${mins % 60}m ago`;
}

export function PostCard({ post }: { post: SocialPost }) {
  return (
    <div className="glass-card p-4 fade-in-up">
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <PlatformBadge platform={post.platform} />
          <LanguageBadge language={post.language} />
          <SentimentBadge sentiment={post.sentiment} />
        </div>
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Clock className="h-3 w-3" /> {timeAgo(post.timestamp)}
        </span>
      </div>
      <p className="text-sm text-slate-200 leading-relaxed mb-3">{post.text}</p>
      <div className="flex flex-wrap items-center gap-1.5">
        {post.topics.map((t) => (
          <TopicChip key={t} topic={t} />
        ))}
        <span className="text-xs text-slate-500 ml-auto">@{post.author}</span>
      </div>
    </div>
  );
}
