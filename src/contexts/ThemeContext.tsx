
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'neural' | 'ocean' | 'sunset' | 'forest' | 'galaxy' | 'minimal';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { name: Theme; label: string; gradient: string; }[];
}

const themes = [
  {
    name: 'neural' as Theme,
    label: 'Neural',
    gradient: 'from-slate-900 via-purple-900 to-slate-900'
  },
  {
    name: 'ocean' as Theme,
    label: 'Ocean',
    gradient: 'from-blue-900 via-cyan-900 to-teal-900'
  },
  {
    name: 'sunset' as Theme,
    label: 'Sunset',
    gradient: 'from-orange-900 via-red-900 to-pink-900'
  },
  {
    name: 'forest' as Theme,
    label: 'Forest',
    gradient: 'from-green-900 via-emerald-900 to-teal-900'
  },
  {
    name: 'galaxy' as Theme,
    label: 'Galaxy',
    gradient: 'from-purple-900 via-violet-900 to-indigo-900'
  },
  {
    name: 'minimal' as Theme,
    label: 'Minimal',
    gradient: 'from-gray-900 via-gray-800 to-gray-900'
  }
];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('neural');

  useEffect(() => {
    const savedTheme = localStorage.getItem('kalal-theme') as Theme;
    if (savedTheme && themes.find(t => t.name === savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('kalal-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
