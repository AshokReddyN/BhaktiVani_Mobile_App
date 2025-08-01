import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'sepia';

interface Settings {
  fontSize: number;
  theme: Theme;
  // Add other settings like fontFamily, margins, etc. here
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
  fontSize: 18,
  theme: 'light',
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
