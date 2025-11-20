import { LayoutList, User } from 'lucide-react';
import React from 'react';
import Dashboard from './components/Dashboard';
import XPHeader from './components/XPHeader';
import XpRoadmap from './components/XpRoadmap';
import { GameProvider } from './context/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="bg-lvl-black text-white min-h-screen relative overflow-hidden">
        <XPHeader />
        <main className="pt-[140px] pb-[120px]">
          <XpRoadmap />
          <Dashboard />
        </main>
        <nav className="fixed bottom-0 left-0 right-0 pb-[calc(env(safe-area-inset-bottom)+16px)] flex justify-center z-40">
          <div className="glass-panel px-8 py-3 rounded-full flex items-center gap-10">
            <button type="button" className="flex flex-col items-center gap-1 text-xs text-white/80 active:scale-95">
              <LayoutList />
              <span>Dashboard</span>
            </button>
            <button type="button" className="flex flex-col items-center gap-1 text-xs text-white/80 active:scale-95">
              <User />
              <span>Stats</span>
            </button>
          </div>
        </nav>
      </div>
    </GameProvider>
  );
};

export default App;
