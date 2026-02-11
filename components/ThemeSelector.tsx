
import React from 'react';
import { ThemeType } from '../types';

interface ThemeSelectorProps {
  currentTheme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  const themes: { id: ThemeType; label: string; colors: string }[] = [
    { id: 'serenity', label: 'Tendresse', colors: 'bg-rose-50 border-rose-200' },
    { id: 'nocturne', label: 'Velours', colors: 'bg-red-950 border-red-800' },
    { id: 'twilight', label: 'Ardent', colors: 'bg-orange-950 border-orange-800' },
  ];

  return (
    <div className="flex justify-center gap-3 mb-8">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all transform active:scale-95 shadow-sm ${
            currentTheme === theme.id
              ? 'ring-2 ring-offset-2 ring-rose-400 border-transparent'
              : 'opacity-70 grayscale-[0.5] hover:grayscale-0'
          } ${theme.colors}`}
          style={{ backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', borderColor: 'var(--border)' }}
        >
          <div className={`w-3 h-3 rounded-full ${theme.id === 'serenity' ? 'bg-rose-400' : theme.id === 'nocturne' ? 'bg-red-600' : 'bg-orange-500'}`} />
          {theme.label}
        </button>
      ))}
    </div>
  );
};

export default ThemeSelector;
