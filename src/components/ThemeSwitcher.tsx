import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeId } from '../types';

export const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('geometric');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Restore saved preferences
    const savedTheme = (localStorage.getItem('oncology_reviewer_theme') as ThemeId) || 'geometric';
    const savedDark = localStorage.getItem('oncology_reviewer_dark') === 'true';

    setCurrentTheme(savedTheme);
    setIsDarkMode(savedDark);

    applyTheme(savedTheme, savedDark);
  }, []);

  const applyTheme = (theme: ThemeId, dark: boolean) => {
    const body = document.body;
    // Remove previous theme classes
    body.classList.remove(
      'theme-geometric',
      'theme-stone',
      'theme-charcoal',
      'theme-pastel',
      'theme-sunset',
      'theme-powder'
    );

    // Apply chosen theme
    body.classList.add(`theme-${theme}`);

    // Apply dark mode
    if (dark) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
  };

  const handleThemeChange = (theme: ThemeId) => {
    setCurrentTheme(theme);
    localStorage.setItem('oncology_reviewer_theme', theme);
    applyTheme(theme, isDarkMode);
  };

  const toggleDarkMode = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    localStorage.setItem('oncology_reviewer_dark', String(nextDark));
    applyTheme(currentTheme, nextDark);
  };

  return (
    <div id="theme-switcher-container" className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-black/5 bg-[var(--card-bg)] backdrop-blur-md shadow-xs">
      {/* 3 Geometric Balance Palette Dots: Stone, Terracotta, Charcoal */}
      <div className="flex items-center space-x-2" title="Geometric Balance Palettes">
        {/* Warm Stone (#A8A492) */}
        <button
          type="button"
          id="btn-theme-stone"
          onClick={() => handleThemeChange('stone')}
          className={`w-4 h-4 rounded-full transition-all cursor-pointer border border-black/10 ${
            currentTheme === 'stone'
              ? 'ring-2 ring-offset-1 ring-[#A8A492] scale-110 shadow-xs'
              : 'opacity-70 hover:opacity-100 hover:scale-105'
          }`}
          style={{ backgroundColor: '#A8A492' }}
          aria-label="Warm Stone Palette"
          title="Warm Stone Palette (#A8A492)"
        />

        {/* Geometric Terracotta / Core Accent (#EC5B38) */}
        <button
          type="button"
          id="btn-theme-geometric"
          onClick={() => handleThemeChange('geometric')}
          className={`w-4 h-4 rounded-full transition-all cursor-pointer border border-black/10 ${
            currentTheme === 'geometric' || currentTheme === 'sunset'
              ? 'ring-2 ring-offset-1 ring-[#EC5B38] scale-110 shadow-xs'
              : 'opacity-70 hover:opacity-100 hover:scale-105'
          }`}
          style={{ backgroundColor: '#EC5B38' }}
          aria-label="Geometric Balance Terracotta (Default)"
          title="Geometric Terracotta (Default #EC5B38)"
        />

        {/* Charcoal / Espresso (#524646) */}
        <button
          type="button"
          id="btn-theme-charcoal"
          onClick={() => handleThemeChange('charcoal')}
          className={`w-4 h-4 rounded-full transition-all cursor-pointer border border-black/10 ${
            currentTheme === 'charcoal'
              ? 'ring-2 ring-offset-1 ring-[#524646] scale-110 shadow-xs'
              : 'opacity-70 hover:opacity-100 hover:scale-105'
          }`}
          style={{ backgroundColor: '#524646' }}
          aria-label="Charcoal Theme"
          title="Charcoal Espresso (#524646)"
        />
      </div>

      <div className="h-4 w-px bg-black/10" />

      {/* Geometric Pill Toggle Switch for Dark Mode */}
      <button
        type="button"
        id="btn-dark-mode-toggle"
        onClick={toggleDarkMode}
        className="w-10 h-5 rounded-full relative cursor-pointer border border-black/10 transition-colors focus:outline-hidden"
        style={{
          backgroundColor: isDarkMode ? '#38302D' : '#E2DCC8',
        }}
        aria-label="Toggle High-Contrast Dark Mode"
        title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
      >
        <div
          className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-200"
          style={{
            left: isDarkMode ? '22px' : '2px',
          }}
        >
          {isDarkMode ? (
            <Moon className="w-2.5 h-2.5 text-[#524646]" />
          ) : (
            <Sun className="w-2.5 h-2.5 text-[#EC5B38]" />
          )}
        </div>
      </button>
    </div>
  );
};
