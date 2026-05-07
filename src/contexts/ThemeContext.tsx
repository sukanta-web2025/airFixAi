import React, { createContext, useContext, useEffect, useState } from 'react';
import { storageService } from '../services/storage/storage.service';
import { PersistenceStorageKey } from '../services/storage/PersistenceStorageKey';
import { useMediaQuery } from '../hooks/useMediaQuery';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  accentColor: string;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isSystemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setThemeState] = useState<Theme>('light');
  const [accentColor, setAccentColorState] = useState<string>('#FB9707');

  useEffect(() => {
    // Initial Theme Load
    const storedTheme = storageService.get<Theme>('local', PersistenceStorageKey.THEME);
    if (storedTheme) {
      setThemeState(storedTheme);
      applyTheme(storedTheme);
    } else {
      const systemTheme: Theme = isSystemDark ? 'dark' : 'light';
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }
    // Initial Accent Color Load
    const storedAccent = storageService.get<string>('local', PersistenceStorageKey.ACCENT_COLOR);
    if (storedAccent) {
      setAccentColorState(storedAccent);
      applyAccentColor(storedAccent);
    } else {
      applyAccentColor('#FB9707');
    }
  }, []);

  useEffect(() => {
    const storedTheme = storageService.get<Theme>('local', PersistenceStorageKey.THEME);
    if (!storedTheme) {
      const systemTheme: Theme = isSystemDark ? 'dark' : 'light';
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    }
  }, [isSystemDark]);

  const applyTheme = (value: Theme) => {
    document.documentElement.setAttribute('data-theme', value);
  };

  const applyAccentColor = (color: string) => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', color);
    
    // Primary Gradient
    root.style.setProperty('--grad-primary', `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`);
    root.style.setProperty('--color-primary-dark', color);
    root.style.setProperty('--color-primary-shadow', `${color}66`); // 40% opacity for shadows

    // Light Mode Background Tints
    root.style.setProperty('--bg-light-1', `${color}10`); // 6% opacity
    root.style.setProperty('--bg-light-2', `${color}1A`); // 10% opacity
    root.style.setProperty('--bg-light-3', `${color}26`); // 15% opacity

    // Dark Mode Background Tints (Subtle overlays on deep blue/black)
    // We'll keep the base dark, but add a hint of the accent
    root.style.setProperty('--bg-dark-1', '#020617');
    root.style.setProperty('--bg-dark-2', `${color}15`); // Very subtle tint
    root.style.setProperty('--bg-dark-3', `${color}20`);

    // Sidebar (Menu) Background Tints
    root.style.setProperty('--sidebar-bg-1', '#FFFFFF');
    root.style.setProperty('--sidebar-bg-2', `${color}0D`); // Very faint tint for light mode sidebar

    root.style.setProperty('--sidebar-bg-dark-1', '#020617');
    root.style.setProperty('--sidebar-bg-dark-2', `${color}1A`); // Slightly stronger tint for dark mode sidebar
    root.style.setProperty('--sidebar-bg-dark-3', `${color}26`);
  };

  const setTheme = (value: Theme) => {
    setThemeState(value);
    storageService.set('local', PersistenceStorageKey.THEME, value);
    applyTheme(value);
  };

  const setAccentColor = (value: string) => {
    setAccentColorState(value);
    storageService.set('local', PersistenceStorageKey.ACCENT_COLOR, value);
    applyAccentColor(value);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, accentColor, setTheme, toggleTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
