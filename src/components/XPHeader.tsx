import { Download, Upload } from 'lucide-react';
import React, { useRef } from 'react';
import { useGame } from '../context/GameContext';
import { getLevelInfo } from '../lib/gameLogic';

const XPHeader: React.FC = () => {
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
      className="fixed top-0 left-0 right-0 z-40 glass-panel px-4 pt-[calc(env(safe-area-inset-top)+12px)] pb-3"
      aria-label="XP header"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="neon-card px-3 py-2 flex flex-col text-left shadow-neon-green">
            <span className="text-[10px] tracking-widest uppercase text-white/70">Level</span>
            <span className="text-2xl font-black">{levelInfo.level}</span>
          </div>
          <div className="text-xs text-white/80">
            <p className="font-semibold">XP {levelInfo.currentXP.toFixed(0)}</p>
            <p className="text-white/60">Next {levelInfo.nextLevelXP.toFixed(0)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="neon-pill glass-panel text-white flex items-center gap-1 active:scale-95 transition"
            onClick={handleExport}
            aria-label="Export data"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button
            type="button"
            className="neon-pill glass-panel text-white flex items-center gap-1 active:scale-95 transition"
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
      <div className="mt-3 h-2 w-full rounded-full bg-lvl-800 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-physical via-neon-work to-neon-discipline"
          style={{ width: `${levelInfo.progress * 100}%` }}
        />
      </div>
    </header>
  );
};

export default XPHeader;
