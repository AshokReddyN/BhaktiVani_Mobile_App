import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UILanguageType, SUPPORTED_UI_LANGUAGES, getUILanguageById } from '../constants/languages';
import { storageService } from '../services/storageService';
import { changeUILanguage, getCurrentUILanguageType } from '../i18n';

interface UILanguageContextType {
  selectedUILanguage: UILanguageType;
  setSelectedUILanguage: (language: UILanguageType) => void;
  currentUILanguage: ReturnType<typeof getUILanguageById>;
  isLoading: boolean;
}

const UILanguageContext = createContext<UILanguageContextType | undefined>(undefined);

export const useUILanguageContext = () => {
  const context = useContext(UILanguageContext);
  if (!context) {
    throw new Error('useUILanguageContext must be used within a UILanguageProvider');
  }
  return context;
};

interface UILanguageProviderProps {
  children: ReactNode;
}

export const UILanguageProvider: React.FC<UILanguageProviderProps> = ({ children }) => {
  const [selectedUILanguage, setSelectedUILanguageState] = useState<UILanguageType>('english');
  const [isLoading, setIsLoading] = useState(true);

  const currentUILanguage = getUILanguageById(selectedUILanguage);

  // Get current UI language on mount (i18n is already initialized)
  useEffect(() => {
    try {
      // Get the current UI language type from i18n
      const currentUILangType = getCurrentUILanguageType();
      setSelectedUILanguageState(currentUILangType);
    } catch (error) {
      console.error('Failed to get current UI language:', error);
      // Default to English on error
      setSelectedUILanguageState('english');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setSelectedUILanguage = async (language: UILanguageType) => {
    setSelectedUILanguageState(language);
    
    // Change i18n UI language
    try {
      await changeUILanguage(language);
    } catch (error) {
      console.error('Failed to change UI language:', error);
    }
  };

  const value = {
    selectedUILanguage,
    setSelectedUILanguage,
    currentUILanguage,
    isLoading,
  };

  return (
    <UILanguageContext.Provider value={value}>
      {children}
    </UILanguageContext.Provider>
  );
};