import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LanguageType, getLanguageById } from '../constants/languages';

interface LanguageContextType {
  selectedLanguage: LanguageType;
  setSelectedLanguage: (language: LanguageType) => void;
  currentLanguage: ReturnType<typeof getLanguageById>;
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
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('kannada');

  const currentLanguage = getLanguageById(selectedLanguage);

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    currentLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 