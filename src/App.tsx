import { LayoutList, Shield, Sparkles, User } from 'lucide-react';
import React from 'react';
import Dashboard from './components/Dashboard';
import XPHeader from './components/XPHeader';
import XpRoadmap from './components/XpRoadmap';
import { GameProvider } from './context/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="relative min-h-screen bg-lvl-black text-white overflow-hidden">
        <div className="hud-gradient" aria-hidden="true" />
        <div className="hud-grid" aria-hidden="true" />
        <XPHeader />
        <main className="relative z-10 max-w-6xl mx-auto px-4 pt-[210px] pb-[150px] space-y-10">
          <XpRoadmap />
          <Dashboard />
        </main>
        <nav
          className="fixed bottom-0 left-0 right-0 pb-[calc(env(safe-area-inset-bottom)+18px)] z-40 flex justify-center"
          aria-label="Quick actions"
        >
          <div className="command-dock">
            <button type="button" className="dock-button" aria-label="Dashboard">
              <LayoutList size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button type="button" className="dock-button" aria-label="Insights">
              <Sparkles size={18} />
              <span className="hidden sm:inline">Insights</span>
            </button>
            <button type="button" className="dock-button" aria-label="Profile">
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button type="button" className="dock-button primary" aria-label="Safety">
              <Shield size={18} />
              <span className="hidden sm:inline">Safe Sync</span>
            </button>
          </div>
        </nav>
      </div>
    </GameProvider>
  );
};

export default App;
