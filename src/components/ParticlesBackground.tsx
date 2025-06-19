'use client';

import { useEffect, useState, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import type { Engine } from 'tsparticles-engine';

export default function ParticlesBackground() {
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const updateThemeColor = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setColor(theme === 'dark' ? '#ffffff' : '#000000');
    };

    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0 pointer-events-none"
      options={{
        fullScreen: false,
        background: { color: 'transparent' },
        particles: {
          number: { value: 40 },
          color: { value: color },
          opacity: { value: 0.2 },
          size: { value: { min: 1, max: 3 } },
          move: { enable: true, speed: 0.6 },
          links: {
            enable: true,
            color: color,
            opacity: 0.08,
            distance: 140,
          },
        },
      }}
    />
  );
}
