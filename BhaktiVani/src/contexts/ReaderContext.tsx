import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fontSizes, lineHeights, letterSpacing } from '../constants/fonts';
import { storageService } from '../services/storageService';

export interface ReaderSettings {
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
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from storage on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await storageService.getReaderSettings();
        if (savedSettings) {
          setSettings(savedSettings);
        }
      } catch (error) {
        console.error('Failed to load reader settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<ReaderSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Save to storage
    try {
      await storageService.saveReaderSettings(updatedSettings);
    } catch (error) {
      console.error('Failed to save reader settings:', error);
    }
  };

  const resetSettings = async () => {
    setSettings(defaultSettings);
    
    // Save to storage
    try {
      await storageService.saveReaderSettings(defaultSettings);
    } catch (error) {
      console.error('Failed to save reader settings:', error);
    }
  };

  const value = {
    settings,
    updateSettings,
    resetSettings,
    isLoading,
  };

  return (
    <ReaderContext.Provider value={value}>
      {children}
    </ReaderContext.Provider>
  );
}; 