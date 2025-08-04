import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ContentLanguageType, SUPPORTED_CONTENT_LANGUAGES, getLanguageById } from '../constants/languages';
import { storageService } from '../services/storageService';

interface LanguageContextType {
  selectedLanguage: ContentLanguageType;
  setSelectedLanguage: (language: ContentLanguageType) => void;
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
  const [selectedLanguage, setSelectedLanguageState] = useState<ContentLanguageType>('kannada');
  const [isLoading, setIsLoading] = useState(true);

  const currentLanguage = getLanguageById(selectedLanguage);

  // Load content language settings from storage on mount
  useEffect(() => {
    const loadContentLanguageSettings = async () => {
      try {
        // Load saved content language settings
        const savedLanguage = await storageService.getLanguageSettings();
        if (savedLanguage && ['kannada', 'sanskrit', 'telugu'].includes(savedLanguage)) {
          setSelectedLanguageState(savedLanguage as ContentLanguageType);
        } else {
          // Default to Kannada for content language
          setSelectedLanguageState('kannada');
        }
      } catch (error) {
        console.error('Failed to load content language settings:', error);
        // Default to Kannada on error
        setSelectedLanguageState('kannada');
      } finally {
        setIsLoading(false);
      }
    };

    loadContentLanguageSettings();
  }, []);

  const setSelectedLanguage = async (language: ContentLanguageType) => {
    setSelectedLanguageState(language);
    
    // Save content language setting
    try {
      await storageService.saveLanguageSettings(language);
    } catch (error) {
      console.error('Failed to save content language:', error);
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