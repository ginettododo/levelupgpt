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
    <div className="mt-[100px] px-4 pb-4" aria-label="XP roadmap">
      <div className="neon-card p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-white/70">
          <span>Current Level</span>
          <span>Next Level</span>
        </div>
        <div className="relative mt-2 h-3 rounded-full bg-lvl-800 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-physical via-neon-work to-neon-discipline"
            style={{ width: `${percent}%` }}
          />
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-white/10 via-transparent to-transparent" />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center gap-2">
            <span className="neon-pill bg-neon-physical/10 text-neon-physical">Lvl {levelInfo.level}</span>
            <span>{startXP} XP</span>
          </div>
          <div className="flex items-center gap-2">
            <LockKeyhole size={14} className="text-white/60" />
            <span>{Math.max(endXP - totalXP, 0).toFixed(0)} XP left</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="neon-pill bg-neon-discipline/10 text-neon-discipline">Lvl {levelInfo.level + 1}</span>
            <span>{endXP} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XpRoadmap;
