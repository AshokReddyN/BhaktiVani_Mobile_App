import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import { storageService } from '../services/storageService';
import { UILanguageType } from '../constants/languages';

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

// UI Language code mapping (for app interface)
const uiLanguageCodeMap: Record<UILanguageType, string> = {
  english: 'en',
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
    
    // Check if we support this language for UI
    if (Object.values(uiLanguageCodeMap).includes(languageCode)) {
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
  // Always start with English to ensure consistent hook behavior
  const defaultLanguage = 'en';
  
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

// Function to change UI language
export const changeUILanguage = async (languageType: UILanguageType) => {
  const languageCode = uiLanguageCodeMap[languageType];
  await i18n.changeLanguage(languageCode);
  
  // Save to storage with a different key for UI language
  try {
    await storageService.saveUILanguageSettings(languageType);
  } catch (error) {
    console.error('Failed to save UI language settings:', error);
  }
};

// Function to get current UI language type
export const getCurrentUILanguageType = (): UILanguageType => {
  const currentLang = i18n.language;
  
  // Find the language type for the current language code
  for (const [type, code] of Object.entries(uiLanguageCodeMap)) {
    if (code === currentLang) {
      return type as UILanguageType;
    }
  }
  
  return 'english'; // Default to English for UI
};

// Keep old functions for backward compatibility
export const changeLanguage = changeUILanguage;
export const getCurrentLanguageType = getCurrentUILanguageType;

// Function to initialize i18n synchronously
export const initializeLanguageSync = () => {
  // Initialize i18n immediately with English default
  initializeI18n();
};

// Function to load saved UI language from storage (async)
export const loadSavedUILanguage = async () => {
  try {
    const savedUILanguage = await storageService.getUILanguageSettings();
    if (savedUILanguage && ['english', 'kannada', 'sanskrit', 'telugu'].includes(savedUILanguage)) {
      await changeUILanguage(savedUILanguage as UILanguageType);
    }
  } catch (error) {
    console.error('Failed to load saved UI language:', error);
  }
};

// Keep old function for backward compatibility
export const initializeLanguage = async () => {
  initializeLanguageSync();
  await loadSavedUILanguage();
};

export default i18n; 