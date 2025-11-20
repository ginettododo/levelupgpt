import { AlertOctagon, ShieldCheck } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { useGame, useTodayEntry } from '../context/GameContext';
import { getDateKey } from '../lib/gameLogic';
import ActionGrid from './ActionGrid';
import DailyMissions from './DailyMissions';

const tabs = ['OVERVIEW', 'PHYSICAL', 'WORK', 'DISCIPLINE', 'SOCIAL', 'VICES'] as const;

type TabKey = (typeof tabs)[number];

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('OVERVIEW');
  const { entries } = useGame();
  const today = useTodayEntry();

  const status = useMemo(() => {
    const hasNegative = Object.entries(today.actions).some(([, count]) => count < 0);
    return hasNegative
      ? { label: 'Recovery Mode', icon: <AlertOctagon className="text-neon-negative" />, color: 'text-neon-negative' }
      : { label: 'Clean & Focused', icon: <ShieldCheck className="text-neon-physical" />, color: 'text-neon-physical' };
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
        <div className="neon-card p-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/60">Status</p>
            <p className={`text-lg font-black ${status.color}`}>{status.label}</p>
          </div>
          {status.icon}
        </div>
        <div className="neon-card p-4">
          <p className="text-xs uppercase tracking-widest text-white/60">Last 7 Days</p>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
                <XAxis dataKey="date" stroke="#9ca3af" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0f0f11', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Bar dataKey="value" radius={[4, 4, 4, 4]} fill="#ffffff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-widest text-white/60">Daily Missions</p>
          </div>
          <DailyMissions />
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 pb-24" aria-label="Dashboard">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`neon-pill whitespace-nowrap ${
              activeTab === tab ? 'bg-neon-work/20 text-white shadow-neon-blue' : 'bg-lvl-800 text-white/70'
            }`}
            onClick={() => setActiveTab(tab)}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-3">{renderTabContent()}</div>
    </div>
  );
};

export default Dashboard;
