import { useState } from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  GitBranch,
  GitCompare,
  ShieldQuestion,
  Network,
  Users,
  Megaphone,
  HelpCircle,
  LineChart,
  Activity,
  Menu,
  X,
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'analytics'
  | 'trends'
  | 'warnings'
  | 'rootcause'
  | 'whatchanged'
  | 'rumors'
  | 'coordination'
  | 'network'
  | 'demographics'
  | 'complaints'
  | 'evidence'
  | 'forecast';

interface NavItem {
  id: PageId;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Social Analytics', icon: MessageSquare },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'warnings', label: 'Early Warnings', icon: AlertTriangle },
  { id: 'rootcause', label: 'Root Cause', icon: GitBranch },
  { id: 'whatchanged', label: 'What Changed', icon: GitCompare },
  { id: 'rumors', label: 'Rumor Tracker', icon: ShieldQuestion },
  { id: 'coordination', label: 'Coordination', icon: Network },
  { id: 'network', label: 'Network Analysis', icon: Network },
  { id: 'demographics', label: 'Demographics', icon: Users },
  { id: 'complaints', label: 'Complaints', icon: Megaphone },
  { id: 'evidence', label: 'Evidence / WHY', icon: HelpCircle },
  { id: 'forecast', label: 'Forecast', icon: LineChart },
];

interface Props {
  current: PageId;
  onNavigate: (p: PageId) => void;
  children: React.ReactNode;
}

export function Layout({ current, onNavigate, children }: Props) {
  const [open, setOpen] = useState(false);
  const active = NAV.find((n) => n.id === current);

  return (
    <div className="min-h-screen flex bg-navy-950 text-slate-200">
      <aside
        className={`fixed lg:static z-40 h-screen lg:h-auto w-64 shrink-0 border-r border-navy-700/60 bg-navy-900/80 backdrop-blur-xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-navy-700/60">
          <div className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-100">Pulse</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Social Intelligence</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 space-y-0.5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === current;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-200 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-700/50 border border-transparent'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-navy-700/60">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Live demo data · {new Date().getFullYear()}
          </div>
        </div>
      </aside>

      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 sticky top-0 z-20 flex items-center gap-3 px-4 lg:px-6 border-b border-navy-700/60 bg-navy-950/80 backdrop-blur-xl">
          <button
            className="lg:hidden grid place-items-center h-9 w-9 rounded-lg border border-navy-700 text-slate-300"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            {active && <active.icon className="h-5 w-5 text-cyan-300" />}
            <h1 className="text-base font-semibold text-slate-100">{active?.label}</h1>
          </div>
          <div className="ml-auto flex items-center gap-2 text-xs text-slate-500">
            <span className="hidden sm:inline">Hyderabad region</span>
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Monitoring 4 platforms</span>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto scrollbar-thin">{children}</main>
      </div>
    </div>
  );
}
