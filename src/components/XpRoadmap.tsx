import { LockKeyhole } from 'lucide-react';
import React from 'react';
import { useGame } from '../context/GameContext';
import { endOfLevelXP, getLevelInfo, startOfLevelXP } from '../lib/gameLogic';

interface XpRoadmapProps {
  sectionId?: string;
}

const XpRoadmap: React.FC<XpRoadmapProps> = ({ sectionId = 'roadmap' }) => {
  const { totalXP } = useGame();
  const levelInfo = getLevelInfo(totalXP);
  const startXP = startOfLevelXP(levelInfo.level);
  const endXP = endOfLevelXP(levelInfo.level);
  const percent = Math.min(((totalXP - startXP) / (endXP - startXP)) * 100, 100);

  return (
    <section id={sectionId} className="section-shell" aria-label="XP roadmap">
      <div className="mono-card fade-in">
        <div className="card-body space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Roadmap</p>
              <p className="title-xl">Minimal leveling rail</p>
              <p className="muted">White-on-black progress rail with subtle animation.</p>
            </div>
            <div className="segmented" role="tablist" aria-label="Level bounds">
              <span className="segment active">Lvl {levelInfo.level}</span>
              <span className="segment">Lvl {levelInfo.level + 1}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="progress-track" aria-hidden="true">
              <div className="progress-meter" style={{ width: `${percent}%` }} />
            </div>
            <div className="flex flex-col gap-2 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <span className="badge ghost">{startXP} XP</span>
                <span>Start of level</span>
              </div>
              <div className="flex items-center gap-2">
                <LockKeyhole size={14} aria-hidden="true" />
                <span>{Math.max(endXP - totalXP, 0).toFixed(0)} XP left</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge ghost">{endXP} XP</span>
                <span>Next level</span>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="stat-card">
              <p className="eyebrow">Level</p>
              <p className="text-3xl font-black">{levelInfo.level}</p>
              <p className="muted">Anchored in monochrome calm.</p>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Completion</p>
              <p className="text-3xl font-black">{(levelInfo.progress * 100).toFixed(0)}%</p>
              <p className="muted">Adaptive velocity recalibrated daily.</p>
            </div>
            <div className="stat-card">
              <p className="eyebrow">Focus mode</p>
              <p className="text-3xl font-black">Sync on</p>
              <p className="muted">Minimal transitions keep flow unbroken.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default XpRoadmap;
