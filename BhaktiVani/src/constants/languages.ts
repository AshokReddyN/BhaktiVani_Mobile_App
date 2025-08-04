// Content/Library language types (for stotra content)
export type ContentLanguageType = 'kannada' | 'sanskrit' | 'telugu';

// UI language types (for app interface)
export type UILanguageType = 'english' | 'kannada' | 'sanskrit' | 'telugu';

// Keep the old type for backward compatibility
export type LanguageType = ContentLanguageType;

export interface Language {
  id: LanguageType;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
}

export interface UILanguage {
  id: UILanguageType;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
}

// Content languages (for stotra content)
export const SUPPORTED_CONTENT_LANGUAGES: Language[] = [
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    code: 'kn',
    flag: '🇮🇳',
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    code: 'sa',
    flag: '🇮🇳',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te',
    flag: '🇮🇳',
  },
];

// UI languages (for app interface)
export const SUPPORTED_UI_LANGUAGES: UILanguage[] = [
  {
    id: 'english',
    name: 'English',
    nativeName: 'English',
    code: 'en',
    flag: '🇺🇸',
  },
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    code: 'kn',
    flag: '🇮🇳',
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    code: 'sa',
    flag: '🇮🇳',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te',
    flag: '🇮🇳',
  },
];

// Keep old array for backward compatibility
export const SUPPORTED_LANGUAGES: Language[] = SUPPORTED_CONTENT_LANGUAGES;

export const getLanguageById = (id: LanguageType): Language => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.id === id);
  if (!language) {
    throw new Error(`Language with id ${id} not found`);
  }
  return language;
};

export const getUILanguageById = (id: UILanguageType): UILanguage => {
  const language = SUPPORTED_UI_LANGUAGES.find(lang => lang.id === id);
  if (!language) {
    throw new Error(`UI Language with id ${id} not found`);
  }
  return language;
};

export const getLanguageByCode = (code: string): Language => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
  if (!language) {
    throw new Error(`Language with code ${code} not found`);
  }
  return language;
};

export const getUILanguageByCode = (code: string): UILanguage => {
  const language = SUPPORTED_UI_LANGUAGES.find(lang => lang.code === code);
  if (!language) {
    throw new Error(`UI Language with code ${code} not found`);
  }
  return language;
}; 