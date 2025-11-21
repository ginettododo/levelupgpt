import { Download, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { useGame } from '../context/GameContext';
import { getLevelInfo } from '../lib/gameLogic';

interface XPHeaderProps {
  sectionId?: string;
}

const XPHeader: React.FC<XPHeaderProps> = ({ sectionId = 'status' }) => {
  const { totalXP, exportData, importData } = useGame();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const levelInfo = getLevelInfo(totalXP);

  const handleExport = () => {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'levelup-life-backup.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    file.text().then(importData);
  };

  return (
    <header id={sectionId} className="hero-shell" aria-label="XP header">
      <div className="hero-card fade-in">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-accent" aria-hidden="true" />
        <div className="hero-accent secondary" aria-hidden="true" />
        <div className="inner-shell">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">LevelUp OS</p>
              <p className="title-xl">Monochrome performance cockpit</p>
              <p className="muted">Black & white, animated, with a calm control-room feel.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="badge ghost"
                onClick={handleExport}
                aria-label="Export data"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                type="button"
                className="badge ghost"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Import data"
              >
                <Upload size={16} />
                <span className="hidden sm:inline">Import</span>
              </button>
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="application/json"
                onChange={handleImport}
              />
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <p className="eyebrow">Current level</p>
              <p className="text-4xl font-black leading-none">{levelInfo.level}</p>
              <p className="muted">Minimal XP ladder tuned to your pace.</p>
            </div>
            <div className="stat-card space-y-3">
              <div className="flex items-center justify-between">
                <p className="eyebrow">XP pulse</p>
                <span className="badge primary">{levelInfo.currentXP.toFixed(0)} XP</span>
              </div>
              <div className="progress-track" aria-hidden="true">
                <div className="progress-meter" style={{ width: `${levelInfo.progress * 100}%` }} />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Next {levelInfo.nextLevelXP.toFixed(0)} XP</span>
                <span>{(levelInfo.progress * 100).toFixed(0)}% synced</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Backup & Sync</p>
                <span className="badge ghost">Local-first</span>
              </div>
              <p className="muted">Export/import rituals to keep streaks safe everywhere.</p>
              <p className="text-xs font-semibold text-white">Encrypted locally · Instant</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default XPHeader;
