import { LockKeyhole } from 'lucide-react';
import React from 'react';
import { useGame } from '../context/GameContext';
import { endOfLevelXP, getLevelInfo, startOfLevelXP } from '../lib/gameLogic';

const XpRoadmap: React.FC = () => {
  const { totalXP } = useGame();
  const levelInfo = getLevelInfo(totalXP);
  const startXP = startOfLevelXP(levelInfo.level);
  const endXP = endOfLevelXP(levelInfo.level);
  const percent = Math.min(((totalXP - startXP) / (endXP - startXP)) * 100, 100);

  return (
    <section className="neon-card overflow-hidden border border-white/10" aria-label="XP roadmap">
      <div className="grid gap-6 sm:grid-cols-[2fr,1fr] p-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="label">Roadmap</p>
              <p className="text-xl font-bold">Minimal leveling rail</p>
            </div>
            <div className="status-chip">{levelInfo.level} → {levelInfo.level + 1}</div>
          </div>
          <div className="relative h-3 rounded-full bg-lvl-800 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-neon-physical via-neon-work to-neon-discipline"
              style={{ width: `${percent}%` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <div className="flex items-center justify-between text-sm text-white/70">
            <div className="flex items-center gap-2">
              <span className="pill subtle">Lvl {levelInfo.level}</span>
              <span>{startXP} XP</span>
            </div>
            <div className="flex items-center gap-2">
              <LockKeyhole size={14} className="text-white/60" aria-hidden="true" />
              <span>{Math.max(endXP - totalXP, 0).toFixed(0)} XP left</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="pill subtle alt">Lvl {levelInfo.level + 1}</span>
              <span>{endXP} XP</span>
            </div>
          </div>
        </div>
        <div className="panel-tile h-full border border-white/5 bg-lvl-900/80">
          <p className="label">Velocity</p>
          <p className="text-3xl font-black mb-1">{(levelInfo.progress * 100).toFixed(0)}%</p>
          <p className="text-sm text-white/70">Completion velocity recalibrated daily based on your entries.</p>
          <div className="mt-3 flex gap-2 text-xs text-white/60">
            <span className="pill ghost">Adaptive XP</span>
            <span className="pill ghost">HUD Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XpRoadmap;
