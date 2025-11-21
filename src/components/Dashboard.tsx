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
      ? { label: 'Recovery mode', tone: 'alert', hint: 'Reset rituals & protect streaks' }
      : { label: 'Clean & focused', tone: 'success', hint: 'Momentum locked in' };
  }, [today.actions]);

  const chartData = useMemo(() => {
    const days: { date: string; value: number }[] = [];
    for (let i = 6; i >= 0; i -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = getDateKey(date);
      const entry = entries.find((item) => item.date === key);
      const value = entry ? Object.values(entry.actions).reduce((sum, count) => sum + count, 0) : 0;
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
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="stat-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">Status</p>
                <p className="text-xl font-semibold">{status.label}</p>
                <p className="muted">{status.hint}</p>
              </div>
              {status.tone === 'alert' ? <AlertOctagon /> : <Sparkle />}
            </div>
          </div>
          <div className="chart-shell">
            <div className="flex items-center justify-between mb-2">
              <p className="eyebrow">Last 7 days</p>
              <div className="badge ghost">Velocity</div>
            </div>
            <div className="h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
                  <XAxis dataKey="date" stroke="#d1d5db" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#0b0b0b', border: '1px solid rgba(255,255,255,0.15)' }} />
                  <Bar dataKey="value" radius={[8, 8, 8, 8]} fill="rgba(255,255,255,0.85)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mono-card">
          <div className="card-body">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="eyebrow">Daily missions</p>
                <p className="muted">Micro-quests to lock discipline.</p>
              </div>
              <div className="badge ghost">Auto-tracked</div>
            </div>
            <DailyMissions />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section-shell" aria-label="Dashboard" id={sectionId}>
      <ActionIntake />
      <div className="mono-card fade-in" id="insights">
        <div className="card-body space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Mission control</p>
              <p className="title-xl">Minimal actions, maximal flow</p>
              <p className="muted">Everything distilled to black & white cards.</p>
            </div>
            <div className="badge primary inline-flex items-center gap-2">
              <TrendingUp size={16} />
              Live XP sync
            </div>
          </div>
          <div className="segmented" role="tablist" aria-label="Action categories">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`segment ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                role="tab"
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-2">{renderTabContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
