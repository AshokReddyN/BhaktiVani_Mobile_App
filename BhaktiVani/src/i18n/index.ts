import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { storageService } from '../services/storageService';
import { LanguageType } from '../constants/languages';

// Import translation files
import en from './locales/en.json';
import kn from './locales/kn.json';
import sa from './locales/sa.json';
import te from './locales/te.json';

const resources = {
  en: {
    translation: en,
  },
  kn: {
    translation: kn,
  },
  sa: {
    translation: sa,
  },
  te: {
    translation: te,
  },
};

// Language code mapping
const languageCodeMap: Record<LanguageType, string> = {
  kannada: 'kn',
  sanskrit: 'sa',
  telugu: 'te',
};

// Get the device locale or fallback to English
const getDeviceLocale = (): string => {
  try {
    // Check if Localization is available
    if (!Localization || !Localization.locale) {
      console.warn('Localization is not available, falling back to English');
      return 'en';
    }
    
    const deviceLocale = Localization.locale;
    
    // Check if deviceLocale is valid
    if (!deviceLocale || typeof deviceLocale !== 'string') {
      console.warn('Device locale is not available, falling back to English');
      return 'en';
    }
    
    const languageCode = deviceLocale.split('-')[0];
    
    // Check if we support this language
    if (Object.values(languageCodeMap).includes(languageCode)) {
      return languageCode;
    }
    
    return 'en'; // Default to English
  } catch (error) {
    console.error('Error getting device locale:', error);
    return 'en'; // Default to English on error
  }
};

// Simple initialization function
const initializeI18n = () => {
  const defaultLanguage = getDeviceLocale();
  
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: defaultLanguage,
      fallbackLng: 'en',
      compatibilityJSON: 'v4',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
    
  console.log('i18n initialized with language:', defaultLanguage);
};

// Function to change language
export const changeLanguage = async (languageType: LanguageType) => {
  const languageCode = languageCodeMap[languageType];
  await i18n.changeLanguage(languageCode);
  
  // Save to storage
  try {
    await storageService.saveLanguageSettings(languageType);
  } catch (error) {
    console.error('Failed to save language settings:', error);
  }
};

// Function to get current language type
export const getCurrentLanguageType = (): LanguageType => {
  const currentLang = i18n.language;
  
  // Find the language type for the current language code
  for (const [type, code] of Object.entries(languageCodeMap)) {
    if (code === currentLang) {
      return type as LanguageType;
    }
  }
  
  return 'kannada'; // Default fallback
};

// Function to initialize i18n and language from storage
export const initializeLanguage = async () => {
  try {
    // Initialize i18n first
    initializeI18n();
    
    // Then load saved language settings
    const savedLanguage = await storageService.getLanguageSettings();
    if (savedLanguage && ['kannada', 'sanskrit', 'telugu'].includes(savedLanguage)) {
      await changeLanguage(savedLanguage as LanguageType);
    }
  } catch (error) {
    console.error('Failed to initialize language from storage:', error);
  }
};

export default i18n; 