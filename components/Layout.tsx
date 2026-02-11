
import React from 'react';
import { ThemeType } from '../types';
import ThemeSelector from './ThemeSelector';

interface LayoutProps {
  children: React.ReactNode;
  theme: ThemeType;
  onThemeChange: (theme: ThemeType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, theme, onThemeChange }) => {
  return (
    <div className={`min-h-screen flex flex-col items-center p-4 md:p-8 transition-colors duration-500`}>
      <header className="w-full max-w-2xl text-center mb-4 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-2" style={{ color: 'var(--text-primary)' }}>je t'aime aussi</h1>
        <p className="font-light italic" style={{ color: 'var(--text-secondary)' }}>La passion s'écrit et se dessine, juste pour vous.</p>
      </header>
      
      <ThemeSelector currentTheme={theme} onThemeChange={onThemeChange} />

      <main 
        className="w-full max-w-2xl shadow-xl rounded-3xl p-6 md:p-10 border transition-colors duration-500"
        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', boxShadow: '0 20px 30px -5px rgba(136, 19, 55, 0.1)' }}
      >
        {children}
      </main>
      <footer className="mt-auto pt-8 text-xs opacity-60" style={{ color: 'var(--text-secondary)' }}>
        &copy; {new Date().getFullYear()} je t'aime aussi - Déclarant votre flamme
      </footer>
    </div>
  );
};

export default Layout;
