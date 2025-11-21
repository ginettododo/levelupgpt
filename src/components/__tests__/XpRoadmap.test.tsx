import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import XpRoadmap from '../XpRoadmap';
import { GameProvider } from '../../context/GameContext';

describe('XpRoadmap', () => {
  it('renders roadmap checkpoints', () => {
    const markup = renderToString(
      <GameProvider>
        <XpRoadmap />
      </GameProvider>
    );

    expect(markup).toContain('Minimal leveling rail');
    expect(markup).toContain('Next level');
    expect(markup).toMatch(/XP left/);
  });
});
