import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Theme = {
  background: string;
  text: string;
  headerBg: string;
  sectionBg: string;
  accent: string;
  cardBg: string;
};

const lightTheme: Theme = {
  background: '#f5f5f5',
  text: '#333',
  headerBg: '#80C3E5 url(images/header-bg.png) repeat',
  sectionBg: '#fff',
  accent: '#FFB6C1',
  cardBg: '#fff',
};

const darkTheme: Theme = {
  background: '#23272f',
  text: '#f5f5f5',
  headerBg: '#2a3a4a url(images/header-bg.png) repeat',
  sectionBg: '#2a3a4a',
  accent: '#80C3E5',
  cardBg: '#313a45',
};

const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const match = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    match.addEventListener('change', handler);
    return () => match.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => setIsDark((d) => !d);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}; 