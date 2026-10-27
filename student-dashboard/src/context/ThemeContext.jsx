import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  { id: 'light', name: 'Light Mode', icon: '☀️' },
  { id: 'dark', name: 'Dark Mode', icon: '🌙' },
  { id: 'neon', name: 'Cyber Neon', icon: '⚡' },
  { id: 'emerald', name: 'Emerald Forest', icon: '🌿' },
  { id: 'sunset', name: 'Warm Sunset', icon: '🌅' }
];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('academix_theme') || 'light';
  });

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('academix_theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
