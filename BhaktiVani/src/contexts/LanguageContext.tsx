import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LanguageType, SUPPORTED_LANGUAGES, getLanguageById } from '../constants/languages';
import { storageService } from '../services/storageService';
import { changeLanguage, getCurrentLanguageType, initializeLanguage } from '../i18n';

interface LanguageContextType {
  selectedLanguage: LanguageType;
  setSelectedLanguage: (language: LanguageType) => void;
  currentLanguage: ReturnType<typeof getLanguageById>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [selectedLanguage, setSelectedLanguageState] = useState<LanguageType>('kannada');
  const [isLoading, setIsLoading] = useState(true);

  const currentLanguage = getLanguageById(selectedLanguage);

  // Load language settings from storage on mount
  useEffect(() => {
    const loadLanguageSettings = async () => {
      try {
        // Initialize i18n with saved language
        await initializeLanguage();
        
        // Get the current language type from i18n
        const currentLangType = getCurrentLanguageType();
        setSelectedLanguageState(currentLangType);
      } catch (error) {
        console.error('Failed to load language settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguageSettings();
  }, []);

  const setSelectedLanguage = async (language: LanguageType) => {
    setSelectedLanguageState(language);
    
    // Change i18n language
    try {
      await changeLanguage(language);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    currentLanguage,
    isLoading,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 