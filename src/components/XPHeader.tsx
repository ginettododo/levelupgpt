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
    <header
      id={sectionId}
      className="fixed top-0 left-0 right-0 z-40 px-4 pt-[calc(env(safe-area-inset-top)+14px)]"
      aria-label="XP header"
    >
      <div className="relative overflow-hidden glass-panel rounded-3xl border border-white/10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/0 to-white/5" aria-hidden="true" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-neon-work/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-10 -bottom-10 w-52 h-52 bg-neon-physical/10 blur-3xl" aria-hidden="true" />
        <div className="relative px-5 pt-4 pb-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">LevelUp OS</p>
              <p className="text-lg font-bold">Daily performance cockpit</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="pill ghost"
                onClick={handleExport}
                aria-label="Export data"
              >
                <Download size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>
              <button
                type="button"
                className="pill ghost"
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
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="panel-tile">
              <div className="flex items-end justify-between">
                <div>
                  <p className="label">Current level</p>
                  <p className="text-3xl font-black leading-none">{levelInfo.level}</p>
                </div>
                <div className="status-chip">Prime streak</div>
              </div>
              <p className="text-sm text-white/70 mt-1">Progressive XP ladder with adaptive pacing.</p>
            </div>
            <div className="panel-tile">
              <div className="flex items-center justify-between">
                <p className="label">XP pulse</p>
                <p className="text-sm font-semibold text-white">{levelInfo.currentXP.toFixed(0)} XP</p>
              </div>
              <div className="progress-shell" aria-hidden="true">
                <div
                  className="progress-bar"
                  style={{ width: `${levelInfo.progress * 100}%` }}
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-white/60">
                <span>Next {levelInfo.nextLevelXP.toFixed(0)} XP</span>
                <span>{(levelInfo.progress * 100).toFixed(0)}% synced</span>
              </div>
            </div>
            <div className="panel-tile">
              <div className="flex items-center justify-between">
                <p className="label">Backup & Sync</p>
                <span className="status-chip soft">Local-first</span>
              </div>
              <p className="text-sm text-white/70">
                Export and import your rituals to keep the streak alive across any device.
              </p>
              <p className="text-xs text-neon-physical font-semibold">Encrypted locally · Instant</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default XPHeader;
