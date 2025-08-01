import React, { createContext, useContext, useState, ReactNode } from 'react';
import { fontSizes, lineHeights, letterSpacing } from '../constants/fonts';

interface ReaderSettings {
  fontSize: keyof typeof fontSizes;
  lineHeight: keyof typeof lineHeights;
  letterSpacing: keyof typeof letterSpacing;
  layout: 'paragraph' | 'line-by-line';
  theme: 'sepia' | 'white' | 'dark';
  justifyText: boolean;
  showLineNumbers: boolean;
}

interface ReaderContextType {
  settings: ReaderSettings;
  updateSettings: (newSettings: Partial<ReaderSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: ReaderSettings = {
  fontSize: 'lg',
  lineHeight: 'relaxed',
  letterSpacing: 'normal',
  layout: 'paragraph',
  theme: 'sepia',
  justifyText: true,
  showLineNumbers: false,
};

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

export const useReaderContext = () => {
  const context = useContext(ReaderContext);
  if (!context) {
    throw new Error('useReaderContext must be used within a ReaderProvider');
  }
  return context;
};

interface ReaderProviderProps {
  children: ReactNode;
}

export const ReaderProvider: React.FC<ReaderProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<ReaderSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<ReaderSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = {
    settings,
    updateSettings,
    resetSettings,
  };

  return (
    <ReaderContext.Provider value={value}>
      {children}
    </ReaderContext.Provider>
  );
}; 