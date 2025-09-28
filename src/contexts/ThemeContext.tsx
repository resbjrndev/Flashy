"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeType = 'default' | 'ocean' | 'sunset' | 'forest' | 'neon' | 'cherry';

interface ThemeContextType {
  currentTheme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  themes: Array<{
    id: ThemeType;
    name: string;
    description: string;
  }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  {
    id: 'default' as ThemeType,
    name: 'Default',
    description: 'Classic purple and orange design'
  },
  {
    id: 'ocean' as ThemeType,
    name: 'Ocean Breeze',
    description: 'Calming blues and purples'
  },
  {
    id: 'sunset' as ThemeType,
    name: 'Sunset Vibes',
    description: 'Warm oranges and pinks'
  },
  {
    id: 'forest' as ThemeType,
    name: 'Forest Dreams',
    description: 'Natural greens and earth tones'
  },
  {
    id: 'neon' as ThemeType,
    name: 'Neon Nights',
    description: 'Electric colors and gradients'
  },
  {
    id: 'cherry' as ThemeType,
    name: 'Cherry Blossom',
    description: 'Soft pinks and whites'
  }
];

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('default');

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
    // Apply theme to document root
    if (typeof document !== 'undefined') {
      if (theme === 'default') {
        document.documentElement.removeAttribute('data-theme');
      } else {
        document.documentElement.setAttribute('data-theme', theme);
      }
      // Save to localStorage
      localStorage.setItem('flashy-theme', theme);
    }
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('flashy-theme') as ThemeType;
      if (savedTheme && themes.find(t => t.id === savedTheme)) {
        setTheme(savedTheme);
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;