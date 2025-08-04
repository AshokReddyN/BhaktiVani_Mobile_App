import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { storageService } from '../services/storageService';
import { LanguageType } from '../constants/languages';

// Import translation files
const en = require('./locales/en.json');
const kn = require('./locales/kn.json');
const sa = require('./locales/sa.json');
const te = require('./locales/te.json');

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
  // For now, just return English to avoid the expo-localization issue
  // We can add proper device locale detection later
  return 'en';
};

// Simple initialization function
const initializeI18n = () => {
  try {
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
  } catch (error) {
    console.error('Failed to initialize i18n:', error);
    // Fallback initialization
    try {
      i18n
        .use(initReactI18next)
        .init({
          resources,
          lng: 'en',
          fallbackLng: 'en',
          compatibilityJSON: 'v4',
          interpolation: {
            escapeValue: false,
          },
          react: {
            useSuspense: false,
          },
        });
      console.log('i18n initialized with fallback language: en');
    } catch (fallbackError) {
      console.error('Failed to initialize i18n with fallback:', fallbackError);
    }
  }
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
    // Ensure i18n is initialized even if storage fails
    initializeI18n();
  }
};

// Initialize i18n synchronously as a backup
try {
  initializeI18n();
} catch (error) {
  console.error('Failed to initialize i18n synchronously:', error);
}

export default i18n; 