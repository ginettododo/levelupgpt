import React from 'react';
import { describe, expect, it } from 'vitest';
import { renderToString } from 'react-dom/server';
import ActionIntake from '../ActionIntake';
import { GameProvider } from '../../context/GameContext';

describe('ActionIntake', () => {
  const renderMarkup = () => renderToString(<GameProvider><ActionIntake /></GameProvider>);

  it('renders the monochrome ritual controls', () => {
    const markup = renderMarkup();
    expect(markup).toContain('Positive / negative rituals');
    expect(markup).toContain('Positive actions');
    expect(markup).toContain('Negative actions');
  });

  it('shows a net XP metric', () => {
    const markup = renderMarkup();
    expect(markup).toMatch(/Net/);
  });
});
