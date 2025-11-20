import { AlertOctagon, Sparkle, TrendingUp } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useGame, useTodayEntry } from '../context/GameContext';
import { getDateKey } from '../lib/gameLogic';
import ActionGrid from './ActionGrid';
import ActionIntake from './ActionIntake';
import DailyMissions from './DailyMissions';

const tabs = ['OVERVIEW', 'PHYSICAL', 'WORK', 'DISCIPLINE', 'SOCIAL', 'VICES'] as const;

type TabKey = (typeof tabs)[number];

interface DashboardProps {
  sectionId?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ sectionId = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState<TabKey>('OVERVIEW');
  const { entries } = useGame();
  const today = useTodayEntry();

  const status = useMemo(() => {
    const hasNegative = Object.entries(today.actions).some(([, count]) => count < 0);
    return hasNegative
      ? { label: 'Recovery Mode', tone: 'alert', hint: 'Reset rituals & protect streaks' }
      : { label: 'Clean & Focused', tone: 'success', hint: 'Momentum locked in' };
  }, [today.actions]);

  const chartData = useMemo(() => {
    const days: { date: string; value: number }[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = getDateKey(date);
      const entry = entries.find((item) => item.date === key);
      const value = entry
        ? Object.values(entry.actions).reduce((sum, count) => sum + count, 0)
        : 0;
      days.push({ date: key.slice(5), value });
    }
    return days;
  }, [entries]);

  const renderTabContent = () => {
    if (activeTab === 'PHYSICAL' || activeTab === 'WORK' || activeTab === 'DISCIPLINE' || activeTab === 'SOCIAL') {
      return <ActionGrid category={activeTab} />;
    }
    if (activeTab === 'VICES') {
      return <ActionGrid category="VICES" />;
    }

    return (
      <div className="space-y-4">
        <div className="panel-stack">
          <div className={`signal ${status.tone}`}>
            <div>
              <p className="label">Status</p>
              <p className="text-xl font-semibold">{status.label}</p>
              <p className="text-sm text-white/70">{status.hint}</p>
            </div>
            {status.tone === 'alert' ? <AlertOctagon /> : <Sparkle />}
          </div>
          <div className="panel">
            <div className="flex items-center justify-between mb-2">
              <p className="label">Last 7 days</p>
              <div className="status-chip soft">Velocity</div>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
                  <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#0f0f11', border: '1px solid rgba(255,255,255,0.1)' }} />
                  <Bar dataKey="value" radius={[6, 6, 6, 6]} fill="url(#neonGradient)" />
                  <defs>
                    <linearGradient id="neonGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#bd00ff" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="label">Daily missions</p>
              <p className="text-sm text-white/70">Micro-quests to lock discipline.</p>
            </div>
            <div className="pill ghost">Auto-tracked</div>
          </div>
          <DailyMissions />
        </div>
      </div>
    );
  };

  return (
    <section className="space-y-5" aria-label="Dashboard" id={sectionId}>
      <ActionIntake />
      <div className="card-surface" id="insights">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="label">Mission control</p>
            <p className="text-xl font-bold">Minimal actions, maximal flow</p>
          </div>
          <div className="pill primary inline-flex items-center gap-2">
            <TrendingUp size={16} />
            Live XP sync
          </div>
        </div>
        <div className="tab-rail" role="tablist" aria-label="Action categories">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              role="tab"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="mt-4">{renderTabContent()}</div>
      </div>
    </section>
  );
};

export default Dashboard;
