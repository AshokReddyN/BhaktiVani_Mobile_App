import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LanguageId } from '../types/data';
import { LANGUAGES } from '../assets/data/sample_data';

interface LanguageContextType {
  language: LanguageId;
  setLanguage: (language: LanguageId) => void;
  availableLanguages: typeof LANGUAGES;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<LanguageId>('kannada'); // Default language

  const value = {
    language,
    setLanguage,
    availableLanguages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
