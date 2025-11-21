import { LayoutList, Shield, Sparkles, User } from 'lucide-react';
import React from 'react';
import Dashboard from './components/Dashboard';
import XPHeader from './components/XPHeader';
import XpRoadmap from './components/XpRoadmap';
import { GameProvider } from './context/GameContext';

const App: React.FC = () => {
  return (
    <GameProvider>
      <div className="app-shell">
        <div className="surface-noise" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <XPHeader sectionId="status" />
        <main className="content-shell">
          <XpRoadmap sectionId="roadmap" />
          <Dashboard sectionId="actions" />
        </main>
        <nav className="floating-nav" aria-label="Quick actions">
          <div className="nav-rail">
            <button
              type="button"
              className="nav-button"
              aria-label="Dashboard"
              onClick={() => document.getElementById('actions')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <LayoutList size={18} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              type="button"
              className="nav-button"
              aria-label="Insights"
              onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <Sparkles size={18} />
              <span className="hidden sm:inline">Roadmap</span>
            </button>
            <button
              type="button"
              className="nav-button"
              aria-label="Profilo & backup"
              onClick={() => document.getElementById('status')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button
              type="button"
              className="nav-button primary"
              aria-label="Safety"
              onClick={() => document.getElementById('actions-intake')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
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
