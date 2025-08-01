import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'sepia';
export type FontFamily = 'serif' | 'sans-serif'; // Example font families

interface Settings {
  fontSize: number;
  theme: Theme;
  lineHeight: number;
  margin: number;
  fontFamily: FontFamily;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  fontSize: 20, // Increased default for better readability
  theme: 'light',
  lineHeight: 1.6, // Relative line height
  margin: 20, // Horizontal padding in pixels
  fontFamily: 'serif',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...newSettings }));
  };

  const value = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
